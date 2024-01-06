import {Ellipse} from "../Ellipse.js";
import {Polyhedron} from "../Polyhedron.js";
import {CreateParallelepiped} from "../fabrics.js";
import groundBottomImg from "./../../public/groundBottom.png"
import groundTopImg from "./../../public/groundTop.png"

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const groundBottom = new Image();
groundBottom.src = groundBottomImg
const groundTop = new Image();
groundTop.src = groundTopImg


export class Ground {


    x = 0
    y = canvas.height - 50
    width = canvas.width
    height = 50
    speed = 1

    constructor() {
    }

    update() {
        this.x -= this.speed
        if (this.x <= -this.width) this.x = 0
    }

    draw() {

        const polihedron = CreateParallelepiped(this.width + 100, 50, 35, {})
        polihedron.draw(-30, 440)


        ctx.drawImage(groundTop, this.x, this.y + 10, this.width, 35);
        ctx.drawImage(groundTop, this.x + this.width, this.y + 10, this.width, 35);

        ctx.drawImage(groundBottom, this.x, this.y + 25, this.width, 30);
        ctx.drawImage(groundBottom, this.x + this.width, this.y + 25, this.width, 30);

    }
}

