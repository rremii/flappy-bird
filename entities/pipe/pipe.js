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


    draw() {


        const rect = CreateRect(70, this.height, {})
        rect.shiftInitial(0, 15)
        rect.shift(this.x, this.y - 5)
        rect.draw(0, 0, "green", "black")


        const ellipse1 = new Ellipse(35, 15, {})
        ellipse1.shift(35, 15)
        ellipse1.draw(this.x, this.y - 5, "orange", "black")

        const ellipse2 = new Ellipse(35, 15, {})
        ellipse2.shift(35, 15 + this.height)
        ellipse2.draw(this.x, this.y - 5, "green", "black", true)
    }


}