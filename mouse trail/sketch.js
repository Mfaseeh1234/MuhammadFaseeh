let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
}

function draw() {
  // Semi-transparent background for fading effect
  background(30, 30, 30, 50);
  
  // Add new particles
  if (mouseIsPressed || (pmouseX != mouseX || pmouseY != mouseY)) {
    particles.push(new Particle(mouseX, mouseY));
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].isAlive()) {
      particles[i].display();
    } else {
      particles.splice(i, 1);  // Remove dead particles
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Particle class definition
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(15, 35);
    this.color = this.randomColor();
    this.lifespan = 255;
    this.angle = random(TWO_PI);
    this.angularSpeed = random(-0.05, 0.05);
    this.trail = [];
  }
  
  update() {
    // Update position with some random movement
    this.x += cos(this.angle) * 2;
    this.y += sin(this.angle) * 2;
    this.angle += this.angularSpeed;

    // Add to the particle's trail
    this.trail.push({ x: this.x, y: this.y, size: this.size, lifespan: this.lifespan });

    // Remove old trail points
    if (this.trail.length > 20) {
      this.trail.shift();
    }

    // Shrink and fade particle over time
    this.size *= 0.97;
    this.lifespan -= 5;
  }

  isAlive() {
    return this.lifespan > 0;
  }
  
  display() {
    // Draw the trail
    for (let i = 0; i < this.trail.length; i++) {
      let t = this.trail[i];
      fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], t.lifespan / 2);
      ellipse(t.x, t.y, t.size * (1 - i / this.trail.length));
    }
    
    // Blend mode for interesting effects
    blendMode(ADD);
    
    // Draw the main particle
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    ellipse(this.x, this.y, this.size);

    // Reset blend mode
    blendMode(BLEND);
  }

  // Randomly pick a color for the particle
  randomColor() {
    let r = random(100, 255);
    let g = random(100, 255);
    let b = random(100, 255);
    return color(r, g, b);
  }
}
