import './style.css';
import {render, create, addClass, remClass, find, write, detect} from "./scripts/QoL"
import { canvas } from './components/canvas';

render(document.body, canvas(640,640))

console.log("commence")
