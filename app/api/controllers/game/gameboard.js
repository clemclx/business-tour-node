const gameBoard = require('../../models/gameBoard')

let qry = 'SELECT * FROM gameBoard';
let valuesToEscape = [];
sails.getDatastore().sendNativeQuery(qry, valuesToEscape, function(err, resultat) {
  console.log(resultat);
  console.log(err);
});
