import {render, create, addClass, remClass, find, write, detect,style,attribs} from "../scripts/QoL"

const debugTools = () =>{
    const debugWrap = create("div");
    addClass(debugWrap, ["debug-wrapper"]);
    style(debugWrap,`
        position:relative;
        top:660px;
    `)

    const slider = create("input");
    detect(slider, "input", slideFunc);
    attribs(slider,["type", "min", "max", "value", "class"], ["range", "0", "640","0","slidey"])
    render(debugWrap, slider);

    return debugWrap;
}

const slideFunc = (e) => {
    const canv = find(".layer-1");
    canv.style.left = `${e.target.value}px`
}

export{debugTools};