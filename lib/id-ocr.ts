export interface ParsedIdScan {
  rawText: string;
  name: string | null;
  idNumber: string | null;
}

const NOISE_TOKENS = new Set([
  "HELLENIC",
  "REPUBLIC",
  "IDENTITY",
  "CARD",
  "ΔΕΛΤΙΟ",
  "ΤΑΥΤΟΤΗΤΑΣ",
  "NATIONALITY",
  "SEX",
  "HEIGHT",
  "DATE",
  "BIRTH",
  "EXPIRY",
  "ISSUE",
  "SIGNATURE",
  "AUTHORITY",
  "NUMBER",
  "NUM",
  "ID",
]);

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function normalizeForIdSearch(text: string) {
  return text
    .replace(/[|]/g, "I")
    .replace(/[(){}\[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isLikelyNameLine(line: string) {
  const cleaned = line
    .replace(/[^A-Za-zΑ-ΩΆ-Ώα-ωά-ώ\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return false;
  }

  const words = cleaned.split(" ").filter(Boolean);
  if (words.length < 2 || words.length > 5) {
    return false;
  }

  const upperWords = words.map((word) => word.toUpperCase());
  if (upperWords.some((word) => NOISE_TOKENS.has(word))) {
    return false;
  }

  return words.every((word) => word.length >= 2);
}

function titleCaseName(line: string) {
  return line
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function extractIdNumber(text: string) {
  const normalized = normalizeForIdSearch(text.toUpperCase());
  const matches = normalized.match(/\b[A-Z]{1,3}[0-9]{5,9}\b|\b[0-9]{6,12}\b/g);

  if (!matches?.length) {
    return null;
  }

  return matches.sort((a, b) => b.length - a.length)[0] ?? null;
}

function extractName(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean);

  const bestLine = lines.find(isLikelyNameLine);
  return bestLine ? titleCaseName(bestLine) : null;
}

export function parseIdScanText(text: string): ParsedIdScan {
  const rawText = normalizeWhitespace(text);

  return {
    rawText,
    name: extractName(text),
    idNumber: extractIdNumber(text),
  };
}
