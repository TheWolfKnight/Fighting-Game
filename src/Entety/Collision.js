
import { entetys } from "../main.js";

function collide(attackEnt) {
    for (let ent of entetys) {
        if (ent === attackEnt) {
            continue;
        }

        const AttackHalfWidth = attackEnt.rendering.bounding.width/2;
        const AttackHalfHeight = attackEnt.rendering.bounding.heigth/2;

        const EntHalfWidth = ent.rendering.bounding.width/2;
        const EntHalfHeight = ent.rendering.bounding.heigth/2;

        var distX = Math.abs((attackEnt.rendering.position.x + AttackHalfWidth) - (ent.rendering.position.x + EntHalfWidth));
        var distY = Math.abs((attackEnt.rendering.position.y + AttackHalfHeight) - (ent.rendering.position.y + EntHalfHeight));

        if ( distX <= AttackHalfWidth + EntHalfWidth && distY <= AttackHalfHeight + EntHalfHeight ) {
            return {status: true, collision: ent};
        }

        // return if new idéer does not work
        // if (attackEnt.position.x >= ent.position.x && attackEnt.position.x <= ent.position.x + ent.bounding.width
        //     && attackEnt.position.y >= ent.position.y && attackEnt.position.y <= ent.position.y + ent.bounding.height) {
        //     return {status: true, collision: ent};
        // }
        // if (attackEnt.position.x + attackEnt.bounding.width >= ent.position.x && attackEnt.position.x + attackEnt.bounding.width <= ent.position.x + ent.bounding.width
        //     && attackEnt.position.y + attackEnt.bounding.height >= ent.position.y && attackEnt.position.y + attackEnt.bounding.height <= ent.position.y + ent.bounding.height) {
        //         return {status: true, collision: ent};
        //     }
    }
    return {status: false, collision: null};
}

export { collide };
