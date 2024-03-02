import { nextDialogue } from "../components/dialogue";
import { togglePrompt } from "../components/prompts";
import { style } from "./QoL";

const trigger = (code) => {
    switch (code){
        case "start":
            togglePrompt("tutorial");
            nextDialogue(0);
            break;
        case "win":
            togglePrompt("win");
            style(document.body, `
                background-image: none;
                background-color: #476336;
            `)
            break;
    }
}

export {trigger};