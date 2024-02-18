import {render, remove, create, addClass, remClass, find, write, detect, undetect, style, hasClass} from "../scripts/QoL"
import buttons from "../images/Buttons.png"
import { togglePrompt } from "./prompts";

const butSize = 32;
let butOv;

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

export {buttonOverlay}