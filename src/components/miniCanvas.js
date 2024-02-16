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

function miniCanvas(name, img, imgsrc){
    this.name = name;
    this.size = 64;
    this.img = img;
    this.imgsrc = imgsrc;
    this.currentFrame = 0;
    this.canvele;
    this.imgele

    this.init = (index) =>{
        this.addedleft = miniList.length*64;

        const size = this.size;
        const name = this.name;
        const canv = create("canvas");
        addClass(canv, ["mini-canvas", `${name}`]);
        attribs(canv, ["width", "height"], [`${size}px`,`${size}px`]);


        style(canv, `
            position:absolute;
            margin: 5 auto;
            pointer-events:none;
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
        style(imgele, `
            position: absolute;
            width: 64px;
            height: 64px;
            background: url(${this.imgsrc}) -64px 0;
        `)
        this.imgele = imgele;

        this.initMouse(canv, imgele);

        return imgele;
    }

    this.initMouse = (canv, imgele) => {
        const ctx = canv.getContext("2d");
        let mousePos;
        const backCanv = find(".layer-1");
        let interval_list = [];
        let mousePos2;
        let size = this.size;

        const hoverFunc = (evt) => {
            if (this.name === "can")
            {   
                let curFra = 0;
                if (interval_list.length === 0){
                    interval_list.push(setInterval(() => {
                        backgroundChange(ctx, mousePos2);
                        const img = this.img;
                        ctx.clearRect(0,0,size,size);
                        ctx.drawImage(img, curFra*size, 0, size, size, 0, 0, size,size);
                        console.log("bru")
                        curFra += 1;
                        if(curFra === 14){
                            curFra = 10
                        }
                    }, 250))
                }
            }
        }
        const updateDrag = (evt) =>{

            const rect = document.body.getBoundingClientRect();
            const rect2 = backCanv.getBoundingClientRect();
            mousePos2 = {
                x: evt.clientX - rect2.left,
                y: evt.clientY - rect2.top
            };
            mousePos = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
                    
            canv.style.top = mousePos.y -32 +"px";
            canv.style.left = mousePos.x -32 + "px";

        }


        imgele.addEventListener("mousedown", (evt) => {
            render(document.body,canv);
            document.body.addEventListener("mousemove", updateDrag)
            backCanv.addEventListener("mouseenter", hoverFunc)
            
        });
        document.body.addEventListener("mouseup", (evt) => {
            clearInterval(interval_list[0]);
            interval_list = [];
            const hasChild = find(`.mini-canvas.${this.name}`) != null;
            if (hasChild) remove(document.body, canv);

            document.body.removeEventListener("mousemove", updateDrag);
            backCanv.removeEventListener("mouseenter", hoverFunc)
        });
    }       
}



const initMini = (name, imgsrc) => {
    const img = new Image()
    img.src = imgsrc;
    const mini = new miniCanvas(name, img, imgsrc)
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