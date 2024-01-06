export class Polyhedron {

    polygons = []

    constructor(polygons) {
        this.polygons = polygons
    }

    draw(x = 0, y = 0, angleGrad, bgColor) {
        this.polygons.forEach((polygon) => {
            polygon.shift(x, y, angleGrad)
            polygon.draw(x, y, bgColor)
        })
    }

    shift(x = 0, y = 0) {
        this.polygons.forEach((polygon) => {
            polygon.shiftInitial(x, y)
        })
    }


}