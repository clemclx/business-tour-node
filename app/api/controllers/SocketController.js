module.exports = {

    test: function(req, res) {
        console.log(req.body.gameId)
        sails.sockets.join(req, 'Game' + req.body.gameId)


        sails.sockets.broadcast('Game', 'testSocket', {test: 'coucou'});
        res.json({message: 'lol'}) 
    },

    join: function(req, res) {
        sails.sockets.join(req, 'Game' + req.body.gameId)

        sails.sockets.broadcast('Game' + req.body.gameId, 'refreshPlayer', {player: 1}, req)
        res.json({message: 'ok'})
    }

}