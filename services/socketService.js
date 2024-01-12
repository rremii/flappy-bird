import {gameService} from "./GameService.js";
import {Store} from "../store.js";

const playBtn = document.querySelector(".play-btn")
const form = document.querySelector('#form')
const replayBtn = document.querySelector(".replay-btn")


class SocketService {
    // isRunning = false

    join(payload) {
        alert(payload.data)
    }

    finish() {
        alert("finished")
        // this.isRunning = false
        replayBtn.className = 'replay-btn'
        gameService.finish()
    }

    draw(payload) {
        // if (this.isRunning)
        gameService.draw(payload)
    }

    start(payload) {
        if (payload.data.isRunning) {
            // this.isRunning = true
            playBtn.className = 'playBtn hidden'
        }

        gameService.start(payload)
    }

}

export const socketService = new SocketService()
