/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /lobby':              { action: 'game/Lobby/showGameStarted'},
  'POST /lobby/create':      { action: 'game/Lobby/createGameBoard'},
  'GET /lobby/remove':       { action: 'game/Lobby/removePlayerCurrentGame'},
  'POST /lobby/join':        { action: 'game/Lobby/addPlayerCurrentGame'},
  'GET /lobby/countgame':    { action: 'game/Lobby/CountPlayerInGame'},
  'GET /lobby/update':       { action: 'game/Lobby/UpdateNumberOfPlayerInGame'},
  'GET /waiting/:id':        { action: 'game/Lobby/startGame'},
  'GET /dice':               { action: 'game/Engine/rollingDice'},
  'GET /alltiles':           { action: 'game/Board/GetAllTiles'},
  'GET /ingame/createtiles': { action: 'game/Board/GenerateTiles'},
  'GET /pion':               { action: 'game/Engine/makePion'},
  'GET /pion/move':          { action: 'game/Engine/movePion'},
  'GET /game/turn':          { action: 'game/Engine/makeTurnOrder'},
  'GET /game/buyOption':     { action: 'game/Engine/buyOption'},
  'GET /game/chooseBuy':     { action: 'game/Engine/chooseToBuy'},
  'GET /game/bankrupt':      { action: 'game/Engine/bankruptPlayer'},
  'GET /game/end':           { action: 'game/Engine/reinitializePlayer'},
  'POST /socket/test':       { action: 'socket/test'},
  'POST /socket/join':       { action: 'socket/join'},
  'POST /socket/launch':     { action: 'socket/launch'},
  'POST /socket/game':       { action: 'socket/game'},
  'GET /game/impot':         { action: 'game/Tile/taxTile'},
  'GET /game/depart':        { action: 'game/Tile/startTile'},
  'GET /game/maketurn':      { action: 'game/Lobby/startGame'},



  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },

  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },
  'GET  /api/v1/account/overview':          { action: 'account/get-profile' },
  
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',

};
