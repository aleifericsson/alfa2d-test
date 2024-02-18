import {render, create, addClass, remClass, find, write, detect,style} from "../scripts/QoL"

const wrapper = () =>{   
    const rapper = create("div");
    addClass(rapper, ["wrapper"]);
    style(rapper,`
        position:relative;
    `)
    render(document.body, rapper);
    return rapper;
}

const miniWrapper = () =>{
    const rapper = create("div");
    addClass(rapper, ["mini-wrapper"]);
    style(rapper,`
        position:relative;
        background-color: #FFFFFF;
        top: 650px;
        width: 640px;
        display:flex;
        justify-content: flex-start; 
        height:64px;
        align-items:center;
    `)
    render(document.body, rapper);
    return rapper;
}

export {wrapper, miniWrapper};