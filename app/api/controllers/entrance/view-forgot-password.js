module.exports = {


  friendlyName: 'View forgot password',


  description: 'Display "Forgot password" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/forgot-password',
    },

    redirect: {
      description: 'The requesting player is already logged in.',
      extendedDescription: 'Logged-in players should change their password in "Account settings."',
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    if (this.req.me) {
      throw {redirect: '/'};
    }

    return exits.success();

  }


};
