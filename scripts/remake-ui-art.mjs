import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// 1. Update GENRE_SPRITE_ROWS in src/stage/skinCompositor.ts
{
  const p = path.join(rootDir, "src", "stage", "skinCompositor.ts");
  let code = fs.readFileSync(p, "utf8");

  const purinSpriteDef = `const GENRE_SPRITE_ROWS: Record<GenreName, { rows: string[]; map: Record<string, string> }> = {
  runner: {
    rows: [
      "......oooo......",
      ".....obbbbo.....",
      "...oobbbbbboo...",
      "..oeyyyyyyyyeo..",
      "..oeyykyykyyeo..",
      "..ooyyypyyyoo...",
      "...oyyyyyyyyo.o.",
      "..oyyyyyyyyyyoo.",
      "..oyyyyyyyyyyo..",
      "..oyyyyyyyyyyo..",
      "...oyyyyoyyyo...",
      "....oyyo.oyyo...",
      "....ooo...ooo...",
    ],
    map: { o: "#291814", b: "#5C3826", e: "#6E4730", y: "#FFD836", k: "#1B0E09", p: "#FF88AA", w: "#FFFDF5" },
  },
  shooter: {
    rows: [
      "....obbo...",
      "...obbbbo..",
      "..oebbbbeo.",
      ".oeyyyyyyeo",
      ".oeykyykyye",
      ".ooyyypyyyo",
      "wooyyyyyyoo",
      "woyyyyyyyyw",
      ".oo.ofo.oo.",
      "....oyo....",
    ],
    map: { o: "#291814", b: "#5C3826", e: "#6E4730", y: "#FFD836", k: "#1B0E09", p: "#FF88AA", w: "#FFFDF5", f: "#FFA300" },
  },
  maze: {
    rows: [
      "....obbo....",
      "...obbbbo...",
      "..oebbbbeo..",
      ".oeyyyyyyeo.",
      ".oeykyykyyeo",
      ".ooyyypyyyoo",
      "..oyyyyyyyyo",
      ".oyyyyyyyyyy",
      "..oyyo..oyyo",
      "...oo....oo.",
    ],
    map: { o: "#291814", b: "#5C3826", e: "#6E4730", y: "#FFD836", k: "#1B0E09", p: "#FF88AA", w: "#FFFDF5" },
  },
  breakout: {
    rows: [
      "....obbo...",
      "...obbbbo..",
      "..oebbbbeo.",
      ".oeyyyyyyeo",
      ".oeykyykyye",
      ".ooyyypyyyo",
      "..oyyyyyyyo",
      ".oyyyyyyyyy",
      "..oyyo.oyyo",
      "...oo...oo.",
    ],
    map: { o: "#291814", b: "#5C3826", e: "#6E4730", y: "#FFD836", k: "#1B0E09", p: "#FF88AA", w: "#FFFDF5" },
  },
  platformer: {
    rows: [
      "....obbo.....",
      "...obbbbo....",
      "..oebbbbeo...",
      ".oeyyyyyyeo..",
      ".oeykyykyyeo.",
      ".ooyyypyyyoo.",
      ".oyyyyyyyyyyo",
      ".oyyyyyyyyyyo",
      ".oyyyyyyyyyyo",
      "..oyyo..oyyo.",
      "..oooo..oooo.",
    ],
    map: { o: "#291814", b: "#5C3826", e: "#6E4730", y: "#FFD836", k: "#1B0E09", p: "#FF88AA", w: "#FFFDF5" },
  },
  dodger: {
    rows: [
      "......oooo......",
      ".....obbbbo.....",
      "...oobbbbbboo...",
      "..oeyyyyyyyyeo..",
      "..oeyykyykyyeo..",
      "..ooyyypyyyoo...",
      "..oyyyyyyyyyyo..",
      ".oyyyyyyyyyyyyo.",
      ".oyyyyyyyyyyyyo.",
      "..oyyyyyyyyyyo..",
      "..oyyyykkyyyyo..",
      "...oyyyyyyyyo...",
      "...ooyyyyyyoo...",
      "....oyyo.oyyo...",
      "....ooo...ooo...",
    ],
    map: {
      o: "#291814",
      b: "#5C3826",
      e: "#6E4730",
      y: "#FFD836",
      Y: "#FFF4B8",
      k: "#1B0E09",
      w: "#FFFDF5",
      p: "#FF88AA",
    },
  },
};`;

  code = code.replace(/const GENRE_SPRITE_ROWS: Record<GenreName, \{ rows: string\[\]; map: Record<string, string> \}> = \{[\s\S]*?\n\};/, purinSpriteDef);
  fs.writeFileSync(p, code, "utf8");
}

// 2. Update attract.ts (PIP_ROWS, FOX_A, FOX_B, MOCK_GAMES)
{
  const p = path.join(rootDir, "src", "stage", "attract.ts");
  let code = fs.readFileSync(p, "utf8");

  // Replace PIP_ROWS with cute Pompompurin puppy
  const newPipRows = `const PIP_ROWS = [
  "......oooo......",
  ".....obbbbo.....",
  "...oobbbbbboo...",
  "..oeyyyyyyyyeo..",
  "..oeyykyykyyeo..",
  "..ooyyypyyyoo...",
  "..oyyyyyyyyyyo..",
  ".oyyyyyyyyyyyyo.",
  ".oyyyyyyyyyyyyo.",
  "..oyyyyyyyyyyo..",
  "..oyyyyppykyyo..",
  "...oyyyyyyyyo...",
  "...ooyyyyyyoo...",
  "....oyyo.oyyo...",
  "....ooo...ooo...",
];
const PIP_MAP = {
  o: C.dbrown,
  b: C.brown,
  e: C.brown,
  y: C.yellow,
  Y: C.lyellow,
  k: C.black,
  w: C.cream,
  p: C.pink,
};`;

  code = code.replace(/const PIP_ROWS = \[[\s\S]*?const PIP_MAP = \{[\s\S]*?\};/, newPipRows);

  // Replace FOX_TOP, FOX_A, FOX_B with Pompompurin running frames
  const newFoxBlock = `const FOX_TOP = [
  "......oooo......",
  ".....obbbbo.....",
  "...oobbbbbboo...",
  "..oeyyyyyyyyeo..",
  "..oeyykyykyyeo..",
  "..ooyyypyyyoo...",
  "...oyyyyyyyyo.o.",
  "..oyyyyyyyyyyoo.",
  "..oyyyyyyyyyyo..",
  "..oyyyyyyyyyyo..",
  "...oyyyyoyyyo...",
];
const FOX_A = [...FOX_TOP, "....oyyo.oyyo...", "....ooo...ooo..."];
const FOX_B = [...FOX_TOP, "...oyyo...oyyo..", "...ooo.....ooo.."];
const FOX_MAP = {
  o: C.dbrown,
  b: C.brown,
  e: C.brown,
  y: C.yellow,
  Y: C.lyellow,
  w: C.cream,
  k: C.black,
  p: C.pink,
  s: C.yellow,
  r: C.yellow,
};`;

  code = code.replace(/const FOX_TOP = \[[\s\S]*?export const foxB = spriteFromRows\(FOX_B, FOX_MAP\);/, `${newFoxBlock}\nexport const foxA = spriteFromRows(FOX_A, FOX_MAP);\nexport const foxB = spriteFromRows(FOX_B, FOX_MAP);`);

  // Update MOCK_GAMES titles & colors
  code = code.replace(/title: "FOXFIRE RUN"/g, 'title: "PURIN RUN"');
  code = code.replace(/by: "JAMES"/g, 'by: "PURIN"');
  code = code.replace(/title: \["FOXFIRE", "RUN"\]/g, 'title: ["PURIN", "RUN"]');
  code = code.replace(/sub: "BY JAMES"/g, 'sub: "BY PURIN"');

  fs.writeFileSync(p, code, "utf8");
}

console.log("[remake-ui-art] Successfully updated skinCompositor & attract with Pompompurin sprites & mock titles!");
