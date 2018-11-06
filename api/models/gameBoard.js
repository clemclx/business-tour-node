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

        moneyPlayers:{
            type: 'number',
            description: 'Money of players during the game',
        },

        idPlayer:{
            type: 'number',
            description: 'ID to know which player the stats belong to',
        },
    }
}