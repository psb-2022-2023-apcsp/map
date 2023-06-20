/**
 * BHS Map app.
 */
//34567890123456789012345678901234567890123456789012345678901234567890
// Global dimension constants.
const imageX = 1000, imageY = 1000, divs = 100;
// Global floor variables
var floor, f1115, f2115, f3115, f4115, f122t, f222t, f322t, f422t;
// Global room dictionary.
let dict = new Object();
// Global sliders.
let sliderX, sliderY;
// Global text variables.
let positionText = ``;

function preload() {
  [ f1115, f2115, f3115, f4115, f122t, f222t, f322t, f422t, ]
    = initialize_maps();
}

function setup() {
  createCanvas(imageX, imageY);
  textSize(32);
  textAlign(CENTER, CENTER);
  // Create dictionary of rooms.
  for (const room of rooms) { dict[room.name] = room; }
  // Configure buttons.
  setupButtons(10, 20);
  floor = f3115;
  // Configure sliders.
  setupSliders(10, 50);
}

function draw() {
  background(`#eee`);
  fill(`#639`);
  stroke(`#639`);
  strokeWeight(0.25);
  text(`(${sliderX.value()},${sliderY.value()})`, 50, 50);
  // image(floor.image, sliderX.value(), sliderY.value());
  image(floor.image, floor.x, floor.y);
/*
  // Draw grid.
  for (let x = 0; x <= width; x += width / divs) {
    line(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += height / divs) {
    line(0, y, width, y);
  }
*/
  if (positionText) { text(positionText, width / 2, height / 2);}
  // TEST: draw the door & entry and connecting arrows.
  const delta = 25, r = delta / 4, weight = delta / 4;
  strokeWeight(weight);
  // Create map of rooms.
  for (const room of rooms) {
    if (!thisMap(floor, room.name)) continue;
    // Draw room dot and door line.
    let x1 = room.x, y1 = room.y;
    ellipse(room.x, room.y, r);    // draw dot at (room.x, room.y)
    if (room.direction) {
      if (room.direction.toLowerCase() == "s") y1 += delta;
      if (room.direction.toLowerCase() == "n") y1 -= delta;
      if (room.direction.toLowerCase() == "e") x1 += delta;
      if (room.direction.toLowerCase() == "w") x1 -= delta;
      line(room.x, room.y, x1, y1);  // draw line to door
      }
  }
  for (const room of rooms) {
    if (!thisMap(floor, room.name)) continue;
    // Look for room.next array defined.
    if (room.next !== undefined) {
      for (const next of room.next) {
        if (dict[next] !== undefined) {
          if (thisMap(floor, next)) {
            // Draw arrow from room to next.
            arrow(room.x, room.y, dict[next].x, dict[next].y);
          }
        }
      }
    }
  }
  for (const room of rooms) {
    if (!thisMap(floor, room.name)) continue;
    annotate(room);
  }
}
