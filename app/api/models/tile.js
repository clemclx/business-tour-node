require('sails-mysql')


module.exports = {
    attributes: {
        name: {
            type: 'string',
            description: "Tile's name",
        },
  
        price:{
            type: 'number',
            description: "Tile's price",
        },

        tileType:{
            type: 'number',
            description: "Number to know tile's type",
        },

    }
}