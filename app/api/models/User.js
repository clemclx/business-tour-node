require('sails-mysql')


module.exports = {
    attributes: {
        emailAddress: {
            type: 'text'
        },

        fullName: {
            type: 'text'
        },

        isSuperAdmin:{
            type: 'boolean'
        },

        password:{
            type: 'text'
        }
    }
}