import {render, remove, create, addClass, hasClass, remClass, find, write, detect, undetect, style, attribs} from "./QoL"
import carsrc from "../images/Car_updated.png"
import { getTiles } from "./canvasFuncs"

let sc_list = []

const spriteCanvas = (wrapper, name, size, imgsrc, x, y, speed) =>{

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
        ele: carele, 
        x,
        y,
        direction: "left",
        img,
        speed
    });

    render(wrapper, carele);

    return carele;
}

const moveTowards = (index, x, y) => {
    const obj = sc_list[index]
    const ele = obj.ele;
    const dx = x-obj.x;
    const dy = y-obj.y;
    const mag = Math.sqrt(dx*dx + dy*dy);
    const ux = (dx/mag)*obj.speed;
    const uy = (dy/mag)*obj.speed;
    const nx = obj.x+ux;
    const ny = obj.y+uy;
    sc_list[index].x = nx;
    sc_list[index].y = ny;
    style(ele, `
        position:absolute;
        top: ${ny}px;
        left: ${nx}px;
    `);
    let angle = Math.atan(-uy/ux);
    if(ux < 0){
        if (-uy < 0){
            angle = angle - Math.PI;
        }
        else{
            angle = angle+ Math.PI;
        }
    }
    angle = angle*(180/Math.PI)
    let direction = "left";
    if (angle >= 22.5 && angle <= 67.5) direction = "upright"
    else if (angle >= 67.5 && angle <= 112.5) direction = "up"
    else if (angle >= 112.5 && angle <= 157.5) direction = "upleft"
    else if (angle <= 22.5 && angle >= -22.5) direction = "right"
    else if (angle <= -22.5 && angle >= -67.5) direction = "downright"
    else if (angle <= -67.5 && angle >= -112.5) direction = "down"
    else if (angle <= -112.5 && angle >= -157.5) direction = "downleft"
    else if (angle >= 157.5 && angle <= -157.5) direction = "left"

    sc_list[index].direction = direction;
}

const initSC = (wrapper) =>{
    const sc = spriteCanvas(wrapper, "car", 64, carsrc, 300, 200, 5);
}

export{initSC, moveTowards}