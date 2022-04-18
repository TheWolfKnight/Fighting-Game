
import { canvas, c} from "../main.js";
import { collide } from "./Collision.js"


export class Entety {
    rendering
    speed;
    vel;
    keys;
    jumping;
    onGround;

    constructor({pos, bound, speed, left}) {
        this.rendering = {
            position: pos,
            bounding: bound,
            left: left
        }
        this.speed = speed;
        this.vel = {x: 0, y: 0};
        this.jumping = false;
        this.onGround = true;
    }

    update(keysStates) {
        this.keys = keysStates
        this.move();
        this.attack();
        if (this.jumping)
            this.jump();
        this.vel.x *= .5;
        this.vel.y *= .95;
        this.rendering.position.x += this.vel.x;
        this.rendering.position.y += this.vel.y;
    }

    draw() {
        c.beginPath();
        c.fillStyle = "green";
        c.fillRect(this.rendering.position.x,
            this.rendering.position.y,
            this.rendering.bounding.width,
            this.rendering.bounding.height
        );
    }

    attack(keyDown) {
        // light code: Comma
        // heavy keyCode: Periot

        const attackData = {
            pos: {},
            bounding: {}
        }
        const collisionData = collide(this);
        if (!collisionData.status) {
            return;
        }

        return;
    }

    move() {
        if (this.keys["KeyA"] && this.vel.x > -this.speed.walk) {
            this.vel.x -= 4;
        }
        if (this.keys["KeyD"] && this.vel.x < this.speed.walk) {
            this.vel.x += 4;
        }
        if (this.keys["KeyW"] && this.onGround) {
            this.vel.y = -20;
            this.jumping = true;
            this.onGround = false;
        }
        return;
    }

    jump() {
        if (this.rendering.position.y + this.rendering.bounding.height >= canvas.height + .01) {
            this.jumping = false;
            this.onGround = true;
            this.rendering.position.y = canvas.height - this.rendering.bounding.height;
            this.vel.y = 0;
            return;
        }
        const grav = 1;
        this.vel.y += grav;
    }

}

