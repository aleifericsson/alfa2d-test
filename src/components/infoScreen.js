import {render, remove, create, addClass, hasClass, remClass, find, write, detect, undetect, style, attribs} from "../scripts/QoL"

const initInfoScreen = () =>{
    const info = create("div");
    addClass(info, ["infoScreen"]);
    style(info, `
        width: 250px;
        height: 640px;
        background-color: #242424;
        border: 5px solid #32b7d1;
        position: absolute;
        left: 650px;
        color:white;
        font-family:munro;
    `)

    render(find(".wrapper"), info);
}

const displayInfo = (code) => {
    const info = find(".infoScreen");
    if (code === "can"){
        write(info,"the can is for water");
    }
    else if (code === "coin"){
        write(info, "the coin is for car somehow");
    }
}

export {initInfoScreen, displayInfo};