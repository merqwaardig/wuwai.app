import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("contains the complete three-step Wuwai V2 experience", () => {
  assert.equal((page.match(/className="v2-section/g) ?? []).length, 3);
  assert.match(page, /Jouw leven\.<br \/>Jouw energie\.<br \/>Jouw tijd\./);
  assert.match(page, /Alles wat je nodig hebt om bewust in beweging te komen\./);
  assert.match(page, /Meer energie\.<br \/>Meer rust\.<br \/>Meer flow\./);
});

test("keeps the three-step navigation and progression intact", () => {
  for (const id of ["eigenaarschap", "ervaring", "resultaat"]) {
    assert.match(page, new RegExp(`id: "${id}"|id="${id}"`));
    assert.match(page, new RegExp(`href="#${id}"`));
  }

  assert.equal((page.match(/<DownArrow/g) ?? []).length, 2);
  assert.match(page, /aria-label={`Stap \$\{activeStep \+ 1\} van 3`}/);
});

test("includes goals, body and coach as one personal experience", () => {
  assert.match(page, /title: "Jouw doelen"/);
  assert.match(page, /title: "Jouw lichaam"/);
  assert.match(page, /title: "Jouw coach"/);
  assert.match(page, /Doelen, lichaamswijsheid en coaching komen samen in één persoonlijke ervaring\./);
});

test("retains Be You and the working early-access form", () => {
  assert.match(page, /src="\/be-you\.svg" alt="Be You"/);
  assert.match(page, /https:\/\/formsubmit\.co\/ajax\/contact@wuwai\.org/);
  assert.match(page, /name="_honey"/);
  assert.match(page, /Let&apos;s go/);
});

test("remains screen-led, responsive and motion-conscious", () => {
  assert.match(styles, /min-height: 100svh/);
  assert.match(styles, /scroll-snap-type: y proximity/);
  assert.match(styles, /@media \(max-width: 820px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});
