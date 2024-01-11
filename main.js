import {CreateParallelepiped, CreateRect} from "./entities/fabrics.js";
import {Bird} from "./entities/bird/bird.js";
import {Ground} from "./entities/ground/ground.js";
import {Pipe} from "./entities/pipe/pipe.js";
import {socketService} from "./services/socketService.js";
import {Store} from "./store.js";
import {setListeners} from "./listeners.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas?.getContext("2d", {willReadFrequently: true});
const groundHeight = 30;

// let score = 0;
// let running = false;


const backgroundImg = new Image();
backgroundImg.crossOrigin = "Anonymous"
backgroundImg.src = "https://assets.codepen.io/1290466/flappy-bird-bg-bottom.jpg?format=auto";

// // Sounds
// const hitSound = new Audio("https://assets.codepen.io/1290466/flappy-bird-hit.mp3");
// const pointSound = new Audio("https://assets.codepen.io/1290466/flappy-bird-point.mp3");
// const backgroundMusic = new Audio("https://assets.codepen.io/1290466/flappy-bird-background.mp3");
//

//
// const scoreElement = document.createElement("span")
// scoreElement.textContent = 0;
// scoreElement.style.position = "absolute";
// scoreElement.style.left = "50%";
// scoreElement.style.top = "35px";
// scoreElement.style.transform = "translate(-50%, -50%)";
// document.body.appendChild(scoreElement);
//
// // Create the bird object
// const bird = new Bird()
// const collision = CreateRect(62, 45, {})
// collision.shiftInitial(-25, -20)
//
// const ground = new Ground()
//
//
// const addPipeGate = function () {
//     const pipeGap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
//
//     const height = Math.floor(Math.random() * canvas.height / 2);
//
//
//     pipeGates.push({
//         x: canvas.width,
//         y: height,
//         width: 70,
//         height: pipeGap
//     })
// };
//
//
// addPipeGate();
//
// // Listen for clicks to make the bird jump
// canvas.addEventListener("click", function () {
//     bird.speed = bird.jump;
// });
//
// // Listen for sparebar press to make the bird jump
// document.addEventListener("keydown", function (event) {
//     if (event.keyCode === 32) {
//         bird.speed = bird.jump;
//     }
// });
//
//
// // const helpText = document.createElement("p")
// // helpText.innerHTML = "TAP to jump on Mobile <br /><br /> SPACEBAR to jump on Destop";
// // helpText.style.position = "absolute";
// // helpText.style.left = "50%";
// // helpText.style.top = "75%";
// // helpText.style.transform = "translate(-50%, -50%)";
// // document.body.appendChild(helpText);
//
// // The game loop
// const gameLoop = function () {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBackground();
//
//     if (!running) return;
//     ground.draw()
//     ground.update()
//
//     if (bird.speed !== 0)
//         bird.update()
//
//
//     collision.shift(bird.x, bird.y)
//     // collision.draw()
//     pipeGates.forEach((gate) => {
//         const {x, y, height, width} = gate
//
//
//         const bottomPipe = new Pipe(x, -30 + y + height - 10, canvas.height - y - height)
//         bottomPipe.draw()
//
//         bird.draw()
//
//         const topPipe = new Pipe(x, -30, y)
//         topPipe.draw()
//
//         gate.x--
//
//         const isBirdOver = bird.x - 25 + bird.width > x && bird.x - 25 < x + width
//         const isBirdBetween = (bird.y - 20) > y && (bird.y - 20 + bird.height) < y + height - 20
//         if (isBirdOver && !isBirdBetween) {
//             running = false;
//
//             hitSound.play();
//
//
//             backgroundMusic.pause();
//             backgroundMusic.currentTime = 0;
//
//             console.log("Game Over!");
//
//             const replayBtn = document.createElement("button")
//
//             replayBtn.innerText = "Replay";
//             replayBtn.style.position = "absolute";
//             replayBtn.style.left = "50%";
//             replayBtn.style.top = "50%";
//             replayBtn.style.transform = "translate(-50%, -50%)";
//             replayBtn.addEventListener("click", function () {
//                 document.body.removeChild(replayBtn);
//                 running = true;
//                 // Reset game variables to their initial values
//                 score = 0;
//                 pipeGates.length = 0;
//                 addPipeGate();
//                 gameLoop();
//
//                 backgroundMusic.loop = true;
//                 backgroundMusic.play();
//             });
//
//             document.body.appendChild(replayBtn);
//
//             return
//         }
//
//         // Check if bird has passed the pipe and add point to score
//         if (bird.x - 25 > gate.x + gate.width && !gate.passed) {
//             gate.passed = true;
//             pointSound.play();
//             score++;
//         }
//
//         // Add a new pipe when the current pipe has moved off the screen
//         if (gate.x + gate.width < 0) {
//             pipeGates.splice(0);
//             addPipeGate();
//         }
//
//     })
//
//
//     scoreElement.textContent = score;
//
//
//     // Keep the bird within the bounds of the canvas
//     if (bird.y + bird.height / 2 - 10 > canvas.height - groundHeight) {
//         bird.y = canvas.height - groundHeight - bird.height / 2 + 10;
//         bird.speed = 0;
//     } else if (bird.y < 0) {
//         bird.y = 0;
//         bird.speed = -0.1;
//     }
//
//
//     requestAnimationFrame(gameLoop);
//
// };

// gameLoop();

export const drawBackground = function () {
    ctx.fillStyle = "#71c4cc";
    ctx.fillRect(0, 0, canvas.width, canvas.height - groundHeight);
    ctx.drawImage(backgroundImg, 0, canvas.height - backgroundImg.height);
};

drawBackground();

setListeners()


const Start = () => {


    if (!Store.sessionId) {
        Store.sessionId = Math.random().toString(36).substr(2, 9);

        window.location.href = "http://localhost:5173/" + Store.sessionId;
    } else {
        Store.socket = new WebSocket("ws://localhost:5000/")

        Store.socket.onopen = function () {
            const msg = {
                method: "connection",
                sessionId: Store.sessionId
            }
            Store.socket.send(JSON.stringify(msg))
        }

        Store.socket.onclose = function (event) {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения'); // например, "убит" процесс сервера
            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        }

        Store.socket.onmessage = function (event) {
            const payload = JSON.parse(event.data)

            switch (payload.method) {
                case "join": {
                    socketService.join(payload)
                    break
                }
                case "draw": {
                    socketService.draw(payload)
                    break
                }
                case "start": {
                    socketService.start(payload)
                }
            }
        }

        Store.socket.onerror = function (error) {
            console.log("Ошибка " + error.message);
        }
    }
}
Start()




