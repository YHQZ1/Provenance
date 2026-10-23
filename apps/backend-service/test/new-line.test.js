import assert from "node:assert/strict";
import test from "node:test";
import { validateNewLine } from "../src/services/internal/new-line.js";

const valid = { description: " HDPE bottle 1 L ", material_code: "HDPE", quantity_kg: "1200.5" };

test("a complete line is trimmed and the weight becomes a number", () => {
  assert.deepEqual(
    validateNewLine({ ...valid, cpcb_category: "CATEGORY_I", notes: " from page 2 " }),
    {
      description: "HDPE bottle 1 L",
      material_code: "HDPE",
      quantity_kg: 1200.5,
      cpcb_category: "CATEGORY_I",
      notes: "from page 2",
    },
  );
});

test("category and notes are optional", () => {
  const line = validateNewLine(valid);
  assert.equal(line.cpcb_category, null);
  assert.equal(line.notes, null);
});

test("a missing description, unknown material or bad weight is rejected", () => {
  assert.throws(() => validateNewLine({ ...valid, description: "  " }), /Describe the line/);
  assert.throws(() => validateNewLine({ ...valid, material_code: "GLASS" }), /Material must be/);
  assert.throws(() => validateNewLine({ ...valid, quantity_kg: 0 }), /positive number/);
  assert.throws(() => validateNewLine({ ...valid, quantity_kg: "" }), /positive number/);
  assert.throws(() => validateNewLine({ ...valid, quantity_kg: "abc" }), /positive number/);
});

test("an unknown category is rejected", () => {
  assert.throws(
    () => validateNewLine({ ...valid, cpcb_category: "CATEGORY_IX" }),
    /Category must be/,
  );
});
