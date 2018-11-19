require('sails-mysql')


module.exports = {
    attributes: {
        emailAddress: {
            type: 'string'
        },

        fullName: {
            type: 'string'
        },

        isSuperAdmin:{
            type: 'boolean'
        },

        password:{
            type: 'string'
        }
    }
}