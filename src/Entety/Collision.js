
import { canvas, entetys } from "../main.js";

function collide(attackEnt, ignore=null) {
    for (let ent of entetys) {
        if (ent === ignore) {
            continue;
        }

        const AttackHalfWidth = attackEnt.rendering.bounding.width/2;
        const AttackHalfHeight = attackEnt.rendering.bounding.height/2;

        const EntHalfWidth = ent.rendering.bounding.width/2;
        const EntHalfHeight = ent.rendering.bounding.height/2;

        var distX = Math.abs((attackEnt.rendering.position.x + AttackHalfWidth) - (ent.rendering.position.x + EntHalfWidth));
        var distY = Math.abs((attackEnt.rendering.position.y + AttackHalfHeight) - (ent.rendering.position.y + EntHalfHeight));

        if (distX <= AttackHalfWidth + EntHalfWidth && distY <= AttackHalfHeight + EntHalfHeight) {
            return {status: true, collision: ent};
        }
    }
    return {status: false, collision: null};
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
        y: true,
        ground: false
    };

    if (EndOfSpriteWidth > canvas.width) {
        r.x[0] = false;
        r.x[1] = canvas.width - entety.rendering.bounding.width;
    } else if (projection.rendering.position.x < 0) {
        r.x[0] = false;
    }

    if (EndOfSpriteHeight > canvas.height) {
        r.y = false;
        r.ground = true;
    }

    const collisionData = collide(projection, entety);
    if (collisionData.status) {
    }

    return r;
}

export { collide, validMove };
