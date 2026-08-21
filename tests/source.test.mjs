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
  assert.match(page, /aria-label="Meer balans\. Meer energie\. Meer flow\."/);
});

test("animates the ownership headline without compromising accessibility", () => {
  assert.match(page, /setInterval/);
  assert.match(page, /3200/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /headline-word/);
  assert.match(page, /Jij bepaalt wat je uit je leven haalt\./);
  assert.match(styles, /hero-spatial-zoom 18s/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});

test("keeps the three-step navigation and progression intact", () => {
  for (const id of ["eigenaarschap", "ervaring", "resultaat"]) {
    assert.match(page, new RegExp(`id: "${id}"|id="${id}"`));
    assert.match(page, new RegExp(`href="#${id}"`));
  }

  assert.equal((page.match(/<DownArrow/g) ?? []).length, 2);
  assert.match(page, /aria-label={`Stap \$\{activeStep \+ 1\} van 3`}/);
  assert.match(page, /label: "Persoonlijk"/);
  assert.match(page, /label: "Persoonlijk", color: "var\(--mind\)"/);
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
  assert.match(page, /const mobileViewport = window\.matchMedia\("\(max-width: 820px\)"\)/);
  assert.match(page, /3400/);
  assert.match(page, /setActiveChannel\(\(current\) =>/);
  assert.match(page, /phone-position-\$\{carouselPosition\}/);
  assert.match(styles, /phone-position-center/);
  assert.match(styles, /blur\(0\.7px\)/);
  assert.match(styles, /translateY\(5px\)/);
});

test("retains Be You and links into the Wuwai app", () => {
  assert.match(page, /src="\/be-you\.svg" alt="Be You"/);
  assert.equal((page.match(/href="https:\/\/app\.wuwai\.org\/login"/g) ?? []).length, 2);
  assert.match(page, />Aanmelden<\/a>/);
  assert.match(page, /Ontdek de app/);
  assert.match(page, /Ervaar meer vrijheid, zelfvertrouwen\\nen geef leiding aan je leven\./);
  assert.match(page, /resultLead\.slice\(0, resultLeadLength\)/);
  assert.match(styles, /result-line-in 880ms/);
  assert.match(page, /2100/);
  assert.match(styles, /animation-delay: 1040ms/);
  assert.match(styles, /padding-bottom: 0\.14em/);
  assert.match(styles, /white-space: pre-line/);
  assert.match(styles, /top: calc\(9% \+ 10px\)/);
  assert.match(styles, /border-radius: 18px/);
  assert.match(styles, /bottom: 10px/);
  assert.match(styles, /app-action-pulse 2\.8s/);
  assert.match(styles, /@keyframes app-action-pulse/);
  assert.match(page, /<span>03<\/span> Resultaat/);
  assert.equal((page.match(/className="polaroid polaroid-/g) ?? []).length, 2);
  assert.doesNotMatch(page, /polaroid-michael/);
});

test("uses the supplied fullscreen hero image", () => {
  assert.match(page, /className="hero-background"/);
  assert.match(page, /src="\/hero-charge\.webp"/);
  assert.match(page, /fetchPriority="high"/);
  assert.match(styles, /\.hero-background/);
  assert.match(styles, /object-position:\s*18% center/);
  assert.match(styles, /object-fit: cover/);
  assert.match(styles, /transform: scaleX\(-1\)/);
  assert.match(styles, /to \{ scale: 1\.075; \}/);
  assert.match(styles, /background: oklch\(0\.1 0\.01 80 \/ 0\.1\)/);
});

test("uses the Wuwai mark as the browser and saved-site icon", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<title>Wuwai \| Jouw tijd\. Jouw energie\. Jouw leven\.<\/title>/);
  assert.match(html, /rel="icon"[^>]+wuwai-logo\.png/);
  assert.match(html, /rel="apple-touch-icon"[^>]+wuwai-logo\.png/);
  assert.match(html, /rel="manifest" href="\/site\.webmanifest"/);
});

test("loads the configured Google Analytics tag", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-Z8K5W1KJRV/);
  assert.match(html, /gtag\('config', 'G-Z8K5W1KJRV'\)/);
});

test("remains screen-led, responsive and motion-conscious", () => {
  assert.match(styles, /min-height: 100svh/);
  assert.match(styles, /scroll-snap-type: y proximity/);
  assert.match(styles, /@media \(max-width: 820px\)/);
  assert.match(styles, /min-height: 44px/);
  assert.match(styles, /font-size: 12px/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /scroll-margin-top: 0/);
  assert.match(styles, /object-fit: contain/);
  assert.doesNotMatch(page, /className="phone-speaker"/);
});
