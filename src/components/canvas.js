import {render, create, addClass, remClass, find, write, detect, style, attribs} from "../scripts/QoL"
import {initBackground, updateBackground, initSprites2, updateSprites, clear} from "../scripts/canvasFuncs";

let frame = 0;


const canvas = (width, height, layer) => {
    const canv = create("canvas");
    addClass(canv, ["game-canvas", `layer-${layer}`]);
    attribs(canv, ["width", "height"], [`${width}px`,`${height}px`]);

    style(canv, `
        position:absolute;
    `);
    const ctx = canv.getContext("2d");
    
    if (layer===0)
    {
        initBackground(ctx, width, height);
    }
    if (layer ===1){
        initSprites2(ctx);
    }

    return canv;
}

const runEverything = (canvasList, width, height) =>{
    canvasList.map((canvas,index) => {
        const ctx = canvas.getContext("2d");
        clear(ctx, width, height)
        frame++;
        if (index===0){
            updateBackground(ctx, width, height);
        }
        if (index===1){   
            updateSprites(ctx);
        }
    });
    /*
    if (frame < 100000) {
        window.requestAnimationFrame(runCanvas(canvasList,width,height));
    }
    */
}



export {canvas, runEverything}