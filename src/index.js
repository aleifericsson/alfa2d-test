import './style.css';
import {render, create, addClass, remClass, find, write, detect} from "./scripts/QoL"
import { canvas, runCanvas } from './components/canvas';

const canv = canvas(640,640);
render(document.body, canv);
console.log("commencing");
runCanvas(canv, 640, 640);

