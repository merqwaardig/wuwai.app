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
});
