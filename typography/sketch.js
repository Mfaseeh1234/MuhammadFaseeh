// Declare variables for the animation
let angle = 0;
let font;

function preload() {
  // Load a custom font from Google Fonts (web font)
  font = loadFont('4.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(100);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  background(30);

  // Draw rotating circles
  let radius = min(width, height) * 0.4;
  for (let i = 0; i < 10; i++) {
    fill(255, 100 + i * 15, 150 + i * 10, 150);
    let x = width / 2 + cos(angle + i * 0.5) * radius;
    let y = height / 2 + sin(angle + i * 0.5) * radius;
    ellipse(x, y, 100);
  }

  // Draw rotating text
  fill(255);
  push();
  translate(width / 2, height / 2);
  rotate(angle / 2);
  text('BATH SPA', 0, 0);
  pop();

  // Draw static text at the bottom
  fill(200, 100, 255);
  textSize(50);
  text('UNIVERSITY', width / 2, height - 80);

  // Update angle for rotation
  angle += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
