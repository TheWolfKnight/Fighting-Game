
import { canvas, entetys } from "../main.js";

function attackCollision(attackEnt, ignore) {
    var status = false, ente = null;
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

        if (Math.abs(distX) <= CollisionDistX && Math.abs(distY) <= CollisionDistY) { status = true; ente = ent; }
    }
    return { status: status, collision: ente,};
}


function movementCollision(entety, ign) {
    for (let ent of entetys) {
        if (ent === ign) {
            continue;
        }

        const EntetyHalfWidth = entety.rendering.bounding.width/2;
        const EntetyHalfHight = entety.rendering.bounding.height/2;

        const EntHalfWidth = ent.rendering.bounding.width/2;
        const EntHalfHeight = ent.rendering.bounding.width/2;

        if (entety.rendering.position.y > ent.rendering.position.y - EntetyHalfHight) {
            const distX = (entety.rendering.position.x + EntetyHalfWidth) - (ent.rendering.position.x + EntHalfWidth);
            if (Math.abs(distX) <= EntetyHalfWidth + EntHalfWidth) {
                return { status: true, collidsX: true, correction: distX - Math.sign(distX)*(EntetyHalfWidth + EntHalfWidth ) - ign.vel.x * 1.1 };
            }
        }

    }
    return { status: false };
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
        r.x[1] = -(projection.rendering.position.x + entety.rendering.bounding.width) + canvas.width;
    } else if (projection.rendering.position.x < 0) {
        r.x[0] = false;
        r.x[1] = -(projection.rendering.position.x);
    }

    if (EndOfSpriteHeight > canvas.height) {
        r.y[0] = false;
        r.ground = true;
    }

    const collisionData = movementCollision(projection, entety);
    if (collisionData.status) {
        if (collisionData.collidsX) {
            r.x[0] = false;
            r.x[1] = collisionData.correction;
        }
    }

    return r;
}

export { attackCollision, validMove };
