import {render, remove, create, addClass, remClass, find, write, detect, undetect, style} from "../scripts/QoL"
import buttons from "../images/Buttons.png"

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
    render(butOv, promptButton())
}

const promptButton = () =>{
    const promptBut = create("div");
    promptBut.id = "promptbut1";
        style(promptBut, `
            position: absolute;
            left: 16px;
            top: 16px;
            width: ${butSize}px;
            height: ${butSize}px;
            background: url(${buttons}) -${2*butSize}px 0;
        `);

    detect(promptBut, "click", togglePrompt);
    
    return promptBut;
}

const togglePrompt = (e) => {
    if (e.target.id === "promptbut1" || e.target.id === "closeprompt1"){
        const exists = find(".prompt");
        if (exists != null) { remove(butOv, exists); } 
        else{
            createPrompt("you have been prompted");
        }
    }
}

const createPrompt = (mytext) => {
    const prompt = create("div");
        addClass(prompt, ["prompt"]);
        style(prompt, `
            color:white;
            background-color: slategray;
            border: 5px solid darkslategray;
            border-radius: 5px;
            position:absolute;
            width: 200px;
            height: 100px;
            left: 200px;
            top: 250px;
        `);

        const closePrompt = create("div");
        closePrompt.id = "closeprompt1";
        style(closePrompt, `
            position: absolute;
            left: 160px;
            top: 10px;
            width: ${butSize}px;
            height: ${butSize}px;
            background: url(${buttons}) -${4*butSize}px 0;
        `);
        render(prompt, closePrompt);
        detect(closePrompt, "click", togglePrompt);

        render(prompt, createText(mytext))

        
        render(butOv, prompt);
}

const createText = (mytext) =>{
    const text = create("div");
        style(text, `
            color:white;
            position:relative;
            text-align:center;
            top:50%;
        `);
        write(text, mytext)
    return text;
}

export {buttonOverlay}