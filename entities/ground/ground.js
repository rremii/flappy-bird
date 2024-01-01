import {Ellipse} from "../Ellipse.js";
import {Polyhedron} from "../Polyhedron.js";
import {CreateParallelepiped} from "../fabrics.js";

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const groundImg = new Image();
groundImg.src = "https://assets.codepen.io/1290466/ground2.jpg?format=auto";

export class Ground {


    x = 0
    y = canvas.height - 50
    width = canvas.width
    height = 50
    speed = 0.5

    constructor() {
    }

    update() {
        this.x -= this.speed
        if (this.x <= -this.width) this.x = 0
    }

    draw() {

        const polihedron = CreateParallelepiped(this.width + 100, 50, 30, {})
        polihedron.draw(-30, 440)

        // ctx.drawImage(groundImg, this.x, this.y + 10, this.width, this.height);
        // ctx.drawImage(groundImg, this.x + this.width, this.y + 10, this.width, this.height);
    }
}

