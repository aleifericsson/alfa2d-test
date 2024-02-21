import {render, remove, create, addClass, remClass, hasClass, attribs, find, write, detect, undetect, style} from "../scripts/QoL"
import close from "../images/close.png"

let butOv;

const togglePrompt = (e) => {
    if (e.target.id === "promptbut1" || e.target.id === "closeprompt1"){
        const exists = find(".prompt");
        if (exists != null) { 
            addClass(exists, ["end-state"]);
            setTimeout(()=> remove(document.body, exists), 200);
        } 
        else{
            createPrompt("you have been prompted");
        }
    }
}

const createPrompt = (mytext) => {
    const butOv = find(".button-overlay");
    const prompt = create("div");
        addClass(prompt, ["prompt", "start-state"]);
        attribs(prompt, ["id", "draggable"], ["prompt1", "false"])
        //make prompt index system pls
        style(prompt, `
            color:white;
            background-color: slategray;
            border: 5px solid darkslategray;
            border-radius: 5px;
            position:absolute;
            transition: 0.1s;
            width: 200px;
            height: 100px;
            left: 200px;
            top: 250px;
        `);
        
        const drag = dragBar();
        render(prompt, drag);

        render(prompt, createText(mytext));
        render(document.body, prompt);

        setTimeout(()=> prompt.classList.remove("start-state"), 100);
}

const dragBar = () => {
    const bar = create("div");
    addClass(bar, ["bar"]);
    attribs(bar, ["id", "draggable"], ["bar1", "false"])
    style(bar, `
        display:flex;
        justify-content: flex-end;
        padding: 5px;
        background-color: darkslategray;
        height: 20px;
    `)
    

    const closePrompt = create("div");
    addClass(closePrompt, ["button", "closeprompt"]);
    closePrompt.id = "closeprompt1";
    style(closePrompt, `
        position: absolute;
        width: 16px;
        height: 16px;
        background: url(${close});
    `);

    render(bar, closePrompt);
    detect(bar, "mousedown", mouseDown);
    detect(bar, "mouseup", mouseUp);
    //fix the issue you know what it is

    detect(closePrompt, "click", togglePrompt);

    return bar;
}

const mouseDown = (e) =>{
    e.preventDefault();
    detect(document.body, "mousemove", mouseMove);
    addClass(find("#prompt1"), ["notransition"]);
}

const mouseMove = (evt) => {
    evt.preventDefault();
    const prompt = find("#prompt1");
    const rect = document.body.getBoundingClientRect();
    const mousePos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
                    
    prompt.style.top = mousePos.y -10 +"px";
    prompt.style.left = mousePos.x -100 + "px";
}

const mouseUp = (e) =>{
    undetect(document.body,"mousemove", mouseMove);
    remClass(find("#prompt1"), ["notransition"]);
}

const createText = (mytext) =>{
    const text = create("div");
        style(text, `
            color:white;
            position:relative;
            text-align:center;
            margin:15px 5px;
        `);
    write(text, mytext);

    return text;
}

export {togglePrompt};