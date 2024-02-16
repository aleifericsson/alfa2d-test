import {render, remove, create, addClass, remClass, find, write, detect, style, attribs} from "../scripts/QoL"
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
    this.canvele;
    this.imgele
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

        this.canvele = canv;
        this.ctx = ctx;

        
        const imgele = create("div");
        imgele.id = `${this.name}-icon`
        this.imgele =imgele;

        this.initMouse(canv);

        return canv;
    }

    this.initMouse = (canv) => {
        const ctx = this.ctx;
        let mousePos;
        const lef = this.addedleft;
        const backCanv = find(".layer-1");
        const backctx = backCanv.getContext("2d");
        const imgele = this.imgele;
        const img = this.img;

        const hoverFunc = (evt) => {
            if (this.name === "can")
            {
                const rect = backCanv.getBoundingClientRect();

                const mousePos = {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
                console.log(mousePos);
                backgroundChange(ctx, mousePos)
            }
        }
        const updateDrag = (evt) =>{

            const rect = document.body.getBoundingClientRect();

            mousePos = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
                    
            imgele.style.top = mousePos.y + "px";
            imgele.style.left = mousePos.x + "px";

        }


        canv.addEventListener("mousedown", (evt) => {
            render(document.body,imgele);
            document.body.addEventListener("mousemove", updateDrag)
            backCanv.addEventListener("mouseenter", hoverFunc)
            
        });
        document.body.addEventListener("mouseup", (evt) => {
            const hasChild = find(`#${this.name}-icon`) != null;
            if (hasChild) remove(document.body, imgele);

            document.body.removeEventListener("mousemove", updateDrag);
            backCanv.removeEventListener("mouseenter", hoverFunc)
            canv.style.top = 0 + "px";
            canv.style.left = 0 +lef+ "px";
        });
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