import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("contains the complete nine-screen Wuwai journey", () => {
  assert.match(page, /Alles zit al in je, laat het samenwerken\./);
  assert.match(page, /Groei in energie, balans en bewustzijn\./);
  assert.equal((page.match(/className="story-section/g) ?? []).length, 9);
});

test("keeps navigation and CTA destinations intact", () => {
  for (const id of [
    "fundament",
    "voeding-zorg",
    "wilskracht",
    "liefde-verbinding",
    "communicatie",
    "intuitie",
    "spiritualiteit",
  ]) {
    assert.match(page, new RegExp(`id: "${id}"|id="${id}"`));
  }
  assert.ok((page.match(/href="#signup"/g) ?? []).length >= 2);
  assert.match(page, /className="journey-nav"/);
  assert.match(page, /className="secondary-button"/);
});

test("sends early-access signups to FormSubmit", () => {
  assert.match(page, /https:\/\/formsubmit\.co\/ajax\/contact@wuwai\.org/);
  assert.match(page, /method="POST"/);
  assert.match(page, /name="_honey"/);
  assert.match(page, /Je aanmelding is verzonden\./);
  assert.doesNotMatch(page, /nog niet opgeslagen/);
});

test("includes the approved copy and removes superseded content", () => {
  assert.match(page, /title="Ervaren"/);
  assert.match(page, /<p className="section-kicker">Balans<\/p>/);
  assert.match(page, /Elke dag een stap vooruit\./);
  assert.match(page, /Bewust kiezen voor meer energie, balans en bewustzijn\./);
  assert.match(page, /Weinig energie en motivatie/);
  assert.match(page, /Drank, drugs en social media verslaving/);
  assert.doesNotMatch(page, /Wat valt op, en wat past nu bij jou\?/);
  assert.doesNotMatch(page, /<p className="section-kicker">De kern<\/p>/);
  assert.doesNotMatch(page, /<p className="brand-kicker">Wuwai<\/p>/);
  assert.equal((page.match(/<NextArrow/g) ?? []).length, 8);
});
