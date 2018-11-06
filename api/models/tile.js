require('sails-mysql')


module.exports = {
    attributes: {
        name: {
            type: 'string',
            description: "Tile's name",
        },
  
        isOwned: {
            type: 'boolean',
            description: 'Boolean to know if the tile is owned or not',
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