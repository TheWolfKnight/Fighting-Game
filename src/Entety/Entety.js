
import { c } from "../main.js";


export class Entety {
    rendering;
    animation;

    constructor(pos, bound, anim) {
        this.rendering = {
            position: pos,
            bounding: bound
        };
        this.animation = anim;
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.animation;
        c.fillRect(this.rendering.position.x,
            this.rendering.position.y,
            this.rendering.bounding.width,
            this.rendering.bounding.height
        );
    }
}

