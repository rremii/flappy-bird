import {Ground} from "../entities/ground/ground.js";
import {Pipe} from "../entities/pipe/pipe.js";
import {drawBackground} from "../main.js";
import {Bird} from "../entities/bird/bird.js";

const canvas = document.querySelector("#canvas");
const scoreEl = document.querySelector(".score");
const ctx = canvas?.getContext("2d", {willReadFrequently: true});


export const canvasHeight = 485
export const canvasWidth = 320

class GameService {
    ground = new Ground()
    pipeGates = []
    birds = []


    constructor() {

        // this.ground.draw()

    }

    finish() {
        // this.birds.forEach((bird) => {
        //     window.clearInterval(bird.flapInterval)
        //     bird.flapInterval = null
        // })
    }

    start(payload) {
        const {birds} = payload.data

        birds.forEach((bird) => {
            const birdModel = new Bird()
            birdModel.gravity = bird.gravity
            birdModel.height = bird.height
            birdModel.jump = bird.jump
            birdModel.speed = bird.speed
            birdModel.width = bird.width
            birdModel.x = bird.x
            birdModel.y = bird.y
            birdModel.name = bird.name
            birdModel.color = bird.color

            this.birds.push(birdModel)
        })
    }

    draw(payload) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawBackground()

        const {ground: groundData, pipeGates, birds, score} = payload.data

        scoreEl.innerHTML = score + ''
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

        birds.forEach((birdData) => {
            const bird = this.birds.find(({name}) => name === birdData.name)

            bird.x = birdData.x
            bird.y = birdData.y
            bird.speed = birdData.speed
            bird.flapFrame = birdData.flapFrame

            bird.draw()
        })


    }

}

export const gameService = new GameService()