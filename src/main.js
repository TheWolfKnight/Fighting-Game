
import { Entety } from "./Entety/EntetyClass.js";
import { ScreenControler } from "./Screen/Controler.js";

export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');

export var entetys = [];
var keys = {};
var screen;


function setup(width, height) {
    canvas.width = width;
    canvas.height = height;

    entetys[0] = new Entety({
        pos: {x: 200, y: height-150},
        bound: {width: 50, height: 150},
        speed: {walk: 10, jump: 10},
        left: true
    });

    entetys[1] = new Entety({
        pos: {x: 0, y: height-150},
        bound: {width: 50, height: 150},
        speed: {walk: 10, jump: 10},
        left: false
    });

    screen = new ScreenControler();

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
    c.fillRect(0,0,20,20);

    for (let ent of entetys) {
        ent.draw();
    }

    entetys[0].update(keys);

    window.requestAnimationFrame(main);
    return;
}


setup(1024, 520);
main();
