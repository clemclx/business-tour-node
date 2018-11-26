/**
 * EngineController
 
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let board = require('../game/BoardController')
module.exports = {

    reinitializePlayer:async function(req, res){
        let reinitializePlayer = await player.update({
            where: {id : req.session.userId}
        }).set({idOfTheCurrentGame:0, numberOfDoubleDice: 0,numberOfHouses: 0, isBankrupt: false, currentMoney: 2000000, isBankrupt: false}).fetch();
        console.log(reinitializePlayer)
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
            console.log(bankruptPlayer)
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
        console.log(updatedPlayer)
        console.log(updatedTile)
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
        console.log('price',tile[0].price)
        console.log('currentMoney',currentPlayer[0].currentMoney)
        // currentMoney = currentPlayer[0].currentMoney + 20
        if (tile[0].price <= currentPlayer[0].currentMoney)
        {
            return 1
        }
        else
        {
            return 0
        }
    },

    makeTurnOrder: async function(req, res){
        let idCurrentGame = 1
        let numberPlayerInGame = await player.find({
            where: { idOfTheCurrentGame : idCurrentGame },
            select: ['id', 'idOfTheCurrentGame', 'emailAddress']
          })
          console.log(numberPlayerInGame)
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
                console.log('current',currentPosition)
                currentPosition = currentPosition - 32
                initialPosition = currentPosition
                numberTurns += 1
                userPion = await pion.update({where: {idPlayer: req.session.userId}})
                    .set({initialPosition: initialPosition, currentPosition: currentPosition, numberTurns: numberTurns})
                    .fetch();
                let showJson = JSON.stringify(userPion)
                return res.json(showJson)
            }
        }catch(err){
            sails.log(err)
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
};
