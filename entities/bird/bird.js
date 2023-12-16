import {CreateParallelepiped} from "../fabrics.js";
import {drawService} from "../../services/drawService.js";
import {Ellipse} from "../Ellipse.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d')
const birdGravity = 0.20;
const birdJump = -4.6;


export class Bird {

    polyhedrons = []
    ellipses = []

    x = 50
    y = canvas.height / 2 - 50
    width = 62
    height = 23
    speed = 0.1
    gravity = birdGravity
    jump = birdJump

    update() {
        this.speed += this.gravity;
        this.y += this.speed;
    }


    constructor() {

        const mainShiftX = -31
        const mainShiftY = -23

        const body = CreateParallelepiped(40, 30, 15, {bgColor: "yellow"})
        body.shift(mainShiftX, mainShiftY)

        const wing = CreateParallelepiped(20, 7, 10, {bgColor: "yellow"})
        wing.shift(3 + mainShiftX, 25 + mainShiftY)

        const head = CreateParallelepiped(10, 10, 7, {bgColor: "red"})
        head.shift(45 + mainShiftX, 17 + mainShiftY)


        const eye1 = new Ellipse(1.5, 3, {borderColor: "black"})
        eye1.shift(50, 10 + mainShiftY)

        const eye2 = new Ellipse(1.5, 3, {borderColor: "black"})
        eye2.shift(45, 15 + mainShiftY)

        this.polyhedrons = [body, wing, head]
        this.ellipses = [eye1, eye2]
    }

    #drawPolyhedrons(x = 0, y = 0, angleGrad) {
        this.polyhedrons.forEach((polyhedron) => {
            polyhedron.draw(x, y, angleGrad)
        })

    }

    #drawEllipses(x = 0, y = 0, angleGrad) {
        this.ellipses.forEach((ellipse => {
            ellipse.draw(x, y, angleGrad)
        }))
    }


    draw(x = 0, y = 0) {


        // Rotate the bird up when it goes up
        if (this.speed < 0) {

            const eye1 = this.ellipses[0]
            const eye2 = this.ellipses[1]
            eye1.shift(46 - 39, -7 - 5)
            eye2.shift(48 - 39, -15 - 5)

            this.#drawPolyhedrons(this.x, this.y, -40)
            this.#drawEllipses(this.x, this.y, -40)
        }
        // // Rotate the bird down when it goes down
        if (this.speed > 0) {

            const eye1 = this.ellipses[0]
            const eye2 = this.ellipses[1]
            eye1.shift(31 - 17, 39 - 35)
            eye2.shift(37 - 17, 39 - 35)

            this.#drawPolyhedrons(this.x, this.y, 40)
            this.#drawEllipses(this.x, this.y, 40)


            // bird flap animation
            //     // if (birdImageframe % 3 === 0) {
            //     //     ctx.drawImage(birdImg1, -this.width / 2, -this.height / 2, this.width, this.height);
            //     // } else if (birdImageframe % 3 === 1) {
            //     //     ctx.drawImage(birdImg2, -this.width / 2, -this.height / 2, this.width, this.height);
            //     // } else if (birdImageframe % 3 === 2) {
            //     //     ctx.drawImage(birdImg3, -this.width / 2, -this.height / 2, this.width, this.height);
            //     // } else {
            //     //     ctx.drawImage(birdImg4, -this.width / 2, -this.height / 2, this.width, this.height);
            //     // }
            //
        }
        if (this.speed === 0) {

            console.log(this.speed)
            const eye1 = this.ellipses[0]
            const eye2 = this.ellipses[1]
            eye1.shift(13, -5)
            eye2.shift(19, -11)

            this.#drawPolyhedrons(this.x, this.y, 0)
            this.#drawEllipses(this.x, this.y, 0)
        }

    }

    // shift(){
    //     this.polyhedrons.forEach((polyhedron)=>{
    //         polyhedron.shift(x,y)
    //     })
    // }


}