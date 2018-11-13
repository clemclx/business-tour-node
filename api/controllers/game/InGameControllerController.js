/**
 * InGameControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    GenerateTiles: async function(req, res){
        for(let i=0; i <= 33; i++){
            let price = 10
            let fonction = await tile.create({
                name : 'Case',
                price : price
            })
        console.log('Case génerée')    
        }
    },

    GetAllTiles: async function(req, res){
        try{
            let allTiles = await tile.find({
               
                select: ['id', 'name', 'price']
            })
            console.log(allTiles)
        } catch (err){
            sails.log(err)
        }
    },

    RollingDice : function(req, res){
            function randomIntInc(low, high){
                return Math.floor(Math.random()* (high-low+1) +low)
              }
              
              let numbers = new Array(2)
              for (let i = 0; i < numbers.length; i++){
                numbers[i] = randomIntInc(1, 6)
              }
              
              let dice = numbers[0] + numbers[1]
              
              console.log(numbers)
              console.log(dice)
    }

};

//module.exports.GenerateTiles();

// module.exports.GetAllTiles();

module.exports.RollingDice();
