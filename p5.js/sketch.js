/**
 * BHS Mapping app.
 */

// Global image variables
let f1115, f2115, f3115, f4115, f122t, f222t, f322t, f422t;

function preload() {
  f2115 = loadImage(`https://psb-2022-2023-apcsp.github.io/map/assets/115-greenough-campus-map-floor-2.png`);
  f3115 = loadImage(`https://psb-2022-2023-apcsp.github.io/map/assets/115-greenough-campus-map-floor-3.png`);
}

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(`#eee`);
  stroke(`#639`)
  image(f3115, 0, 0);
  for (let x = 0; x <= width; x += width / 50) {
    line(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += height / 50) {
    line(0, y, width, y);
  }
}
