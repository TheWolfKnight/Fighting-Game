
import { canvas, entetys } from "../main.js";

function attackCollision(attackEnt, ignore) {
    for (let ent of entetys) {
        if (ent === ignore) {
            continue;
        }

        const AttackHalfWidth = attackEnt.rendering.bounding.width/2;
        const AttackHalfHeight = attackEnt.rendering.bounding.height/2;

        const EntHalfWidth = ent.rendering.bounding.width/2;
        const EntHalfHeight = ent.rendering.bounding.height/2;

        const distX = (attackEnt.rendering.position.x + AttackHalfWidth) - (ent.rendering.position.x + EntHalfWidth);
        const distY = (attackEnt.rendering.position.y + AttackHalfHeight) - (ent.rendering.position.y + EntHalfHeight);

        const CollisionDistX = AttackHalfWidth + EntHalfWidth;
        const CollisionDistY = AttackHalfHeight + EntHalfHeight;

        if (Math.abs(distX) <= CollisionDistX && Math.abs(distY) <= CollisionDistY) {
            return {status: true, collision: ent,
                    dists: {x: distX, y: distY}, hitbox: {x: CollisionDistX, y: CollisionDistY}};
        }
    }
    return {status: false, collision: null};
}

function movementCollision(tar, ign) {
    return false;
}

function validMove(entety) {

    const projection = {
        rendering: {
            position: {
                x: entety.rendering.position.x + entety.vel.x,
                y: entety.rendering.position.y + entety.vel.y
            },
            bounding: {
                width: entety.rendering.bounding.width,
                height: entety.rendering.bounding.height
            }
        },
    }

    const EndOfSpriteWidth = projection.rendering.position.x + projection.rendering.bounding.width;
    const EndOfSpriteHeight = projection.rendering.position.y + projection.rendering.bounding.height;

    var r = {
        x: [true, 0],
        y: [true, 0],
        ground: false
    };

    if (EndOfSpriteWidth > canvas.width) {
        r.x[0] = false;
        r.x[1] = canvas.width - entety.rendering.bounding.width;
    } else if (projection.rendering.position.x < 0) {
        r.x[0] = false;
    }

    if (EndOfSpriteHeight > canvas.height) {
        r.y[0] = false;
        r.ground = true;
    }

    const collisionData = attackCollision(projection, entety);
    // console.table(collisionData);
    if (collisionData.x || collisionData.y) {
        if (Math.abs(collisionData.dists.x) <= collisionData.hitbox.x) {
            console.log("hit x");
            r.y[0] = false;
            r.y[1] = entety.rendering.position.y;
        }
        if (Math.abs(collisionData.dists.y) <= collisionData.hitbox.y) {
            console.log("hit y");
        }
    }
    return r;
}

export { attackCollision, validMove };
