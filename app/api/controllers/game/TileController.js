/**
 * EngineController
 
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let shuffle = require('shuffle-array')
let board = require('../game/BoardController')
let engine = require('../game/EngineController')
module.exports = {

   CheickTile : async function(req, res) {
       try{
        let tile = await pion.find({
            where: {idPlayer: req.session.userId},
            select: ['id', 'currentPosition']})
            if(pion[0].currentPosition == 4 || 21){
                module.exports.taxTile();

            }else if(pion[0].currentPosition == 1){
                //fonction de changement de tour 

            }else if(pion[0].currentPosition == 9){
                let Malus = JSON.stringify(pion[0].currentPosition)
                return res.json(Malus)
            }else if(pion[0].currentPosition == 25){
                // fonction case bonus 
            }else if(pion[0].currentPosition == 14){
                //fonction case prison
            }else if(pion[0].currentPosition == 21 || 30){
                //fonction case chance
            }else{
                engine.buyOption()
            }
        }catch(err){
            sails.log(err)
       }
   },

   taxTile : async function(req, res){
        try {
            let getMoney = await player.find({
                where: {id : req.session.userId},
                select: ['currentMoney']
            })
            let Pourcentage = 0.2
            let Tax = getMoney[0].currentMoney -(getMoney[0].currentMoney * Pourcentage) 
            let AfterTax = await player.update({
                where: {id : req.session.userId},
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
            where: {id : req.session.userId},
            select: ['currentMoney']
        })
        let Pourcentage = 0.1
        let Tax = getMoney[0].currentMoney + (getMoney[0].currentMoney * Pourcentage) 
        let AfterTax = await player.update({
            where: {id : req.session.userId},
        }).set({
            currentMoney : Tax
        }).fetch()
        let showJson= JSON.stringify(AfterTax)
        return res.json(showJson)
        }catch(err){
            sails.log(err)
       }
    }

   

};
