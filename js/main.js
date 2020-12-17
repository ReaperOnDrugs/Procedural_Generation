var canvas = document.getElementById("gamescreen");
var ctx = canvas.getContext('2d');

var tilesId = new Array;
var dim = 80;
var startPos = {
    x: 8,
    y: 5
};

canvas.addEventListener("click", (e) => {
    ctx.fillStyle = "rgba(40,40,40,1)";
    ctx.fillRect(0,0,1280,720);
    for (let i = 0; i < 9; i++){
        tilesId[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    generateMap();
})

function createImages(arr){
    let newImg = new Image;
    let newArray = new Array;
    for (let i = 0; i<arr.length; i++){
        newImg.src = "assets/tiles/YellowTile"+ arr[i].toString() +".jpg";
        newArray.push(newImg);
    }
    return newArray;
}

var genQ = new Array;
var inter;
var currentRooms = 0;
var maxRooms = 20;

function generateMap(){
    if (currentRooms > 0){
        location.reload();
    }
    let startTile = document.querySelector(".hasLeft");
    ctx.drawImage(startTile,startPos.x * dim,startPos.y * dim,dim,dim);
    tilesId[startPos.y][startPos.x] = 1;

    genQ.push({x:startPos.x - 1, y:startPos.y, n: 3});
    genQ.push({x:startPos.x, y:startPos.y - 1, n: 4});
    genQ.push({x:startPos.x + 1, y:startPos.y, n: 1});
    genQ.push({x:startPos.x, y:startPos.y + 1, n: 2});
    inter = setInterval(tileGenerator, 300);
}

function tileGenerator(){
    if ((genQ.length < 1) || (currentRooms >= maxRooms)){
        clearInterval(inter);
    }
    let currentTile = genQ[0];
    if (tilesId[currentTile.y][currentTile.x] == 0){
        let avalTiles;
        let randomIndex;
        if (currentTile.n == 1){
            avalTiles = document.querySelectorAll(".hasLeft");
            randomIndex = Math.floor(Math.random() * (avalTiles.length - 0) + 0);
        }
        else if (currentTile.n == 2){
            avalTiles = document.querySelectorAll(".hasTop");
            randomIndex = Math.floor(Math.random() * (avalTiles.length - 0) + 0);
        }
        else if (currentTile.n == 3){
            avalTiles = document.querySelectorAll(".hasRight");
            randomIndex = Math.floor(Math.random() * (avalTiles.length - 0) + 0);
        }
        else if (currentTile.n == 4){
            avalTiles = document.querySelectorAll(".hasBottom");
            randomIndex = Math.floor(Math.random() * (avalTiles.length - 0) + 0);
        }
        let randomTile = avalTiles[randomIndex];
        ctx.drawImage(randomTile, currentTile.x * dim, currentTile.y * dim, dim, dim);
        tilesId[currentTile.y][currentTile.x] = 1;
        if (randomTile.classList.contains("hasLeft")){
            genQ.push({x: currentTile.x - 1, y: currentTile.y, n: 3});
        }
        if (randomTile.classList.contains("hasTop")){
            genQ.push({x: currentTile.x, y: currentTile.y - 1, n: 4});
        }
        if (randomTile.classList.contains("hasRight")){
            genQ.push({x: currentTile.x + 1, y: currentTile.y, n: 1});
        }
        if (randomTile.classList.contains("hasBottom")){
            genQ.push({x: currentTile.x, y: currentTile.y + 1, n: 2});
        }
        currentRooms++;
    }
    genQ.splice(0,1);
}