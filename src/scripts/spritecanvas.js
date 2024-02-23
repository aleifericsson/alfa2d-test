import {render, remove, create, addClass, hasClass, remClass, find, write, detect, undetect, style, attribs} from "./QoL"
import carsrc from "../images/Car_updated.png"
import { getTiles } from "./canvasFuncs"

let sc_list = []

const spriteCanvas = (wrapper, name, size, imgsrc, x, y) =>{

    const carele = create("canvas");
    addClass(carele, ["spritecanvas"]);
    attribs(carele, ["id", "width", "height"], ["car", `${size}px`, `${size}px`]);

    const img = new Image();
    img.src = imgsrc;
    const ctx = carele.getContext("2d");
    img.onload = function() {
        ctx.clearRect(0,0,size,size);
        ctx.drawImage(img, 0, 0, size, size, 0, 0, size,size);
    }

    style(carele, `
        position:absolute;
        top: ${y}px;
        left: ${x}px;
    `);    

    sc_list.push({ 
        name,
        sc: carele, 
        x,
        y,
        direction: "left",
        img,
    });

    render(wrapper, carele);

    return carele;
}

const initSC = (wrapper) =>{
    const sc = spriteCanvas(wrapper, "car", 64, carsrc, 300, 200);
}

export{initSC}