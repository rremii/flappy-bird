import {drawService} from "../services/drawService.js";

const ctx = document.querySelector('#canvas')?.getContext('2d')

export class Ellipse {

    initialCenter = {
        x: 0,
        y: 0
    }
    center = {
        x: 0,
        y: 0
    }

    radiusX = 0
    radiusY = 0


    constructor(radiusX, radiusY) {
        this.radiusX = radiusX
        this.radiusY = radiusY


    }


    shift(x = 0, y = 0, angleGrad = 0) {


        const angle = Math.PI / 180 * angleGrad
        let rotatedX = this.initialCenter.x * Math.cos(angle) - this.initialCenter.y * Math.sin(angle)
        let rotatedY = this.initialCenter.x * Math.sin(angle) + this.initialCenter.y * Math.cos(angle)


        this.center = {
            x: rotatedX + x,
            y: rotatedY + y
        }
    }

    draw(x = 0, y = 0, bgColor, borderColor, isHalf) {
        const {x: cx, y: cy} = this.center

        ctx.beginPath()
        ctx.ellipse(x + cx, y + cy, this.radiusX, this.radiusY, 0, 0, Math.PI * 2)
        ctx.fillStyle = bgColor
        ctx.fill()
        drawService.drawEllipse(this.radiusX, this.radiusY, x + cx, y + cy, borderColor, 0, isHalf)

    }
}