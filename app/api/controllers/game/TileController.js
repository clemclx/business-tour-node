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
        let tile = await pion.find({
        where: {idPlayer: req.body.userId},
        select: ['id', 'currentPosition']})
        console.log('tile',tile)
        console.log('tile 0',tile[0])

       let findIfOwned = await tiles.find({
           where: {id: 6/*tile[0].currentPosition*/},
           select: ['price', 'isBuy']
       })
       console.log('owned',findIfOwned)
       console.log('owned',findIfOwned)
       
       if(findIfOwned[0].isBuy != 0){

        module.exports.manageOwnedTile()

       }else{
        try{
            let tile = await pion.find({
                where: {idPlayer: req.body.userId},
                select: ['id', 'currentPosition']})
                if(tile[0].currentPosition == 4 || tile[0].currentPosition == 21){ // Case des impots
                    module.exports.taxTile();
    
                }else if(tile[0].currentPosition == 9){ // Case Malus
                    module.exports.taxTile();
                     
                }else if(tile[0].currentPosition == 25){ // Case bonus
                    module.exports.bonusTile()
                    
                }else if(tile[0].currentPosition == 17){ // Case prison
                    module.exports.setJail()
                     
    
                }else if(tile[0].currentPosition == 4 || tile[0].currentPosition == 21){
                    module.exports.luckTile()
                    
                }else{ // Toutes les autres cases
                    engine.buyOption()
                }
            }catch(err){
                sails.log(err)
           }
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
    },


    manageOwnedTile: async function(req, res){
        let findPrice = await tiles.find({
            where: {id : tile[0].currentPosition},
            select: ['price', 'isBuy']
        }) 
        module.exports.addMoneyToOwner(findPrice[0].isBuy)
        module.exports.removeMoneyToPlayer()


    },



    addMoneyToOwner : async function(req, res, idPlayer){
        try{
            let getMoney = await player.find({
                where: {id : idPlayer},
                select: ['currentMoney']
            })
            let Pourcentage = 0.2
            let Tax = getMoney[0].currentMoney +(getMoney[0].currentMoney * Pourcentage)
            let AfterBonus = await player.update({
                where: {id : idPlayer},
            }).set({
                currentMoney : Tax
            }).fetch()
            let showJson= JSON.stringify(AfterBonus)
            return res.json(showJson)
        }catch(err){
            sails.log(err)
        }
    },

    removeMoneyToPlayer : async function(req, res){
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
    }


   

};
