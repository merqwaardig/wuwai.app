import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("contains the complete three-step Wuwai V2 experience", () => {
  assert.equal((page.match(/className="v2-section/g) ?? []).length, 3);
  assert.match(page, /const headlineWords = \["tijd", "energie", "leven"\]/);
  assert.match(page, /aria-label="Jouw tijd\. Jouw energie\. Jouw leven\."/);
  assert.match(page, /Ontdek wat jou in beweging brengt\./);
  assert.doesNotMatch(page, /<span>02<\/span> Begrijpen/);
  assert.match(page, /aria-label="Leef in vrijheid, autonomie & flow\."/);
});

test("animates the ownership headline without compromising accessibility", () => {
  assert.match(page, /setInterval/);
  assert.match(page, /3200/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /headline-word/);
  assert.match(page, /Jij bepaalt wat je uit je leven haalt\./);
  assert.doesNotMatch(page, /<span>01<\/span> Voelen/);
  assert.match(styles, /hero-spatial-zoom 18s/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});

test("keeps the three-step navigation and progression intact", () => {
  for (const id of ["eigenaarschap", "ervaring", "resultaat"]) {
    assert.match(page, new RegExp(`id: "${id}"|id="${id}"`));
    assert.match(page, new RegExp(`href="#${id}"`));
  }

  assert.equal((page.match(/<DownArrow/g) ?? []).length, 1);
  assert.match(page, /Ervaar het verschil/);
  assert.match(page, /aria-label={`Stap \$\{activeStep \+ 1\} van 3`}/);
  assert.match(page, /label: "Voelen"/);
  assert.match(page, /label: "Voelen", color: "var\(--heart\)"/);
  assert.match(page, /label: "Begrijpen", color: "var\(--mind\)"/);
  assert.match(page, /label: "Leven"/);
  assert.match(page, /color: "var\(--spirit\)"/);
});

test("includes goals, body and coach as one personal experience", () => {
  assert.match(page, /title: "Jouw doelen"/);
  assert.match(page, /title: "Jouw lichaam"/);
  assert.match(page, /title: "Jouw coach"/);
  assert.match(page, /Ervaar groei en geef richting aan je leven\./);
  assert.match(page, /\/app-doelen\.png/);
  assert.match(page, /\/app-lichaam\.png/);
  assert.match(page, /\/app-coach\.png/);
  assert.doesNotMatch(page, /const mobileViewport = window\.matchMedia/);
  assert.match(page, /3400/);
  assert.match(page, /setActiveChannel\(\(current\) =>/);
  assert.match(page, /carouselPaused/);
  assert.match(page, /onPointerDown=\{\(\) => setCarouselPaused\(true\)\}/);
  assert.doesNotMatch(page, /onPointerEnter=\{\(\) => setActiveChannel/);
  assert.match(page, /phone-position-\$\{carouselPosition\}/);
  assert.match(styles, /phone-position-center/);
  assert.match(styles, /blur\(0\.7px\)/);
  assert.match(styles, /translateY\(10px\)/);
  assert.match(styles, /translateX\(-74%\) translateY\(10px\) rotate\(0deg\) scale\(0\.88\)/);
});

test("retains Be You and links into the Wuwai app", () => {
  assert.match(page, /src="\/be-you\.svg" alt="Be You"/);
  assert.equal((page.match(/href="https:\/\/app\.wuwai\.org\/login"/g) ?? []).length, 2);
  assert.match(page, /<span>Ontdek de app<\/span>/);
  assert.match(page, /<i aria-hidden="true">→<\/i>/);
  assert.match(page, /Ontdek de app/);
  assert.match(page, /Vertrouw op wat je lichaam je vertelt\./);
  assert.doesNotMatch(page, /resultLead\.slice\(0, resultLeadLength\)/);
  assert.match(styles, /result-line-in 880ms/);
  assert.match(styles, /animation-delay: 620ms/);
  assert.match(styles, /padding-bottom: 0\.14em/);
  assert.match(styles, /\.result-image-stage/);
  assert.match(styles, /border-radius: 32px/);
  assert.match(styles, /result-image-child 14s/);
  assert.match(styles, /result-image-elder 14s/);
  assert.match(styles, /app-action-pulse 2\.8s/);
  assert.match(styles, /@keyframes app-action-pulse/);
  assert.match(styles, /primary-action-pulse 2\.8s/);
  assert.match(styles, /@keyframes primary-action-pulse/);
  assert.match(styles, /transform: scale\(1\.025\)/);
  assert.doesNotMatch(styles, /\.app-login-action::before/);
  assert.doesNotMatch(page, /<span>03<\/span> Leven/);
  assert.equal((page.match(/className="result-image result-image-/g) ?? []).length, 2);
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
  assert.match(styles, /background: oklch\(0\.1 0\.01 80 \/ 0\.2\)/);
});

test("uses the Wuwai mark as the browser and saved-site icon", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<title>Wuwai \| Jouw tijd\. Jouw energie\. Jouw leven\.<\/title>/);
  assert.match(html, /rel="icon"[^>]+apple-icon\.png/);
  assert.match(html, /rel="apple-touch-icon"[^>]+apple-icon\.png/);
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
