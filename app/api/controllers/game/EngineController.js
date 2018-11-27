/**
 * EngineController
 
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let shuffle = require('shuffle-array')
let Tile = require('../game/TileController')
module.exports = {

    turn: async function (req, res){
        module.exports.movePion(req, res)
        Tile.CheckTile()

    },

    reinitializePlayer: async function(req, res){
        let reinitializePlayer = await player.update({
            where: {id : req.session.userId}
        }).set({idOfTheCurrentGame:0, numberOfDoubleDice: 0,numberOfHouses: 0, isBankrupt: false, currentMoney: 2000000, isBankrupt: false}).fetch();
        if (reinitializePlayer){
            let showJson = JSON.stringify(reinitializePlayer)
            return res.json(showJson)
        }
    },

    bankruptPlayer: async function(req, res){
        let currentPlayer = await player.find({
            where: {id : req.session.userId},
            select: ['currentMoney']
        })
        if (currentPlayer[0].currentMoney <= 0)
        {
            let bankruptPlayer = await player.update({
                where: { id : req.session.userId }
            }).set({isBankrupt: true}).fetch();
            if (reinitializePlayer){
                let showJson = JSON.stringify(bankruptPlayer)
                return res.json(showJson)
            }
        }
    },

    chooseToBuy: async function(req, res){
        let userPion = await pion.find({
            where: {idPlayer : req.session.userId},
            select: ['currentPosition']
        })
        let tile = await tiles.find({
            where: { id : userPion[0].currentPosition},
            select: ['price']
        })
        let currentPlayer = await player.find({
            where: {id : req.session.userId},
            select: ['currentMoney', 'numberOfHouses']
        })
        let currentMoney = currentPlayer[0].currentMoney - tile[0].price
        let updatedPlayer = await player.update({
            where: { id : req.session.userId }
        }).set({currentMoney: currentMoney, numberOfHouses: currentPlayer[0].numberOfHouses + 1}).fetch();
        let updatedTile = await tiles.update({
            where: {id : userPion[0].currentPosition}
        }).set({isBuy : req.session.userId}).fetch();
    },

    buyOption: async function(req, res){
        let userPion = await pion.find({
            where: {idPlayer : req.session.userId},
            select: ['currentPosition']
        })
        let tile = await tiles.find({
            where: { id : userPion[0].currentPosition},
            select: ['price']
        })
        let currentPlayer = await player.find({
            where: { id : req.session.userId },
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
        let idCurrentGame = req.body.sessionId
        let numberPlayerInGame = await player.find({
            where: { idOfTheCurrentGame : idCurrentGame },
            select: ['id']
          })
          let arrayPlayer = []
          for (let i = 0; i < numberPlayerInGame.length; i++){
              arrayPlayer[i] = numberPlayerInGame[i]
          }
          let rand = shuffle(arrayPlayer)
          let showJson = JSON.stringify(rand)
          return res.json(showJson)
    },

    makePion: async function(req, res){
        try{
            let userPion = await pion.create({initialPosition: 0, currentPosition: 0, diceValue: 0, idPlayer: req.session.userId, numberTurns: 0}).fetch()
            let showJson = JSON.stringify(userPion)
            if (showJson){
                return res.json(showJson)
            }
        }catch(err){
            sails.log(err)
        }
    },

    movePion: async function(req, res){
        let findJail = await player.find({
            where: { id : req.session.userId},
            select : ['inJail']
        })
        if(findJail == true){
            //appel de la fonction qui gère la prison
            //appel de la fonction qui passe le tour
        }else{
            try {
                let dice = module.exports.rollingDice()
                let userPion = await pion.find({
                where: {idPlayer: req.session.userId},
                select: ['id', 'initialPosition', 'currentPosition', 'numberTurns']})
                let numberTurns = userPion[0].numberTurns
                let initialPosition = userPion[0].initialPosition
                let currentPosition = userPion[0].currentPosition
                currentPosition = currentPosition + dice[2]
                if (currentPosition <= 32){
            //A voir qu'elle option est la mieux pour l'affichage
                //initialPosition = currentPosition
                    while(initialPosition < currentPosition){
                        initialPosition += 1
                    }
                    userPion = await pion.update({where: {idPlayer: req.session.userId}})
                        .set({initialPosition: initialPosition, currentPosition: currentPosition})
                        .fetch();
                    let showJson = JSON.stringify(userPion)
                    return res.json(showJson)
                }
                else{
                    currentPosition = currentPosition - 32
                    initialPosition = currentPosition
                    numberTurns += 1
                    userPion = await pion.update({where: {idPlayer: req.session.userId}})
                        .set({initialPosition: initialPosition, currentPosition: currentPosition, numberTurns: numberTurns})
                        .fetch();
                    Tile.startTile()
                    let showJson = JSON.stringify(userPion)
                    return res.json(showJson)
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
            // return res.json(result)
            return result
          }
    },


    inJail: async function(){
        let dice = module.exports.rollingDice()
        if(dice[0] == dice[1]){
            let updateJail = await player.update({
                where: { id : req.session.userId}
            }).set({inJail: false})
            .fetch()
            // appel de fonction de fin de tour + message vous êtes libre 
        }else {
            //appel de fontion de fin de tour + message reéssayez au prochain tour
        }
    }


};