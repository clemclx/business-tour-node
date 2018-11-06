require('sails-mysql')


module.exports = {
    attributes: {
        moneyEarned: {
            type: 'number',
            description: 'Number of money won during the game',
        },
    
        numberPropertiesBought: {
            type: 'number',
            description: 'Number of properties purchased during the game',
        },

        totalDuration:{
            type: 'string',
            columnType: 'datetime',
            description: 'Duration of the game',
        },

        numberTurns:{
            type: 'number',
            description: 'Number of turns played during the game',
        },

        idPlayer:{
            type: 'number',
            description: 'ID to know which player the stats belong to',
        },
    }
}