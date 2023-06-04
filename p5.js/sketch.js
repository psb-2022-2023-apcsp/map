/**
 * BHS Mapping app.
 */

// Global dimension constants.
const imageX = 1000, imageY = 1000, divs = 100;
// Global sliders.
let sliderX, sliderY;
// Global image variables
let f1115, f2115, f3115, f4115, f122t, f222t, f322t, f422t;
// Global text variables.
let positionText = ``;

function preload() {
  f2115 = loadImage(`https://psb-2022-2023-apcsp.github.io/map/assets/115-greenough-campus-map-floor-2.png`);
  f3115 = loadImage(`https://psb-2022-2023-apcsp.github.io/map/assets/115-greenough-campus-map-floor-3.png`);
}

function mousePressed() {
  const  // calculate (x,y) lattice point
    x = Math.round(mouseX / width * divs), 
    y = Math.round(mouseY / height * divs);
  positionText = `(${x * width / divs},${y * height / divs})`;
}

function setup() {
  createCanvas(imageX, imageY);
  textSize(32);
  textAlign(CENTER, CENTER);
  // Configure sliders.
  const deltaX = width / divs / 2, deltaY = height / divs / 2;
  sliderX = createSlider(-deltaX, deltaX, 0, 1);
  sliderX.position(width / 2 - 100 - 10, height + 10);
  sliderX.style('width', '100px');
  sliderY = createSlider(-deltaY, deltaY, 0, 1);
  sliderY.position(width / 2 + 10, height + 10);
  sliderY.style('width', '100px');
}

function draw() {
  background(`#eee`);
  stroke(`#639`)
  image(f3115, sliderX.value(), sliderY.value());
  text(`(${sliderX.value()},${sliderY.value()})`, 50, 50);
  for (let x = 0; x <= width; x += width / divs) {
    line(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += height / divs) {
    line(0, y, width, y);
  }
  if (positionText) { text(positionText, width / 2, height / 2);}
}
