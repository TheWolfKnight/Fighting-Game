
import { canvas, c} from "../main.js";
import { collide, validMove } from "./Collision.js"


export class Entety {
    rendering;
    static speed;
    combat;
    vel;
    keys;
    jumping;
    onGround;
    type;

    constructor({pos, bound, combat, speed, left, color, type=null}) {
        this.rendering = {
            position: pos,
            bounding: bound,
            left: left
        };
        this.speed = speed;
        this.combat = combat;
        this.vel = {x: 0, y: 0};
        this.jumping = false;
        this.onGround = true;
        this.type = type;
        // Remove this when we add sprites
        this.color = color;
    }

    update(keysStates, tickState) {
        this.keys = keysStates;
        this.move();
        this.attack();
        if (this.jumping)
            this.jump();
        this.vel.x *= .90;
        this.vel.y *= .95;
        this.rendering.position.x += this.vel.x;
        this.rendering.position.y += this.vel.y;
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
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
        };
        const collisionData = collide(this);
        if (!collisionData.status) {
            return;
        }

        return;
    }

    takeDamage(amt) {
        this.combat.health -= amt * this.combat.def;
    }

    move() {
        if (this.keys["KeyA"] && this.vel.x > -10) {
            this.vel.x -= this.speed.walk;
        }
        if (this.keys["KeyD"] && this.vel.x < 10) {
            this.vel.x += this.speed.walk;
        }
        if (this.keys["KeyW"] && this.onGround) {
            this.vel.y = -this.speed.jump;
            this.jumping = true;
            this.onGround = false;
        }
        return;
    }

    jump() {
        const grav = 1.5;
        if (this.rendering.position.y + this.rendering.bounding.height >= canvas.height + .01) {
            this.jumping = false;
            this.onGround = true;
            this.rendering.position.y = canvas.height - this.rendering.bounding.height;
            this.vel.y = 0;
            return;
        }
        this.vel.y += grav;
    }

}

