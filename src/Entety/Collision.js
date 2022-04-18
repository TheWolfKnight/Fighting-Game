
import { entetys } from "../main.js";

function collide(attackEnt) {
    for (let ent of entetys) {
        if (ent === attackEnt) {
            continue;
        }
        if (attackEnt.position.x >= ent.position.x && attackEnt.position.x <= ent.position.x + ent.bounding.width
            && attackEnt.position.y >= ent.position.y && attackEnt.position.y <= ent.position.y + ent.bounding.height) {
            return {status: true, collision: ent};
        }
        if (attackEnt.position.x + attackEnt.bounding.width >= ent.position.x && attackEnt.position.x + attackEnt.bounding.width <= ent.position.x + ent.bounding.width
            && attackEnt.position.y + attackEnt.bounding.height >= ent.position.y && attackEnt.position.y + attackEnt.bounding.height <= ent.position.y + ent.bounding.height) {
                return {status: true, collision: ent};
            }
    }
    return {status: false, collision: null};
}

export { collide };
