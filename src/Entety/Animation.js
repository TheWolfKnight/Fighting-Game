

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


export class AnimationRendere {
    state;
    charInfo;

    constructor(charInfo) {
        this.state = CharactorState.Idle;
        this.charInfo = charInfo;
    }

    update(tick) {
    }

    render() {
        return this.charInfo;
    }

    setAnimationState(action) {
        switch (action) {
            case "attL":
                break;
            case "attH":
                break;
            case "idle":
                break;
            case "walk":
                break;
            case "jmp":
                break;
            default:
                throw Error;
        }
        return;
    }
}
