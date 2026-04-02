export interface ParsedIdScan {
  rawText: string;
  name: string | null;
  idNumber: string | null;
  candidateLines: string[];
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

const GREEK_TO_LATIN_LOOKALIKES: Record<string, string> = {
  Α: "A",
  Β: "B",
  Ε: "E",
  Ζ: "Z",
  Η: "H",
  Ι: "I",
  Κ: "K",
  Μ: "M",
  Ν: "N",
  Ο: "O",
  Ρ: "P",
  Τ: "T",
  Υ: "Y",
  Χ: "X",
  α: "a",
  β: "b",
  ε: "e",
  ι: "i",
  κ: "k",
  μ: "m",
  ν: "v",
  ο: "o",
  ρ: "p",
  τ: "t",
  χ: "x",
};

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

function greekLookalikesToLatin(text: string) {
  return text
    .split("")
    .map((char) => GREEK_TO_LATIN_LOOKALIKES[char] ?? char)
    .join("");
}

function isLikelyNameLine(line: string) {
  const cleaned = greekLookalikesToLatin(line)
    .replace(/[^A-Za-z\s'-]/g, " ")
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
  return greekLookalikesToLatin(line)
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeNameCandidate(line: string) {
  return greekLookalikesToLatin(line)
    .replace(/[|]/g, " ")
    .replace(/[^A-Za-z\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractIdNumber(lines: string[], text: string) {
  const topLines = lines.slice(0, 6).join(" ");
  const topMatches = normalizeForIdSearch(topLines).match(/\b[0-9]{7,8}\b/g);

  if (topMatches?.length) {
    return topMatches[0] ?? null;
  }

  const cardLine = lines.find((line) =>
    /CARD\s*(NR|NO|NUMBER)|ΔΕΛΤΙΟ/i.test(line)
  );

  if (cardLine) {
    const cardLineMatches = normalizeForIdSearch(cardLine).match(
      /\b[A-Z]{1,3}[0-9]{5,9}\b|\b[0-9]{6,12}\b/g
    );

    if (cardLineMatches?.length) {
      return cardLineMatches[0] ?? null;
    }
  }

  const normalized = normalizeForIdSearch(text.toUpperCase());
  const matches = normalized.match(/\b[A-Z]{1,3}[0-9]{5,9}\b|\b[0-9]{6,12}\b/g);

  if (!matches?.length) {
    return null;
  }

  return matches.sort((a, b) => b.length - a.length)[0] ?? null;
}

function extractName(lines: string[]) {
  const surnameHeaderIndex = lines.findIndex((line) =>
    /SURNAME|ΕΠΩΝΥΜΟ/i.test(line)
  );

  if (surnameHeaderIndex !== -1) {
    const nextLine = normalizeNameCandidate(lines[surnameHeaderIndex + 1] ?? "");
    if (isLikelyNameLine(nextLine)) {
      return nextLine;
    }
  }

  const fallbackHeaderIndex = lines.findIndex((line) =>
    /NAME|ΟΝΟΜΑ/i.test(line)
  );

  if (fallbackHeaderIndex !== -1) {
    const nextLine = normalizeNameCandidate(lines[fallbackHeaderIndex + 1] ?? "");
    if (isLikelyNameLine(nextLine)) {
      return nextLine;
    }
  }

  const bestLine = lines.find((line) => isLikelyNameLine(normalizeNameCandidate(line)));
  return bestLine ? titleCaseName(normalizeNameCandidate(bestLine)) : null;
}

export function parseIdScanText(text: string): ParsedIdScan {
  const candidateLines = text
    .split(/\r?\n/)
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean);
  const rawText = normalizeWhitespace(text);

  return {
    rawText,
    name: extractName(candidateLines),
    idNumber: extractIdNumber(candidateLines, text),
    candidateLines,
  };
}
