

class ScreenState {
    static MainMenu = 0;
    static CharSelect = 1;
    static GameScene = 2;
    static Pause = 3;
    static EndGame = 4;
}


export class ScreenController {
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
            this.currScreen = this.currScreen + 1;
        else
            this.currScreen = this.currScreen - 1;
        return;
    }

    screenDraw() {
    }

}

