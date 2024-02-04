const render = (parent, child) => {
    parent.appendChild(child);
}

const create = (element) => {
    return document.createElement(element);
}

const addClass = (element, classlist) =>{
    classlist.forEach(clas => {element.classList.add(clas)})
}

const remClass = (element, classlist) =>{
    classlist.forEach(clas => {element.classList.remove(clas)})
}

const find = (selector) => {
    return document.querySelector(selector);
}

const write = (element, text) => {
    element.textContent = text;
}

const detect = (element, event, func) =>{
    element.addEventListener(event, func)
}

export {render, create, addClass, remClass, find, write, detect}