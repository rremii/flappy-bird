import {Ellipse} from "../Ellipse.js";
import {CreateRect} from "../fabrics.js";

export class Pipe {
    x = 0
    y = 0
    width = 70
    height = 0

    constructor(x, y, height) {
        this.x = x
        this.y = y
        this.height = height
    }


    draw(x = 0, y = 0) {

        const ellipse1 = new Ellipse(35, 15, {})
        ellipse1.shift(35, 15)
        ellipse1.draw(x, y)
        const ellipse2 = new Ellipse(35, 15, {})
        ellipse2.shift(35, 170)
        ellipse2.draw(x, y)

        const rect = CreateRect(70, 155, {})
        rect.shiftInitial(0, 15)
        rect.shift(x, y)
        rect.draw()
    }


}