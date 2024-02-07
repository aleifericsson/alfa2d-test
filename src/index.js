import './style.css';
import {render, create, addClass, remClass, find, write, detect} from "./scripts/QoL"
import { canvas, runEverything } from './components/canvas';
import { wrapper } from './components/wrapper';

const sz = 640;
const rapper = wrapper();
const backgroundCanvas = canvas(sz,sz,0);
const spriteCanvas = canvas(sz,sz,1);
render(rapper, backgroundCanvas);
render(rapper, spriteCanvas);
console.log("commencing");
runEverything([backgroundCanvas,spriteCanvas], sz, sz);

