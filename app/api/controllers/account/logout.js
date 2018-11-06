module.exports = {


  friendlyName: 'Logout',


  description: 'Log out of this app.',


  extendedDescription:
`This action deletes the \`req.session.playerId\` key from the session of the requesting player agent.
Actual garbage collection of session data depends on this app's session store, and
potentially also on the [TTL configuration](https://sailsjs.com/docs/reference/configuration/sails-config-session)
you provided for it.

Note that this action does not check to see whether or not the requesting player was
actually logged in.  (If they weren't, then this action is just a no-op.)`,


  exits: {

    success: {
      description: 'The requesting player agent has been successfully logged out.'
    },

    redirect: {
      description: 'The requesting player agent looks to be a web browser.',
      extendedDescription: 'After logging out from a web browser, the player is redirected away.',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs, exits) {

    // Clear the `playerId` property from this session.
    delete this.req.session.playerId;

    // Then finish up, sending an appropriate response.
    // > Under the covers, this persists the now-logged-out session back
    // > to the underlying session store.
    if (!this.req.wantsJSON) {
      throw {redirect: '/login'};
    } else {
      return exits.success();
    }

  }


};
