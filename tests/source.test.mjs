import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("contains the complete three-step Wuwai V2 experience", () => {
  assert.equal((page.match(/className="v2-section/g) ?? []).length, 3);
  assert.match(page, /const headlineWords = \["tijd", "energie", "leven"\]/);
  assert.match(page, /aria-label="Jouw tijd\. Jouw energie\. Jouw leven\."/);
  assert.match(page, /Alles wat je nodig hebt om bewust in beweging te komen\./);
  assert.match(page, /<span>02<\/span> Doelgericht/);
  assert.match(page, /Meer balans\.<br \/>Meer energie\.<br \/>Meer flow\./);
});

test("animates the ownership headline without compromising accessibility", () => {
  assert.match(page, /setInterval/);
  assert.match(page, /3200/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /headline-word/);
  assert.match(page, /Jij bepaalt wat je uit je leven haalt\./);
});

test("keeps the three-step navigation and progression intact", () => {
  for (const id of ["eigenaarschap", "ervaring", "resultaat"]) {
    assert.match(page, new RegExp(`id: "${id}"|id="${id}"`));
    assert.match(page, new RegExp(`href="#${id}"`));
  }

  assert.equal((page.match(/<DownArrow/g) ?? []).length, 2);
  assert.match(page, /aria-label={`Stap \$\{activeStep \+ 1\} van 3`}/);
  assert.match(page, /label: "Persoonlijk"/);
  assert.match(page, /label: "Doelgericht"/);
  assert.match(page, /color: "var\(--spirit\)"/);
});

test("includes goals, body and coach as one personal experience", () => {
  assert.match(page, /title: "Jouw doelen"/);
  assert.match(page, /title: "Jouw lichaam"/);
  assert.match(page, /title: "Jouw coach"/);
  assert.match(page, /Doelen, lichaamswijsheid en coaching komen samen in één persoonlijke ervaring\./);
  assert.match(page, /\/app-doelen\.png/);
  assert.match(page, /\/app-lichaam\.png/);
  assert.match(page, /\/app-coach\.png/);
});

test("retains Be You and links into the Wuwai app", () => {
  assert.match(page, /src="\/be-you\.svg" alt="Be You"/);
  assert.equal((page.match(/href="https:\/\/app\.wuwai\.org\/login"/g) ?? []).length, 2);
  assert.match(page, />Aanmelden<\/a>/);
  assert.match(page, /Ontdek de app/);
  assert.match(page, /Ervaar meer vrijheid, zelfvertrouwen en geef leiding aan je leven\./);
  assert.equal((page.match(/className="polaroid polaroid-/g) ?? []).length, 2);
  assert.doesNotMatch(page, /polaroid-michael/);
});

test("uses the supplied fullscreen hero image", () => {
  assert.match(page, /className="hero-background" src="\/hero-v2\.png"/);
  assert.match(styles, /\.hero-background/);
  assert.match(styles, /object-fit: cover/);
});

test("uses the Wuwai mark as the browser and saved-site icon", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /rel="icon"[^>]+wuwai-logo\.png/);
  assert.match(html, /rel="apple-touch-icon"[^>]+wuwai-logo\.png/);
  assert.match(html, /rel="manifest" href="\/site\.webmanifest"/);
});

test("remains screen-led, responsive and motion-conscious", () => {
  assert.match(styles, /min-height: 100svh/);
  assert.match(styles, /scroll-snap-type: y proximity/);
  assert.match(styles, /@media \(max-width: 820px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /scroll-margin-top: 0/);
  assert.match(styles, /object-fit: contain/);
  assert.doesNotMatch(page, /className="phone-speaker"/);
});
