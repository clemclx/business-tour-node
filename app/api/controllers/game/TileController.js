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
        let tile = await pion.find({
            where: {idPlayer: req.session.userId},
            select: ['id', 'currentPosition']})
            if(pion[0].currentPosition == 4 || pion[0].currentPosition == 21){ // Case des impots
                module.exports.taxTile();

            }else if(pion[0].currentPosition == 1){ // Case départ
                //fonction de changement de tour 

            }else if(pion[0].currentPosition == 9){ // Case Malus
                let Malus = JSON.stringify(pion[0].currentPosition)
                return res.json(Malus)
            }else if(pion[0].currentPosition == 25){ // Case bonus
                module.exports.bonusTile();
                
            }else if(pion[0].currentPosition == 17){ // Case prison
               
            }else{ // Toutes les autres cases
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
        let AfterStart = await player.update({
            where: {id : req.session.userId},
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
                where: {id : req.session.userId},
                select: ['currentMoney']
            })
            let Pourcentage = 0.2
            let Tax = getMoney[0].currentMoney +(getMoney[0].currentMoney * Pourcentage)
            let AfterBonus = await player.update({
                where: {id : req.session.userId},
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
        let updateJail = await player.update({
            where: { id : req.session.userId}
        }).set({inJail: true})
        .fetch()
        
        //appel de fonction de fin de tour 
    }



   

};
