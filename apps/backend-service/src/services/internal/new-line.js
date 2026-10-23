import { badRequest } from "../../utils/errors.js";

export const MATERIAL_CODES = ["PET", "HDPE", "PVC", "LDPE", "PP", "PS", "MLP"];
export const CPCB_CATEGORIES = [
  "CATEGORY_I",
  "CATEGORY_II",
  "CATEGORY_III",
  "CATEGORY_IV",
  "BIODEGRADABLE",
];

export const validateNewLine = (body) => {
  const description = String(body.description || "").trim();
  if (!description) throw badRequest("Describe the line as it is written on the document");
  if (description.length > 200) throw badRequest("Description must be 200 characters or fewer");
  if (!MATERIAL_CODES.includes(body.material_code)) {
    throw badRequest(`Material must be one of ${MATERIAL_CODES.join(", ")}`);
  }
  const quantity = Number(body.quantity_kg);
  if (
    body.quantity_kg == null ||
    body.quantity_kg === "" ||
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {
    throw badRequest("Weight must be a positive number of kilograms");
  }
  const category = body.cpcb_category || null;
  if (category && !CPCB_CATEGORIES.includes(category)) {
    throw badRequest(`Category must be one of ${CPCB_CATEGORIES.join(", ")}`);
  }
  const notes = String(body.notes || "").trim();
  return {
    description,
    material_code: body.material_code,
    quantity_kg: quantity,
    cpcb_category: category,
    notes: notes || null,
  };
};
