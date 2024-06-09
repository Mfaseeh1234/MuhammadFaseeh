let mic, fft;
let particles = [];
let numParticles = 200; // Increased number of particles
let attractor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize microphone input
  mic = new p5.AudioIn();
  mic.start();
  
  // Initialize FFT for audio frequency analysis
  fft = new p5.FFT();
  fft.setInput(mic);
  
  // Create particles
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  
  // Attractor point starts in the middle
  attractor = createVector(width / 2, height / 2);
}

function draw() {
  // Create a dynamic gradient background
  let vol = mic.getLevel();
  let bgColor = map(vol, 0, 1, 0, 255);
  background(bgColor, 50, 150);

  // Update attractor position to follow mouse
  attractor.set(mouseX, mouseY);
  
  // Get the frequency spectrum
  let spectrum = fft.analyze();
  
  // Update and display particles
  for (let p of particles) {
    p.applyForce(attractor, spectrum);
    p.update();
    p.show();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.r = random(5, 10); // Random size for variety
    this.hue = random(360); // Starting hue for color
    this.trail = [];
  }
  
  applyForce(target, spectrum) {
    let force = p5.Vector.sub(target, this.pos);
    let distance = force.mag();
    distance = constrain(distance, 5, 50); // Adjusted range for smoother behavior
    
    // Calculate the frequency influence based on the low frequency range
    let freqInfluence = spectrum.slice(0, 50).reduce((a, b) => a + b, 0) / 50;
    let magnitude = map(freqInfluence, 0, 255, 0, 100);
    
    // Apply force inversely proportional to distance squared
    force.setMag(magnitude / (distance * distance));
    this.acc.add(force);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    // Add friction
    this.vel.mult(0.95);
    
    // Update hue for color cycling
    this.hue = (this.hue + 1) % 360;
    
    // Add to trail for a particle trail effect
    this.trail.push(this.pos.copy());
    if (this.trail.length > 10) {
      this.trail.shift();
    }
  }
  
  show() {
    // Draw particle
    fill(this.hue, 100, 100);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    
    // Draw trail
    for (let i = 0; i < this.trail.length; i++) {
      let pos = this.trail[i];
      fill(this.hue, 100, 100, map(i, 0, this.trail.length, 0, 255));
      ellipse(pos.x, pos.y, this.r);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255); // Using HSB for vibrant colors

  // Initialize microphone input
  mic = new p5.AudioIn();
  mic.start();
  
  // Initialize FFT for audio frequency analysis
  fft = new p5.FFT();
  fft.setInput(mic);
  
  // Create particles
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  
  // Attractor point starts in the middle
  attractor = createVector(width / 2, height / 2);
}