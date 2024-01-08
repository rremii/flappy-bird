const playBtn = document.querySelector(".play-btn")
const form = document.querySelector('#form')


class SocketService {

    join(payload) {
        alert(payload.data)
    }

    draw(payload) {


        console.log(payload.data)


    }

    start(payload) {
        if (payload.data.isRunning)
            playBtn.className = 'playBtn hidden'

    }

}

export const socketService = new SocketService()
