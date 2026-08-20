export type GithubFile = {
  path: string;
  content: string;
};

export type OpenPrInput = {
  files: GithubFile[];
  branch: string;
  title: string;
  body: string;
};

type GithubRef = { object: { sha: string } };
type GithubRepo = { default_branch: string };
type GithubPull = { html_url: string; number: number };

function repoSlug() {
  return process.env.GITHUB_REPO ?? "tomymaritano/portfolio";
}

function token() {
  const value = process.env.GITHUB_TOKEN;
  if (!value) throw new Error("GITHUB_TOKEN missing");
  return value;
}

async function gh<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token()}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub ${response.status} ${path}: ${text.slice(0, 400)}`);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function readGithubFile(path: string, ref?: string) {
  const repo = repoSlug();
  const query = ref ? `?ref=${encodeURIComponent(ref)}` : "";
  const file = await gh<{ content: string; encoding: string }>(
    `/repos/${repo}/contents/${path}${query}`,
  );
  if (file.encoding !== "base64") throw new Error(`unexpected encoding for ${path}`);
  return Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
}

export async function openContentPr({ files, branch, title, body }: OpenPrInput) {
  const repo = repoSlug();
  const { default_branch } = await gh<GithubRepo>(`/repos/${repo}`);
  const head = await gh<GithubRef>(`/repos/${repo}/git/ref/heads/${default_branch}`);

  await gh(`/repos/${repo}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: head.object.sha }),
  });

  for (const file of files) {
    await gh(`/repos/${repo}/contents/${file.path}`, {
      method: "PUT",
      body: JSON.stringify({
        message: title,
        content: Buffer.from(file.content, "utf8").toString("base64"),
        branch,
      }),
    });
  }

  const pull = await gh<GithubPull>(`/repos/${repo}/pulls`, {
    method: "POST",
    body: JSON.stringify({
      title,
      head: branch,
      base: default_branch,
      body,
    }),
  });

  return { url: pull.html_url, number: pull.number, branch, base: default_branch };
}
