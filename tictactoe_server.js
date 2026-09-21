
export function newGame() {
    let game = {
        "board" : [
            0,0,0,
            0,0,0,
            0,0,0,
        ],
        "state": "playing", // or "tie", "won"
        "next": 1, // or 2
   
    }
    return game
}
 
 // reacts to game play
export function selectPiece(game, index) {
 
    if (game.state != "playing") {
        return
    }
 
    console.log("clicked!" + index)
    // find free cell
    if (game.board [index] != 0) {
        console.log("Cell is taken")
        return
    }
    game.board[index] = game.next
 
    checkWinner(game)
    if (game.state == "playing") {
        togglePlayer(game)
    }
 
   
}
 
// checks if the game has ended
export function checkWinner(game) {
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
export function togglePlayer(game) {
    if (game.next == 1) {
        game.next = 2
    } else {
        game.next = 1
    }
 
}
 
export function isWaiting(game, userid) {
  // a game is waiting if we are waiting and the player is not the first player already.
  return game.state == "waiting" && game.player1 != userid
}
 
export function joinGame(game, userid) {
  if (!isWaiting(game, userid)) {
    throw Error("Not waiting!")
  }
  if (game.player1 == undefined) {
    game.player1 = userid
  } else {
    game.player2 = userid
    game.state = "playing"
  }
}

/* Returns the playerid whose turn it is. */
export function getCurrentPlayer(game) {
  return game.next == 1 ? game.player1 : game.player2
}

export function toJson(game, userid) {
  let copy = structuredClone(game) // make a copy
  if (game.state == "playing") {
    if (copy.player1 == userid && copy.next == 1 || copy.player2 == userid && copy.next == 2) {
      copy["myturn"] = true
    }
  } else if (game.state == "won") {
    if (copy.player1 == userid && copy.next == 1 || copy.player2 == userid && copy.next == 2) {
      copy["winner"] = true
    }
  }
  return copy
}