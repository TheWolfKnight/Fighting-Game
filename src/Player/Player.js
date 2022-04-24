
import { canvas, c} from "../main.js";
import { attackCollision, validMove } from "../Entety/Collision.js"
import { Entety } from "../Entety/Entety.js";


export class PlayerClass extends Entety {
    static speed;
    combat;
    vel;
    keys;
    jumping;
    delay;
    onGround;

    constructor({pos, bound, left, combat, speed, anim}) {
        super(pos, bound, left, anim);
        this.speed = speed;
        this.combat = combat;
        this.vel = {x: 0, y: 0};
        this.jumping = false;
        this.delay = {active: false, tickStart: 0, amtTicks: 0};
    }

    update(keysStates, ticks) {
        this.animation.update(ticks);
        if (this.delay.active) {
            var dif = ticks - this.delay.tickStart;
            if (dif >= amtTicks) {
                this.delay.active = false;
            } else {
                return;
            }
        }
        validMove(this);
        this.keys = keysStates;
        this.move();

        if (keysStates["Comma"] || keysStates["Period"])
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
        } else {
            this.rendering.position.y = validation.y[1];
            this.vel.y = 0;
        }
    }

    attack() {

        var attackData = {};

        if (this.keys["Comma"]) {
            attackData = {rendering: {
                    position: {x: 0, y: 0},
                    bounding: {widht: 1, height: 1}
                },
                amtTicks: 100
            };
        } else if (this.keys["Period"]) {
            attackData = {rendering: {
                    position: {x: 0, y: 0},
                    bounding: {widht: 1, height: 1}
                },
                amtTicks: 100
            };
        }

        const collisionData = attackCollision(attackData, this);
        if (!collisionData.status) {
            return;
        }
        console.log("hit");
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

