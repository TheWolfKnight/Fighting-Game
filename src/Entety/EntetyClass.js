
import { canvas, c} from "../main.js";
import { collide } from "./Collision.js"


export class Entety {
    position;
    bounding;
    facing;
    speed;
    vel;
    keys;
    jumping;
    onGround;

    constructor({pos, bound, speed, left}) {
        this.position = pos;
        this.bounding = bound;
        this.left = left;
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
        // applyes a friction of .5 to the velocity.
        this.vel.x *= .5;
        this.vel.y *= .95;
        this.position.x += this.vel.x;
        this.position.y += this.vel.y;
    }

    draw() {
        c.beginPath();
        c.fillStyle = "green";
        c.fillRect(this.position.x, this.position.y, this.bounding.width, this.bounding.height);
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
        if (this.keys["KeyA"] && this.velX > -this.speed.walk) {
            this.vel.x -= 4;
        }
        if (this.keys["KeyD"] && this.velX < this.speed.walk) {
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
        if (this.position.y + this.bounding.height >= canvas.height + .01) {
            this.jumping = false;
            this.onGround = true;
            this.position.y = canvas.height - this.bounding.height;
            this.vel.y = 0;
            return;
        }
        const grav = 1;
        this.vel.y += grav;
    }

}

