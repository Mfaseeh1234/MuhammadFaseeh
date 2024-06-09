let bird;
let pipes = [];
let gameStarted = false;
let gameOver = false;
let score = 0;
let gravity = 0.6;
let startButton;
let startText;
let gravityDirection = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    fullscreen(true);
    bird = new Bird();
    pipes.push(new Pipe());

    startButton = createButton('Start Game');
    startButton.position(windowWidth / 2 - startButton.width / 2, windowHeight / 2);
    startButton.mousePressed(startGame);
    startText = createP('Press Enter to start');
    startText.position(windowWidth / 2 - startText.width / 2, windowHeight / 2 + 50);
    startText.style('color', 'white');

    setInterval(() => {
        gravityDirection *= -1;
    }, 5000); // Change gravity direction every 5 seconds
}

function draw() {
    background(0);

    if (!gameStarted) {
        return;
    }

    if (gameOver) {
        textAlign(CENTER);
        textSize(32);
        fill(255);
        text("Game Over", width / 2, height / 2);
        textSize(16);
        text("Press R to Restart", width / 2, height / 2 + 30);
        return;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].hits(bird)) {
            gameOver = true;
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
            score++;
        }
    }

    bird.update();
    bird.show();

    if (frameCount % 75 == 0) {
        pipes.push(new Pipe());
    }

    fill(255);
    textSize(16);
    text("Score: " + score, 10, 20);
}

function keyPressed() {
    if (key == ' ') {
        if (gameStarted && !gameOver) {
            bird.up();
        }
    } else if (key == 'R' || key == 'r') {
        restartGame();
    } else if (keyCode === ENTER && !gameStarted) {
        startGame();
    }
}

function startGame() {
    gameStarted = true;
    gameOver = false;
    startButton.hide();
    startText.hide();
}

function restartGame() {
    score = 0;
    gameOver = false;
    pipes = [];
    bird = new Bird();
    pipes.push(new Pipe());
    gameStarted = false;
    startButton.show();
    startText.show();
}

class Bird {
    constructor() {
        this.y = height / 2;
        this.x = 64;
        this.r = 16;
        this.gravity = gravity;
        this.lift = -15;
        this.velocity = 0;
    }

    show() {
        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    up() {
        this.velocity += this.lift * gravityDirection;
    }

    update() {
        this.velocity += this.gravity * gravityDirection;
        this.velocity *= 0.9;
        this.y += this.velocity;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
}

class Pipe {
    constructor() {
        let minHeight = 20;
        let maxHeight = height / 2 - 20;
        this.top = random(minHeight, maxHeight);
        this.bottom = random(minHeight, maxHeight);
        this.x = width;
        this.w = 20;
        this.speed = 3 + score / 3; // Increase speed more aggressively
        this.gap = 100 - score * 4; // Decrease gap more quickly
        if (this.gap < 25) {
            this.gap = 25; // Set minimum gap to 25 pixels (approximately 1 inch)
        }
    }

    show() {
        fill(255);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        return (this.x < -this.w);
    }

    hits(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }
}
