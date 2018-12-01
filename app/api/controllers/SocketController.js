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

        //initialize game
        //Sauvegarder le json dans req.body.turn ==> engine.makeTurnOrder(req, res);
        lobby.initializePlayerInGame(req, res);
        engine.makePion(req, req);


        sails.sockets.broadcast(gameId, 'launchGame', {launched: true})
        res.json({message: 'ok'})
    }

}