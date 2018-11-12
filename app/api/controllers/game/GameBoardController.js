/**
 * GameBoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// module.exports = {
//    //function who get id of game launch
//   //TODO Add this id to players table when player joning and set at 0 when player leave
//   fn: async function getGameStarted(data){
//     let j = 0;
//     let idArray = [];
//     try {
//           data = await gameBoard.find({
//           where: {hasBegun: '1'},
//           select: ['id', 'numberOfCurrentPlayers']
//         })
//         for (let i=0; i < data.length; i++)
//         { 
//           idArray[i] = getOnlyIdGameStarted(data, j)
//           j++
//         }
//         console.log('ici')
//         return idArray
//     }catch(err){
//       sails.log(err)
//     }
//   },
//   fn: async function getOnlyIdGameStarted(gameStarted, j){
//     let res = [];
//     try {
//         res = gameStarted[j].id
//         return res
//     }catch(err){
//       sails.log(err)
//     }
//   },
// };

//function who get id of game launch
//TODO Add this id to players table when player joning and set at 0 when player leave
module.exports.log = {
  inputs: {

    emailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true
    },
  },

  fn: async function getPlayerSession(inputs, exits) {

    // Look up by the email address.
    // (note that we lowercase it to ensure the lookup is always case-insensitive,
    // regardless of which database we're using)
    let playerRecord = await player.findOne({
      emailAddress: inputs.emailAddress.toLowerCase(),
    });
    return playerRecord;
  },
   fn: async function getGameStarted(){
      let j = 0;
      let idArray = [];
      try {
          let data = await gameBoard.find({
            where: {hasBegun: '1'},
            select: ['id', 'numberOfCurrentPlayers']
          })
          console.log('YEEEEEEs',data)
          for (let i=0; i < data.length; i++)
          { 
            idArray[i] = getOnlyIdGameStarted(data, j)
            j++
          }
          return idArray
      }catch(err){
        sails.log(err)
      }
    },
    fn : async function getOnlyIdGameStarted(gameStarted, j){
      let res = [];
      try {
          res = gameStarted[j].id
          return res
      }catch(err){
        sails.log(err)
      }
    },
    fn: async function addPlayerCurrentGame(){
      let playerRecord = getPlayerSession();
      try {
          let data = await player.update({idOfTheCurrentGame: '0'}).set({idOfTheCurrentGame: '1'}).fetch();
          sails.log('====>',data)
      }catch(err){
        sails.log(err)
      }
    },
    fn: async function removePlayerCurrentGame(){
      try {
          let data = await player.update({idOfTheCurrentGame: '1'}).set({idOfTheCurrentGame: '0'}).fetch();
          sails.log('====>',data)
      }catch(err){
        sails.log(err)
      }
    }
}

