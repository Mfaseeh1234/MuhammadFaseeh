function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(255);
  let cols = 20;
  let rows = 20;
  let w = width / cols;
  let h = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let col1 = color(map(i, 0, cols, 0, 255), 0, map(j, 0, rows, 255, 0));
      let col2 = color(map(j, 0, rows, 0, 255), map(i, 0, cols, 255, 0), 150);
      
      setGradient(x, y, w, h, col1, col2);
    }
  }
}

function setGradient(x, y, w, h, c1, c2) {
  for (let i = 0; i <= h; i++) {
    let inter = map(i, 0, h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, y + i, x + w, y + i);
  }
}