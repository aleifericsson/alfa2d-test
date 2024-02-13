import {render, create, addClass, remClass, find, write, detect, style, attribs} from "../scripts/QoL"
import { initMouse } from "../scripts/canvMouseFuncs";
import {initBackground, updateBackground, initSprites2, updateSprites, clear} from "../scripts/canvasFuncs";
import Can from "../images/can.png"

let stop = false;
let frames = 0;
const fps = 30
const msPerFrame = 1000 / fps
let msPrev = window.performance.now()

let miniList = [];

function miniCanvas(name, img){
    this.name = name;
    this.size = 64;
    this.img = img;
    this.currentFrame = 0;
    this.orix;
    this.oriy;
    this.elex;
    this.eley;
    this.dragging = false;
    this.ele;
    this.ctx;

    this.init = () =>{
        const size = this.size;
        name = this.name;
        const canv = create("canvas");
        addClass(canv, ["mini-canvas", `${name}`]);
        attribs(canv, ["width", "height"], [`${size}px`,`${size}px`]);

        const rect = document.body.getBoundingClientRect();
        this.elex = rect.left;
        this.eley = rect.top;
        this.orix = rect.left;
        this.oriy = rect.top;
        console.log(this.elex, this.eley);


        style(canv, `
            position:absolute;
        `);
        const ctx = canv.getContext("2d");
        const img = this.img;
        img.onload = function() {
            ctx.clearRect(0,0,size,size);
            ctx.drawImage(img, 0, 0, size, size, 0, 0, size,size);
        }

        this.initMouse(canv);

        this.ele = canv;
        this.ctx = ctx;

        return canv;
    }

    this.initMouse = (canv) => {
        const ctx = this.ctx;
        canv.addEventListener("drag", (event) => {
            const mousePos = getMousePos(canv, evt);
            drag=true;
        });
        canv.addEventListener("drop", (event) => {
            drag=false;
        });
    }
   
}

const initMini = (name, imgsrc) => {
    const img = new Image()
    img.src = imgsrc;
    const mini = new miniCanvas(name, img)
    miniList.push(mini);
    return mini.init();
}

const initMinis = (miniWrapper) => {
    render(miniWrapper, initMini("can", Can))
}

/*
function runEverything(canvasList, width, height){

    const animateEverything = () => {

        window.requestAnimationFrame(animateEverything);

        const msNow = window.performance.now();
        const msPassed = msNow - msPrev;

        if (msPassed < msPerFrame) return

        const excessTime = msPassed % msPerFrame
        msPrev = msNow - excessTime

        // Put your drawing code here
        canvasList.map((canvas,index) => {
            const ctx = canvas.getContext("2d");
            //clear(ctx, width, height)
            frames++;
            if (index===0){
                updateBackground(ctx, width, height);
                //implement someway so that it wont update unless there is a change
            }
            if (index===1){   
                updateSprites(ctx);
            }
        });

    
    }

    animateEverything();
}

*/

export {initMinis}