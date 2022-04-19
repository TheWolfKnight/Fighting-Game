
import { tick } from "../main.js";


class CharactorState {
    Idle = 0;
    Move = 1;
    Jump = 2
    LightAttack = 3;
    HeavyAttack = 4;
    Pain = 5;
    Death = 6;
    Dead = 7;
}


class AnimationRendere {
    state;
    charInfo;

    constructor(charInfo) {
        this.state = CharactorState.Idle;
        this.charInfo = charInfo
    }

    render() {
    }

    nextFrame() {
    }

    getFramePath() {
    }
}
