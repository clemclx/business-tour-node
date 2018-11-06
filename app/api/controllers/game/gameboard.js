const gameboard = require('../../models/gameBoard')

let qry = 'SELECT hasBegun, id FROM gameboard WHERE hasBegun = 1';
let valuesToEscape = [];
gameBoard.query('SELECT hasBegun, id FROM gameboard WHERE hasBegun = 1', function(err, resultat) {
  sails.log('resultat : ', resultat)
  console.log('resultat : ', resultat)
  for (let res in resultat){
      console.log('res===', res);
  }
  console.log(err);
});

console.log(valuesToEscape)
