import {render, create, addClass, remClass, find, write, detect, style, attribs} from "../scripts/QoL"
import Can from "../images/can.png"
import Coin from "../images/coin.png"
import { backgroundChange } from "../scripts/canvMouseFuncs";

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
    this.ele;
    this.ctx;
    this.addedleft;

    this.init = (index) =>{
        this.addedleft = miniList.length*64;

        const size = this.size;
        name = this.name;
        const canv = create("canvas");
        addClass(canv, ["mini-canvas", `${name}`]);
        attribs(canv, ["width", "height"], [`${size}px`,`${size}px`]);


        style(canv, `
            position:absolute;
            margin: 5 auto;
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
        let mousePos;
        const lef = this.addedleft;
        const updateDrag = (evt) =>{

            const rect = document.body.getBoundingClientRect();

            mousePos = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
                    
            canv.style.top = mousePos.y-650-32 + "px";
            canv.style.left = mousePos.x-32 + "px";

            doSomething(this.name, evt)
        }
        canv.addEventListener("mousedown", (evt) => {

            document.body.addEventListener("mousemove", updateDrag)
        });
        document.body.addEventListener("mouseup", (evt) => {
            document.body.removeEventListener("mousemove", updateDrag);
            canv.style.top = 0 + "px";
            canv.style.left = 0 +lef+ "px";
        });
    }       
}

const doSomething = (name, evt) => {
    if (name === "can"){
        const canv = find(".layer-1");
        const ctx = canv.getContext("2d");

        const rect = canv.getBoundingClientRect();

        const mousePos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };

        //fix out of bounds and only updating when it moves
        backgroundChange(ctx, mousePos)
    }
}


const initMini = (name, imgsrc) => {
    const img = new Image()
    img.src = imgsrc;
    const mini = new miniCanvas(name, img)
    const miniele = mini.init(miniList.length);
    miniele.style.left = `${miniList.length*64}px`;
    miniList.push(mini);
    return miniele;
}

const initMinis = (miniWrapper) => {
    render(miniWrapper, initMini("can", Can))
    render(miniWrapper, initMini("coin", Coin))
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