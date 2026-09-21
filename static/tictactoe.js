 
// checks if the game has ended
function checkWinner(game) {
     let combinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let combination of combinations) {
        let a = combination[0]
        let b = combination[1]
        let c = combination[2]
    }
 
     
 
}
 
// switches the active player
function togglePlayer(game) {
    if (game.next == 1) {
        game.next = 2
    } else {
        game.next = 1
    }
 
}
 
// Update HTML elements according to game
function updateHtml(game) {
    let index = 0
 
    for (let button of document.getElementsByTagName("button")) {
        if (game.board[index] == 1) {
            button.textContent = "X"
        }
        if (game.board[index] == 2) {
            button.textContent = "O"
        }
   
        button.setAttribute('data-state', game.board[index])
        index += 1
    }
 
}
 
// reacts to game play
async function selectPiece(index) {
 
   
 
    let response = await fetch(`set/${index}`)
    let game = await response.json()
 
   
    updateHtml(game)
}
 
async function init() {
    let response = await fetch(`game`)
    let game = await response.json()
   
    updateHtml(game)
    let index = 0
    for (let button of document.getElementsByTagName("button")) {
        const i = index
        button.addEventListener("click", () => selectPiece(i))
        index += 1
    }
}
 
init()