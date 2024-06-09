let carX = 400;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(135, 206, 235); // Sky blue background

  // Ground
  fill(34, 139, 34);
  rect(0, 250, width, 150);

  // Update car position
  carX -= 2;
  if (carX < -300) {
    carX = width; // Reset position for continuous movement
  }

  // Body of the car
  fill(27, 24, 199);
  rect(carX + 50, 200, 300, 50);
  rect(carX + 100, 150, 200, 50);

  // Wheels
  fill(0, 0, 0);
  ellipse(carX + 100, 250, 50, 50);
  ellipse(carX + 300, 250, 50, 50);
  ellipse(carX + 100, 250, 20, 20);
  ellipse(carX + 300, 250, 20, 20);

  // White part of the wheels
  fill(255, 255, 255);
  ellipse(carX + 100, 250, 38, 38);
  ellipse(carX + 300, 250, 38, 38);

  // Bolts
  fill(0, 0, 0);
  ellipse(carX + 100, 250, 14, 14);
  ellipse(carX + 300, 250, 14, 14);

  // Rims
  fill(0, 0, 0);
  rect(carX + 302, 230, 3, 15);
  rect(carX + 296, 230, 3, 15);
  rect(carX + 305, 246, 15, 3);
  rect(carX + 296, 255, 3, 15);
  rect(carX + 305, 252, 15, 3);
  rect(carX + 302, 255, 3, 15);
  rect(carX + 105, 246, 15, 3);
  rect(carX + 102, 255, 3, 15);
  rect(carX + 105, 252, 15, 3);
  rect(carX + 96, 255, 3, 15);
  rect(carX + 102, 230, 3, 15);
  rect(carX + 96, 230, 3, 15);
  rect(carX + 80, 246, 15, 3);
  rect(carX + 280, 245, 15, 3);
  rect(carX + 75, 252, 19, 3);
  rect(carX + 280, 251, 15, 3);

  // Headlights
  fill(255, 255, 255);
  ellipse(carX + 50, 215, 20, 20);

  // Windows
  fill(255, 255, 255);
  rect(carX + 204, 155, 90, 40);
  rect(carX + 105, 155, 90, 40);

  // Rearview mirror
  fill(0, 0, 0);
  rect(carX + 350, 234, 20, 10);
}