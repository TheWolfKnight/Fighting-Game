
import { PlayerClass } from "./Player/Player.js";
import { ScreenController } from "./Screen/ScreenController.js";

export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');
export var tick;

export var entetys = [];
var keys = {};
var screen;


function setup(width, height) {
    canvas.width = width;
    canvas.height = height;

    entetys[0] = new PlayerClass({
        pos: {x: 200, y: height-150},
        bound: {width: 50, height: 150},
        speed: {walk: 1, jump: 30},
        left: true,
        color: "blue"
    });

    entetys[1] = new PlayerClass({
        pos: {x: 0, y: height-150},
        bound: {width: 50, height: 150},
        speed: {walk: 1, jump: 30},
        left: false,
        color: "green"
    });

    screen = new ScreenController();
    tick = 0;

    return;
}

document.addEventListener("keydown", function(event) {
    keys[event.code] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.code] = false;
})


function main() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "white";
    c.fillRect(0,0,5,5);

    for (let ent of entetys) {
        ent.draw();
    }

    entetys[0].update(keys, tick);

    tick++;
    window.requestAnimationFrame(main);
    return;
}

setup(1024, 520);
main();
