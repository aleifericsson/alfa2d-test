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

export {wrapper};