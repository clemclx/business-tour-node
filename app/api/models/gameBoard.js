require('sails-mysql')


module.exports = {
    attributes: {
        numberOfCurrentPlayers: {
            type: 'number',
            description: 'Number of players in the game',
        },
        createdBy:{
            type:'number'
        },
        isPlaying:{
            type:'number'
        },
        isWin: {
            type: 'boolean',
            description: 'Boolean to know if the game is win or not',
        },

        hasBegun:{
            type: 'boolean',
            description: 'Boolean to know if the game is start or not',
        },
    }
}