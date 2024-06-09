let data = []; // Array to store random data values
let numOfBars = 10; // Number of bars in the chart
let barWidth;
let colors = []; // Array to store colors for each bar

function setup() {
  createCanvas(800, 400);
  generateData();
  generateColors();
}

function generateData() {
  for (let i = 0; i < numOfBars; i++) {
    data.push(random(10, height - 50)); // Generating random data values
  }
}

function generateColors() {
  for (let i = 0; i < numOfBars; i++) {
    let hue = map(i, 0, numOfBars - 1, 0, 360); // Map index to hue value
    colors.push(color('hsb(' + hue + ', 100%, 100%)')); // Convert hue to color
  }
}

function draw() {
  background(240);
  barWidth = width / data.length;
  drawChart();
}

function drawChart() {
  // Drawing bars
  for (let i = 0; i < data.length; i++) {
    let x = i * barWidth;
    let h = map(data[i], 0, height, 0, height);
    
    // Draw rounded bars with gradient fill
    let c = colors[i];
    fill(c);
    strokeWeight(2);
    stroke(255);
    rect(x, height - h, barWidth - 1, h, 20);
    
    // Adding interactivity: Highlight bar on mouse hover
    if (mouseX > x && mouseX < x + barWidth && mouseY > height - h && mouseY < height) {
      fill(255, 200);
      rect(x, height - h, barWidth - 1, h, 20);
    }
    
    // Smoothly animate bar height change
    let targetHeight = map(data[i], 0, height, 0, height);
    let currentHeight = height - h;
    currentHeight += (targetHeight - currentHeight) * 0.05;
    
    // Displaying data value above the bar
    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(14);
    text(int(data[i]), x + barWidth / 2, currentHeight - 10);
  }
}

// Update data value on mouse click
function mousePressed() {
  for (let i = 0; i < data.length; i++) {
    let x = i * barWidth;
    if (mouseX > x && mouseX < x + barWidth && mouseY > height - data[i] && mouseY < height) {
      data[i] = random(10, height - 50);
      break;
    }
  }
}
