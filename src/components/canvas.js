import {render, create, addClass, remClass, find, write, detect, style} from "../scripts/QoL"
import {initBackground, updateBackground, initSprites2, updateSprites} from "../scripts/canvasFuncs";

let frame = 0;


const canvas = (width, height) => {
    const canv = create("canvas");
    addClass(canv, ["game-canvas"]);
    canv.setAttribute("height", `${height}px`);
    canv.setAttribute("width", `${height}px`)

    style(canv, `
        width: ${width}px;
        height: ${height}px;
    `);
    const ctx = canv.getContext("2d");
    
    initBackground(ctx, width, height);
    initSprites2(ctx);

    return canv;
}

const runCanvas = (canv, width, height) =>{
    const ctx = canv.getContext("2d");
    frame++;
    updateBackground(ctx, width, height);
    updateSprites(ctx);
    /*
    if (frame < 100000) {
        window.requestAnimationFrame(runCanvas(canv,width,height));
    }
    */
}



export {canvas, runCanvas}