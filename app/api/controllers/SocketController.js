let lobby = require('./game/LobbyController');
let engine = require('./game/EngineController');

module.exports = {

    test: function(req, res) {
        let gameId = 'Game'+req.body.gameId
        sails.sockets.join(req, gameId)
        res.json({message: 'lol'})
},

    join: function(req, res) {
        let gameId = 'Game'+req.body.gameId

        sails.sockets.join(req, gameId)
        lobby.updateNumberOfPlayerInGame(req, res);

        sails.sockets.broadcast(gameId, 'refreshPlayer', {player: 1})
        res.json({message: 'ok'})
    },

    launch: function(req, res) {
        let gameId = 'Game'+req.body.gameId

        console.log(gameId)

        var turnOrder = engine.makeTurnOrder(req, res);
        turnOrder.then((result) => {
            req.body.turn = result;
            req.body.userId = result[0];

            lobby.initializePlayerInGame(req, res);
            engine.makePion(req, req).then(() => {
                sails.sockets.broadcast(gameId, 'launchGame', {launched: true})

                engine.startTurn(req, res);
            })
        })
    }

}