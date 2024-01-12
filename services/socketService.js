import {gameService} from "./GameService.js";
import {Store} from "../store.js";

const playBtn = document.querySelector(".play-btn")
const form = document.querySelector('#form')
const replayBtn = document.querySelector(".replay-btn")
const toast = document.querySelector(".toast")
const toastInner = document.querySelector(".toast-inner")


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

    start(payload) {
        if (payload.data.isRunning) {
            this.isRunning = true
            playBtn.className = 'playBtn hidden'
            replayBtn.className = 'replay-btn hidden'
        }

        gameService.start(payload)
    }

}

export const socketService = new SocketService()
