const gameBoard = document.getElementById('gameboard');
const infoDisplay = document.getElementById('info');
const starCells = ['','','','','','','','',''];
let go = 'circle';
infoDisplay.textContent = 'circle goes first'

function createBoard(){
    starCells.forEach((_item, index) => {
        const cellElements = document.createElement('div');
        cellElements.classList.add('square');
        cellElements.id = index;
        cellElements.addEventListener('click', addGo)
        gameBoard.append(cellElements)
    })
}
createBoard()

function addGo(e){
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === 'circle' ? 'cross' : 'circle';
    infoDisplay.textContent = 'it is now ' + go + ' s go.';
    e.target.removeEventListener('click', addGo)
    checkScore()
}

function checkScore(){
    const allSquares = document.querySelectorAll('.square')
    const winingComboss = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    winingComboss.forEach((array)=>{
       const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
       if(circleWins){
        infoDisplay.textContent = 'circle Wins';
        allSquares.forEach(item => item.replaceWith(item.cloneNode(true)))
        return
       }
    });

    winingComboss.forEach((item)=>{
        const crossWins = item.every((cell)=> allSquares[cell].firstChild ?.classList.contains('cross'));
        if(crossWins){
         infoDisplay.textContent = 'cross Wins';
         allSquares.forEach(item => item.replaceWith(item.cloneNode(true)))
         return
        }
     })
}
