/**
 * GameBoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//function who get id of game launch
//TODO Add this id to players table when player joning and set at 0 when player leave

let login = require('../entrance/login')
module.exports = {
  showGameStarted: async function (){
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
            idArray[i] = this.showIdGameStarted(data, j)
            j++
          }
          return idArray
      }catch(err){
        sails.log(err)
      }
    },
  showIdGameStarted : async function (gameStarted, j){
      let res = [];
      try {
          res = gameStarted[j].id
          return res
      }catch(err){
        sails.log(err)
      }
    },
  createGameBoard: async function (){
    try {
      let gameB = await gameBoard.create({numberOfCurrentPlayers: '1', isWin: '0', hasBegun: '1'}).fetch()
      sails.log('Finn\'s id i:', gameB.id);
      this.addPlayerCurrentGame(gameB.id)
      return gameB;
      
    }catch(err){
      sails.log(err)
    }
  },
  addPlayerCurrentGame: async function (id){
      let playerId = this.getPlayerId()
      console.log(playerId, 'PLAYER ID')
      try {
          let findedPlayer = await player.find(playerId).here({ idOfTheCurrentGame: 0})
          console.log(findedPlayer)
          // let data = await player.update( {
          //   where: {idOfTheCurrentGame: 0, id: playerId}
          // }).set({idOfTheCurrentGame: id}).fetch();
          sails.log('====>1',data)
          return data;
      }catch(err){
        sails.log(err)
      }
    },
  removePlayerCurrentGame: async function (){
      try {
          let data = await player.update({idOfTheCurrentGame: '1'}).set({idOfTheCurrentGame: '0'}).fetch();
          sails.log('====>4',data)
      }catch(err){
        sails.log(err)
      }
  },
  getPlayerId: async function(){
    if (!login.playerRecord){
      return 'Error User'
    }
    console.log('playerRecordId 5: ',login.playerRecord.id)
    return login.playerRecord.id
  }
}
console.log(module.exports.createGameBoard())

