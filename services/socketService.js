import {gameService} from "./GameService.js";
import {Store} from "../store.js";

const playBtn = document.querySelector(".play-btn")
const form = document.querySelector('#form')
const replayBtn = document.querySelector(".replay-btn")
const toast = document.querySelector(".toast")
const toastInner = document.querySelector(".toast-inner")

const hitSound = new Audio("https://assets.codepen.io/1290466/flappy-bird-hit.mp3");
const pointSound = new Audio("https://assets.codepen.io/1290466/flappy-bird-point.mp3");
const backgroundMusic = new Audio("https://assets.codepen.io/1290466/flappy-bird-background.mp3");


class SocketService {
    isRunning = false

    join(payload) {
        toast.textContent = payload.data
        toast.className = 'toast active'
        replayBtn.className = 'replay-btn hidden'

        const interval = setInterval(() => {
            toast.className = 'toast'
            window.clearInterval(interval)
        }, 3000)
    }

    finish(payload) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;

        const winner = payload.data?.winner

        toast.textContent = 'player ' + winner.name + " has won"
        toast.className = 'toast active'

        const interval = setInterval(() => {
            toast.className = 'toast'
            window.clearInterval(interval)
        }, 3000)


        replayBtn.className = 'replay-btn'
        gameService.finish()
    }

    draw(payload) {
        if (this.isRunning && Store.user.name)
            gameService.draw(payload)
    }

    makeDeadSound() {
        hitSound.play()
    }

    makeScoreSound() {
        pointSound.play()
    }

    start(payload) {
        if (payload.data.isRunning) {
            this.isRunning = true
            playBtn.className = 'playBtn hidden'
            replayBtn.className = 'replay-btn hidden'
            backgroundMusic.play()
        }

        gameService.start(payload)
    }

}

export const socketService = new SocketService()
