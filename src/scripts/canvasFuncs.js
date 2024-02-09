import { spriteList, initSprites } from "./spriteFuncs";
import floor_tiles from "../images/floor_tiles.png";

let tiles;

const updateBackground = (ctx, width, height) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    renderTiles(tiles,ctx);
}

const initBackground = (ctx, width, height) =>{
    tiles = generateTiles();
    tiles[2][1] = 1;
    tiles[9][9] = 3;
    tiles[9][8] = 3;
    tiles[8][8] = 2;
    tiles[8][9] = 2;
    console.log(tiles);
    updateBackground(ctx, width, height);
}

const renderTiles = (tiles,ctx) =>{
    tiles.forEach((row,index) => {
        row.forEach((tile,index2) =>{
            drawTile(tile, index, index2, ctx);
        })
    })
}

const drawTile=(tile,x,y, ctx) =>{
    const size = 64;
    let tileset = new Image();
    tileset.src = floor_tiles;
    tileset.onload = function() {
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //where s = sprite, d = draw
    ctx.drawImage(tileset, tile*size, 0, size, size, x*size, y*size, size,size);
    }  
}

const generateTiles = () => {
    const arr = new Array(10).fill(0).map(()=>new Array(10).fill(0));
    return arr;
}

const initSprites2 = (ctx) =>{
    initSprites();
    spriteList.forEach(sprite => {sprite.draw(ctx); sprite.nextFrame()});
}

const updateSprites = (ctx)=>{
    spriteList.forEach(sprite => {sprite.draw(ctx); sprite.nextFrame()});
}

const clear = (ctx, width, height) =>{
    ctx.clearRect(0, 0, width, height);
}

export {initBackground, updateBackground, initSprites2, updateSprites, clear}