import {render, remove, create, addClass, remClass, find, write, detect, undetect, style, hasClass} from "../scripts/QoL"
import buttons from "../images/Buttons_updated.png"
import { togglePrompt } from "./prompts";
import { moveTowards } from "../scripts/spritecanvas";

const butSize = 32;
let butOv;
let pointer = false;
let interval_list = [];

const buttonOverlay = (width, height) =>{
    butOv = create("div");
    addClass(butOv, ['button-overlay']);
    style(butOv, `
        min-height: ${height};
        min-width: ${width};
        position: absolute;
    `)

    generateButtons(butOv);

    return butOv;
}

const generateButtons = (butOv) => {
    render(butOv, Button("promptbut1", 2, togglePrompt, 16, 16))
    render(butOv, Button("shaker", 3, toggleShake, 16, 64))
    render(butOv, Button("pointer", 7, togglePointer, 16, 112))
}

const Button = (name, spritenum, func, x, y) =>{
    const button = create("div");
    addClass(button, ["button", name]);
    button.id = name;
        style(button, `
            position: absolute;
            left:${x}px;
            top: ${y}px;
            width: ${butSize}px;
            height: ${butSize}px;
            background: url(${buttons}) -${spritenum*butSize}px 0;
        `);

    detect(button, "click", func);
    
    return button;
}

const toggleShake = (e) => {
    const promptbut = find("#promptbut1");
    if (hasClass(promptbut, "vibrate")){
        remClass(promptbut, ["vibrate"]);
    }
    setTimeout(() => addClass(promptbut, ["vibrate"]), 100);
}

const togglePointer = (evt) => {
    const but = find("#pointer")
    const rect = document.body.getBoundingClientRect();
    let mousePos = {x:0,y:0};

    const updatePointer = (evt) =>{
        
        mousePos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    if (pointer){
        pointer = false;
        remClass(but, ["selected"]);
        clearInterval(interval_list[0]);
        interval_list = [];
        undetect(document,"mousemove", updatePointer);
    }
    else{
        pointer = true;
        addClass(but, ["selected"])
        detect(document.body,"mousemove", updatePointer);

        interval_list.push(setInterval(() => {
            
            moveTowards(0, mousePos.x,mousePos.y);
        }, 50));
    }
}

export {buttonOverlay}