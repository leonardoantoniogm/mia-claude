const Jimp = require("jimp");
const potrace = require("potrace");
const fs = require("fs");

const INPUT = "public/img/mia.png";
const OUTPUT = "public/img/mia.svg";

Jimp.read(INPUT).then((image) => {
  image.resize(800, 800);
  image.getBuffer(Jimp.MIME_PNG, (err, bmp) => {
    if (err) { console.error(err); process.exit(1); }
    potrace.trace(bmp, { threshold: 128, turdSize: 2, optTolerance: 0.4 }, (err2, svg) => {
      if (err2) { console.error(err2); process.exit(1); }
      fs.writeFileSync(OUTPUT, svg);
      console.log("SVG written to", OUTPUT, "—", Math.round(fs.statSync(OUTPUT).size / 1024), "KB");
    });
  });
});
