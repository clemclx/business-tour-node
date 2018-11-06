module.exports = {


  friendlyName: 'Send password recovery email',


  description: 'Send a password recovery notification to the player with the specified email address.',


  inputs: {

    emailAddress: {
      description: 'The email address of the alleged player who wants to recover their password.',
      example: 'rydahl@example.com',
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      description: 'The email address might have matched a player in the database.  (If so, a recovery email was sent.)'
    },

  },


  fn: async function (inputs, exits) {

    // Find the record for this player.
    // (Even if no such player exists, pretend it worked to discourage sniffing.)
    var playerRecord = await player.findOne({ emailAddress: inputs.emailAddress });
    if (!playerRecord) {
      return exits.success();
    }//•

    // Come up with a pseudorandom, probabilistically-unique token for use
    // in our password recovery email.
    var token = await sails.helpers.strings.random('url-friendly');

    // Store the token on the player record
    // (This allows us to look up the player when the link from the email is clicked.)
    await player.update({ id: playerRecord.id }).set({
      passwordResetToken: token,
      passwordResetTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
    });

    // Send recovery email
    await sails.helpers.sendTemplateEmail.with({
      to: inputs.emailAddress,
      subject: 'Password reset instructions',
      template: 'email-reset-password',
      templateData: {
        fullName: playerRecord.fullName,
        token: token
      }
    });

    return exits.success();

  }


};
