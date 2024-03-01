import {render, remove, create, addClass, remClass, hasClass, attribs, find, write, detect, undetect, style} from "../scripts/QoL"
import close from "../images/close.png"
import shadow from "../images/shad.png"

let currentDialogue = 0;
let dialogues = [];

const nextDialogue = () => {
    console.log(currentDialogue)
    const dialogue = createDialogue(dialogues[currentDialogue]);
    currentDialogue += 1;
    detect(dialogue, "click", deleteDialogue);
}

const deleteDialogue = (e) =>{
    let dialogue = e.target;
    if (!hasClass(dialogue, "dialogue")){
        dialogue = e.target.parentNode;
    }
    undetect(dialogue, "click", deleteDialogue);
    addClass(dialogue, ["dialogue-start-end"]);
    setTimeout(()=> {
        remove(find(".game"), dialogue)
        if (dialogues[currentDialogue-1].follow){
            nextDialogue();
        }
    }, 200);
}

const dialogueObj = (text, code, charactersrc, follow) => {
    dialogues.push({
        text,
        code,
        charactersrc,
        follow
    })
}

const createDialogue = (dialogueObj) => {
    const dialogue = create("div");
        addClass(dialogue, ["dialogue", "dialogue-start-end"]);
        attribs(dialogue, ["id", "draggable"], [`dialogue-${dialogueObj.code}`, "false"])

        //make prompt index system plsprompt
        style(dialogue, `
            color:white;
            background-color: slategray;
            border: 5px solid darkslategray;
            position:absolute;
            transition: 0.1s;
            width: 400px;
            height: 100px;
            left: calc(50% -200px);
            top: 400px;
            display:flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;
            padding: 10px;
        `);

        render(dialogue, createCharBox(dialogueObj.charactersrc))
        render(dialogue, createText(dialogueObj.text));
        render(find(".game"), dialogue);

        setTimeout(()=> dialogue.classList.remove("dialogue-start-end"), 100);
        return dialogue;
}

const createCharBox = (charsrc) => {
    const charBox = create("div");
    addClass(charBox, ["charBox"])
    style(charBox, `
        border: 5px solid darkslategray;
        width: 64px;
        height: 64px;
        background: url(${charsrc}) 0 0;
    `)
    return(charBox);
}

const createText = (mytext) =>{
    const text = create("div");
        style(text, `
            color:white;
            font-family: 'munro';
            font-size: 25px;
        `);
    write(text, mytext);

    return text;
}

const initDialogues = () => {
    dialogueObj("man", 0, shadow, true);
    dialogueObj("life can be tough", 1, shadow, false);
    dialogueObj("you aint half bad bro", 2, shadow, false);
}

export {initDialogues, nextDialogue};