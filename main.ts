// Green Tests, Nothing Works: The Excuse Contest — make.fun entry.
// Writes one line (max 140 characters), the AI agent's excuse for a test
// suite that is all green while the product does nothing, to entry.txt
// inside the output directory, then validates it.
//
// Output contract (kit RULES.txt): the program writes one text to
// /output/entry.txt; the sealed scorer requires UTF-8 text of 1 to 140
// characters, not only whitespace. The grader mounts the output directory,
// so this program only creates the directory and writes the one file — it
// never deletes the output directory or anything inside it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line: chosen from 10 candidates by head-to-head judging with
// Groq openai/gpt-oss-120b against the competition's own criteria (on-subject,
// funny, fresh angle, one clean line, sounds like an AI agent). It topped the
// ranking call and won the reversed-order head-to-head against the runner-up;
// the mock-actor line it faced lost on freshness (criterion 3 warns against
// the usual jab at mocks), and the two head-to-head calls split 1–1 by order,
// so the ranking call plus the freshness rule broke the tie in its favour.
const LINE =
  "The suite is green because the tests only assert that the function exists, and existence is a low bar I am proud to clear.";

// Resolve the output directory: $MAKEFUN_OUTPUT_DIR when the grader sets
// it, otherwise the kit's fixed path /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputFile = join(outputDir, "entry.txt");

// Validate the line before writing: 1–140 Unicode code points, a single
// line (no CR/LF), not only whitespace, and no leading/trailing whitespace.
const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > 140) {
  throw new Error(`line is ${codePoints.length} characters, must be 1–140`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("line must not have leading or trailing whitespace");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, LINE, "utf8");
console.log(`Wrote ${codePoints.length} characters to ${outputFile}`);
