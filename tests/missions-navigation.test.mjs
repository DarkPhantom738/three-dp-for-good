import assert from "node:assert/strict";
import test from "node:test";

const { default: worker } = await import("../dist/server/index.js");

function request(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("missions opens Masonic with photos, audio and links to the other visits", async () => {
  const response = await request("/missions");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Our visit to Masonic Homes/i);
  assert.match(html, /masonic-visit-01\.jpg/);
  assert.match(html, /masonic-fall-risk\.m4a/);
  assert.match(html, /href="\/missions\/bach-mobile-clinic"/);
  assert.match(html, /href="\/missions\/aegis-living"/);
});

test("BACH mission has both clinic photos and the other mission links", async () => {
  const response = await request("/missions/bach-mobile-clinic");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /bach-mobile-clinic-01\.jpg/);
  assert.match(html, /bach-mobile-clinic-02\.jpg/);
  assert.match(html, /href="\/missions"/);
  assert.match(html, /href="\/missions\/aegis-living"/);
});

test("the old BACH article redirects to its mission", async () => {
  const response = await request("/articles/bach-mobile-clinic");
  assert.ok([301, 302, 307, 308].includes(response.status));
  assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, "/missions/bach-mobile-clinic");
});

test("Articles keeps the interviews after BACH moves to Missions", async () => {
  const response = await request("/articles");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /href="\/articles\/masonic-homes"/);
  assert.match(html, /href="\/articles\/aegis-living"/);
  assert.doesNotMatch(html, /href="\/articles\/bach-mobile-clinic"/);
});
