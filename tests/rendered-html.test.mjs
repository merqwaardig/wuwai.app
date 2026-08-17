import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Wuwai journey", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Wuwai \| Be You<\/title>/i);
  assert.match(html, /Alles zit al in je, laat het samenwerken\./);
  assert.match(html, /Groei in energie, balans en bewustzijn\./);
  assert.equal((html.match(/class="story-section/g) ?? []).length, 9);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("renders working navigation and signup fallbacks", async () => {
  const html = await (await render()).text();
  const stepIds = [
    "fundament",
    "voeding-zorg",
    "wilskracht",
    "liefde-verbinding",
    "communicatie",
    "intuitie",
    "spiritualiteit",
  ];

  for (const id of stepIds) {
    assert.match(html, new RegExp(`href="#${id}"`));
    assert.match(html, new RegExp(`id="${id}"`));
  }

  assert.ok((html.match(/href="#signup"/g) ?? []).length >= 2);
  assert.match(html, /<form[^>]*>/);
  assert.match(html, /name="name"/);
  assert.match(html, /name="email"/);
});
