// Shrinks and re-encodes blog images in place (same file names, so Markdown links keep working).
// Run after adding a new post: `npm run optimize:images`. Safe to re-run: a file is only rewritten
// when the result is at least 10% smaller.
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images", "blog");
const LIMITS = { images: 2400, thumbnails: 1200 }; // max length of the longer edge, px
const QUALITY = 82;
const MIN_SAVING = 0.1;

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    })
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file));
}

async function optimize(file, maxEdge) {
  const input = fs.readFileSync(file);
  const ext = path.extname(file).toLowerCase();
  let pipeline = sharp(input).rotate().resize({
    width: maxEdge,
    height: maxEdge,
    fit: "inside",
    withoutEnlargement: true,
  });
  if (ext === ".png") pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  else if (ext === ".webp") pipeline = pipeline.webp({ quality: QUALITY });
  else pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });

  const output = await pipeline.toBuffer();
  if (output.length > input.length * (1 - MIN_SAVING)) return [input.length, input.length];
  fs.writeFileSync(file, output);
  return [input.length, output.length];
}

let before = 0;
let after = 0;
for (const [folder, maxEdge] of Object.entries(LIMITS)) {
  for (const file of walk(path.join(ROOT, folder))) {
    const [from, to] = await optimize(file, maxEdge);
    before += from;
    after += to;
    if (from !== to) {
      console.log(`${path.relative(ROOT, file)}: ${(from / 1e6).toFixed(2)} MB -> ${(to / 1e6).toFixed(2)} MB`);
    }
  }
}
console.log(`Total: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`);
