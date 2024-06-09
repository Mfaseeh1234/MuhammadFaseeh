// Advanced Alien in p5.js
function setup() {
  createCanvas(800, 600); // Create a canvas
  angleMode(DEGREES); // Use degrees for angles
}

function draw() {
  background(30); // Dark background for better contrast
  drawAlien(mouseX, mouseY, mouseIsPressed);
}

function drawAlien(mx, my, isMouthOpen) {
  // Alien positioning
  let centerX = width / 2;
  let centerY = height / 2;

  // Body
  drawBody(centerX, centerY + 100);

  // Head
  drawHead(centerX, centerY);

  // Eyes
  let eyeOffsetX = 50;
  let eyeOffsetY = -40;
  drawEye(centerX - eyeOffsetX, centerY + eyeOffsetY, mx, my);
  drawEye(centerX + eyeOffsetX, centerY + eyeOffsetY, mx, my);

  // Mouth
  drawMouth(centerX, centerY + 60, isMouthOpen);

  // Arms
  drawArms(centerX, centerY + 100);

  // Legs
  drawLegs(centerX, centerY + 200);

  // Antennae
  drawAntennae(centerX, centerY - 120);
}

function drawBody(x, y) {
  fill(100, 200, 100);
  noStroke();
  ellipse(x, y, 150, 200); // Main body ellipse
}

function drawHead(x, y) {
  fill(150, 250, 150);
  ellipse(x, y, 200, 250); // Head ellipse
}

function drawEye(x, y, targetX, targetY) {
  // Eye white
  fill(255);
  ellipse(x, y, 50, 50);
  
  // Pupil
  let angle = atan2(targetY - y, targetX - x);
  let pupilX = x + cos(angle) * 15;
  let pupilY = y + sin(angle) * 15;
  fill(0);
  ellipse(pupilX, pupilY, 20, 20);
}

function drawMouth(x, y, isMouthOpen) {
  stroke(0);
  fill(255, 100, 100);
  
  if (isMouthOpen) {
    arc(x, y, 80, 80, 0, 180);
  } else {
    arc(x, y, 80, 80, 0, 0, PI);
  }
}

function drawArms(x, y) {
  stroke(100, 200, 100);
  strokeWeight(15);
  noFill();
  
  // Left arm
  push();
  translate(x - 90, y - 50);
  rotate(sin(frameCount) * 15);
  line(0, 0, -50, 50);
  pop();

  // Right arm
  push();
  translate(x + 90, y - 50);
  rotate(-sin(frameCount) * 15);
  line(0, 0, 50, 50);
  pop();
}

function drawLegs(x, y) {
  stroke(100, 200, 100);
  strokeWeight(15);
  noFill();

  // Left leg
  line(x - 40, y, x - 40, y + 70);

  // Right leg
  line(x + 40, y, x + 40, y + 70);
}

function drawAntennae(x, y) {
  stroke(150, 250, 150);
  strokeWeight(5);
  noFill();

  // Left antenna
  push();
  translate(x - 40, y);
  rotate(-sin(frameCount * 2) * 10);
  line(0, 0, -30, -50);
  ellipse(-30, -50, 10, 10); // Antenna tip
  pop();

  // Right antenna
  push();
  translate(x + 40, y);
  rotate(sin(frameCount * 2) * 10);
  line(0, 0, 30, -50);
  ellipse(30, -50, 10, 10); // Antenna tip
  pop();
}