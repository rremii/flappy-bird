const canvasWidth = 320
const canvasHeight = 485

class Ground {


    x = 0
    y = canvasHeight - 50
    width = canvasWidth
    height = 50
    speed = 1

    constructor() {
    }

    update() {
        this.x -= this.speed
        if (this.x <= -this.width) this.x = 0
    }


}

module.exports = Ground

