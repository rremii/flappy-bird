import {CreateParallelepiped} from "../fabrics.js";
import {drawService} from "../../services/drawService.js";
import {Ellipse} from "../Ellipse.js";

const canvas = document.querySelector("#canvas");


const birdGravity = 0.30;
const birdJump = -5;
// let birdImageframe = 0;
const flapInterval = 70;


export class Bird {

    body = null
    head = null
    wing = null
    eye1 = null
    eye2 = null

    // flapInterval = null
    flapFrame = 0

    wingStates = []

    color = 'yellow'
    name = ''

    x = 50
    y = canvas.height / 2 - 50
    width = 62
    height = 45
    speed = 0.1
    gravity = birdGravity
    jump = birdJump


    constructor() {

        // const OnFlapChange = () => {
        //     this.flapframe++
        //     if (this.flapframe >= 5) this.flapframe = 0
        // }
        //
        // this.flapInterval = setInterval(OnFlapChange, 60);
        // console.log(this.flapInterval)

        const mainShiftX = -25
        const mainShiftY = -20

        const body = CreateParallelepiped(40, 30, 15, {bgColor: "yellow"})
        body.shift(mainShiftX, mainShiftY)
        this.body = body

        const wing1 = CreateParallelepiped(20, 7, 10, {bgColor: "yellow"})
        wing1.shift(3 + mainShiftX, 25 + mainShiftY)
        this.wing = wing1

        const wing2 = CreateParallelepiped(20, 10, 5, {bgColor: "yellow"})
        wing2.shift(3 + mainShiftX, 25 + mainShiftY)


        const head = CreateParallelepiped(10, 10, 7, {bgColor: "red"})
        head.shift(45 + mainShiftX, 17 + mainShiftY)
        this.head = head

        const eye1 = new Ellipse(2, 3)
        eye1.shift(50, 10 + mainShiftY)
        this.eye1 = eye1

        const eye2 = new Ellipse(2, 3)
        eye2.shift(45, 15 + mainShiftY)
        this.eye2 = eye2

        this.wingStates = [wing1, wing2]
    }


    draw() {


        // Rotate the bird up when it goes up
        if (this.speed > 0) {

            this.eye1.shift(46 - 29, -7 + 17)
            this.eye2.shift(48 - 23, -15 + 25)

            this.wing = this.wingStates[0]
            this.body.draw(this.x, this.y, 40, this.color, "black")
            this.head.draw(this.x, this.y, 40, "red", "black")
            this.wing.draw(this.x, this.y, 40, this.color, "black")

            this.eye1.draw(this.x, this.y, 40, "black", "black")
            this.eye2.draw(this.x, this.y, 40, "black", "black")
        }
        // // Rotate the bird down when it goes down
        if (this.speed < 0) {


            this.eye1.shift(31 - 15, -24)
            this.eye2.shift(37 - 22, -15)


            this.wing = this.wingStates[0]
            this.body.draw(this.x, this.y, -40, this.color, "black")
            this.head.draw(this.x, this.y, -40, "red", "black")

            this.eye1.draw(this.x, this.y, -40, "black", "black")
            this.eye2.draw(this.x, this.y, -40, "black", "black")


            console.log(this.flapFrame)
            // bird flap animation
            switch (this.flapFrame) {
                case 0: {
                    this.wing.draw(this.x - 3, this.y - 3, -20, this.color, "black")
                    break
                }
                case 1: {
                    this.wing.draw(this.x - 1, this.y - 1, -30, this.color, "black")
                    break
                }
                case 3: {
                    this.wing.draw(this.x, this.y, -50, this.color, "black")
                    break
                }
                case 4: {
                    this.wing.draw(this.x - 1, this.y - 1, -30, this.color, "black")
                    break
                }

                default: {
                    this.wing.draw(this.x - 3, this.y - 3, -20, this.color, "black")
                }
            }

        }
        if (this.speed === 0) {

            this.eye1.shift(13 + 6, -5 + 3)
            this.eye2.shift(19 + 6, -11 + 3)

            this.wing = this.wingStates[1]
            this.body.draw(this.x, this.y, 0, this.color, "black")
            this.head.draw(this.x, this.y, 0, "red", "black")
            this.wing.draw(this.x, this.y, 0, this.color, "black")

            this.eye1.draw(this.x, this.y, 0, "black", "black")
            this.eye2.draw(this.x, this.y, 0, "black", "black")


        }

    }


}