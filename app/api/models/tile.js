require('sails-mysql')


module.exports = {
    attributes: {
        name: {
            type: 'string',
            description: "Tile's name",
        },
<<<<<<< HEAD

=======
  
>>>>>>> 0ce771d3f696e9b73a31b5f14deb08e78dee7d52
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