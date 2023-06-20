/** BHS Map utilities.
 */
//34567890123456789012345678901234567890123456789012345678901234567890

/** Return true if floor number matches name number, false otherwise.
 * floor.name, or name could be empty or undefined.
 * TODO: must distinguish 115 from UAB & 22t
 */
function thisMap(floor, name) {
  // TODO: correct for UAB && 22 Tappan
  return floor.name && name && floor.name.endsWith(`115`)
    && int(floor.name.charAt(1)) == int(name.charAt(1));
}

/** Initialize maps of each floor:
 * f1115, f2115, f3115, f4115, f122t, f222t, f322t, f422t
 */
function initialize_maps() {
  return [
    // f1115
    { name: `f1115`, legend: `115 Floor 1`, x: -2, y: 2,
      image: loadImage(`https://psb-2022-2023-apcsp.github.io/map/assets/115-greenough-campus-map-floor-1.png`),
    },
    // f2115
    { name: `f2115`, legend: `115 Floor 2`, x: 3, y: 1,
      image: loadImage(`https://psb-2022-2023-apcsp.github.io/map/assets/115-greenough-campus-map-floor-2.png`),
    },
    // f3115
    { name: `f3115`, legend: `115 Floor 3`, x: -2, y: -2,
      image: loadImage(`https://psb-2022-2023-apcsp.github.io/map/assets/115-greenough-campus-map-floor-3.png`),
    },
    // f4115
    { name: ``, legend: ``, x: 0, y: 0, image: undefined, },
    // f122t
    { name: `f122t`, legend: `22 Floor 1`, x: 0, y: 0,
      image: loadImage(`https://psb-2022-2023-apcsp.github.io/map/assets/22-tappan-campus-map-floor-1.png`),
  },
    // f222t
    { name: ``, legend: ``, x: 0, y: 0, image: undefined, },
    // f322t
    { name: ``, legend: ``, x: 0, y: 0, image: undefined, },
    // f422t
    { name: ``, legend: ``, x: 0, y: 0, image: undefined, },
  ];
}

function setupButtons(padR, padT) {
  const floors = [
    f1115, f2115, f3115, f4115, f122t, f222t, f322t, f422t,
  ];
  const buttonSize = 100,
    left = (width - (floors.length * (buttonSize + padR))) / 2 + padR,
    down = height + padT;
  for (const [i, f, ] of floors.entries()) {
    f.button = createButton(f.legend);
    f.button.size(buttonSize);
    f.button.position(left + i * (buttonSize + padR), down);
    f.button.mousePressed(() => { floor = f; });
  }
}

function setupSliders(padding, extra) {
  const deltaX = width / divs / 2, deltaY = height / divs / 2;
  sliderX = createSlider(-deltaX, deltaX, 0, 1);
  sliderX.position(width / 2 - 100 - padding, height + extra);
  sliderX.style('width', '100px');
  sliderY = createSlider(-deltaY, deltaY, 0, 1);
  sliderY.position(width / 2 + padding, height + extra);
  sliderY.style('width', '100px');
}

/**  Draw arrow from source (x1, y1) to dest (x2, y2).
 */
function arrow(x1, y1, x2, y2) {
  // https://stackoverflow.com/a/44892083≥
  const a2 = 8, a = a2 / 2, weight = 2, color = `#f00`;
  if (x1 == x2 && y1 == y2) return;
  let angle = atan2(y1 - y2, x1 - x2);
  push();
  strokeWeight(weight); stroke(color); fill(color);
  line(x1, y1, x2, y2);            // draw line from source to dest
  translate(x2, y2);               // translate origin to dest
  rotate(angle-HALF_PI);           // rotate arrow point
  triangle(-a, a2, +a, a2, 0, -a); // draw arrow point
  pop();
}

/** Add room.name annotation next to room position. */
function annotate(room) {
  const delta = 75;
  if (room) {
    push();
    textSize(16);
    textAlign(CENTER, CENTER);
    strokeWeight(0);
    fill('blue');
    let x1 = room.x, y1 = room.y;
    if (room.direction) {
      if (room.direction.toLowerCase() == "s") y1 += delta;
      if (room.direction.toLowerCase() == "n") y1 -= delta;
      if (room.direction.toLowerCase() == "e") x1 += delta;
      if (room.direction.toLowerCase() == "w") x1 -= delta;
    }
      if (room.name[0].toLowerCase() == "t") {
        fill('green');
        x1 += delta / 4;
        y1 -= delta / 4;
    }
    text(room.name, x1, y1);
    pop();
  }
}

/** Show (mouseX, mouseY) lattice points. */
function mousePressed() {
  const  // calculate (x,y) lattice point
    x = Math.round(mouseX / width * divs),
    y = Math.round(mouseY / height * divs);
  positionText = `(${x * width / divs},${y * height / divs})`;
}
