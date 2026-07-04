import Jimp from "jimp";
import potrace from "potrace";
import fs from "fs";

const INPUT = "public/img/mia.png";
const OUTPUT = "public/img/mia.svg";

const image = await Jimp.read(INPUT);
// Scale up for better tracing quality
image.resize(800, 800);
const bmp = await image.getBufferAsync(Jimp.MIME_PNG);

potrace.trace(bmp, { threshold: 128, turdSize: 2, optTolerance: 0.4 }, (err, svg) => {
  if (err) { console.error(err); process.exit(1); }
  fs.writeFileSync(OUTPUT, svg);
  console.log("SVG written to", OUTPUT, "—", Math.round(fs.statSync(OUTPUT).size / 1024), "KB");
});
