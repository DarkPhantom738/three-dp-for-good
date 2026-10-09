import assert from "node:assert/strict";
import { access } from "node:fs/promises";
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

test("server-renders the homepage with its mission and impact collage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>3DP for Good \| Tools for more independent care<\/title>/i);
  assert.match(html, /3DP FOR GOOD/);
  assert.match(html, /Make/);
  assert.match(html, /Make more possible\./);
  assert.match(html, /We make and donate everyday assistive tools/);
  assert.match(html, /masonic-visit-03\.jpg/);
  assert.match(html, /class-workshop-01\.jpg/);
  assert.match(html, /objects printed/);
  assert.match(html, /hours taught/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("ships the photos, logos, and original model previews", async () => {
  const assets = [
    "../public/assets/bach-logo.png",
    "../public/assets/masonic-visit-03.jpg",
    "../public/assets/class-workshop-01.jpg",
    "../public/assets/ohlone-cad-club.png",
    "../public/assets/kaavin-prasanna.png",
    "../public/assets/dr-ramchandani.png",
    "../public/assets/button-hook-zipper-pull.stl",
    "../public/assets/book-page-holder.stl",
  ];

  await Promise.all(assets.map((asset) => access(new URL(asset, import.meta.url))));
});
