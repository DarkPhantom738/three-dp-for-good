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

async function renderedPage(path) {
  const response = await request(path);
  assert.equal(response.status, 200);
  // Avoid counting serialized React payloads as visible content.
  return (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function assertOnlyMissionLinks(html) {
  const links = [...html.matchAll(/href="(\/missions(?:\/[^"?#]*)?)"/g)].map((match) => match[1]);
  assert.deepEqual([...new Set(links)].sort(), ["/missions", "/missions/bach-mobile-clinic"]);
  assert.doesNotMatch(html, /aegis-living|aegis-visit\.jpg|Aegis Living/i);
}

test("Masonic mission restores the original three paragraphs and five-photo gallery", async () => {
  const html = await renderedPage("/missions");
  assert.match(html, /Our visit to Masonic Homes/i);
  const story = html.match(/<[^>]+class="[^"]*\bmission-visit-copy\b[^"]*"[^>]*>([\s\S]*?)<\/(?:article|div|section)>/);
  assert.ok(story, "Masonic visit story is rendered");
  const paragraphs = [...story[1].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map((match) => match[1]);
  assert.deepEqual(paragraphs, [
    "On September 29, our team brought 3D-printed button hooks and book page holders to Masonic Homes of California’s Union City campus.",
    "Residents tried the tools and took some home. The button hooks help guide buttons through buttonholes, and the page holders keep a book open while reading.",
    "Thank you to the residents and staff who spent time with us. We enjoyed the visit and would love to come back.",
  ]);
  const gallery = html.match(/<section\b[^>]*aria-label="Photos from our Masonic Homes visit"[^>]*>([\s\S]*?)<\/section>/);
  assert.ok(gallery, "Masonic visit gallery is rendered");
  const images = [...gallery[1].matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(images, [1, 2, 3, 4, 5].map((number) => `/assets/masonic-visit-0${number}.jpg`));
  assert.doesNotMatch(html, /Jennifer|<audio\b|<blockquote\b|masonic-[^"<> ]+\.m4a|Whenever the residents are reaching down/i);
  assertOnlyMissionLinks(html);
});

test("BACH mission keeps both clinic photos and links back to Masonic", async () => {
  const html = await renderedPage("/missions/bach-mobile-clinic");
  assert.match(html, /<img\b[^>]*src="\/assets\/bach-mobile-clinic-01\.jpg"/);
  assert.match(html, /<img\b[^>]*src="\/assets\/bach-mobile-clinic-02\.jpg"/);
  assertOnlyMissionLinks(html);
});

test("the old Aegis mission redirects to its article", async () => {
  const response = await request("/missions/aegis-living");
  assert.ok([301, 302, 307, 308].includes(response.status));
  assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, "/articles/aegis-living");
});

test("the old BACH article redirects to its mission", async () => {
  const response = await request("/articles/bach-mobile-clinic");
  assert.ok([301, 302, 307, 308].includes(response.status));
  assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, "/missions/bach-mobile-clinic");
});

test("Masonic article keeps Jennifer’s interview and all three audio clips", async () => {
  const html = await renderedPage("/articles/masonic-homes");
  assert.match(html, /Interview with Jennifer Macrae/);
  assert.match(html, /Whenever the residents are reaching down/);
  assert.equal([...html.matchAll(/<audio\b/g)].length, 3);
  for (const clip of ["fall-risk", "memory-care", "buttons"]) {
    assert.ok(html.includes(`src="/assets/masonic-${clip}.m4a"`));
  }
});

test("Articles lists exactly the Masonic and Aegis interviews", async () => {
  const html = await renderedPage("/articles");
  const links = [...html.matchAll(/href="(\/articles\/[^"?#]+)"/g)].map((match) => match[1]);
  assert.deepEqual(links.sort(), ["/articles/aegis-living", "/articles/masonic-homes"]);
  assert.doesNotMatch(html, /bach-mobile-clinic/);
});
