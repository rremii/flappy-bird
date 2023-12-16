import {drawService} from "../services/drawService.js";

const ctx = document.querySelector('#canvas')?.getContext('2d')

export class Polygon {
    initialPoints = []
    points = []
    bgColor = 'red'
    borderColor = 'green'

    constructor(points, {shiftX = 0, shiftY = 0, bgColor = 'red', borderColor = 'green'}) {
        this.initialPoints = points.map((point) => {
            return {
                x: point.x + shiftX,
                y: point.y + shiftY
            }
        })
        this.points = points.map((point) => {
            return {
                x: point.x + shiftX,
                y: point.y + shiftY
            }
        })

        this.bgColor = bgColor
        this.borderColor = borderColor
    }

    shiftInitial(x = 0, y = 0) {
        this.points = this.initialPoints.map((point) => ({
            x: point.x + x,
            y: point.y + y,
        }))
        this.initialPoints = this.initialPoints.map((point) => ({
            x: point.x + x,
            y: point.y + y,
        }))
    }

    shift(x = 0, y = 0, angleGrad = 0) {


        this.points = this.initialPoints.map((point) => {

            const angle = Math.PI / 180 * angleGrad
            let rotatedX = point.x * Math.cos(angle) - point.y * Math.sin(angle)
            let rotatedY = point.x * Math.sin(angle) + point.y * Math.cos(angle)

            return {
                x: rotatedX + x,
                y: rotatedY + y,
            }
        })
    }

    fill() {
        ctx.beginPath()

        ctx.moveTo(this.points[0].x, this.points[0].y)
        this.points.forEach((point, index) => {
            if (this.points.length < 3) return
            if (index === 0) {
            } else {
                const x2 = point.x
                const y2 = point.y
                ctx.lineTo(x2, y2)
            }
        })
        ctx.lineWidth = 1
        ctx.strokeStyle = this.borderColor;
        ctx.closePath()
        ctx.fillStyle = this.bgColor
        ctx.fill()
        ctx.stroke()
    }

    draw(x = 0, y = 0, angle = 0) {
        const length = this.points.length
        this.points.forEach((point, index) => {
            if (length < 3) return
            if (index === 0) {
                const x1 = point.x
                const y1 = point.y
                const x2 = this.points.at(-1).x
                const y2 = this.points.at(-1).y
                drawService.drawLine(x1, y1, x2, y2, "red")
            } else {
                const x1 = this.points[index - 1].x
                const y1 = this.points[index - 1].y
                const x2 = point.x
                const y2 = point.y
                drawService.drawLine(x1, y1, x2, y2, "red")
            }
        })

        this.points = this.points.map((point) => ({
            x: point.x + x,
            y: point.y + y,
        }))

    }
}