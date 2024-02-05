const drawBackground = (ctx, width, height) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    let tiles = generateTiles();
    tiles[2][1] = 1;
    tiles[9][9]=3;
    tiles[9][8]=3;
    tiles[8][8]=2;
    tiles[8][9]=2;
    renderTiles(tiles,ctx);
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
    let img = new Image();
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    img.src = "https://previews.dropbox.com/p/thumb/ACJac-yAyypHUvq_CdUGvTCiuwqmWsafB-gZfAdZvGFEi9zO8OEUkPetzDB2_OQMxU9i4Q9SYbJiyLmjreTNHJ1WncHDybR1LtPCuYZA-QkpWonx2cuPDbXl_I96QjwDWE0Rkbpi22WzenTcoEtAn18Fq8QVN6qdzsz1pfeQAJwga9UmvEf-LqyPv7vfDYtjjlZzeSdm3KJCjcG8t2WqWDhnxdlcPSDGYkYsXw1ot_CKT4ZZo8-kzE9wAL1THsWZ40-6yaqQJraNMn85rqAVDFa6uynoZtVaOrYF0jJsnVHReiK6rZaewzgO3_MqbLSPbi48IIUUKQqVdJLUuyw_zx7-/p.png";
    ctx.drawImage(img, tile*size, 0, size, size, x*size, y*size, size,size);
}

const generateTiles = () => {
    const arr = new Array(10).fill(0).map(()=>new Array(10).fill(0));
    return arr;
}

export {drawBackground}