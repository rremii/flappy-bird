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


    // bgColor = 'red'
    borderColor = 'green'

    constructor(radiusX, radiusY, {shiftX = 0, shiftY = 0, borderColor = 'green'}) {
        this.radiusX = radiusX
        this.radiusY = radiusY

        this.initialCenter = {
            x: shiftX,
            y: shiftY,
        }

        // this.bgColor = bgColor
        this.borderColor = borderColor
    }

    // shiftInitial(x = 0,y = 0){
    //     this.points = this.initialPoints.map((point)=>({
    //         x: point.x + x,
    //         y: point.y + y,
    //     }))
    //     this.initialPoints = this.initialPoints.map((point)=>({
    //         x: point.x + x,
    //         y: point.y + y,
    //     }))
    // }

    shift(x = 0, y = 0, angleGrad = 0) {


        const angle = Math.PI / 180 * angleGrad
        let rotatedX = this.initialCenter.x * Math.cos(angle) - this.initialCenter.y * Math.sin(angle)
        let rotatedY = this.initialCenter.x * Math.sin(angle) + this.initialCenter.y * Math.cos(angle)


        this.center = {
            x: rotatedX + x,
            y: rotatedY + y
        }
    }

    // fill(){
    //     ctx.beginPath()
    //
    //     ctx.moveTo(this.points[0].x,this.points[0].y)
    //     this.points.forEach((point,index)=>{
    //         if (this.points.length < 3) return
    //         if (index === 0){
    //         }else {
    //             const x2 = point.x
    //             const y2 = point.y
    //             ctx.lineTo(x2,y2)
    //         }
    //     })
    //     ctx.lineWidth = 1
    //     ctx.strokeStyle = this.borderColor;
    //     ctx.closePath()
    //     ctx.fillStyle = this.bgColor
    //     ctx.fill()
    //     ctx.stroke()
    // }
    draw(x = 0, y = 0) {
        const {x: cx, y: cy} = this.center

        drawService.drawEllipse(this.radiusX, this.radiusY, x + cx, y + cy, this.borderColor)

    }
}