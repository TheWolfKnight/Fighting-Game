import { Entety } from "../Entety/Entety.js";


export class BotDifficults {
    Dummy = 0;
    Easy = 1;
    Medium = 2;
    Hard = 3;
    SuperHard = 4;
}


export class Bot extends Entety {
    diffeculty;

    constructor({dif, pos, bound, left, anim}) {
        super(pos, bound, left, anim);
        this.diffeculty = dif;
    }

    update() {
        switch (this.diffeculty) {
            case BotDifficults.Dummy:
                break;
            case BotDifficults.Easy:
                // TODO: yes
                break;
            case BotDifficults.Medium:
                // TODO: yes
                break;
            case BotDifficults.Hard:
                // TODO: yes
                break;
            default:
                throw Error;
        }
    }

}
