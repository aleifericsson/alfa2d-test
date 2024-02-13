import '../style.css';
import {render, create, addClass, remClass, find, write, detect} from "../scripts/QoL"
import { canvas, runEverything } from '../components/canvas';
import { wrapper, miniWrapper } from '../components/wrapper';
import { debugTools } from '../components/debugTools';
import { initMinis } from '../components/miniCanvas';

const initCanvases = () => {
    const sz = 640;
    const rapper = wrapper();
    const backgroundCanvas = canvas(sz,sz,0);
    const spriteCanvas = canvas(sz,sz,1);
    render(rapper, backgroundCanvas);
    render(rapper, spriteCanvas);
    console.log("commencing");
    runEverything([backgroundCanvas,spriteCanvas], sz, sz);
}

const initMiniCanvases = () => {
    const minirapper = miniWrapper();
    initMinis(minirapper);
}

const initDebug = () =>{
    render(document.body, debugTools());
}

export {initCanvases, initMiniCanvases, initDebug}