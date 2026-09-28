import express from 'express'
import cookieParser from 'cookie-parser'
import { newGame, dropPiece, toJson, isWaiting, joinGame } from './tictactoe.js'
 
const app = express()
app.use(cookieParser())
const port = 3001
 
/** Retrieve the user's identifier from the cookies, or set a new one. */
function getUserId(req, res) {
    let userid = req.cookies.userid
    if (userid == undefined) {
        userid = crypto.randomUUID()
        res.cookie('userid', userid)
    }
    return userid
}
 
app.get('/:gameid/game', (req, res) => {
    const gameid = parseInt(req.params['gameid'])
    let game = games[gameid]
    if (game == undefined) {
        // Create a new game if it does not exist.
        game = newGame(gameid)
        games[gameid] = game
    }
    const userid = getUserId(req, res)
    /* join game that is waiting for players. */
    if (isWaiting(game, userid)) {
        joinGame(game, userid)
    }
    res.json(game)
})

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