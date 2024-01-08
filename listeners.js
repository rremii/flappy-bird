import {Store} from "./store.js";

const playBtn = document.querySelector(".play-btn")
const form = document.querySelector('#form')


export const setListeners = () => {


    playBtn.addEventListener("click", function () {
        playBtn.className = 'play-btn hidden'


        const msg = {
            method: 'start',
            sessionId: Store.sessionId,
        }
        Store.socket.send(JSON.stringify(msg))

        // running = true;
        // // Set game variables
        // score = 0;
        // pipeGates.length = 0;
        // addPipeGate();
        // gameLoop();
        //
        // //todo
        // backgroundMusic.loop = true;
        // backgroundMusic.play();
    });


    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const name = document.forms['form']['name'].value
        const color = document.forms['form']['color'].value

        if (name.length === 0) return
        const msg = {
            method: 'join',
            sessionId: Store.sessionId,
            data: {
                name, color
            }
        }

        playBtn.className = 'play-btn'
        form.className = 'hidden'
        
        Store.socket.send(JSON.stringify(msg))

    })
}
