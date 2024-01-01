import {drawService} from "./services/drawService.js";
import {CreateParallelepiped, CreateRect} from "./entities/fabrics.js";
import {Bird} from "./entities/bird/bird.js";
import {Ellipse} from "./entities/Ellipse.js";
import {Ground} from "./entities/ground/ground.js";
import {Pipe} from "./entities/pipe/pipe.js";


const canvas = document.querySelector("#canvas");
const ctx = canvas?.getContext("2d");
const groundHeight = 30;
let birdImageframe = 0;
const flapInterval = 50;
const birdGravity = 0.20;
const birdJump = -4.6;
const pipes = [];
const pipeWidth = 52;
const minGap = 110;
const maxGap = 190;
const pipeGap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
let score = 0;
let running = false;

// Set canvas size
canvas.width = 320;
canvas.height = 480;


const birdImg1 = new Image();
birdImg1.src = "https://assets.codepen.io/1290466/flappy-bird-1.png?format=auto";
const birdImg2 = new Image();
birdImg2.src = "https://assets.codepen.io/1290466/flappy-bird-2.png?format=auto";
const birdImg3 = new Image();
birdImg3.src = "https://assets.codepen.io/1290466/flappy-bird-3.png?format=auto";
const birdImg4 = new Image();
birdImg4.src = "https://assets.codepen.io/1290466/flappy-bird-2.png?format=auto";
const backgroundImg = new Image();
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
const ground = new Ground()

const pipe = new Pipe()
pipe.draw()

const addPipe = function () {

    const height = Math.floor(Math.random() * canvas.height / 2) + 50;
    const y = height - pipeGap / 2;
    // pipes.push({
    //     x: canvas.width,
    //     y: y,
    //     width: pipeWidth,
    //     height: height
    // });

    const pipe = new Pipe(canvas.width, y, height)

    pipes.push(pipe)
};

setInterval(function () {
    birdImageframe++;
}, flapInterval);

addPipe();

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
    pipes.length = 0;
    addPipe();
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
    // ground.draw();
    drawBackground();

    ground.draw()
    ground.update()
    pipe.draw(100, 285)

    if (bird.speed !== 0)
        bird.update()
    bird.draw()

    if (!running) return;


    pipes.forEach((pipe) => {
        pipe.draw()
        pipe.x--
    })
    // debugger
    // Draw and update pipes
    for (let i = 0; i < pipes.length; i++) {
        // ctx.fillStyle = ctx.createPattern(pipesBackgroundImg, "repeat");
        ctx.fillRect(pipes[i].x, 0, pipes[i].width, pipes[i].y);
        ctx.fillRect(pipes[i].x, pipes[i].y + pipeGap, pipes[i].width, canvas.height - pipes[i].y - pipeGap);

        // Top pipe
        ctx.beginPath();
        ctx.strokeStyle = "#618842";
        ctx.lineWidth = 4;
        ctx.moveTo(pipes[i].x, pipes[i].y);
        ctx.lineTo(pipes[i].x + pipes[i].width, pipes[i].y);
        ctx.stroke();
        ctx.drawImage(pipesBackgroundImg, pipes[i].x, 0, pipes[i].width, pipes[i].y);

        // Bottom pipe
        ctx.beginPath();
        ctx.strokeStyle = "#618842";
        ctx.lineWidth = 4;
        ctx.moveTo(pipes[i].x, pipes[i].y + pipeGap);
        ctx.lineTo(pipes[i].x + pipes[i].width, pipes[i].y + pipeGap);
        ctx.stroke();
        ctx.drawImage(pipesBackgroundImg, pipes[i].x, pipes[i].y + pipeGap, pipes[i].width, canvas.height - pipes[i].y - pipeGap - groundHeight);

        pipes[i].x -= 1;

        // if game over / Check for collisions
        if (
            bird.x - 31 < pipes[i].x + pipes[i].width &&
            bird.x - 31 + bird.width > pipes[i].x &&
            (bird.y - 27 < pipes[i].y || bird.y + 2 + bird.height > pipes[i].y + pipeGap)
        ) {
            running = false;

            //todo
            // hitSound.play();

            // ground.draw();

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
                pipes.length = 0;
                addPipe();
                gameLoop();

                // backgroundMusic.loop = true;
                // backgroundMusic.play();
            });

            document.body.appendChild(replayBtn);

            return;
        }

        // Check if bird has passed the pipe and add point to score
        if (bird.x > pipes[i].x + pipes[i].width && !pipes[i].passed) {
            pipes[i].passed = true;
            pointSound.play();
            score++;
        }

        // Add a new pipe when the current pipe has moved off the screen
        if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
            i--;
            addPipe();
        }
    }


    ground.update();
    // ground.draw();

    scoreElement.textContent = score;


    // Keep the bird within the bounds of the canvas
    if (bird.y + bird.height / 2 > canvas.height - groundHeight) {
        bird.y = canvas.height - groundHeight - bird.height / 2;
        bird.speed = 0;
    } else if (bird.y < 0) {
        bird.y = 0;
        bird.speed = -0.1;
    }


    requestAnimationFrame(gameLoop);

};

gameLoop();


// ctx.beginPath();
// ctx.ellipse(100, 100, 25, 75, Math.PI * 0.5, 0, 2 * Math.PI);
// ctx.stroke();


// drawService.drawCircle(50,50,50,'red')


