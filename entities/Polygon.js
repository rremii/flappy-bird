import {drawService} from "../services/drawService.js";

const ctx = document.querySelector('#canvas')?.getContext('2d', {willReadFrequently: true})

const ColorsEquals = (color1, color2) => {
    return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3]
}

// Задаем цвет заливки
const fillColor = [0, 255, 0, 255]; //lime
const borderColor = [255, 0, 0, 255] //red

// Функция заливки
function floodFill(startX, startY,) {

    // Создаем массив для хранения координат пикселей, требующих заливку
    const pixelsToCheck = [[startX, startY]];

    // Получаем цвет пикселя, с которого начинаем заливку
    const startColor = ctx.getImageData(startX, startY, 1, 1).data;
    // debugger
    // Пока есть пиксели для проверки
    while (pixelsToCheck.length > 0) {
        console.log("qwe")
        // console.log(pixelsToCheck.length)
        // Получаем координаты текущего пикселя
        const currentPosition = pixelsToCheck.pop();
        const x = currentPosition[0];
        const y = currentPosition[1];


        // Получаем цвет текущего пикселя
        const currentColor = ctx.getImageData(x, y, 1, 1, {willReadFrequently: true}).data;
        // Если текущий пиксель имеет стартовый цвет
        ctx.fillStyle = "Lime";
        ctx.fillRect(x, y, 1, 1);

        const rightColor = ctx.getImageData(x + 1, y, 1, 1, {willReadFrequently: true}).data;
        const leftColor = ctx.getImageData(x - 1, y, 1, 1, {willReadFrequently: true}).data;
        const topColor = ctx.getImageData(x, y + 1, 1, 1, {willReadFrequently: true}).data;
        const bottomColor = ctx.getImageData(x, y - 1, 1, 1, {willReadFrequently: true}).data;
        if (!ColorsEquals(rightColor, fillColor) && !ColorsEquals(rightColor, borderColor))
            pixelsToCheck.push([x + 1, y]);
        if (!ColorsEquals(leftColor, fillColor) && !ColorsEquals(leftColor, borderColor))
            pixelsToCheck.push([x - 1, y]);
        if (!ColorsEquals(topColor, fillColor) && !ColorsEquals(topColor, borderColor))
            pixelsToCheck.push([x, y + 1]);
        if (!ColorsEquals(bottomColor, fillColor) && !ColorsEquals(bottomColor, borderColor))
            pixelsToCheck.push([x, y - 1]);
    }
}

export class Polygon {
    initialPoints = []
    points = []
    bgColor = 'red'
    borderColor = 'green'

    constructor(points, {bgColor = 'red', borderColor = 'green'}) {
        this.initialPoints = points.map((point) => {
            return {
                x: point.x,
                y: point.y
            }
        })
        this.points = points.map((point) => {
            return {
                x: point.x,
                y: point.y
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

    #myFill(color) {
        const startPoint = this.points[0]
        const middlePoint = this.points[1]
        const endPoint = this.points[2]

        const deltaY = middlePoint.y < endPoint.y ? +1 : -1

        const x = Math.round((startPoint.x + middlePoint.x) / 2)
        const y = Math.round(middlePoint.y + deltaY)

        floodFill(x, y, color)
    }

    #fill(color) {
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
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
    }

    draw(x = 0, y = 0, bgColor, borderColor) {
        if (bgColor) this.#fill(bgColor)

        const length = this.points.length
        this.points.forEach((point, index) => {
            if (length < 3) return
            if (index === 0) {
                const x1 = point.x
                const y1 = point.y
                const x2 = this.points.at(-1).x
                const y2 = this.points.at(-1).y  //todo remove when yours fill
                drawService.drawLine(x1, y1, x2, y2, borderColor)
            } else {
                const x1 = this.points[index - 1].x
                const y1 = this.points[index - 1].y
                const x2 = point.x
                const y2 = point.y
                drawService.drawLine(x1, y1, x2, y2, borderColor)
            }
        })

        this.points = this.initialPoints.map((point) => ({
            x: point.x + x,
            y: point.y + y,
        }))
        // if (bgColor) this.#myFill(bgColor)

    }
}