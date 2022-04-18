

class ScreenState {
    static MainMenu = 1;
    static CharSelect = 2;
    static GameScene = 4;
    static Pause = 16;
    static EndGame = 32;
}


export class ScreenControler {
    currScreen;

    constructor() {
        this.currScreen = ScreenState.MainMenu;
    }

    screenChanger({next, direct}) {
        if (direct !== undefined) {
            this.currScreen = direct;
            return;
        }

        if (next)
            this.currScreen = this.currScreen << 1;
        else
            this.currScreen = this.currScreen >> 1;
        return;
    }

    screenDraw() {
    }

}

