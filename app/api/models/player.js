/**
 * Player.js
 *
 * A Player who can log in to this application.
 */

module.exports = {

  attributes: {
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com'
    },

    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the Player\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    fullName: {
      type: 'string',
      required: true,
      description: 'Full representation of the Player\'s name',
      maxLength: 120,
      example: 'Lisa Microwave van der Jenny'
    },

    isSuperAdmin: {
      type: 'boolean',
      description: 'Whether this Player is a "super admin" with extra permissions, etc.',
      extendedDescription:
`Super admins might have extra permissions, see a different default home page when they log in,
or even have a completely different feature set from normal Players.  In this app, the \`isSuperAdmin\`
flag is just here as a simple way to represent two different kinds of Players.  Usually, it's a good idea
to keep the data model as simple as possible, only adding attributes when you actually need them for
features being built right now.

For example, a "super admin" Player for a small to medium-sized e-commerce website might be able to
change prices, deactivate seasonal categories, add new offerings, and view live orders as they come in.
On the other hand, for an e-commerce website like Walmart.com that has undergone years of development
by a large team, those administrative features might be split across a few different roles.

So, while this \`isSuperAdmin\` demarcation might not be the right approach forever, it's a good place to start.`
    },

    passwordResetToken: {
      type: 'string',
      description: 'A unique token used to verify the Player\'s identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.'
    },

    passwordResetTokenExpiresAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment when this Player\'s `passwordResetToken` will expire (or 0 if the Player currently has no such token).',
      example: 1502844074211
    },

    emailProofToken: {
      type: 'string',
      description: 'A pseudorandom, probabilistically-unique token for use in our account verification emails.'
    },

    emailProofTokenExpiresAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment when this Player\'s `emailProofToken` will expire (or 0 if the Player currently has no such token).',
      example: 1502844074211
    },

    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'changeRequested', 'confirmed'],
      defaultsTo: 'confirmed',
      description: 'The confirmation status of the Player\'s email address.',
      extendedDescription:
`Players might be created as "unconfirmed" (e.g. normal signup) or as "confirmed" (e.g. hard-coded
admin Players).  When the email verification feature is enabled, new Players created via the
signup form have \`emailStatus: 'unconfirmed'\` until they click the link in the confirmation email.
Similarly, when an existing Player changes their email address, they switch to the "changeRequested"
email status until they click the link in the confirmation email.`
    },

    emailChangeCandidate: {
      type: 'string',
      description: 'The (still-unconfirmed) email address that this Player wants to change to.'
    },

    lastSeenAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment at which this Player most recently interacted with the backend while logged in (or 0 if they have not interacted with the backend at all yet).',
      example: 1502844074211
    },

    initialMoney: {
      type: 'number',
      description: 'A number to know how much the player got when the game start'
    },

    currentMoney: {
      type: 'number',
      description: 'A number to know how much the player got during the game'
    },

    inJail: {
      type: 'boolean',
      description: 'Boolean to know if the player is in jail or not'
    },

    isBankrupt: {
      type: 'boolean',
      description: 'Boolean to know if the player bankrupt or not'
    },

    numberOfHouses: {
      type: 'number',
      description: 'A number to know how many houses the player got'
    },

    numberOfRoundsJailed: {
      type: 'number',
      description: 'A number to know how many rounds the player is in jail'
    },

    numberOfDoubleDice: {
      type: 'number',
      description: 'A number to know how many times the player has made double dice'
    },

    // timeOfTurn: {
    //   type: 'string',
    //   columnType: 'datetime',
    //   description: "player's game time per turn"
    // },

    idOfTheCurrentGame:{
      type: 'number',
      description: 'ID to know in which game the player is'
    }

  },

};
