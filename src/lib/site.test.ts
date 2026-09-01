import { describe, expect, it } from "vitest";
import {
  homeMeta,
  homeSlugs,
  homeWork,
  isHomeSlug,
  site,
  work,
  workBySlug,
  workIndex,
  workLanes,
  workForNote,
  workNotes,
  workNeighbors,
  workSections,
  writingBySlug,
  writingIndex,
  writingNeighbors,
} from "./site";

describe("site", () => {
  it("has public links", () => {
    expect(site.x.startsWith("https://x.com/")).toBe(true);
    expect(site.email.includes("@")).toBe(true);
    expect(site.linkedin.includes("linkedin.com")).toBe(true);
    expect(site.github.includes("github.com")).toBe(true);
    expect(site.url).toBe("https://tomymaritano.com");
    expect(site.about.length).toBeGreaterThanOrEqual(3);
    expect(site.about[0]).not.toMatch(/^I started building/i);
    expect(site.about[0]).not.toMatch(/^I was twelve/i);
    expect(site.about[0]).toMatch(/document|generat|Psynth/i);
    expect(site.about[0]).toMatch(/I'm Lead Engineer at Psynth/);
    expect(site.about[0]).toMatch(/I joined as a design engineer/);
    expect(site.about[0]).not.toMatch(/senior full-stack|sole lead/i);
    expect(site.contributions.find((item) => item.title === "Psynth")?.lead).toBe("Lead Engineer at ");
    expect(site.line).toMatch(/extract/i);
    expect(site.about.join(" ")).toMatch(/twelve|12/i);
    expect(site.about.join(" ")).toMatch(/CMS/i);
    expect(site.contributions.length).toBeGreaterThanOrEqual(4);
    const stack = site.stack.flatMap((row) => row.items);
    expect(stack).toEqual(
      expect.arrayContaining([
        "TypeScript",
        "React",
        "Python",
        "Rust",
        "Lua",
        "C#",
        "AWS",
        "Kubernetes",
        "Terraform",
        "ArgoCD",
        "Tailwind",
        "Vercel",
        "SQLite",
        "QMK",
        "Three.js",
        "Sanity",
      ]),
    );
    expect(stack).not.toEqual(expect.arrayContaining(["Vue.js", "Nuxt"]));
  });

  it("indexes published work and writing", () => {
    expect(workBySlug("dripnex")?.title).toBe("Dripnex");
    expect(workBySlug("dripnex")?.href).toBe("https://dripnex.app");
    expect(workBySlug("dripnex")?.line).toBe("Hackable AI note taker. SQLite now, sync next.");
    expect(workBySlug("dripnex")?.line).not.toMatch(/the file is the note/i);
    expect(site.contributions[0]?.title).toBe("Dripnex");
    expect(site.contributions[0]?.tail).toMatch(/hackable AI note taker/i);
    expect(workBySlug("psynth")?.title).toBe("Psynth");
    expect(workBySlug("psynth")?.line).toBe("Clinical reporting. Lead Engineer.");
    expect(workBySlug("readied")?.href).toBe("https://readied.app");
    expect(workBySlug("cairn")?.repo?.includes("github.com")).toBe(true);
    expect(workBySlug("minipix")?.title).toBe("Minipix");
    expect(workBySlug("minipix")?.href).toBeNull();
    expect(workBySlug("minipix")?.repo).toBe("https://github.com/tomymaritano/minipix");
    expect(workBySlug("criterionx")?.repo?.includes("github.com")).toBe(true);
    expect(workBySlug("readied")?.repo?.includes("github.com")).toBe(true);
    expect(workBySlug("missing")).toBeNull();
    expect(writingBySlug("claude-code-pm")?.date).toBe("2025-10-03");
    expect(workBySlug("devwifi")?.title).toBe("DevWifiBar");
    expect(workBySlug("devwifi")?.repo).toBe("https://github.com/tomymaritano/devwibar");
    expect(writingBySlug("devwibar-tls")).toBeNull();
    expect(writingBySlug("the-radio-is-fine")?.title).toBe("The radio is fine");
    expect(writingBySlug("the-radio-is-fine")?.date).toBe("2026-08-21");
    expect(writingBySlug("the-plugin-is-a-git-repo")?.title).toBe("The plugin is a git repo");
    expect(writingBySlug("the-plugin-is-a-git-repo")?.date).toBe("2026-08-19");
    expect(writingBySlug("the-quote-is-not-the-product")?.title).toBe("The quote is not the product");
    expect(writingBySlug("the-quote-is-not-the-product")?.date).toBe("2025-08-15");
    expect(writingBySlug("the-file-has-to-stay-readable")?.title).toBe("The file has to stay readable");
    expect(writingBySlug("the-file-has-to-stay-readable")?.date).toBe("2026-03-02");
    expect(writingBySlug("grok-bot-and-cursor")?.title).toBe("Grok 4.6 in Cursor is not Grok Bot");
    expect(writingBySlug("corne-keyboard")?.title).toBe("A Corne is a 42-key contract");
    expect(writingBySlug("lead-is-not-a-status-parade")?.title).toBe("Lead is not a status parade");
    expect(writingBySlug("lead-is-not-a-status-parade")?.date).toBe("2026-08-31");
    expect(writingBySlug("lead-is-not-a-status-parade")?.line).toMatch(/Standup closes the day/i);
    expect(writingBySlug("lily58-is-not-a-bigger-corne")?.title).toBe("A Lily58 is not a bigger Corne");
    expect(writingBySlug("lily58-is-not-a-bigger-corne")?.date).toBe("2026-08-28");
    expect(writingBySlug("lily58-is-not-a-bigger-corne")?.line).toMatch(/Linear whites/i);
    expect(writingBySlug("engine-is-not-the-renderer")?.title).toBe("The engine is not the renderer");
    expect(writingBySlug("if-you-cannot-show-why")?.title).toBe("If you cannot show why, it is not a decision");
    expect(writingBySlug("byte-identical")?.title).toBe("Byte-identical or it did not ship");
    expect(writingBySlug("sqlite-is-the-store")?.title).toBe("Plain files are easy to romanticize");
    expect(writingBySlug("the-file-is-the-export")?.title).toBe("The file is the export");
    expect(writingBySlug("the-file-is-the-export")?.date).toBe("2026-08-26");
    expect(writingBySlug("the-renderer-never-sees-sql")?.title).toBe("The renderer never sees SQL");
    expect(writingBySlug("the-renderer-never-sees-sql")?.date).toBe("2026-08-27");
    expect(writingBySlug("signing-in-is-not-uploading")?.title).toBe("Signing in is not uploading");
    expect(writingBySlug("signing-in-is-not-uploading")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-hack-is-not-a-pack")?.title).toBe("A hack is not a pack");
    expect(writingBySlug("a-hack-is-not-a-pack")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-recalc-is-not-a-new-ingest")?.title).toBe("A recalc is not a new ingest");
    expect(writingBySlug("a-recalc-is-not-a-new-ingest")?.date).toBe("2026-08-28");
    expect(writingBySlug("ssid-is-not-free")?.title).toBe("SSID is not free");
    expect(writingBySlug("ssid-is-not-free")?.date).toBe("2026-08-28");
    expect(writingBySlug("tags-are-not-the-body")?.title).toBe("Tags are not the body");
    expect(writingBySlug("tags-are-not-the-body")?.date).toBe("2026-08-28");
    expect(writingBySlug("search-is-local")?.title).toBe("Search is local");
    expect(writingBySlug("search-is-local")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-backlink-is-not-a-copy")?.title).toBe("A backlink is not a copy");
    expect(writingBySlug("a-backlink-is-not-a-copy")?.date).toBe("2026-08-28");
    expect(writingBySlug("default-is-not-a-palette")?.title).toBe("Default is not a palette");
    expect(writingBySlug("default-is-not-a-palette")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-checkbox-is-not-a-row")?.title).toBe("A checkbox is not a row");
    expect(writingBySlug("a-checkbox-is-not-a-row")?.date).toBe("2026-08-28");
    expect(writingBySlug("the-preview-is-not-the-file")?.title).toBe("The preview is not the file");
    expect(writingBySlug("the-preview-is-not-the-file")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-reload-is-not-a-restart")?.title).toBe("A reload is not a restart");
    expect(writingBySlug("a-reload-is-not-a-restart")?.date).toBe("2026-08-28");
    expect(writingBySlug("first-match-wins")?.title).toBe("First match wins");
    expect(writingBySlug("first-match-wins")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-profile-is-not-a-fork")?.title).toBe("A profile is not a fork");
    expect(writingBySlug("a-profile-is-not-a-fork")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-scaffold-is-not-a-decision")?.title).toBe("A scaffold is not a decision");
    expect(writingBySlug("a-scaffold-is-not-a-decision")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-run-is-not-a-click")?.title).toBe("A run is not a click");
    expect(writingBySlug("a-run-is-not-a-click")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-span-is-not-a-reason")?.title).toBe("A span is not a reason");
    expect(writingBySlug("a-span-is-not-a-reason")?.date).toBe("2026-08-28");
    expect(writingBySlug("an-index-is-not-a-path")?.title).toBe("An index is not a path");
    expect(writingBySlug("an-index-is-not-a-path")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-dead-rule-is-not-a-ranking")?.title).toBe("A dead rule is not a ranking");
    expect(writingBySlug("a-dead-rule-is-not-a-ranking")?.date).toBe("2026-08-28");
    expect(writingBySlug("the-bar-is-not-the-cli")?.title).toBe("The bar is not the CLI");
    expect(writingBySlug("the-bar-is-not-the-cli")?.date).toBe("2026-08-28");
    expect(writingBySlug("the-widget-is-not-a-radar")?.title).toBe("The widget is not a radar");
    expect(writingBySlug("the-widget-is-not-a-radar")?.date).toBe("2026-08-28");
    expect(writingBySlug("a-spec-is-not-a-decision")?.title).toBe("A spec is not a decision");
    expect(writingBySlug("a-spec-is-not-a-decision")?.date).toBe("2026-08-28");
    expect(writingBySlug("the-editor-is-not-the-engine")?.title).toBe("The editor is not the engine");
    expect(writingBySlug("the-editor-is-not-the-engine")?.date).toBe("2026-08-28");
    expect(writingBySlug("sync-core-is-not-a-sync-engine")?.title).toBe("sync-core is not a sync engine");
    expect(writingBySlug("sync-core-is-not-a-sync-engine")?.date).toBe("2026-08-28");
    expect(writingBySlug("the-abi-is-not-the-domain")?.title).toBe("The ABI is not the domain");
    expect(writingBySlug("the-abi-is-not-the-domain")?.date).toBe("2026-08-28");
    expect(writingBySlug("the-write-port-is-not-the-index")?.title).toBe("The write port is not the index");
    expect(writingBySlug("the-write-port-is-not-the-index")?.date).toBe("2026-08-28");
    expect(writingBySlug("gpl-is-not-a-codec")?.title).toBe("GPL is not a codec");
    expect(writingBySlug("gpl-is-not-a-codec")?.date).toBe("2026-08-28");
    expect(writingBySlug("the-popover-is-not-the-firehose")?.title).toBe("The popover is not the firehose");
    expect(writingBySlug("the-popover-is-not-the-firehose")?.date).toBe("2026-08-28");
    expect(writingBySlug("an-extension-is-not-a-fork")?.title).toBe("An extension is not a fork");
    expect(writingBySlug("an-extension-is-not-a-fork")?.date).toBe("2026-08-28");
    expect(writingBySlug("wasm-is-not-native")?.title).toBe("Wasm is not native");
    expect(writingBySlug("wasm-is-not-native")?.date).toBe("2026-08-28");
    expect(writingBySlug("packages-are-not-a-platform")?.title).toBe("Packages are not a platform");
    expect(writingBySlug("packages-are-not-a-platform")?.date).toBe("2026-08-28");
    expect(writingBySlug("the-core-has-no-clock")?.title).toBe("The core has no clock");
    expect(writingBySlug("the-core-has-no-clock")?.date).toBe("2026-08-28");
    expect(writingBySlug("grok-bot-and-cursor")?.date).toBe("2026-08-20");
    expect(writingBySlug("corne-keyboard")?.date).toBe("2026-08-20");
    expect(work.some((item) => item.slug === "dolargaucho")).toBe(true);
    expect(work.map((item) => item.slug)).toEqual(
      expect.arrayContaining(["unicoin", "billspace", "grandvalira-sede", "freedom-people", "jetsetz"]),
    );
  });

  it("keeps work and writing on separate indexes", () => {
    const projects = workIndex();
    const notes = writingIndex();
    expect(projects.every((item) => item.kind === "work")).toBe(true);
    expect(notes.every((item) => item.kind === "writing")).toBe(true);
    expect(projects[0]?.slug).toBe("devwifi");
    expect(projects.map((item) => item.slug)).toContain("criterionx");
    expect(projects.map((item) => item.slug)).not.toContain("claude-code-pm");
    expect(homeWork().map((item) => item.slug)).toEqual(["psynth", "dripnex", "dolargaucho", "quantis-intel"]);
    expect(workBySlug("quantis-intel")?.line).toBe("The financial report a desk will send.");
    expect(notes[0]?.slug).toBe("lead-is-not-a-status-parade");
    expect(notes.map((item) => item.slug)).toContain("a-scaffold-is-not-a-decision");
    expect(notes.map((item) => item.slug)).toContain("a-run-is-not-a-click");
    expect(notes.map((item) => item.slug)).toContain("a-span-is-not-a-reason");
    expect(notes.map((item) => item.slug)).toContain("an-index-is-not-a-path");
    expect(notes.map((item) => item.slug)).toContain("a-dead-rule-is-not-a-ranking");
    expect(notes.map((item) => item.slug)).toContain("the-bar-is-not-the-cli");
    expect(notes.map((item) => item.slug)).toContain("the-widget-is-not-a-radar");
    expect(notes.map((item) => item.slug)).toContain("a-spec-is-not-a-decision");
    expect(notes.map((item) => item.slug)).toContain("the-editor-is-not-the-engine");
    expect(notes.map((item) => item.slug)).toContain("sync-core-is-not-a-sync-engine");
    expect(notes.map((item) => item.slug)).toContain("the-abi-is-not-the-domain");
    expect(notes.map((item) => item.slug)).toContain("the-write-port-is-not-the-index");
    expect(notes.map((item) => item.slug)).toContain("gpl-is-not-a-codec");
    expect(notes.map((item) => item.slug)).toContain("the-popover-is-not-the-firehose");
    expect(notes.map((item) => item.slug)).toContain("an-extension-is-not-a-fork");
    expect(notes.map((item) => item.slug)).toContain("wasm-is-not-native");
    expect(notes.map((item) => item.slug)).toContain("packages-are-not-a-platform");
    expect(notes.map((item) => item.slug)).toContain("the-core-has-no-clock");
    expect(notes.map((item) => item.slug)).toContain("a-profile-is-not-a-fork");
    expect(notes.map((item) => item.slug)).toContain("first-match-wins");
    expect(notes.map((item) => item.slug)).toContain("a-reload-is-not-a-restart");
    expect(notes.map((item) => item.slug)).toContain("the-preview-is-not-the-file");
    expect(notes.map((item) => item.slug)).toContain("a-checkbox-is-not-a-row");
    expect(notes.map((item) => item.slug)).toContain("default-is-not-a-palette");
    expect(notes.map((item) => item.slug)).toContain("a-backlink-is-not-a-copy");
    expect(notes.map((item) => item.slug)).toContain("search-is-local");
    expect(notes.map((item) => item.slug)).toContain("tags-are-not-the-body");
    expect(notes.map((item) => item.slug)).toContain("ssid-is-not-free");
    expect(notes.map((item) => item.slug)).toContain("a-recalc-is-not-a-new-ingest");
    expect(notes.map((item) => item.slug)).toContain("a-hack-is-not-a-pack");
    expect(notes.map((item) => item.slug)).toContain("signing-in-is-not-uploading");
    expect(notes.map((item) => item.slug)).toContain("the-renderer-never-sees-sql");
    expect(notes.map((item) => item.slug)).toContain("the-file-is-the-export");
    expect(notes.map((item) => item.slug)).toContain("the-note-came-first");
    expect(workLanes.devwifi).toBe("product");
    expect(notes.map((item) => item.slug)).toContain("section-generation-pipeline");
    expect(notes.map((item) => item.slug)).toEqual(
      expect.arrayContaining([
        "engine-is-not-the-renderer",
        "if-you-cannot-show-why",
        "byte-identical",
        "sqlite-is-the-store",
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
        "a-scaffold-is-not-a-decision",
        "lily58-is-not-a-bigger-corne",
        "lead-is-not-a-status-parade",
      ]),
    );
    expect(workLanes.dripnex).toBe("product");
    expect(workLanes.unicoin).toBe("role");
    expect(workLanes.billspace).toBe("client");
    expect(workSections().map((section) => section.lane)).toEqual(["product", "role", "client"]);
  });

  it("keeps the four spine products on /work selected, not in archive", () => {
    expect([...homeSlugs]).toEqual(["psynth", "dripnex", "dolargaucho", "quantis-intel"]);
    expect(homeMeta.psynth.role).toBe("Lead Engineer");
    expect(homeWork().map((item) => item.slug)).toEqual([...homeSlugs]);
    expect(isHomeSlug("dripnex")).toBe(true);
    expect(isHomeSlug("readied")).toBe(false);
    expect(homeWork().every((item) => item.cover || item.stills.length > 0)).toBe(true);

    const archive = workSections().flatMap((section) => section.items.map((item) => item.slug));
    expect(archive).not.toEqual(expect.arrayContaining([...homeSlugs]));
    expect(archive).toContain("readied");
    expect(archive).toContain("minipix");
    expect(archive).toContain("devwifi");
    expect(archive).toContain("unicoin");
    expect(archive).toContain("billspace");

    const products = workSections().find((section) => section.lane === "product")?.items.map((item) => item.slug) ?? [];
    expect(products[0]).toBe("devwifi");
    expect(products).not.toContain("psynth");
    expect(products).not.toContain("dripnex");
  });

  it("links cases to the notes that explain them", () => {
    expect(workNotes.psynth).toBe("section-generation-pipeline");
    expect(workNotes.cairn).toBe("engine-is-not-the-renderer");
    expect(workNotes.minipix).toBe("byte-identical");
    expect(workNotes.criterionx).toBe("if-you-cannot-show-why");
    expect(workNotes.dripnex).toBe("sqlite-is-the-store");
    expect(workNotes.devwifi).toBe("the-radio-is-fine");
    expect(workNotes.dolargaucho).toBe("the-quote-is-not-the-product");
    expect(workNotes.readied).toBe("the-file-has-to-stay-readable");
    expect(workForNote("lead-is-not-a-status-parade")?.slug).toBe("psynth");
    expect(workForNote("the-file-has-to-stay-readable")?.slug).toBe("readied");
    expect(workForNote("the-quote-is-not-the-product")?.slug).toBe("dolargaucho");
    expect(workForNote("the-radio-is-fine")?.slug).toBe("devwifi");
    expect(workForNote("sqlite-is-the-store")?.slug).toBe("dripnex");
    expect(workForNote("the-file-is-the-export")?.slug).toBe("dripnex");
    expect(workForNote("a-scaffold-is-not-a-decision")?.slug).toBe("criterionx");
    expect(workForNote("an-index-is-not-a-path")?.slug).toBe("cairn");
    expect(workForNote("byte-identical")?.slug).toBe("minipix");
    expect(workForNote("wasm-is-not-native")?.slug).toBe("minipix");
    expect(workForNote("gpl-is-not-a-codec")?.slug).toBe("minipix");
    expect(workForNote("the-widget-is-not-a-radar")?.slug).toBe("devwifi");
    expect(workForNote("a-recalc-is-not-a-new-ingest")?.slug).toBe("dolargaucho");
    expect(workForNote("grok-bot-and-cursor")).toBeNull();
    expect(workForNote("missing")).toBeNull();
  });

  it("walks writing and work in date order", () => {
    expect(writingNeighbors("lead-is-not-a-status-parade").newer).toBeNull();
    expect(writingNeighbors("lead-is-not-a-status-parade").older?.slug).toBe("lily58-is-not-a-bigger-corne");
    expect(writingNeighbors("lily58-is-not-a-bigger-corne").newer?.slug).toBe("lead-is-not-a-status-parade");
    expect(writingNeighbors("lily58-is-not-a-bigger-corne").older?.slug).toBe("a-scaffold-is-not-a-decision");
    expect(writingNeighbors("a-scaffold-is-not-a-decision").newer?.slug).toBe("lily58-is-not-a-bigger-corne");
    expect(writingNeighbors("a-scaffold-is-not-a-decision").older?.slug).toBe("a-run-is-not-a-click");
    expect(writingNeighbors("a-run-is-not-a-click").newer?.slug).toBe("a-scaffold-is-not-a-decision");
    expect(writingNeighbors("a-run-is-not-a-click").older?.slug).toBe("a-span-is-not-a-reason");
    expect(writingNeighbors("a-span-is-not-a-reason").newer?.slug).toBe("a-run-is-not-a-click");
    expect(writingNeighbors("a-span-is-not-a-reason").older?.slug).toBe("an-index-is-not-a-path");
    expect(writingNeighbors("an-index-is-not-a-path").newer?.slug).toBe("a-span-is-not-a-reason");
    expect(writingNeighbors("an-index-is-not-a-path").older?.slug).toBe("a-dead-rule-is-not-a-ranking");
    expect(writingNeighbors("a-dead-rule-is-not-a-ranking").newer?.slug).toBe("an-index-is-not-a-path");
    expect(writingNeighbors("a-dead-rule-is-not-a-ranking").older?.slug).toBe("the-bar-is-not-the-cli");
    expect(writingNeighbors("the-bar-is-not-the-cli").newer?.slug).toBe("a-dead-rule-is-not-a-ranking");
    expect(writingNeighbors("the-bar-is-not-the-cli").older?.slug).toBe("the-widget-is-not-a-radar");
    expect(writingNeighbors("the-widget-is-not-a-radar").newer?.slug).toBe("the-bar-is-not-the-cli");
    expect(writingNeighbors("the-widget-is-not-a-radar").older?.slug).toBe("a-spec-is-not-a-decision");
    expect(writingNeighbors("a-spec-is-not-a-decision").newer?.slug).toBe("the-widget-is-not-a-radar");
    expect(writingNeighbors("a-spec-is-not-a-decision").older?.slug).toBe("the-editor-is-not-the-engine");
    expect(writingNeighbors("the-editor-is-not-the-engine").newer?.slug).toBe("a-spec-is-not-a-decision");
    expect(writingNeighbors("the-editor-is-not-the-engine").older?.slug).toBe("sync-core-is-not-a-sync-engine");
    expect(writingNeighbors("sync-core-is-not-a-sync-engine").newer?.slug).toBe("the-editor-is-not-the-engine");
    expect(writingNeighbors("sync-core-is-not-a-sync-engine").older?.slug).toBe("the-abi-is-not-the-domain");
    expect(writingNeighbors("the-abi-is-not-the-domain").newer?.slug).toBe("sync-core-is-not-a-sync-engine");
    expect(writingNeighbors("the-abi-is-not-the-domain").older?.slug).toBe("the-write-port-is-not-the-index");
    expect(writingNeighbors("the-write-port-is-not-the-index").newer?.slug).toBe("the-abi-is-not-the-domain");
    expect(writingNeighbors("the-write-port-is-not-the-index").older?.slug).toBe("gpl-is-not-a-codec");
    expect(writingNeighbors("gpl-is-not-a-codec").newer?.slug).toBe("the-write-port-is-not-the-index");
    expect(writingNeighbors("gpl-is-not-a-codec").older?.slug).toBe("the-popover-is-not-the-firehose");
    expect(writingNeighbors("the-popover-is-not-the-firehose").newer?.slug).toBe("gpl-is-not-a-codec");
    expect(writingNeighbors("the-popover-is-not-the-firehose").older?.slug).toBe("an-extension-is-not-a-fork");
    expect(writingNeighbors("an-extension-is-not-a-fork").newer?.slug).toBe("the-popover-is-not-the-firehose");
    expect(writingNeighbors("an-extension-is-not-a-fork").older?.slug).toBe("wasm-is-not-native");
    expect(writingNeighbors("wasm-is-not-native").newer?.slug).toBe("an-extension-is-not-a-fork");
    expect(writingNeighbors("wasm-is-not-native").older?.slug).toBe("packages-are-not-a-platform");
    expect(writingNeighbors("packages-are-not-a-platform").newer?.slug).toBe("wasm-is-not-native");
    expect(writingNeighbors("packages-are-not-a-platform").older?.slug).toBe("the-core-has-no-clock");
    expect(writingNeighbors("the-core-has-no-clock").newer?.slug).toBe("packages-are-not-a-platform");
    expect(writingNeighbors("the-core-has-no-clock").older?.slug).toBe("a-profile-is-not-a-fork");
    expect(writingNeighbors("a-profile-is-not-a-fork").newer?.slug).toBe("the-core-has-no-clock");
    expect(writingNeighbors("a-profile-is-not-a-fork").older?.slug).toBe("first-match-wins");
    expect(writingNeighbors("first-match-wins").newer?.slug).toBe("a-profile-is-not-a-fork");
    expect(writingNeighbors("first-match-wins").older?.slug).toBe("a-reload-is-not-a-restart");
    expect(writingNeighbors("a-reload-is-not-a-restart").newer?.slug).toBe("first-match-wins");
    expect(writingNeighbors("a-reload-is-not-a-restart").older?.slug).toBe("the-preview-is-not-the-file");
    expect(writingNeighbors("the-preview-is-not-the-file").newer?.slug).toBe("a-reload-is-not-a-restart");
    expect(writingNeighbors("the-preview-is-not-the-file").older?.slug).toBe("a-checkbox-is-not-a-row");
    expect(writingNeighbors("a-checkbox-is-not-a-row").newer?.slug).toBe("the-preview-is-not-the-file");
    expect(writingNeighbors("a-checkbox-is-not-a-row").older?.slug).toBe("default-is-not-a-palette");
    expect(writingNeighbors("default-is-not-a-palette").newer?.slug).toBe("a-checkbox-is-not-a-row");
    expect(writingNeighbors("default-is-not-a-palette").older?.slug).toBe("a-backlink-is-not-a-copy");
    expect(writingNeighbors("a-backlink-is-not-a-copy").newer?.slug).toBe("default-is-not-a-palette");
    expect(writingNeighbors("a-backlink-is-not-a-copy").older?.slug).toBe("search-is-local");
    expect(writingNeighbors("search-is-local").newer?.slug).toBe("a-backlink-is-not-a-copy");
    expect(writingNeighbors("search-is-local").older?.slug).toBe("tags-are-not-the-body");
    expect(writingNeighbors("tags-are-not-the-body").newer?.slug).toBe("search-is-local");
    expect(writingNeighbors("tags-are-not-the-body").older?.slug).toBe("ssid-is-not-free");
    expect(writingNeighbors("ssid-is-not-free").newer?.slug).toBe("tags-are-not-the-body");
    expect(writingNeighbors("ssid-is-not-free").older?.slug).toBe("a-recalc-is-not-a-new-ingest");
    expect(writingNeighbors("a-recalc-is-not-a-new-ingest").newer?.slug).toBe("ssid-is-not-free");
    expect(writingNeighbors("a-recalc-is-not-a-new-ingest").older?.slug).toBe("a-hack-is-not-a-pack");
    expect(writingNeighbors("a-hack-is-not-a-pack").newer?.slug).toBe("a-recalc-is-not-a-new-ingest");
    expect(writingNeighbors("a-hack-is-not-a-pack").older?.slug).toBe("signing-in-is-not-uploading");
    expect(writingNeighbors("signing-in-is-not-uploading").newer?.slug).toBe("a-hack-is-not-a-pack");
    expect(writingNeighbors("signing-in-is-not-uploading").older?.slug).toBe("the-renderer-never-sees-sql");
    expect(writingNeighbors("the-renderer-never-sees-sql").newer?.slug).toBe("signing-in-is-not-uploading");
    expect(writingNeighbors("the-renderer-never-sees-sql").older?.slug).toBe("the-file-is-the-export");
    expect(writingNeighbors("the-file-is-the-export").newer?.slug).toBe("the-renderer-never-sees-sql");
    expect(writingNeighbors("the-file-is-the-export").older?.slug).toBe("the-note-came-first");
    expect(writingNeighbors("the-note-came-first").newer?.slug).toBe("the-file-is-the-export");
    expect(writingNeighbors("the-note-came-first").older?.slug).toBe("the-radio-is-fine");
    expect(writingNeighbors("the-radio-is-fine").older?.slug).toBe("grok-bot-and-cursor");
    expect(writingNeighbors("missing")).toEqual({ newer: null, older: null });
    expect(workNeighbors("devwifi").newer).toBeNull();
    expect(workNeighbors("devwifi").older?.slug).toBe("dripnex");
  });
});
