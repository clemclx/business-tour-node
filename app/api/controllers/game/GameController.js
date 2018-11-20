

//function who get id of game launch
//TODO Add this id to players table when player joning and set at 0 when player leave

// a changer avec l'id de la personne logged in


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

  createGameBoard: async function (req, res){
    try {
      let gameB = await gameBoard.create({
        numberOfCurrentPlayers: '1', isWin: '0'
      }).fetch()
      sails.log('Finn\'s id i:', gameB.id);  
      module.exports.addPlayerCurrentGame(gameB.id)
      let showJson = JSON.stringify(gameB)
      if (showJson){
        return res.json(showJson)
      }
    }catch(err){
      sails.log(err)
    }
  },

  addPlayerCurrentGame: async function (req, res, id){
      try {
        if (req.session.userId)
        {
          id = 1;
          let data = await player.update( {
            where: {id: req.session.userId}
            }).set({idOfTheCurrentGame: id}).fetch();
          sails.log('====>1',data)
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

  removePlayerCurrentGame: async function (req, res){
      try {
        if (req.session.userId)
        {     
          let data = await player.update({
            where: {id: req.session.userId}})
            .set({idOfTheCurrentGame: 0}).fetch();
          sails.log('====>4',data)
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
    let idCurrentGame = 1 //A changer avec la fonction du boutton pour rejoindre une game #### idCurrentGame et idGameBoard doivent correspondre ####
    try {
      let numberPlayerInGame = await player.find({
        where: { idOfTheCurrentGame : idCurrentGame },
        select: ['id', 'idOfTheCurrentGame', 'emailAddress']
      })
      console.log('-----> number Player',numberPlayerInGame)
      console.log('-----> longueur du tableau', numberPlayerInGame.length)
      return numberPlayerInGame.length
    }catch(err){
      sails.log(err)
    }
  },

  // Modifie le nombre de joueur dans la partie que l'on vient de rejoindre 
  updateNumberOfPlayerInGame: async function (req, res){
    let nbPlayers = module.exports.countPlayerInGame()
    console.log('Nombre Joueur', nbPlayers)
    let idGameBoard = 1 //Changer avec l'id de la partie que l'on vient de rejoindre 
      try {
        await nbPlayers.then(async function(result){
          if(result > 4){
            console.log('Partie Complete, impossible de rejoindre')
          } else if(result < 4){
            console.log('Résult',result)
            let numberPlayers =  await gameBoard.update({
            where: {id : idGameBoard}})
            .set({numberOfCurrentPlayers : result}).fetch();
            sails.log('------==> Nombre de joueurs ', numberPlayers)
            let showJson = JSON.stringify(numberPlayers)
            if (showJson){
              return res.json(showJson)
            }
          } else if(result = 4){
            let numberPlayers = await gameBoard.update({
              where: {id : idGameBoard}})
              .set({numberOfCurrentPlayers : result}).fetch();
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
      let changeStatus = await gameBoard.update({
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
};

//module.exports.showGameStarted();
//module.exports.createGameBoard();
//module.exports.addPlayerCurrentGame();
//module.exports.removePlayerCurrentGame();
//module.exports.CountPlayerInGame();
//console.log(module.exports.UpdateNumberOfPlayerInGame());
//module.exports.startGame();


