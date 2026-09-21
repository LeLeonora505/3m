// bi de website: http://localhost:3001/0/game
 
import express from 'express'
 
 
import {newGame, selectPiece} from './tictactoe_server.js'
 
const app = express()
 
/** All games by gameid. */
let games = {}
 
app.get('/:gameid/game', (req, res) => {
    const gameid = parseInt(req.params['gameid'])
    let game = games[gameid]
    if (game == undefined) {
        // Create a new game if it does not exist.
        game = newGame(gameid)
        games[gameid] = game
    }
    res.json(game)
})
 
app.get('/:gameid/set/:column', (req, res) => {
    const game = games[parseInt(req.params['gameid'])]
    if (game == undefined) {
        // Send error code
        res.status(404).json("no such game")
    } else {
        let column = parseInt(req.params['column'])
        selectPiece(game, column)
        res.json(game)
    }
})
 
const port = 3001
 
 
 
 
// Serve all files from static/ as is.
// For example, a request for '/42/connect4.html' will be served from
// 'static/connect4.html'
app.use('/:gameid/', express.static('static'))
 
 
// Listen on the given port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
 
 
 
 