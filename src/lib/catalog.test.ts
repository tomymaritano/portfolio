import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { catalogWork, getEntry, listCatalog } from "./catalog";
import { cvData } from "./cv";
import { envAllowsDraft } from "@/mcp/create-server";
import { buildDraftFiles, draftPrBody, draftSchema, sourceHasSlug } from "./draft";

describe("catalog", () => {
  it("lists site, work, and writing from site.ts", () => {
    const catalog = listCatalog();
    expect(catalog.site.line).toMatch(/extract/i);
    expect(catalog.work.map((item) => item.slug)).toContain("dripnex");
    expect(catalog.work.map((item) => item.slug)).toContain("devwifi");
    expect(catalog.work.map((item) => item.slug)).toContain("minipix");
    expect(catalog.writing.map((item) => item.slug)).toContain("grok-bot-and-cursor");
    expect(catalog.writing.map((item) => item.slug)).toEqual(
      expect.arrayContaining([
        "engine-is-not-the-renderer",
        "byte-identical",
        "sqlite-is-the-store",
        "the-radio-is-fine",
        "the-plugin-is-a-git-repo",
        "the-quote-is-not-the-product",
        "the-file-has-to-stay-readable",
        "the-file-is-the-export",
        "the-renderer-never-sees-sql",
        "signing-in-is-not-uploading",
        "a-hack-is-not-a-pack",
        "a-recalc-is-not-a-new-ingest",
        "ssid-is-not-free",
        "tags-are-not-the-body",
        "search-is-local",
        "a-backlink-is-not-a-copy",
        "default-is-not-a-palette",
        "a-checkbox-is-not-a-row",
        "the-preview-is-not-the-file",
        "a-reload-is-not-a-restart",
        "first-match-wins",
        "a-profile-is-not-a-fork",
        "the-core-has-no-clock",
        "packages-are-not-a-platform",
        "wasm-is-not-native",
        "an-extension-is-not-a-fork",
        "the-popover-is-not-the-firehose",
        "gpl-is-not-a-codec",
        "the-write-port-is-not-the-index",
        "the-abi-is-not-the-domain",
        "sync-core-is-not-a-sync-engine",
        "the-editor-is-not-the-engine",
        "a-spec-is-not-a-decision",
        "the-widget-is-not-a-radar",
        "the-bar-is-not-the-cli",
        "a-dead-rule-is-not-a-ranking",
        "an-index-is-not-a-path",
        "a-span-is-not-a-reason",
        "a-run-is-not-a-click",
        "lily58-is-not-a-bigger-corne",
        "a-scaffold-is-not-a-decision",
        "lead-is-not-a-status-parade",
      ]),
    );
    const quantis = catalog.work.find((item) => item.slug === "quantis-intel");
    expect(quantis?.href).toBeNull();
    expect(quantis?.lane).toBe("product");
    expect(catalogWork().every((item) => item.path.startsWith("/work/"))).toBe(true);
  });

  it("returns raw MDX for an entry", async () => {
    const entry = await getEntry("work", "dripnex");
    expect(entry?.title).toBe("Dripnex");
    expect(entry?.line).toBe("Hackable AI note taker. SQLite now, sync next.");
    expect(entry?.body).toMatch(/hackable AI note taker/i);
    expect(entry?.body).toMatch(/SQLite is the source of truth/);
    expect(entry?.body).toMatch(/init\.js/);
    expect(entry?.body).not.toMatch(/the file is the note/i);
    expect(entry?.body).not.toMatch(/no account/i);
    expect(await getEntry("work", "missing")).toBeNull();
    const minipix = await getEntry("work", "minipix");
    expect(minipix?.title).toBe("Minipix");
    expect(minipix?.body).toMatch(/minipix-core/);
    expect(minipix?.body).toMatch(/SHA-256/);
    expect(minipix?.body).toMatch(/wasm-is-not-native/);
    expect(minipix?.body).toMatch(/gpl-is-not-a-codec/);
    expect(minipix?.body).not.toMatch(/PHI/i);
    const cairnNote = await getEntry("writing", "engine-is-not-the-renderer");
    expect(cairnNote?.body).toMatch(/state machine/i);
    expect(cairnNote?.body).toMatch(/cairn-ui|useFlow/i);
    expect(cairnNote?.body).toMatch(/an-index-is-not-a-path/);
    const radio = await getEntry("writing", "the-radio-is-fine");
    expect(radio?.title).toBe("The radio is fine");
    expect(radio?.body).toMatch(/Nothing inside TLS/);
    expect(radio?.body).toMatch(/lsof/);
    expect(radio?.body).toMatch(/the-widget-is-not-a-radar/);
    expect(radio?.body).toMatch(/the-bar-is-not-the-cli/);
    expect(radio?.body).not.toMatch(/devwibar-tls/);
    const plugin = await getEntry("writing", "the-plugin-is-a-git-repo");
    expect(plugin?.body).toMatch(/one plugin, one git repo/i);
    expect(plugin?.body).toMatch(/dripnex\/plugin-stamp/);
    expect(plugin?.body).not.toMatch(/marketplace that we shipped/i);
    const quote = await getEntry("writing", "the-quote-is-not-the-product");
    expect(quote?.body).toMatch(/escritorio/i);
    expect(quote?.body).toMatch(/CIF-UTDT/);
    expect(quote?.body).not.toMatch(/PHI/i);
    const fileNote = await getEntry("writing", "the-file-has-to-stay-readable");
    expect(fileNote?.body).toMatch(/plain Markdown|\.md file/i);
    expect(fileNote?.body).toMatch(/Readied/);
    expect(fileNote?.body).not.toMatch(/the file is the note/i);
    const exportNote = await getEntry("writing", "the-file-is-the-export");
    expect(exportNote?.title).toBe("The file is the export");
    expect(exportNote?.body).toMatch(/canonical/i);
    expect(exportNote?.body).toMatch(/AST is ephemeral/i);
    expect(exportNote?.body).toMatch(/`\.md` is export/);
    expect(exportNote?.body).toMatch(/adr-002-markdown-model/);
    expect(exportNote?.body).not.toMatch(/the file is the note/i);
    expect(exportNote?.body).not.toMatch(/PHI/i);
    const dripnex = await getEntry("work", "dripnex");
    expect(dripnex?.body).toMatch(/`\.md` is export/i);
    const runtime = await getEntry("writing", "the-renderer-never-sees-sql");
    expect(runtime?.title).toBe("The renderer never sees SQL");
    expect(runtime?.body).toMatch(/window\.dripnex/);
    expect(runtime?.body).toMatch(/executeSQL/);
    expect(runtime?.body).toMatch(/adr-001-runtime-contract/);
    expect(runtime?.body).not.toMatch(/PHI/i);
    const syncNote = await getEntry("writing", "signing-in-is-not-uploading");
    expect(syncNote?.title).toBe("Signing in is not uploading");
    expect(syncNote?.body).toMatch(/AuthGate/);
    expect(syncNote?.body).toMatch(/Don't Sync/);
    expect(syncNote?.body).toMatch(/ciphertext/i);
    expect(syncNote?.body).not.toMatch(/PHI/i);
    const hack = await getEntry("writing", "a-hack-is-not-a-pack");
    expect(hack?.title).toBe("A hack is not a pack");
    expect(hack?.body).toMatch(/Settings → Hack/);
    expect(hack?.body).toMatch(/user-init/);
    expect(hack?.body).toMatch(/Make this sendable/);
    expect(hack?.body).not.toMatch(/PHI/i);
    const week = await getEntry("writing", "a-recalc-is-not-a-new-ingest");
    expect(week?.title).toBe("A recalc is not a new ingest");
    expect(week?.body).toMatch(/EMBI\+/);
    expect(week?.body).toMatch(/recalc is not a new ingest/i);
    expect(week?.body).toMatch(/dolargaucho\.com\/about/);
    expect(week?.body).not.toMatch(/PHI/i);
    const ssid = await getEntry("writing", "ssid-is-not-free");
    expect(ssid?.title).toBe("SSID is not free");
    expect(ssid?.body).toMatch(/CoreLocation/);
    expect(ssid?.body).toMatch(/Name stays Wi-Fi/i);
    expect(ssid?.body).not.toMatch(/devwibar-tls/);
    expect(ssid?.body).not.toMatch(/PHI/i);
    const tags = await getEntry("writing", "tags-are-not-the-body");
    expect(tags?.title).toBe("Tags are not the body");
    expect(tags?.body).toMatch(/notebook/i);
    expect(tags?.body).toMatch(/do not rewrite/i);
    expect(tags?.body).toMatch(/organizing-notes/);
    expect(tags?.body).not.toMatch(/PHI/i);
    const search = await getEntry("writing", "search-is-local");
    expect(search?.title).toBe("Search is local");
    expect(search?.body).toMatch(/LIKE/);
    expect(search?.body).toMatch(/tag:name/);
    expect(search?.body).toMatch(/adr-003-storage/);
    expect(search?.body).not.toMatch(/PHI/i);
    const backlink = await getEntry("writing", "a-backlink-is-not-a-copy");
    expect(backlink?.title).toBe("A backlink is not a copy");
    expect(backlink?.body).toMatch(/\[\[note title\]\]/);
    expect(backlink?.body).toMatch(/computed/i);
    expect(backlink?.body).toMatch(/writing-notes/);
    expect(backlink?.body).not.toMatch(/PHI/i);
    const palette = await getEntry("writing", "default-is-not-a-palette");
    expect(palette?.title).toBe("Default is not a palette");
    expect(palette?.body).toMatch(/tokens\.css/);
    expect(palette?.body).toMatch(/OFFICIAL_THEMES/);
    expect(palette?.body).toMatch(/architecture\/theming/);
    expect(palette?.body).not.toMatch(/PHI/i);
    const tasks = await getEntry("writing", "a-checkbox-is-not-a-row");
    expect(tasks?.title).toBe("A checkbox is not a row");
    expect(tasks?.body).toMatch(/@dripnex\/tasks/);
    expect(tasks?.body).toMatch(/- \[ \]/);
    expect(tasks?.body).toMatch(/architecture\/core/);
    expect(tasks?.body).not.toMatch(/PHI/i);
    const embed = await getEntry("writing", "the-preview-is-not-the-file");
    expect(embed?.title).toBe("The preview is not the file");
    expect(embed?.body).toMatch(/@dripnex\/embeds/);
    expect(embed?.body).toMatch(/raw URL/);
    expect(embed?.body).toMatch(/architecture\/editor/);
    expect(embed?.body).not.toMatch(/PHI/i);
    const reload = await getEntry("writing", "a-reload-is-not-a-restart");
    expect(reload?.title).toBe("A reload is not a restart");
    expect(reload?.body).toMatch(/createWebStorageAdapter/);
    expect(reload?.body).toMatch(/load, save, remove/);
    expect(reload?.body).toMatch(/cairn/);
    expect(reload?.body).toMatch(/a-run-is-not-a-click/);
    expect(reload?.body).not.toMatch(/PHI/i);
    const first = await getEntry("writing", "first-match-wins");
    expect(first?.title).toBe("First match wins");
    expect(first?.body).toMatch(/when: \(\) => true/);
    expect(first?.body).toMatch(/first match wins/i);
    expect(first?.body).toMatch(/criterionx/);
    expect(first?.body).toMatch(/a-spec-is-not-a-decision/);
    expect(first?.body).toMatch(/a-dead-rule-is-not-a-ranking/);
    expect(first?.body).not.toMatch(/PHI/i);
    const profile = await getEntry("writing", "a-profile-is-not-a-fork");
    expect(profile?.title).toBe("A profile is not a fork");
    expect(profile?.body).toMatch(/usProfile/);
    expect(profile?.body).toMatch(/profileSchema/);
    expect(profile?.body).toMatch(/criterionx/);
    expect(profile?.body).not.toMatch(/PHI/i);
    const clock = await getEntry("writing", "the-core-has-no-clock");
    expect(clock?.title).toBe("The core has no clock");
    expect(clock?.body).toMatch(/@criterionx\/core/);
    expect(clock?.body).toMatch(/Date\.now/);
    expect(clock?.body).toMatch(/no I\/O/i);
    expect(clock?.body).not.toMatch(/PHI/i);
    const packs = await getEntry("writing", "packages-are-not-a-platform");
    expect(packs?.title).toBe("Packages are not a platform");
    expect(packs?.body).toMatch(/knife, not a Swiss Army knife/);
    expect(packs?.body).toMatch(/engine\.run/);
    expect(packs?.body).toMatch(/evaluate_decision/);
    expect(packs?.body).toMatch(/@criterionx\/mcp/);
    expect(packs?.body).toMatch(/the-editor-is-not-the-engine/);
    expect(packs?.body).toMatch(/a-span-is-not-a-reason/);
    expect(packs?.body).not.toMatch(/PHI/i);
    const wasm = await getEntry("writing", "wasm-is-not-native");
    expect(wasm?.title).toBe("Wasm is not native");
    expect(wasm?.body).toMatch(/mozjpeg/);
    expect(wasm?.body).toMatch(/goldens-wasm\.json/);
    expect(wasm?.body).toMatch(/jpeg-encoder/);
    expect(wasm?.body).toMatch(/libwebp/);
    expect(wasm?.body).not.toMatch(/PHI/i);
    const ext = await getEntry("writing", "an-extension-is-not-a-fork");
    expect(ext?.title).toBe("An extension is not a fork");
    expect(ext?.body).toMatch(/registerEditorExtension/);
    expect(ext?.body).toMatch(/EditorView/);
    expect(ext?.body).toMatch(/plugin-vim/);
    expect(ext?.body).not.toMatch(/PHI/i);
    expect(ext?.body).not.toMatch(/devwibar-tls/);
    const firehose = await getEntry("writing", "the-popover-is-not-the-firehose");
    expect(firehose?.title).toBe("The popover is not the firehose");
    expect(firehose?.body).toMatch(/onAny/);
    expect(firehose?.body).toMatch(/flow:start/);
    expect(firehose?.body).toMatch(/flow:skip/);
    expect(firehose?.body).toMatch(/PostHog/);
    expect(firehose?.body).not.toMatch(/PHI/i);
    const gpl = await getEntry("writing", "gpl-is-not-a-codec");
    expect(gpl?.title).toBe("GPL is not a codec");
    expect(gpl?.body).toMatch(/cargo-deny/);
    expect(gpl?.body).toMatch(/avif-parse/);
    expect(gpl?.body).toMatch(/MPL-2\.0/);
    expect(gpl?.body).toMatch(/deny\.toml/);
    expect(gpl?.body).not.toMatch(/PHI/i);
    const writePort = await getEntry("writing", "the-write-port-is-not-the-index");
    expect(writePort?.title).toBe("The write port is not the index");
    expect(writePort?.body).toMatch(/NoteRepository/);
    expect(writePort?.body).toMatch(/ExtendedNoteRepository/);
    expect(writePort?.body).toMatch(/storage-core/);
    expect(writePort?.body).not.toMatch(/PHI/i);
    const abi = await getEntry("writing", "the-abi-is-not-the-domain");
    expect(abi?.title).toBe("The ABI is not the domain");
    expect(abi?.body).toMatch(/better-sqlite3/);
    expect(abi?.body).toMatch(/storage-sqlite/);
    expect(abi?.body).toMatch(/Electron ABI/);
    expect(abi?.body).not.toMatch(/PHI/i);
    const syncCore = await getEntry("writing", "sync-core-is-not-a-sync-engine");
    expect(syncCore?.title).toBe("sync-core is not a sync engine");
    expect(syncCore?.body).toMatch(/validateNotebookTree/);
    expect(syncCore?.body).toMatch(/SyncService/);
    expect(syncCore?.body).toMatch(/needs_sync/);
    expect(syncCore?.body).not.toMatch(/PHI/i);
    const editor = await getEntry("writing", "the-editor-is-not-the-engine");
    expect(editor?.title).toBe("The editor is not the engine");
    expect(editor?.body).toMatch(/criterionx-vscode/);
    expect(editor?.body).toMatch(/does not import/);
    expect(editor?.body).toMatch(/vscode-extension/);
    expect(editor?.body).toMatch(/a-scaffold-is-not-a-decision/);
    expect(editor?.body).not.toMatch(/PHI/i);
    const spec = await getEntry("writing", "a-spec-is-not-a-decision");
    expect(spec?.title).toBe("A spec is not a decision");
    expect(spec?.body).toMatch(/parseDecisionSpec/);
    expect(spec?.body).toMatch(/when: "always"/);
    expect(spec?.body).toMatch(/@criterionx\/generators/);
    expect(spec?.body).not.toMatch(/PHI/i);
    const widget = await getEntry("writing", "the-widget-is-not-a-radar");
    expect(widget?.title).toBe("The widget is not a radar");
    expect(widget?.body).toMatch(/WidgetSnapshot/);
    expect(widget?.body).toMatch(/widget-snapshot\.json/);
    expect(widget?.body).toMatch(/will not run `lsof`/);
    expect(widget?.body).not.toMatch(/devwibar-tls/);
    expect(widget?.body).not.toMatch(/PHI/i);
    const barCli = await getEntry("writing", "the-bar-is-not-the-cli");
    expect(barCli?.title).toBe("The bar is not the CLI");
    expect(barCli?.body).toMatch(/devwifi pass/);
    expect(barCli?.body).toMatch(/localhost:3142/);
    expect(barCli?.body).toMatch(/WIFI:T:WPA/);
    expect(barCli?.body).not.toMatch(/devwibar-tls/);
    expect(barCli?.body).not.toMatch(/PHI/i);
    const dead = await getEntry("writing", "a-dead-rule-is-not-a-ranking");
    expect(dead?.title).toBe("A dead rule is not a ranking");
    expect(dead?.body).toMatch(/detectDeadRules/);
    expect(dead?.body).toMatch(/matchedRule/);
    expect(dead?.body).toMatch(/@criterionx\/testing/);
    expect(dead?.body).not.toMatch(/PHI/i);
    const indexPath = await getEntry("writing", "an-index-is-not-a-path");
    expect(indexPath?.title).toBe("An index is not a path");
    expect(indexPath?.body).toMatch(/hasTeam/);
    expect(indexPath?.body).toMatch(/StepTarget/);
    expect(indexPath?.body).toMatch(/resolveTarget/);
    expect(indexPath?.body).toMatch(/a-run-is-not-a-click/);
    expect(indexPath?.body).not.toMatch(/PHI/i);
    const span = await getEntry("writing", "a-span-is-not-a-reason");
    expect(span?.title).toBe("A span is not a reason");
    expect(span?.body).toMatch(/createTracedEngine/);
    expect(span?.body).toMatch(/recordInput/);
    expect(span?.body).toMatch(/@criterionx\/opentelemetry/);
    expect(span?.body).not.toMatch(/PHI/i);
    const runClick = await getEntry("writing", "a-run-is-not-a-click");
    expect(runClick?.title).toBe("A run is not a click");
    expect(runClick?.body).toMatch(/startRun/);
    expect(runClick?.body).toMatch(/AbortController/);
    expect(runClick?.body).toMatch(/ignored while `running`/);
    expect(runClick?.body).not.toMatch(/PHI/i);
    const lily = await getEntry("writing", "lily58-is-not-a-bigger-corne");
    expect(lily?.title).toBe("A Lily58 is not a bigger Corne");
    expect(lily?.body).toMatch(/Linear whites/);
    expect(lily?.body).toMatch(/qmk compile/);
    expect(lily?.body).toMatch(/\/writing\/lily58\/mcu\.jpg/);
    expect(lily?.body).not.toMatch(/PHI/i);
    const lead = await getEntry("writing", "lead-is-not-a-status-parade");
    expect(lead?.title).toBe("Lead is not a status parade");
    expect(lead?.body).toMatch(/Lead Engineer at/);
    expect(lead?.body).toMatch(/design engineer/);
    expect(lead?.body).toMatch(/What I would not do again/);
    expect(lead?.body).toMatch(/The bar/);
    expect(lead?.body).toMatch(/No patient content on this page/);
    const psynth = await getEntry("work", "psynth");
    expect(psynth?.line).toBe("Clinical reporting. Lead Engineer.");
    expect(psynth?.body).toMatch(/I'm now Lead Engineer/);
    expect(psynth?.body).not.toMatch(/senior full-stack|sole lead/i);
    const scaffold = await getEntry("writing", "a-scaffold-is-not-a-decision");
    expect(scaffold?.title).toBe("A scaffold is not a decision");
    expect(scaffold?.body).toMatch(/criterion new/);
    expect(scaffold?.body).toMatch(/transaction-risk/);
    expect(scaffold?.body).toMatch(/does not import `@criterionx\/core`/);
    expect(scaffold?.body).not.toMatch(/PHI/i);
  });
});

describe("draft files", () => {
  const source = readFileSync(new URL("./site.ts", import.meta.url), "utf8");

  it("builds an MDX file and a site.ts patch without merging", () => {
    const input = draftSchema.parse({
      kind: "writing",
      slug: "test-note",
      title: "A test note",
      line: "Only a draft.",
      date: "2026-08-20",
      body: "A short body.",
    });
    const files = buildDraftFiles(source, input);
    expect(files.map((file) => file.path)).toEqual([
      "content/writing/test-note.mdx",
      "src/lib/site.ts",
    ]);
    const mdx = files[0]?.content ?? "";
    const next = files[1]?.content ?? "";
    expect(mdx).toContain('title: "A test note"');
    expect(mdx).toContain("A short body.");
    expect(next).toContain('slug: "test-note"');
    expect(next).toContain("export const writing = [");
    expect(sourceHasSlug(source, "test-note")).toBe(false);
    expect(draftPrBody(input)).toMatch(/Do not merge/);
  });

  it("patches work and workLanes together", () => {
    const input = draftSchema.parse({
      kind: "work",
      slug: "new-product",
      title: "New Product",
      line: "A draft case.",
      date: "2026-08-21",
      lane: "product",
      href: null,
    });
    const next = buildDraftFiles(source, input).find((file) => file.path === "src/lib/site.ts")?.content ?? "";
    expect(next).toContain('slug: "new-product"');
    expect(next).toContain('"new-product": "product"');
    expect(() => buildDraftFiles(source, { ...input, slug: "dripnex" })).toThrow(/already/);
  });

  it("does not allow drafts without env tokens", () => {
    expect(envAllowsDraft()).toBe(false);
  });

  it("rejects a bad slug", () => {
    expect(draftSchema.safeParse({ kind: "work", slug: "Nope", title: "X", line: "Y", date: "2026-01-01" }).success).toBe(
      false,
    );
  });
});

describe("cv data", () => {
  it("uses professional copy, not site narrative", () => {
    const data = cvData();
    const blob = JSON.stringify(data);
    expect(data.name).toBe("Tomás Maritano");
    expect(data.title).toBe("Lead Engineer");
    expect(data.summary).toMatch(/Psynth/);
    expect(data.education.school).toMatch(/Tecnológica Nacional/);
    expect(data.products.find((item) => item.slug === "quantis-intel")?.href).toBeNull();
    expect(blob).not.toMatch(/extract messy|desk will send|tooltip list|I ship products/i);
    expect(blob).not.toMatch(/PHI/i);
  });
});
