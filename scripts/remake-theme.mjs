import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// 1. Update src/styles/playglow.css
{
  const p = path.join(rootDir, "src", "styles", "playglow.css");
  let css = fs.readFileSync(p, "utf8");

  // Replace :root variables with warm yellow + brown Pompompurin palette
  const oldRoot = `:root {
  --accent: #FFEC27;
  --ink: #FFF1E8;
  --dim: rgba(255, 241, 232, 0.56);
  --faint: rgba(255, 241, 232, 0.14);
  --glass: rgba(22, 11, 13, 0.5);
  --glass-strong: rgba(22, 11, 13, 0.78);
  --bg: #140a0c;
  --f: "Bricolage Grotesque", system-ui, sans-serif;
  --m: "JetBrains Mono", ui-monospace, monospace;
  --big: 44px;
  --small: 14px;
}`;

  const newRoot = `:root {
  --accent: #FFD836;
  --accent-warm: #FFE169;
  --ink: #FFFBF0;
  --dim: rgba(255, 248, 230, 0.72);
  --faint: rgba(255, 225, 140, 0.22);
  --glass: rgba(43, 24, 16, 0.68);
  --glass-strong: rgba(43, 24, 16, 0.90);
  --bg: #22130C;
  --beret: #4A2E1B;
  --pudding: #FFD836;
  --f: "Bricolage Grotesque", system-ui, sans-serif;
  --m: "JetBrains Mono", ui-monospace, monospace;
  --big: 44px;
  --small: 14px;
}`;

  css = css.replace(oldRoot.replace(/\r\n/g, "\n"), newRoot);
  css = css.replace(oldRoot.replace(/\n/g, "\r\n"), newRoot.replace(/\n/g, "\r\n"));

  // Replace primary pill color & scrim
  css = css.replace(
    /box-shadow: 0 0 18px rgba\(255, 236, 39, 0\.6\);/g,
    "box-shadow: 0 0 22px rgba(255, 216, 54, 0.85);"
  );
  css = css.replace(
    /background: linear-gradient\(to top, rgba\(14, 7, 9, 0\.82\), rgba\(14, 7, 9, 0\)\);/g,
    "background: linear-gradient(to top, rgba(34, 19, 12, 0.88), rgba(34, 19, 12, 0));"
  );
  css = css.replace(
    /color: #1a0c0f;/g,
    "color: #2D180C;"
  );
  css = css.replace(
    /rgba\(255, 236, 39, 0\.55\)/g,
    "rgba(255, 216, 54, 0.65)"
  );

  fs.writeFileSync(p, css, "utf8");
}

// 2. Update src/card/vibes.ts
{
  const p = path.join(rootDir, "src", "card", "vibes.ts");
  let code = fs.readFileSync(p, "utf8");

  code = code.replace(/name: "sunset",[\s\S]*?swatches: \["#7E2553", "#FF6C24", "#FFA300", "#FFEC27"\],/, `name: "sunset",
    feel: "warm custard yellow & chocolate brown",
    vibeDesc: "warm custard yellow & chocolate brown pudding",
    trim: "#FFD836",
    body: "#4A2E1B",
    palette: {
      bg: "#291814",
      fg: "#AB5236",
      accent1: "#FFA300",
      accent2: "#FFD836",
      ui: "#FFFBF0",
    },
    engine_palette: {
      bg: 16,
      fg: 4,
      accent1: 9,
      accent2: 10,
      ui: 7,
    },
    swatches: ["#291814", "#AB5236", "#FFA300", "#FFD836"],`);

  fs.writeFileSync(p, code, "utf8");
}

// 3. Update src/card/presets.ts
{
  const p = path.join(rootDir, "src", "card", "presets.ts");
  let code = fs.readFileSync(p, "utf8");

  code = code.replace(/a fox in a tiny scarf/g, "a puppy with a brown beret (Pompompurin)");
  code = code.replace(/FOXFIRE RUN/g, "PURIN RUN");
  code = code.replace(/FOX/g, "PURIN");
  code = code.replace(/fox/g, "purin");

  fs.writeFileSync(p, code, "utf8");
}

// 4. Update src/App.tsx placeholders & captions
{
  const p = path.join(rootDir, "src", "App.tsx");
  let code = fs.readFileSync(p, "utf8");

  const oldHolders = `const HERO_PLACEHOLDERS: readonly string[] = [
  "a fox in a tiny scarf",
  "your boss, but a pigeon",
  "a sandwich with dreams",
  "grandma in a jetpack",
];`;

  const newHolders = `const HERO_PLACEHOLDERS: readonly string[] = [
  "a cute puppy with a brown beret (Pompompurin)",
  "a golden puppy who loves custard pudding",
  "a fluffy puppy napping in a teacup",
  "a sweet puppy exploring pudding land",
];`;

  code = code.replace(oldHolders.replace(/\r\n/g, "\n"), newHolders);
  code = code.replace(oldHolders.replace(/\n/g, "\r\n"), newHolders.replace(/\n/g, "\r\n"));

  code = code.replace(/deriveShortHero\(rawHero \|\| "", "fox", 18\)/g, 'deriveShortHero(rawHero || "", "purin", 18)');

  fs.writeFileSync(p, code, "utf8");
}

// 5. Update index.html
{
  const p = path.join(rootDir, "index.html");
  let html = fs.readFileSync(p, "utf8");
  html = html.replace(/<title>.*?<\/title>/, "<title>POMPOM ARCADE 🍮 - Pompompurin Retro Game Studio</title>");
  fs.writeFileSync(p, html, "utf8");
}

// 6. Update ArcadeStage.ts lighting & scene colors
{
  const p = path.join(rootDir, "src", "stage", "ArcadeStage.ts");
  let code = fs.readFileSync(p, "utf8");

  // Scene background & fog
  code = code.replace(
    /this\.scene\.background = new THREE\.Color\(C\.dplum\)\.convertSRGBToLinear\(\);/,
    'this.scene.background = new THREE.Color("#22130C").convertSRGBToLinear();'
  );
  code = code.replace(
    /this\.scene\.fog = new THREE\.Fog\(\s*new THREE\.Color\(C\.dplum\)\.convertSRGBToLinear\(\),/,
    'this.scene.fog = new THREE.Fog(new THREE.Color("#22130C").convertSRGBToLinear(),'
  );

  // Lighting
  code = code.replace(
    /this\.sunLight = new THREE\.DirectionalLight\(lin\(C\.orange\), 2\.6\);/,
    'this.sunLight = new THREE.DirectionalLight(lin("#FFD836"), 2.8);'
  );
  code = code.replace(
    /this\.rimLight = new THREE\.DirectionalLight\(lin\(C\.dorange\), 2\.6\);/,
    'this.rimLight = new THREE.DirectionalLight(lin("#FFA300"), 2.6);'
  );
  code = code.replace(
    /this\.rim2Light = new THREE\.DirectionalLight\(lin\(C\.pink\), 1\.2\);/,
    'this.rim2Light = new THREE.DirectionalLight(lin("#FFE169"), 1.4);'
  );
  code = code.replace(
    /this\.fillLight = new THREE\.DirectionalLight\(lin\(C\.pink\), 0\.35\);/,
    'this.fillLight = new THREE.DirectionalLight(lin("#FFD836"), 0.45);'
  );

  fs.writeFileSync(p, code, "utf8");
}

console.log("[remake-theme] Successfully applied warm yellow + brown Pompompurin theme across app, 3D stage, presets & UI!");
