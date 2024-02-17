import {render, remove, create, addClass, remClass, hasClass, find, write, detect, undetect, style} from "../scripts/QoL"
import buttons from "../images/Buttons.png"

const butSize = 32;
let butOv;

const togglePrompt = (e) => {
    if (e.target.id === "promptbut1" || e.target.id === "closeprompt1"){
        const exists = find(".prompt");
        if (exists != null) { 
            addClass(exists, ["end-state"])
            setTimeout(()=> remove(document.body, exists), 200);
        } 
        else{
            createPrompt("you have been prompted");
        }
    }
}

const createPrompt = (mytext) => {
    butOv = find(".button-overlay");
    const prompt = create("div");
        addClass(prompt, ["prompt", "start-state"]);
        style(prompt, `
            color:white;
            background-color: slategray;
            border: 5px solid darkslategray;
            border-radius: 5px;
            position:absolute;
            transition: 0.3s;
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

        
        render(document.body, prompt);

        setTimeout(()=> prompt.classList.remove("start-state"), 100);
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

export {togglePrompt}