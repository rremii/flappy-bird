import {Store} from "./store.js";

const playBtn = document.querySelector(".play-btn")
const replayBtn = document.querySelector(".replay-btn")
const form = document.querySelector('#form')
const canvas = document.querySelector('#canvas')

const user = {
    name: '',
}

export const setListeners = () => {
    canvas.addEventListener("click", function () {
        const msg = {
            method: 'jump',
            sessionId: Store.sessionId,
            data: {
                name: Store.user.name
            }
        }
        Store.socket.send(JSON.stringify(msg))
    });
    document.addEventListener("keydown", function (event) {
        if (event.keyCode !== 32) return
        const msg = {
            method: 'jump',
            sessionId: Store.sessionId,
            data: {
                name: Store.user.name
            }
        }
        Store.socket.send(JSON.stringify(msg))
    });

    replayBtn.addEventListener("click", function () {
        replayBtn.className = 'replay-btn hidden'

        const msg = {
            method: 'start',
            sessionId: Store.sessionId,
        }


        Store.socket.send(JSON.stringify(msg))

    });
    playBtn.addEventListener("click", function () {
        playBtn.className = 'play-btn hidden'
        replayBtn.className = 'replay-btn hidden'

        const msg = {
            method: 'start',
            sessionId: Store.sessionId,
        }
        Store.socket.send(JSON.stringify(msg))

    });


    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const name = document.forms['form']['name'].value
        const color = document.forms['form']['color'].value

        if (!localStorage.getItem('playerId')) {
            const playerId = Math.random().toString(36).substr(2, 9);
            window.localStorage.setItem("playerId", playerId)
        }

        Store.user.name = name

        if (name.length === 0) return
        const msg = {
            method: 'join',
            sessionId: Store.sessionId,
            data: {
                name, color, playerId: localStorage.getItem('playerId')
            }
        }

        playBtn.className = 'play-btn'
        replayBtn.className = 'replay-btn hidden'
        form.className = 'hidden'

        Store.socket.send(JSON.stringify(msg))

    })
}
