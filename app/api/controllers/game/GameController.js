

//function who get id of game launch
//TODO Add this id to players table when player joning and set at 0 when player leave

let login = require('../entrance/login')
let playerId = 1 // a changer avec l'id de la personne logged in

module.exports = {

  showGameStarted: async function (req, res){
      // let j = 0;
      // let idArray = [];
      try {
          let gameStarted = await gameBoard.find({
            where: {hasBegun: '1'},
            select: ['id', 'numberOfCurrentPlayers']
          })
          console.log('game started :',gameStarted)
          // for (let i=0; i < data.length; i++)
          // { 
          //   idArray[i] = this.showIdGameStarted(data, j)
          //   j++
          // }
          if (gameStarted == undefined){
          return 'aucune game'
          }
          else {
            let showJson = JSON.stringify(gameStarted)
            if (showJson){
              return res.json(showJson)
            }
                    }
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

  createGameBoard: async function (req, res){
    try {
      let gameB = await gameBoard.create({numberOfCurrentPlayers: '1', isWin: '0'}).fetch()
      sails.log('Finn\'s id i:', gameB.id);
      this.addPlayerCurrentGame(gameB.id)
      let showJson = JSON.stringify(gameB)
      console.log(showJson)
      if(showJson){
        return res.json(showJson)
      }
      
    }catch(err){
      sails.log(err)
    }



  },


  addPlayerCurrentGame: async function (id, req, res){
      console.log(playerId, 'PLAYER ID')
      try {
           let data = await player.update( {
            where: {id: playerId}
            }).set({idOfTheCurrentGame: id}).fetch();
          sails.log('====>1',data)
          let showJson = JSON.stringify(data)
          if (showJson){
            return res.json(showJson)
          }
      }catch(err){
        sails.log(err)
      }
    },

  removePlayerCurrentGame: async function (req, res){
      try {       
          let data = await player.update({
            where: {id: playerId}})
            .set({idOfTheCurrentGame: 0}).fetch();
          sails.log('====>4',data)
          let showJson = JSON.stringify(data)
          if (showJson){
            return res.json(showJson)
          }
      }catch(err){
        sails.log(err)
      }
  },


  // Compte le nombre de joueur dans la partie, dans le tableau des parties affichées.
  CountPlayerInGame: async function (req, res){
    let idCurrentGame = 1 //A changer avec la fonction du boutton pour rejoindre une game #### idCurrentGame et idGameBoard doivent correspondre ####
    try {
      let numberPlayer = await player.find({
        where: { idOfTheCurrentGame : idCurrentGame },
        select: ['id', 'idOfTheCurrentGame', 'emailAddress']
      })
      console.log('-----> number Player',numberPlayer)
      console.log('-----> longueur du tableau', numberPlayer.length)
      let NombreDeJoueur = numberPlayer.length
      let showJson = JSON.stringify(NombreDeJoueur)
          if (showJson){
            return res.json(showJson)
          }
    }catch(err){
      sails.log(err)
    }
  },

  // Modifie le nombre de joueur dans la partie que l'on vient de rejoindre 
  UpdateNumberOfPlayerInGame: async function (req, res){
    let nombreJoueur = this.CountPlayerInGame()
    let idGameBoard = 1 //Changer avec l'id de la partie que l'on vient de rejoindre 
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
            let showJson = JSON.stringify(numberPlayers)
            if (showJson){
              return res.json(showJson)
            }
          } else if( res = 4){
            let numberPlayers =  gameBoard.update({
              where: {id : idGameBoard}})
              .set({numberOfCurrentPlayers : res}).fetch();
              console.log('------> Nombre de joueurs ', numberPlayers)
              console.log('Partie Complete') 
              let showJson = JSON.stringify(numberPlayers)
              if (showJson){
                return res.json(showJson)
              }
              
          }
        })
        
      } catch (err){
        sails.log(err)
      }
  },



  startGame : async function(req, res){
    try{
      let currentGame = 1  // A changer avec l'id de la partie en cours que le joueur vient de rejoindre
      let changeStatus = gameBoard.update({
        where: {id : currentGame}
        
      }).set({hasBegun : 1}).fetch()

      let showJson = JSON.stringify(changeStatus)
      if (showJson){
        return res.json(showJson)
      }
      
    }catch (err){ 
      sails.log(err)
    }
  },

  getPlayerId: async function(){
    if (!login.playerRecord){
      return res.JSON('Error User') 
      
    }
    console.log('playerRecordId 5: ',login.playerRecord.id)
    let showJson = JSON.stringify(login.playerRecord)
              if (showJson){
                return res.json(showJson)
              }
  } 
}

//module.exports.showGameStarted();
console.log(module.exports.createGameBoard());
//module.exports.addPlayerCurrentGame();
//module.exports.removePlayerCurrentGame();
//module.exports.CountPlayerInGame();
//console.log(module.exports.UpdateNumberOfPlayerInGame());
//module.exports.startGame();


