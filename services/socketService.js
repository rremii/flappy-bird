import {gameService} from "./GameService.js";

const playBtn = document.querySelector(".play-btn")
const form = document.querySelector('#form')


class SocketService {


    join(payload) {
        alert(payload.data)
    }

    draw(payload) {
        gameService.draw(payload)

        
    }

    start(payload) {
        if (payload.data.isRunning)
            playBtn.className = 'playBtn hidden'

    }

}

export const socketService = new SocketService()
