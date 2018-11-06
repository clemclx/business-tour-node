require('sails-mysql')


module.exports = {
    attributes: {
        initialPosition: {
            type: 'number',
            description: 'Inital position of the pion at the beginning of the turn',
        },
    
        currentPosition: {
            type: 'number',
            description: 'Position of the pion after moving',
        },

        diceValue:{
            type: 'number',
            description: '',
        },

        idPlayer:{
            type: 'number',
            description: 'ID to know which player have the pion',
        },

        numberTurns:{
            type: 'number',
            description: 'Number of turns played',
        },
    }
}