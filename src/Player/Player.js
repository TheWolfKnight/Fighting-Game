
import { canvas, c} from "../main.js";
import { collide, validMove } from "../Entety/Collision.js"
import { Entety } from "../Entety/Entety.js";


export class PlayerClass extends Entety {
    static speed;
    combat;
    vel;
    keys;
    jumping;
    onGround;

    constructor({pos, bound, combat, speed, color}) {
        super({pos, bound});
        this.speed = speed;
        this.combat = combat;
        this.vel = {x: 0, y: 0};
        this.jumping = false;
        // Remove this when we add sprites
        this.color = color;
    }

    update(keysStates, tickState) {
        validMove(this);
        this.keys = keysStates;
        this.move();
        this.attack();

        this.vel.x *= .90;
        this.vel.y *= .95;

        var validation = validMove(this);

        if (this.jumping) {
            this.jump(validation.ground);
        }

        if (validation.x[0]) {
            this.rendering.position.x += this.vel.x;
        } else {
            this.rendering.position.x = validation.x[1];
            this.vel.x = 0;
        }

        if (validation.y) {
            this.rendering.position.y += this.vel.y;
        }
    }

    attack(keyDown) {

        if (keyDown === "Comma") {
        } else if (keyDown === "Period") {
        }

        const attackData = {
            rendering: {
                position: {x: 0, y: 0},
                bounding: {width: 0, height: 0}
            }
        };
        const collisionData = collide(attackData, this);
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
        if (this.keys["KeyW"] && !this.jumping) {
            this.vel.y = -this.speed.jump;
            this.jumping = true;
            this.onGround = false;
        }
        return;
    }

    jump(reset) {
        const grav = 1.5;
        this.vel.y += grav;

        if (reset) {
            this.jumping = false;
            this.rendering.position.y = canvas.height - this.rendering.bounding.height;
            this.vel.y = 0;
            return;
        }
    }
}

