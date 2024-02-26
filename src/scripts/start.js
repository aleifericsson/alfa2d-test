import '../css/animations.css';
import {render, create, addClass, remClass, find, write, style, detect} from "../scripts/QoL"
import { canvas, runEverything } from '../components/canvas';
import { wrapper, miniWrapper } from '../components/wrapper';
import { debugTools } from '../components/debugTools';
import { initMinis } from '../components/miniCanvas';
import { buttonOverlay } from '../components/buttonOverlay';
import { initSC } from '../components/spritecanvas';

const width = 640;
const height = 640;

const initCanvases = () => {
    style(document.body, `
        background-color: #242424;
    `)
    const rapper = wrapper();
    const backgroundCanvas = canvas(width,height,0);
    const solidBGs = canvas(width,height,1);
    render(rapper, backgroundCanvas);
    render(rapper, solidBGs);
    initSC(rapper);
    console.log("commencing");
    runEverything([backgroundCanvas, solidBGs], width, height);
    const butOv = buttonOverlay(width, height)
    render(rapper, butOv);
}

const initMiniCanvases = () => {
    const minirapper = miniWrapper();
    initMinis(minirapper);
}

const initDebug = () =>{
    render(document.body, debugTools());
}

export {initCanvases, initMiniCanvases, initDebug}