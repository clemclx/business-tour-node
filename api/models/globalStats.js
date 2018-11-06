require('sails-mysql')


module.exports = {
    attributes: {
        numberWins: {
            type: 'number',
            description: 'Number of times the player won',
        },
    
        numberLoses: {
            type: 'number',
            description: 'Number of times the player has lost',
        },

        averageDurationGame:{
            type: 'string',
            columnType: 'datetime',
            description: 'Average time spent in a game',
        },

        idPlayer:{
            type: 'number',
            description: 'ID to know which player the stats belong to',
        },

        numberTotalGamesPlayed:{
            type: 'number',
            description: 'Total number of games played',
        },
    }
}