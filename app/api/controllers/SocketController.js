module.exports = {

    test: function(req, res) {
        let gameId = 'Game'+req.body.gameId
        console.log(gameId)
        sails.sockets.join(req, gameId)

        res.json({message: 'lol'}) 
    },

    join: function(req, res) {
        console.log(req.body)
        let gameId = 'Game'+req.body.gameId
        console.log(gameId)

        sails.sockets.join(req, gameId)

        sails.sockets.broadcast(gameId, 'refreshPlayer', {player: 1})
        res.json({message: 'ok'})
    }

}