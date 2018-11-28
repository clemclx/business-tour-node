

//function who get id of game launch
//TODO Add this id to players table when player joning and set at 0 when player leave

// a changer avec l'id de la personne logged in

let engine = require('../game/EngineController')
module.exports = {

  showGameStarted: async function (req, res){
      // let j = 0;
      // let idArray = [];
      try {
          let gameStarted = await gameBoard.find({
            where: {hasBegun: '0'},
            select: ['id', 'numberOfCurrentPlayers']
          })
        
          let showJson = JSON.stringify(gameStarted)
          if (showJson){
            return res.json(showJson)
          }
      }catch(err){
        sails.log(err)
      }
    },

  createGameBoard: async function (req, res){
    try {
      let gameB = await gameBoard.create({
        numberOfCurrentPlayers: 1, isWin: 0, createdBy: req.session.userId, hasBegun: 0
      }).fetch()
      req.body.id = gameB.id;
      module.exports.addPlayerCurrentGame(req, res)
      let showJson = JSON.stringify(gameB)
      if (showJson){
        return res.json(showJson)
      }
    }catch(err){
      sails.log(err)
    }
  },

  addPlayerCurrentGame: async function (req, res){
    try {
        let data = await player.update({
          where: {id: req.session.userId}
          }).set({idOfTheCurrentGame: req.body.id}).fetch();
        let showJson = JSON.stringify(data)
        console.log('',showJson)
        return res.json(showJson)
    }catch(err){
      sails.log(err)
    }
  },

  removePlayerCurrentGame: async function (req, res){
      try {
        if (req.session.userId)
        {     
          let data = await player.update({
            where: {id: req.session.userId}})
            .set({idOfTheCurrentGame: 0}).fetch();
          let showJson = JSON.stringify(data)
          if (showJson){
            return res.json(showJson)
          }
        }
        else{
          return 'Error Session'
        }
      }catch(err){
        sails.log(err)
      }
  },


  // Compte le nombre de joueur dans la partie, dans le tableau des parties affichées.
  countPlayerInGame: async function (req, res){
    let idCurrentGame = req.body.gameId 
    try {
      let numberPlayerInGame = await player.find({
        where: { idOfTheCurrentGame : idCurrentGame },
        select: ['id', 'idOfTheCurrentGame']
      })
      console.log('======>',numberPlayerInGame)
      return numberPlayerInGame.length
    }catch(err){
      sails.log(err)
    }
  },

  // Modifie le nombre de joueur dans la partie que l'on vient de rejoindre 
  updateNumberOfPlayerInGame: async function (req, res){
    let nbPlayers = module.exports.countPlayerInGame(req, res)
    let idGameBoard = req.body.gameId 
    try {
        await nbPlayers.then(async function(nbPlayers){
          if(nbPlayers <= 4){
            let numberPlayers =  await gameBoard.update({
            where: {id : idGameBoard}})
            .set({numberOfCurrentPlayers : nbPlayers}).fetch();
            let showJson = JSON.stringify(numberPlayers)
            console.log(showJson)
            return res.json(showJson)
          } else {
          return 'Game Full'
          }
        })   
      } catch (err){
        sails.log(err)
      }
  },

  startGame: async function(req, res){
    try{
      engine.makeTurnOrder(req, res).then(function(result) {
       let turn = result
       console.log(turn)
      })
    }catch(err){
      sails.log(err)
    }
  },

  initializePlayerInGame : async function(req, res){
    try{
      let currentGame = req.body.gameId  // A changer avec l'id de la partie en cours que le joueur vient de rejoindre
      let changeStatus = await gameBoard.update({
        where: {id : currentGame}
      }).set({hasBegun : 1}).fetch()
      let initialMoney = 2000000
      await player.update({
        where: {idOfTheCurrentGame : req.body.gameId}
      }).set({initialMoney: initialMoney, currentMoney: initialMoney}).fetch()
      await gameBoard.update({where: {id: req.body.gameId}}).set({isPlaying: req.body.turn[0]}).fetch()
      let showJson = JSON.stringify(changeStatus)
      return res.json(showJson)
    }catch (err){ 
      sails.log(err)
    }
  },
};

