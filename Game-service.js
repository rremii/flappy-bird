const Ground = require("./entities/ground/ground");
const Bird = require("./entities/bird/bird");

const minGap = 130;
const maxGap = 210;

// const canvasWidth = 320
// const canvasHeight = 400
const canvasWidth = 320
const canvasHeight = 480
const groundHeight = 30;

const addPipeGate = function () {
    const pipeGap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

    const height = Math.floor(Math.random() * canvasHeight / 2);

    this.pipeGates.push({
        x: canvasWidth,
        y: height,
        width: 70,
        height: pipeGap
    })
};

class GameService {
    isRunning = false
    score = 0

    winner = null
    birds = []
    pipeGates = [];

    ground = new Ground()

    finish = () => {
        this.isRunning = false
        this.pipeGates = []
        this.ground = new Ground()
        this.birds = []
        this.score = 0
        this.winner = null
    }

    start = (players) => {
        this.finish()

        this.isRunning = true


        players.forEach(({name, color}) => {
            const bird = new Bird(name, color)
            this.birds.push(bird)
        })
        console.log(players)
        console.log(this.birds)

        addPipeGate.call(this)

        return {isRunning: this.isRunning, birds: this.birds}
    }

    jump = (name) => {

        const bird = this.birds.find(bird => bird.name === name)
        if (bird)
            bird.speed = bird.jump;

    }


    update = () => {
        if (!this.isRunning) return


        this.ground.update()

        this.pipeGates.forEach((gate) => {
            const {x, y, height, width} = gate

            gate.x--


            this.birds.forEach((bird) => {


                if (bird.x - 25 > gate.x + gate.width && !gate.passed) {
                    gate.passed = true;
                    this.score++;
                }
                const isBirdOver = bird.x - 25 + bird.width > x && bird.x - 25 < x + width
                const isBirdBetween = (bird.y - 20) > y && (bird.y - 20 + bird.height) < y + height - 20


                if (isBirdOver && !isBirdBetween) {
                    this.winner = this.birds[0]
                    this.birds = this.birds.filter(({name}) => name !== bird.name)
                }

            })

            // Add a new pipe when the current pipe has moved off the screen
            if (gate.x + gate.width < 0) {
                this.pipeGates.splice(0);
                addPipeGate.call(this);
            }

        })

        this.birds.forEach((bird) => {
            bird.update()


            // Keep the bird within the bounds of the canvas
            if (bird.y + bird.height / 2 - 10 > canvasHeight - groundHeight) {
                bird.y = canvasHeight - groundHeight - bird.height / 2 + 10;
                bird.speed = 0;
            } else if (bird.y < 0) {
                bird.y = 0;
                bird.speed = -0.1;
            }
        })
        const birds = this.birds.map((bird) => {
            return {
                name: bird.name,
                color: bird.color,
                x: bird.x,
                y: bird.y,
                speed: bird.speed,
                flapFrame: Math.floor(bird.flapFrame / 2)
            }
        })


        return {ground: this.ground, pipeGates: this.pipeGates, birds, score: this.score,}
    }

}

module.exports = {
    gameService: new GameService()
}
