
import { c } from "../main.js";
import { AnimationRendere } from "./Animation.js";


export class Entety {
    rendering;
    animation;

    constructor(pos, bound, left, anim) {
        this.rendering = {
            position: pos,
            bounding: bound,
            isLeft: left
        };
        this.animation = new AnimationRendere(anim);
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.animation.render();
        c.fillRect(this.rendering.position.x,
            this.rendering.position.y,
            this.rendering.bounding.width,
            this.rendering.bounding.height
        );
    }
}

