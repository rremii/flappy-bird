import {CreateParallelepiped} from "../fabrics.js";
import {drawService} from "../../services/drawService.js";
import {Ellipse} from "../Ellipse.js";
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d')
const birdGravity = 0.20;
const birdJump = -4.6;


export class Bird {

    polyhedrons = []
    ellipses = []

    x = 50
    y = canvas.height / 2 - 50
    width = 63
    height = 45
    speed = 0
    gravity = birdGravity
    jump = birdJump

    update() {
        this.speed += this.gravity;
        this.y += this.speed;
    }


    constructor() {

        const mainShiftX = 0
        const mainShiftY = 0

        const body = CreateParallelepiped(40,30,15,{bgColor:"yellow"})
        body.shift(mainShiftX,mainShiftY)

        const wing = CreateParallelepiped(20,7,10,{bgColor:"yellow"})
        wing.shift(3 + mainShiftX,25 + mainShiftY)

        const head = CreateParallelepiped(10,10,7,{bgColor:"red"})
        head.shift(45 + mainShiftX,17 + mainShiftY)


        const eye1 = new Ellipse(1.5,3,{borderColor:"black"})
        eye1.shift(50, 10 + mainShiftY)

        const eye2 = new Ellipse(1.5,3,{borderColor:"black"})
        eye2.shift(45, 15 + mainShiftY)

        this.polyhedrons = [body,wing,head]
        this.ellipses = [eye1,eye2]
    }

    #drawPolyhedrons(x=0,y=0){


        this.polyhedrons.forEach((polyhedron)=>{
            polyhedron.draw(x,y)
        })

    }
    #drawEllipses(x=0,y=0){
        this.ellipses.forEach((ellipse=>{
            ellipse.draw(x,y)
        }))
    }



    draw(x=0,y=0){




        this.#drawPolyhedrons(this.x ,this.y )
        this.#drawEllipses(this.x ,this.y )



        // Rotate the bird up when it goes up
        if (this.speed < 0) {
            ctx.save();
            ctx.rotate(-Math.PI / 16);


            //     // bird flap animation
        //     if (birdImageframe % 3 === 0) {
        //         ctx.drawImage(birdImg1, -this.width / 2, -this.height / 2, this.width, this.height);
        //     } else if (birdImageframe % 3 === 1) {
        //         ctx.drawImage(birdImg2, -this.width / 2, -this.height / 2, this.width, this.height);
        //     } else if (birdImageframe % 3 === 2) {
        //         ctx.drawImage(birdImg3, -this.width / 2, -this.height / 2, this.width, this.height);
        //     } else {
        //         ctx.drawImage(birdImg4, -this.width / 2, -this.height / 2, this.width, this.height);
        //     }
        //
            ctx.restore();
        }
        // // Rotate the bird down when it goes down
        else {
            ctx.save();
            ctx.rotate(Math.PI / 16);



                // bird flap animation
        //     // if (birdImageframe % 3 === 0) {
        //     //     ctx.drawImage(birdImg1, -this.width / 2, -this.height / 2, this.width, this.height);
        //     // } else if (birdImageframe % 3 === 1) {
        //     //     ctx.drawImage(birdImg2, -this.width / 2, -this.height / 2, this.width, this.height);
        //     // } else if (birdImageframe % 3 === 2) {
        //     //     ctx.drawImage(birdImg3, -this.width / 2, -this.height / 2, this.width, this.height);
        //     // } else {
        //     //     ctx.drawImage(birdImg4, -this.width / 2, -this.height / 2, this.width, this.height);
        //     // }
        //
            ctx.restore();
        }

    }

    // shift(){
    //     this.polyhedrons.forEach((polyhedron)=>{
    //         polyhedron.shift(x,y)
    //     })
    // }


}