require('sails-mysql')


module.exports = {
    attributes: {
      content: {
        type: 'string',
        description: 'Description of the cards',
    },
  }
}