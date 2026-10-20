import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const gamesDir = path.join(rootDir, "engine", "games");

// 1. runner.js
{
  const p = path.join(gamesDir, "runner.js");
  let code = fs.readFileSync(p, "utf8");

  const oldHeroBlock = `  // 16x13 6-color dark-outlined scarf-fox hero (2-frame run + airborne jump pose)
  const heroPal = { o: 16, r: P.accent1, d: P.fg, w: 7, k: 16, s: 12 };
  const heroRun1 = engine.sprite([
    "..........o..o..", ".........oro.oro", ".........orrrrro", "........ordkrrwo",
    "........orrrrwwk", ".oo.....owwwwwo.", "orro...ossssso..", "ordro.orrsrrrdo.",
    ".owrrrorrrrrrdo.", "..owrrrrrrrrddo.", "...ooddddddddoo.", "....orro..orro..",
    "....ooo...ooo...",
  ].join("\\n"), heroPal);
  const heroRun2 = engine.sprite([
    "..........o..o..", ".........oro.oro", ".........orrrrro", "........ordkrrwo",
    "........orrrrwwk", ".oo.....owwwwwo.", ".orro..osssssso.", ".ordroorrsrrrdo.",
    "..owrrorrrrrrdo.", "...owrrrrrrrddo.", "....oodddddddoo.", "...orro....orro.",
    "...ooo.....ooo..",
  ].join("\\n"), heroPal);
  const heroJump = engine.sprite([
    ".........o..o...", "........oro.oro.", "........orrrrro.", ".......ordkrrwo.",
    ".ooo...orrrrwwk.", "osssso.owwwwwo..", ".ooossorrrrrrdo.", ".orrddrrrrrrrdo.",
    "..owrrrrrrrrddo.", "...ooddddddddoo.", "..orro.....orro.", "..ooo......ooo..",
    "................",
  ].join("\\n"), heroPal);`;

  const newHeroBlock = `  // 16x13 Pompompurin puppy hero (cream body, chocolate beret, floppy ears, wagging tail)
  const heroPal = { o: 16, b: 4, e: 4, y: 10, Y: 23, k: 0, p: 14, w: 7 };
  const heroRun1 = engine.sprite([
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
  ].join("\\n"), heroPal);
  const heroRun2 = engine.sprite([
    "......oooo......",
    ".....obbbbo.....",
    "...oobbbbbboo...",
    "..oeyyyyyyyyeo..",
    "..oeyykyykyyeo..",
    "..ooyyypyyyoo...",
    "...oyyyyyyyyoo..",
    "..oyyyyyyyyyyo.o",
    "..oyyyyyyyyyyo..",
    "..oyyyyyyyyyyo..",
    "...oyyyyoyyyo...",
    "...oyyo...oyyo..",
    "...ooo.....ooo..",
  ].join("\\n"), heroPal);
  const heroJump = engine.sprite([
    "......oooo......",
    "....oobbbboo....",
    "...obbbbbbbbo...",
    ".ooeeyyyyyyeoo..",
    "..oeyykyykyyeo..",
    "..ooyyypyyyoo...",
    "...oyyyyyyyyo.o.",
    "..oyyyyyyyyyyoo.",
    "..oyyyyyyyyyyo..",
    "..ooyyyyyyyyoo..",
    ".oyyo.oooo.oyyo.",
    ".ooo........ooo.",
    "................",
  ].join("\\n"), heroPal);`;

  code = code.replace(oldHeroBlock.replace(/\r\n/g, "\n"), newHeroBlock);
  // Also handle CRLF if needed
  if (!code.includes("Pompompurin puppy hero")) {
    code = code.replace(oldHeroBlock.replace(/\n/g, "\r\n"), newHeroBlock.replace(/\n/g, "\r\n"));
  }
  fs.writeFileSync(p, code, "utf8");
}

// 2. dodger.js
{
  const p = path.join(gamesDir, "dodger.js");
  let code = fs.readFileSync(p, "utf8");
  code = code.replace('card?.hero?.short || "HERO"', 'card?.hero?.short || "PURIN"');

  const oldDodgerBlock = `  // 14x13 6-color dark-outlined sneaker-coin Pip hero (2-frame run stride)
  const heroPal = { o: 16, r: P.accent1, y: P.accent2, w: 7, k: 16, s: 8 };
  const heroRun1 = engine.sprite(\`
    ....oooooo....
    ..oorrrrrroo..
    .orryyyyyyrro.
    orywkyyyywkyro
    orykkyyyykkyro
    orwyyyyyyyywro
    oryyyykkyyyyro
    .oryyyyyyyyro.
    ..oorrrrrroo..
    ...oooooooo...
    ..osss..ooo...
    ..oooo..osss..
    ........oooo..
  \`, heroPal);
  const heroRun2 = engine.sprite(\`
    ....oooooo....
    ..oorrrrrroo..
    .orryyyyyyrro.
    orywkyyyywkyro
    orykkyyyykkyro
    orwyyyyyyyywro
    oryyyyyyyyyyro
    .oryyykkyyyro.
    ..oorrrrrroo..
    ...oooooooo...
    ...ooo..ssso..
    ..ssso..oooo..
    ..oooo........
  \`, heroPal);`;

  const newDodgerBlock = `  // 14x13 Pompompurin puppy hero (yellow body, brown beret, floppy ears)
  const heroPal = { o: 16, b: 4, e: 4, y: 10, Y: 23, k: 0, p: 14, w: 7 };
  const heroRun1 = engine.sprite(\`
    ....obbo......
    ...obbbbo.....
    ..oebbbbeo....
    .oeyyyyyyeo...
    .oeykyykyyeo..
    .ooyyypyyyoo..
    ..oyyyyyyyyo..
    .oyyyyyyyyyyo.
    .oyyyyyyyyyyo.
    ..oyyyyyyyyo..
    ..oyyo..oyyo..
    ..oooo..oooo..
    ..............
  \`, heroPal);
  const heroRun2 = engine.sprite(\`
    ....obbo......
    ...obbbbo.....
    ..oebbbbeo....
    .oeyyyyyyeo...
    .oeykyykyyeo..
    .ooyyypyyyoo..
    ..oyyyyyyyyo..
    .oyyyyyyyyyyo.
    .oyyyyyyyyyyo.
    ..oyyyyyyyyo..
    ...oyyo.oyyo..
    ...oooo.oooo..
    ..............
  \`, heroPal);`;

  code = code.replace(oldDodgerBlock.replace(/\r\n/g, "\n"), newDodgerBlock);
  if (!code.includes("Pompompurin puppy hero")) {
    code = code.replace(oldDodgerBlock.replace(/\n/g, "\r\n"), newDodgerBlock.replace(/\n/g, "\r\n"));
  }
  fs.writeFileSync(p, code, "utf8");
}

// 3. platformer.js
{
  const p = path.join(gamesDir, "platformer.js");
  let code = fs.readFileSync(p, "utf8");
  code = code.replace('card?.hero?.short || "SLIME"', 'card?.hero?.short || "PURIN"');
  code = code.replace(
    'const heroPal = { o: 16, k: 16, w: 7, g: P.accent1, h: P.accent2, m: P.fg };',
    'const heroPal = { o: 16, b: 4, e: 4, y: 10, Y: 23, k: 0, p: 14, w: 7 };'
  );
  code = code.replace(
    /const slimeIdle = engine\.sprite\([^;]+;/,
    `const slimeIdle = engine.sprite("....obbo.....\\n...obbbbo....\\n..oebbbbeo...\\n.oeyyyyyyeo..\\n.oeykyykyyeo.\\n.ooyyypyyyoo.\\n.oyyyyyyyyyyo\\n.oyyyyyyyyyyo\\n.oyyyyyyyyyyo\\n..oyyo..oyyo.\\n..oooo..oooo.", heroPal);`
  );
  code = code.replace(
    /const slimeAir = engine\.sprite\([^;]+;/,
    `const slimeAir = engine.sprite("....obbo.....\\n..oobbbboo...\\n.obbbbbbbbo..\\n.oeyyyyyyeo..\\n.oeykyykyyeo.\\n.ooyyypyyyoo.\\n..oyyyyyyyyo.\\n.ooyyyyyyyyoo\\n.oyyo.oo.oyyo\\n..oo......oo.\\n.............", heroPal);`
  );
  fs.writeFileSync(p, code, "utf8");
}

// 4. breakout.js
{
  const p = path.join(gamesDir, "breakout.js");
  let code = fs.readFileSync(p, "utf8");
  code = code.replace('card?.hero?.short || "CUPCAKE"', 'card?.hero?.short || "PURIN"');
  code = code.replace(
    'const heroPal = { o: 16, k: 16, r: 8, w: 7, p: P.accent1, b: P.fg, t: P.accent2 };',
    'const heroPal = { o: 16, b: 4, e: 4, y: 10, Y: 23, k: 0, p: 14, w: 7 };'
  );
  code = code.replace(
    /const hero1 = engine\.sprite\([^;]+;/,
    `const hero1 = engine.sprite("....obbo...\\n...obbbbo..\\n..oebbbbeo.\\n.oeyyyyyyeo\\n.oeykyykyye\\n.ooyyypyyyo\\n..oyyyyyyyo\\n.oyyyyyyyyy\\n..oyyo.oyyo\\n...oo...oo.", heroPal);`
  );
  code = code.replace(
    /const hero2 = engine\.sprite\([^;]+;/,
    `const hero2 = engine.sprite("....obbo...\\n...obbbbo..\\n..oebbbbeo.\\n.oeyyyyyyeo\\n.oeykyykyye\\n.ooyyypyyyo\\n..oyyyyyyyo\\n.oyyyyyyyyy\\n...oyyo.oyy\\n...oo...oo.", heroPal);`
  );
  fs.writeFileSync(p, code, "utf8");
}

// 5. maze.js
{
  const p = path.join(gamesDir, "maze.js");
  let code = fs.readFileSync(p, "utf8");
  code = code.replace('card?.hero?.short || "MOTH"', 'card?.hero?.short || "PURIN"');
  code = code.replace(
    'const heroPal = { o: 16, w: 7, b: P.fg, p: P.accent1, a: P.accent2, s: 12 };',
    'const heroPal = { o: 16, b: 4, e: 4, y: 10, Y: 23, k: 0, p: 14, w: 7 };'
  );
  code = code.replace(
    /const hero1 = engine\.sprite\([^;]+;/,
    `const hero1 = engine.sprite("....obbo....\\n...obbbbo...\\n..oebbbbeo..\\n.oeyyyyyyeo.\\n.oeykyykyyeo\\n.ooyyypyyyoo\\n..oyyyyyyyyo\\n.oyyyyyyyyyy\\n..oyyo..oyyo\\n...oo....oo.", heroPal);`
  );
  code = code.replace(
    /const hero2 = engine\.sprite\([^;]+;/,
    `const hero2 = engine.sprite("....obbo....\\n...obbbbo...\\n..oebbbbeo..\\n.oeyyyyyyeo.\\n.oeykyykyyeo\\n.ooyyypyyyoo\\n..oyyyyyyyyo\\n.oyyyyyyyyyy\\n...oyyo.oyyo\\n...oo...oo..", heroPal);`
  );
  fs.writeFileSync(p, code, "utf8");
}

// 6. shooter.js
{
  const p = path.join(gamesDir, "shooter.js");
  let code = fs.readFileSync(p, "utf8");
  code = code.replace('card?.hero?.short || "SHIP"', 'card?.hero?.short || "PURIN"');
  code = code.replace(
    'const shipPal = { o: 16, c: P.accent1, b: P.fg, w: 7, f: 9, y: P.accent2 };',
    'const shipPal = { o: 16, b: 4, e: 4, y: 10, Y: 23, k: 0, p: 14, w: 7, f: 9 };'
  );
  code = code.replace(
    /const ship1 = engine\.sprite\(\[[^\]]+\]\.join\("\\n"\), shipPal\);/,
    `const ship1 = engine.sprite(["....obbo...","...obbbbo..","..oebbbbeo.",".oeyyyyyyeo",".oeykyykyye",".ooyyypyyyo","wooyyyyyyoo","woyyyyyyyyw",".oo.ofo.oo.","....oyo...."].join("\\n"), shipPal);`
  );
  code = code.replace(
    /const ship2 = engine\.sprite\(\[[^\]]+\]\.join\("\\n"\), shipPal\);/,
    `const ship2 = engine.sprite(["....obbo...","...obbbbo..","..oebbbbeo.",".oeyyyyyyeo",".oeykyykyye",".ooyyypyyyo","wooyyyyyyoo","woyyyyyyyyw",".oo.oyo.oo.","...of.fo..."].join("\\n"), shipPal);`
  );
  fs.writeFileSync(p, code, "utf8");
}

console.log("[remake-sprites] Successfully updated all 6 house games with Pompompurin puppy sprites!");
