

//function who get id of game launch
//TODO Add this id to players table when player joning and set at 0 when player leave

let login = require('../entrance/login')
let playerId = 2 // a chnager avec l'id de la personne logged in

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
 /* showIdGameStarted : async function (gameStarted, j){
      let res = [];
      try {
          res = gameStarted[j].id
          return res
      }catch(err){
        sails.log(err)
      }
    }, */

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
  addPlayerCurrentGame: async function (  ){
      console.log(playerId, 'PLAYER ID')
      try {
           let data = await player.update( {
            where: {id: playerId}
            }).set({idOfTheCurrentGame: id}).fetch();
          sails.log('====>1',data)
          return data;
      }catch(err){
        sails.log(err)
      }
    },
  removePlayerCurrentGame: async function (){
      try {       
          let data = await player.update({
            where: {id: playerId}})
            .set({idOfTheCurrentGame: 0}).fetch();
          sails.log('====>4',data)
      }catch(err){
        sails.log(err)
      }
  },

  CountPlayerInGame: async function (req, res){
    let idCurrentGame = 1 //A changer avec la fonction du boutton pour rejoindre une game #### idCurrentGame et idGameBoard doivent correspondre ####
    try {
      let numberPlayer = await player.find({
        where: { idOfTheCurrentGame : idCurrentGame },
        select: ['id', 'idOfTheCurrentGame', 'fullName']
      })
      console.log('-----> number Player',numberPlayer)
      console.log('-----> longueur du tableau', numberPlayer.length)
      let NombreDeJoueur = numberPlayer.length
      return NombreDeJoueur
    }catch(err){
      sails.log(err)
    }
  },

  UpdateNumberOfPlayerInGame: async function (){
    let nombreJoueur = this.CountPlayerInGame()
    let idGameBoard = 1
      try {
        // console.log('NombreJoueur = ', nombreJoueur)
        await nombreJoueur.then(function(res){
          if(res > 4){
            console.log('Partie Complete, impossible de rejoindre')
          } else if(res < 4){
            let numberPlayers =  gameBoard.update({
            where: {id : idGameBoard}})
            .set({numberOfCurrentPlayers : res}).fetch();
            console.log('------> Nombre de joueurs ', numberPlayers)
            return numberPlayers 
          } else if( res = 4){
            let numberPlayers =  gameBoard.update({
              where: {id : idGameBoard}})
              .set({numberOfCurrentPlayers : res}).fetch();
              console.log('------> Nombre de joueurs ', numberPlayers)
              console.log('Partie Complete') 
              return numberPlayers
              
          }
        })
        
      } catch (err){
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


console.log(module.exports.UpdateNumberOfPlayerInGame())


