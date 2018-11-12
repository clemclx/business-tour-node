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
  addPlayerCurrentGame: async function (){
      let playerRecord = getPlayerSession();
      try {
          let data = await player.update({idOfTheCurrentGame: '0'}).set({idOfTheCurrentGame: '1'}).fetch();
          sails.log('====>',data)
      }catch(err){
        sails.log(err)
      }
    },
  removePlayerCurrentGame: async function (){
      try {
          let data = await player.update({idOfTheCurrentGame: '1'}).set({idOfTheCurrentGame: '0'}).fetch();
          sails.log('====>',data)
      }catch(err){
        sails.log(err)
      }
  },
  createGameBoard: async function (){
    try {
      let gameB = await gameBoard.create({numberOfCurrentPlayers: '1', isWin: '0', hasBegun: '1'}).fetch()
      sails.log('Finn\'s id is:', gameB.numberOfCurrentPlayers);
      return gameB;
    }catch(err){
      sails.log(err)
    }
  },
  show: async function(){
    if (login.playerRecord.id){
      console.log(login.playerRecord.id)
    }
  }
}
console.log(module.exports.show())

