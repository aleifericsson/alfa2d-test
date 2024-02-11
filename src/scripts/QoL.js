const render = (parent, child) => {
    parent.appendChild(child);
}

const create = (element) => {
    return document.createElement(element);
}

const addClass = (element, classlist) =>{
    classlist.forEach(clas => {element.classList.add(clas)});
}

const hasClass = (element, clas) => {
    return element.classList.contains(clas);
}

const remClass = (element, classlist) =>{
    classlist.forEach(clas => {element.classList.remove(clas)});
}

const find = (selector) => {
    return document.querySelector(selector);
}

const write = (element, text) => {
    element.textContent = text;
}

const detect = (element, event, func) =>{
    element.addEventListener(event, func);
}

const style = (element, styletext) => {
    element.style.cssText = styletext;
}

const attribs = (element, attribList, values) => {
    attribList.map((attrib,index) => {
        element.setAttribute(attrib, values[index]);
    })
}

export {render, create, addClass, hasClass, remClass, find, write, detect, style, attribs}