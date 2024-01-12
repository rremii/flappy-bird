const canvasWidth = 320
const canvasHeight = 485

const birdGravity = 0.30;
const birdJump = -5;
let birdImageframe = 0;
const flapInterval = 70;


module.exports = class Bird {

    name = ''

    flapFrame = 0

    wingStates = []

    bgColor = "yellow"
    x = 50
    y = canvasHeight / 2 - 50
    width = 62
    height = 45
    speed = 0.1
    gravity = birdGravity
    jump = birdJump

    update() {
        this.speed += this.gravity;
        this.y += this.speed;

        if (this.speed < 0) {
            this.flapFrame++
            if (this.flapFrame >= 9) this.flapFrame = 0
        }
    }


    constructor(name, color) {
        this.name = name
        this.color = color
    }


    draw() {


    }


}