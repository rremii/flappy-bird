export class Polyhedron {

    polygons = []
    constructor(polygons) {
        this.polygons = polygons
    }

    draw(x = 0,y = 0){
        this.polygons.forEach((polygon)=>{
            polygon.shift(x,y)
            polygon.fill(x,y)
        })
    }

    shift(x = 0,y = 0){
        this.polygons.forEach((polygon)=>{
            polygon.shiftInitial(x,y)
        })
    }


}