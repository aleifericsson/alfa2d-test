import {render, create, addClass, remClass, find, write, detect, style} from "../scripts/QoL"
import { drawBackground } from "../scripts/canvasFuncs";

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
    
    drawBackground(ctx, width, height);

    return canv;
}



export {canvas}