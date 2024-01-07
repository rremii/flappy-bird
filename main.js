import {drawService} from "./services/drawService.js";
import {CreateParallelepiped, CreateRect} from "./entities/fabrics.js";
import {Bird} from "./entities/bird/bird.js";
import {Ellipse} from "./entities/Ellipse.js";
import {Ground} from "./entities/ground/ground.js";
import {Pipe} from "./entities/pipe/pipe.js";


const canvas = document.querySelector("#canvas");
const ctx = canvas?.getContext("2d", {willReadFrequently: true});
const groundHeight = 30;
let birdImageframe = 0;
const flapInterval = 50;
const birdGravity = 0.20;
const birdJump = -4.6;
const pipeGates = [];
const pipeWidth = 52;
const minGap = 130;
const maxGap = 210;
let score = 0;
let running = false;


const birdImg1 = new Image();
birdImg1.src = "https://assets.codepen.io/1290466/flappy-bird-1.png?format=auto";
const birdImg2 = new Image();
birdImg2.src = "https://assets.codepen.io/1290466/flappy-bird-2.png?format=auto";
const birdImg3 = new Image();
birdImg3.src = "https://assets.codepen.io/1290466/flappy-bird-3.png?format=auto";
const birdImg4 = new Image();
birdImg4.src = "https://assets.codepen.io/1290466/flappy-bird-2.png?format=auto";
const backgroundImg = new Image();
backgroundImg.crossOrigin = "Anonymous"
backgroundImg.src = "https://assets.codepen.io/1290466/flappy-bird-bg-bottom.jpg?format=auto";
const groundImg = new Image();
groundImg.src = "https://assets.codepen.io/1290466/ground2.jpg?format=auto";
const pipesBackgroundImg = new Image();
pipesBackgroundImg.src = "https://assets.codepen.io/1290466/pipe-bg.jpg?format=auto";

// Sounds
const hitSound = new Audio("https://assets.codepen.io/1290466/flappy-bird-hit.mp3");
const pointSound = new Audio("https://assets.codepen.io/1290466/flappy-bird-point.mp3");
const backgroundMusic = new Audio("https://assets.codepen.io/1290466/flappy-bird-background.mp3");
// const hitSound = new Audio("https://assets.codepen.io/1290466/flappy-bird-hit");
// const pointSound = new Audio("https://assets.codepen.io/1290466/flappy-bird-point");
// const backgroundMusic = new Audio("https://assets.codepen.io/1290466/flappy-bird-background");

const drawBackground = function () {
    ctx.fillStyle = "#71c4cc";
    ctx.fillRect(0, 0, canvas.width, canvas.height - groundHeight);
    ctx.drawImage(backgroundImg, 0, canvas.height - backgroundImg.height);
};

const scoreElement = document.createElement("span")
scoreElement.textContent = 0;
scoreElement.style.position = "absolute";
scoreElement.style.left = "50%";
scoreElement.style.top = "35px";
scoreElement.style.transform = "translate(-50%, -50%)";
document.body.appendChild(scoreElement);

// Create the bird object
const bird = new Bird()
const collision = CreateRect(62, 45, {})
collision.shiftInitial(-25, -20)

const ground = new Ground()


const addPipeGate = function () {
    const pipeGap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

    const height = Math.floor(Math.random() * canvas.height / 2);


    pipeGates.push({
        x: canvas.width,
        y: height,
        width: 70,
        height: pipeGap
    })
};

setInterval(function () {
    birdImageframe++;
}, flapInterval);

addPipeGate();

// Listen for clicks to make the bird jump
canvas.addEventListener("click", function () {
    bird.speed = bird.jump;
});

// Listen for sparebar press to make the bird jump
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 32) {
        bird.speed = bird.jump;
    }
});

const playBtn = document.createElement("button")
playBtn.innerText = "Play";
playBtn.style.position = "absolute";
playBtn.style.left = "50%";
playBtn.style.top = "50%";
playBtn.style.transform = "translate(-50%, -50%)";
playBtn.addEventListener("click", function () {
    document.body.removeChild(playBtn);
    document.body.removeChild(helpText);
    running = true;
    // Set game variables
    score = 0;
    pipeGates.length = 0;
    addPipeGate();
    gameLoop();

    //todo
    // backgroundMusic.loop = true;
    // backgroundMusic.play();
});

document.body.appendChild(playBtn);

const helpText = document.createElement("p")
helpText.innerHTML = "TAP to jump on Mobile <br /><br /> SPACEBAR to jump on Destop";
helpText.style.position = "absolute";
helpText.style.left = "50%";
helpText.style.top = "75%";
helpText.style.transform = "translate(-50%, -50%)";
document.body.appendChild(helpText);

// The game loop
const gameLoop = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    if (!running) return;
    ground.draw()
    ground.update()

    if (bird.speed !== 0)
        bird.update()


    collision.shift(bird.x, bird.y)
    collision.draw()
    pipeGates.forEach((gate) => {
        const {x, y, height, width} = gate


        const bottomPipe = new Pipe(x, -30 + y + height - 10, canvas.height - y - height)
        bottomPipe.draw()

        bird.draw()

        const topPipe = new Pipe(x, -30, y)
        topPipe.draw()

        gate.x--

        const isBirdOver = bird.x - 25 + bird.width > x && bird.x - 25 < x + width
        const isBirdBetween = (bird.y - 20) > y && (bird.y - 20 + bird.height) < y + height - 20
        if (isBirdOver && !isBirdBetween) {
            running = false;

            // hitSound.play();


            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;

            console.log("Game Over!");

            const replayBtn = document.createElement("button")

            replayBtn.innerText = "Replay";
            replayBtn.style.position = "absolute";
            replayBtn.style.left = "50%";
            replayBtn.style.top = "50%";
            replayBtn.style.transform = "translate(-50%, -50%)";
            replayBtn.addEventListener("click", function () {
                document.body.removeChild(replayBtn);
                running = true;
                // Reset game variables to their initial values
                score = 0;
                pipeGates.length = 0;
                addPipeGate();
                gameLoop();

                // backgroundMusic.loop = true;
                // backgroundMusic.play();
            });

            document.body.appendChild(replayBtn);

            return
        }

        // Check if bird has passed the pipe and add point to score
        if (bird.x - 25 > gate.x + gate.width && !gate.passed) {
            gate.passed = true;
            pointSound.play();
            score++;
        }

        // Add a new pipe when the current pipe has moved off the screen
        if (gate.x + gate.width < 0) {
            pipeGates.splice(0);
            addPipeGate();
        }

    })


    scoreElement.textContent = score;


    // Keep the bird within the bounds of the canvas
    if (bird.y + bird.height / 2 - 10 > canvas.height - groundHeight) {
        bird.y = canvas.height - groundHeight - bird.height / 2 + 10;
        bird.speed = 0;
    } else if (bird.y < 0) {
        bird.y = 0;
        bird.speed = -0.1;
    }


    requestAnimationFrame(gameLoop);

};

gameLoop();

bird.draw()

// const cube = CreateParallelepiped(50, 50, 25, {})
//
// cube.draw(10, 300, 0, "lime")


// const ellipse = new Ellipse(50, 25, {})
//
// ellipse.draw(50, 50, "green", "black")