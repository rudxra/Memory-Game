const tilesContainer= document.querySelector('.tiles');
const colors=["Turquoise","Lavender","Coral","Crimson","gold","SpringGreen","Fuchsia","RoyalBlue"];
const colorsPickList=[...colors,...colors];
const tileCount= colorsPickList.length;//total no of tiles in game

for(let i=0;i<tileCount;i++){
    const randomIndex=Math.floor(Math.random()*colorsPickList.length);
    const color=colorsPickList[randomIndex];
    const tile= buildMyTile(color);
    colorsPickList.splice(randomIndex,1);
    tilesContainer.appendChild(tile);
}
let revealedCount=0;//how many tiles users answered correctly
let activeTile=null;//which tile is cyrrently opened
let awaitingFinish=false;//user will wait during this duration to reset tiles

function buildMyTile(color){
    const element= document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-color",color);
    element.setAttribute("data-revealed","false");
    element.addEventListener('click',()=>{
        const revealed= element.getAttribute("data-revealed");
        if(awaitingFinish || revealed === "true" || element == activeTile){
            return;
        }
        element.style.backgroundColor=color;
        if(!activeTile){
            activeTile=element;
            return;
        }
        const colorToMatch= activeTile.getAttribute("data-color");
        if(colorToMatch === color){
            element.setAttribute("data-revealed","true");
            activeTile.setAttribute("data-revealed","true");
            activeTile=null;
            awaitingFinish=false;
            revealedCount+=2;
            if(revealedCount===tileCount){
                alert("You won the game pls refresh the page");
            }
            return ;
        }
        awaitingFinish=true;
        setTimeout(() => {
            activeTile.style.backgroundColor=null;
        element.style.backgroundColor=null;
        awaitingFinish=false;
        activeTile=null;
        }, 1000);
        
    })
    return element;
}
