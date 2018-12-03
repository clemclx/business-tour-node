/**
 * EngineController
 
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let shuffle = require('shuffle-array')
let board = require('../game/BoardController')
let engine = require('../game/EngineController')
module.exports = {

   CheckTile : async function(req, res) {
       try{
        let engine = require('../game/EngineController')
        let tile = await pion.find({
            where: {idPlayer: req.body.userId},
            select: ['id', 'currentPosition']})
            if(tile[0].currentPosition == 4 || tile[0].currentPosition == 21){ // Case des impots
                module.exports.taxTile(req, req);

            }else if(tile[0].currentPosition == 9){ // Case Malus
                module.exports.taxTile(req, res);
                 
            }else if(tile[0].currentPosition == 25){ // Case bonus
                module.exports.bonusTile(req, res)
                
            }else if(tile[0].currentPosition == 17){ // Case prison
                module.exports.setJail(req, res)
                 

            }else if(tile[0].currentPosition == 4 || tile[0].currentPosition == 21){
                module.exports.luckTile(req, res)
                
            }else{ // Toutes les autres cases
                engine.buyOption(req, res)
            }
        }catch(err){
            sails.log(err)
       }
   },

   taxTile : async function(req, res){
        try {
            let getMoney = await player.find({
                where: {id : req.body.userId},
                select: ['currentMoney']
            })
            let Pourcentage = 0.2
            let Tax = getMoney[0].currentMoney -(getMoney[0].currentMoney * Pourcentage) 
            let AfterTax = await player.update({
                where: {id : req.body.userId},
            }).set({
                currentMoney : Tax
            }).fetch()
            let showJson= JSON.stringify(AfterTax)
            return res.json(showJson)
        }catch(err){
            sails.log(err)
        }
   },

   startTile : async function(req, res){
       try{
       let getMoney = await player.find({
            where: {id : req.body.userId},
            select: ['currentMoney']
        })
        let Pourcentage = 0.1
        let Tax = getMoney[0].currentMoney + (getMoney[0].currentMoney * Pourcentage) 
        let AfterStart = await player.update({
            where: {id : req.body.userId},
        }).set({
            currentMoney : Tax
        }).fetch()
        let showJson= JSON.stringify(AfterStart)
        return res.json(showJson)
        }catch(err){
            sails.log(err)
       }
    },

    bonusTile : async function(req, res){
        try{
            let getMoney = await player.find({
                where: {id : req.body.userId},
                select: ['currentMoney']
            })
            let Pourcentage = 0.2
            let Tax = getMoney[0].currentMoney +(getMoney[0].currentMoney * Pourcentage)
            let AfterBonus = await player.update({
                where: {id : req.body.userId},
            }).set({
                currentMoney : Tax
            }).fetch()
            let showJson= JSON.stringify(AfterBonus)
            return res.json(showJson)
        }catch(err){
            sails.log(err)
        }
    },


    setJail: async function(req, res){
        try{
            let updateJail = await player.update({
                where: { id : req.body.userId}
            }).set({inJail: true})
            .fetch()
            let showJson=JSON.stringify(updateJail)
            return res.json(showJson)
        }catch(err){
            sails.log(err)
        }
       

         
    }, 


    luckTile: async function(req, res){
        let Array = [1, 2]
        let rand = shuffle(Array)
        if(rand == 1){ // Appel fonction bonus
            module.exports.bonusTile()
        }else{
            module.exports.taxTile()
        }   
    }


   

};
