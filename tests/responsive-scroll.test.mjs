import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

function rule(selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]+)\\}`))?.[1] ?? "";
}

test("full-page views grow with their content instead of clipping it", () => {
  for (const selector of [".tab-page", ".home-page"]) {
    const declarations = rule(selector);
    assert.match(declarations, /height:\s*auto/);
    assert.match(declarations, /overflow:\s*visible/);
    assert.doesNotMatch(declarations, /overflow:\s*hidden/);
  }
});

test("interactive models preserve vertical touch scrolling", () => {
  assert.match(rule(".model-viewer canvas"), /touch-action:\s*pan-y pinch-zoom/);
  assert.match(pageSource, /pointerType\s*!==\s*"touch"/);
});

test("horizontal clipping does not create a nested vertical scroller", () => {
  assert.match(rule(".site-shell"), /overflow-x:\s*clip/);
});
