import {Point} from "./Point.js";
import {Polygon} from "./Polygon.js";
import {Polyhedron} from "./Polyhedron.js";

export const CreateRect = (width,height, {shiftX = 0, shiftY = 0, bgColor, borderColor}) =>{
    const point1 = new Point(0 ,0 )
    const point2 = new Point(width ,0 )
    const point3 = new Point(width ,height )
    const point4 = new Point(0 ,height )

    return new Polygon([point1,point2,point3,point4], {shiftX, shiftY, bgColor, borderColor})
}

export const CreateParallelepiped = (width,height,depth, {bgColor="white", borderColor='black'}) =>{


    const rect1 = CreateRect(width,height, {shiftX:depth, bgColor, borderColor})
    const rect2 = CreateRect(width,height,{ shiftY:depth, bgColor, borderColor})



    const rect3 = new Polygon([
        new Point(depth,0),
        new Point(width + depth,0),
        new Point(width,depth),
        new Point(0,depth),
    ],{ bgColor, borderColor})

    const rect4 = new Polygon([
        new Point(width + depth ,0),
        new Point(width,depth),
        new Point(width,height + depth),
        new Point(width + depth,height)
    ],{ bgColor, borderColor})


    return new Polyhedron([rect1,rect2,rect3,rect4])
}