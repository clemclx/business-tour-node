/**
 * 
 * EngineController
 
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let shuffle = require('shuffle-array')
let Tile = require('../game/TileController')
let arrayTurn = []
module.exports = {

    startTurn: async function (req, res){
        console.log('START');
        module.exports.movePion(req, res)
        Tile.CheckTile(req, res)
        module.exports.endTurn(req, res)
    },
    
    endTurn: async function(req, res){
        // On récupère la variable dans le body
        // On update la table gameBoard
        let previousPlayer = await gameBoard.find({where: {id: req.body.gameId},
        select: ['isPlaying']}); // je récupère le isplaying en fonction de la partie
        let cursor = 0
        let arrayLength = req.body.turn.length
        for (let i = 0; req.body.turn[i] != previousPlayer[0].isPlaying; i++){
             cursor = i
        }
        if(cursor == arrayLength - 1)
        {
            cursor = 0
        }
        cursor += 1
        
        let updateCurrentPlayer = await gameBoard.update({where: {id: req.body.gameId}}).set({isPlaying: req.body.turn[cursor]}).fetch()
        let showJson = JSON.stringify(updateCurrentPlayer)
        return res.json(showJson)
    },

    reinitializePlayer: async function(req, res){
        let reinitializePlayer = await player.update({
            where: {id : req.body.userId}
        }).set({idOfTheCurrentGame:0, numberOfDoubleDice: 0,numberOfHouses: 0, isBankrupt: false, currentMoney: 2000000, isBankrupt: false}).fetch();
        if (reinitializePlayer){
            let showJson = JSON.stringify(reinitializePlayer)
            return res.json(showJson)
        }
    },


    chooseToBuy: async function(req, res){
        let userPion = await pion.find({
            where: {idPlayer : req.body.userId},
            select: ['currentPosition']
        })
        let tile = await tiles.find({
            where: { id : userPion[0].currentPosition},
            select: ['price']
        })
        let currentPlayer = await player.find({
            where: {id : req.body.userId},
            select: ['currentMoney', 'numberOfHouses']
        })
        let currentMoney = currentPlayer[0].currentMoney - tile[0].price
        let updatedPlayer = await player.update({
            where: { id : req.body.userId }
        }).set({currentMoney: currentMoney, numberOfHouses: currentPlayer[0].numberOfHouses + 1}).fetch();
        let updatedTile = await tiles.update({
            where: {id : userPion[0].currentPosition}
        }).set({isBuy : req.body.userId}).fetch();
    },

    buyOption: async function(req, res){
        let userPion = await pion.find({
            where: {idPlayer : req.body.userId},
            select: ['currentPosition']
        })
        let tile = await tiles.find({
            where: { id : userPion[0].currentPosition},
            select: ['price']
        })
        let currentPlayer = await player.find({
            where: { id : req.body.userId },
            select: ['currentMoney']
        })
        // currentMoney = currentPlayer[0].currentMoney + 20
        if (tile[0].price <= currentPlayer[0].currentMoney)
        {
            return true // Appeler la fonction choosetoBuy 
        }
        else
        {
            return false
        }
    },

    makeTurnOrder: async function(req, res){
        let idCurrentGame = req.body.gameId
        let numberPlayerInGame = await player.find({
            where: { idOfTheCurrentGame : idCurrentGame },
            select: ['id']
          })
          let arrayPlayer = []
          for (let i = 0; i < numberPlayerInGame.length; i++){
              arrayPlayer[i] = numberPlayerInGame[i].id
          }
          let rand = shuffle(arrayPlayer)
          return rand;
    },

    makePion: async function(req, res){
        let Users = await player.find({
            where: { idOfTheCurrentGame : req.body.gameId},
            select: ['id']  
        })
        for (var i = 0; i < Users.length; i++) {
            await pion.create({initialPosition: 1, currentPosition: 1, idPlayer: Users[i].id, numberTurns: 0})
        }
    },

    movePion: async function(req, res){
        let findJail = await player.find({
            where: { id : req.body.userId},
            select : ['inJail']
        })
        if(findJail == true){
            module.exports.getOutOfJail()
        } else {
            try {
                let dice = module.exports.rollingDice()

                let userPion = await pion.find({
                where: {idPlayer: req.body.userId},
                select: ['id', 'initialPosition', 'currentPosition', 'numberTurns']})

                console.log(userPion);
                
                let numberTurns = userPion[0].numberTurns
                let initialPosition = userPion[0].initialPosition
                let currentPosition = userPion[0].currentPosition
                console.log(dice);
                currentPosition = parseInt(currentPosition) + parseInt(dice[5])
                console.log('CURRENT POSITION', currentPosition)
                if (currentPosition <= 32){

                    initialPosition = currentPosition
                    console.log('CURRENT POS', currentPosition);
                    userPion = await pion.update({where: {idPlayer: req.body.userId}})
                        .set({initialPosition: initialPosition, currentPosition: currentPosition})
                        .fetch();
                    
                    console.log('COUCOU JAI CREE LA PLACE DU PION', userPion)
                    let gameId = 'Game'+req.body.gameId
                    sails.sockets.broadcast(gameId, 'movePion', {newPos: userPion[0].currentPosition})
                    return showJson
                }
                else{
                    currentPosition = currentPosition - 32
                    initialPosition = currentPosition
                    numberTurns += 1
                    userPion = await pion.update({where: {idPlayer: req.body.userId}})
                        .set({initialPosition: initialPosition, currentPosition: currentPosition, numberTurns: numberTurns})
                        .fetch();
                    Tile.startTile()
                    let showJson = JSON.stringify(userPion)
                    return showJson;
                }
            }catch(err){
                sails.log(err)
            }
        }

       
    },

    rollingDice : function(req, res){
        function randomIntInc(low, high){
            return Math.floor(Math.random()* (high-low+1) +low)
          }
          let numbers = new Array(2)
          for (let i = 0; i < numbers.length; i++){
            numbers[i] = randomIntInc(1, 6)
          }
          let dice = numbers[0] + numbers[1]
          let showDice = JSON.stringify(dice)
          let shownumber = JSON.stringify(numbers)
          if (showDice && shownumber){
            let result = []
            result[0] = numbers[0]
            result[1] = numbers[1]
            result[2] = dice
            showJson = JSON.stringify(result)
            return showJson
          }
            
    },


    getOutOfJail: async function(){
        let dice = module.exports.rollingDice()
        if(dice[0] == dice[1]){
            let updateJail = await player.update({
                where: { id : req.body.userId}
            }).set({inJail: false})
            .fetch()
            module.exports.endTurn() // + message vous êtes libre
        }else {
            module.exports.endTurn() // + message "vous n'êtes pas libre"
        }
    },

    checkMoney: async function(){
        try{
            let game = await gameBoard.find({
                where : {id : req.body.gameId},
                select : ['isPlaying']
            })
            let player = await player.find({
                where : {id : game[0].isPlaying},
                select : ['currentMoney']
            })
            if(player[0].currentMoney <= 0){
                let bankruptPlayer = await player.update({
                    where: { id : req.body.userId }
                }).set({isBankrupt: true}).fetch();
                let showJson = JSON.stringify(bankruptPlayer)
                return res.json(showJson)
            }else{
                return false
            }

        } catch(err){
            sails.log(err)
        }
    }


};