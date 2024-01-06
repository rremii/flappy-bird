import {drawService} from "../services/drawService.js";

const ctx = document.querySelector('#canvas')?.getContext('2d')


// Задаем цвет заливки
// var fillColor = 'green';

// Функция заливки
function floodFill(startX, startY, color) {
    // Создаем массив для хранения координат пикселей, требующих заливку
    var pixelsToCheck = [[startX, startY]];

    console.log("qwe")
    // Получаем цвет пикселя, с которого начинаем заливку
    var startColor = ctx.getImageData(startX, startY, 1, 1).data;
    // debugger
    // Пока есть пиксели для проверки
    while (pixelsToCheck.length > 0) {
        // Получаем координаты текущего пикселя
        var currentPosition = pixelsToCheck.pop();
        var x = currentPosition[0];
        var y = currentPosition[1];

        // Получаем цвет текущего пикселя
        var currentColor = ctx.getImageData(x, y, 1, 1).data;

        // Если текущий пиксель имеет стартовый цвет
        if (currentColor[0] === startColor[0] && currentColor[1] === startColor[1] && currentColor[2] === startColor[2] && currentColor[3] === startColor[3]) {
            // Закрашиваем текущий пиксель
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);

            // Добавляем соседние пиксели для проверки
            pixelsToCheck.push([x + 1, y]);
            pixelsToCheck.push([x - 1, y]);
            pixelsToCheck.push([x, y + 1]);
            pixelsToCheck.push([x, y - 1]);
        }
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

    #fill(color) {
        const startPoint = this.points[0]
        const middlePoint = this.points[1]
        const endPoint = this.points[2]

        const deltaY = middlePoint.y < endPoint.y ? +1 : -1

        const x = Math.round((startPoint.x + middlePoint.x) / 2)
        const y = Math.round(middlePoint.y + deltaY)


        floodFill(x, y, color)
    }

    draw(x = 0, y = 0, bgColor) {

        const length = this.points.length
        this.points.forEach((point, index) => {
            if (length < 3) return
            if (index === 0) {
                const x1 = point.x
                const y1 = point.y
                const x2 = this.points.at(-1).x
                const y2 = this.points.at(-1).y + 1 //todo
                drawService.drawLine(x1, y1, x2, y2, "red")
            } else {
                const x1 = this.points[index - 1].x
                const y1 = this.points[index - 1].y
                const x2 = point.x
                const y2 = point.y
                drawService.drawLine(x1, y1, x2, y2, "red")
            }
        })

        this.points = this.initialPoints.map((point) => ({
            x: point.x + x,
            y: point.y + y,
        }))

        // debugger
        // if (bgColor) this.#fill(bgColor)

    }
}