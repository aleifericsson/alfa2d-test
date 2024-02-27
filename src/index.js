import { addClass, create, render, style } from "./scripts/QoL";
import {initCanvases, initDebug, initMiniCanvases, initButtonOverlay} from "./scripts/start";

const game = create("div");
addClass(game, ["game"]);
render(document.body, game);
style(game, `
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:relative;
`)

render(game, initCanvases());
render(game, initMiniCanvases());
render(game, initDebug());