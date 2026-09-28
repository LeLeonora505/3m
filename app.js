// bi de website: http://localhost:3001/0/game
import express from 'express'
import cookieParser from 'cookie-parser'
import { newGame, dropPiece, toJson, isWaiting, joinGame } from './tictactoe_server.js'
 
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
 
app.use(cookieParser())
 
/** Retrieve the user's identifier from the cookies, or set a new one. */
function getUserId(req, res) {
    let userid = req.cookies.userid
    if (userid == undefined) {
        userid = crypto.randomUUID()
        res.cookie('userid', userid)
    }
    return userid
}
 
    const userid = getUserId(req, res)
    /* join game that is waiting for players. */
    if (isWaiting(game, userid)) {
        joinGame(game, userid)
    }
    res.json(game)


/** Make a play. Only allows the joined players to  */
app.get('/:gameid/set/:column', (req, res) => {
    const userid = getUserId(req, res)
    const game = games[parseInt(req.params['gameid'])]
    if (game == undefined) {
        res.status(404).json("no such game")
    } else if (game.state != "playing") {
        res.status(403).json("game is not playing")
    } else if (getCurrentPlayer(game) != userid) {
        res.status(403)
        res.json("Not your turn, my friend")
    } else {
        let column = parseInt(req.params['column'])
        dropPiece(game, column)
        res.json(toJson(game, userid))
    }
})