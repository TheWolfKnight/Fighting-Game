
import { entetys } from "../main.js";

function collide(attackEnt) {
    for (let ent of entetys) {
        if (ent === attackEnt) {
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

export { collide };
