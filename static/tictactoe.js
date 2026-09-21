game = {
  "state": "playing",  // or "waiting" or "won" or "tie"
  "board": [           // game board, 0 for empty cells, 1 or 2 for filled cells.
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
  ],
  "next": 1,  // 1 or 2, the player whose turn it is, the winner if state is "won"
}

function updateHtml(game) {

    let index = 0
    for (let button of document.getElementsByTagName("button")) {
        if (game.board[index] == 1) {
            button.textContent = 'X'
        } else if (game.board[index] == 2) {
            button.textContent = 'O'
        } else {
            button.textContent = ''
        }
        button.setAttribute('data-state', game.board[index])
        index += 1
    }
}

function dropPiece(game, cell) {
    // Spiel bereits beendet?
    if (game.state !== "playing") {
        return
    }

    // Feld besetzt?
    if (game.board[cell] !== 0) {
        return
    }

    // Stein setzen
    game.board[cell] = game.next

    // Gewinnkombinationen prüfen
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let win of wins) {
        const [a, b, c] = win

        if (
            game.board[a] !== 0 &&
            game.board[a] === game.board[b] &&
            game.board[b] === game.board[c]
        ) {
            game.state = "won"
            game.next = game.board[a]
            updateHtml(game)
            return
        }
    }

    // Unentschieden prüfen
    if (!game.board.includes(0)) {
        game.state = "tie"
        updateHtml(game)
        return
    }

    // Spieler wechseln
    game.next = game.next === 1 ? 2 : 1

    updateHtml(game)
}

let index = 0
for (let button of document.getElementsByTagName("button")) {
    const cell = index
    button.addEventListener("click", () => dropPiece(game, cell))
    index += 1
}