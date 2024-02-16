import '../style.css';
import {render, create, addClass, remClass, find, write, detect} from "../scripts/QoL"
import { canvas, runEverything } from '../components/canvas';
import { wrapper, miniWrapper } from '../components/wrapper';
import { debugTools } from '../components/debugTools';
import { initMinis } from '../components/miniCanvas';
import { buttonOverlay } from '../components/buttonOverlay';

const width = 640;
const height = 640;

const initCanvases = () => {
    const rapper = wrapper();
    const backgroundCanvas = canvas(width,height,0);
    const spriteCanvas = canvas(width,height,1);
    render(rapper, backgroundCanvas);
    render(rapper, spriteCanvas);
    console.log("commencing");
    runEverything([backgroundCanvas,spriteCanvas], width, height);


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