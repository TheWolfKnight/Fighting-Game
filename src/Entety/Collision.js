
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
            console.log("collided")
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

    const EndOfSpriteHeight = projection.rendering.position.y + projection.rendering.bounding.height;
    const EndOfSpriteWidth = projection.rendering.position.x + projection.rendering.bounding.width;

    var r = {
        x: true,
        y: true,
        ground: false
    };

    if (EndOfSpriteWidth > canvas.width || projection.rendering.position.x < 0) {
            r.x = false;
    }

    if (EndOfSpriteHeight > canvas.height || projection.rendering.position.y < 0) {
        r.y = false;
        r.ground = true;
    }

    return r;
}

export { collide, validMove };
