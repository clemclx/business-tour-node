require('sails-mysql')


module.exports = {
    attributes: {
        numberOfCurrentPlayers: {
            type: 'number',
            description: 'Number of players in the game',
        },
    
        isWin: {
            type: 'boolean',
            description: 'Boolean to know if the game is win or not',
        },

        hasBegun:{
            type: 'boolean',
            description: 'Boolean to know if the game is start or not',
        },

        playersId:{
            type: 'boolean',
            description: 'Boolean to know if the game is start or not',
        }
    }
}