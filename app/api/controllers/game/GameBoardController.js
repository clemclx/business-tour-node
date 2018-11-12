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
      sails.log('Finn\'s id is:', gameB);
      this.addPlayerCurrentGame(gameB.id)
      return gameB;
      
    }catch(err){
      sails.log(err)
    }
  },
  addPlayerCurrentGame: async function (id){
      try {
          let data = await player.update({idOfTheCurrentGame: '0'}).set({idOfTheCurrentGame: id}).fetch();
          sails.log('====>',data)
      }catch(err){
        sails.log(err)
      }
    },
  removePlayerCurrentGame: async function (id){
      try {
          let data = await player.update({idOfTheCurrentGame: id}).set({idOfTheCurrentGame: '0'}).fetch();
          sails.log('====>',data)
      }catch(err){
        sails.log(err)
      }
  },

  getPlayerId: async function(){
    if (!login.playerRecord){
      return 'jai pas duser'
    }
    return login.playerRecord
  },

  

}
console.log(module.exports.removePlayerCurrentGame()) 








