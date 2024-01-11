import {Ground} from "../entities/ground/ground.js";
import {Pipe} from "../entities/pipe/pipe.js";
import {drawBackground} from "../main.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas?.getContext("2d", {willReadFrequently: true});


export const canvasHeight = 485
export const canvasWidth = 320

class GameService {
    ground = new Ground()
    pipeGates = []


    constructor() {

        // this.ground.draw()

    }

    draw(payload) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawBackground()

        const {ground: groundData, pipeGates} = payload.data

        console.log(groundData.x)
        this.ground.x = groundData.x
        this.ground.draw()

        this.pipeGates = pipeGates

        this.pipeGates.forEach(gate => {
            const {x, y, height, width} = gate


            const bottomPipe = new Pipe(x, -30 + y + height - 10, canvasHeight - y - height)
            bottomPipe.draw()


            const topPipe = new Pipe(x, -30, y)
            topPipe.draw()
        })

    }

}

export const gameService = new GameService()