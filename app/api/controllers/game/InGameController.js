/**
 * InGameControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    GenerateTiles: async function(){
        try {
            let price = 10
            for (let i=0; i <= 31; i++) {
                switch (i) {
                    case 0:
                        await tile.create({
                            name : 'Depart',
                            price : price,
                            tileType: 0 
                        })
                        break;
                    case 1: case 2:  
                        await tile.create({
                            name : 'Case1',
                            price : price,
                            tileType: 1 
                        })
                        break;
                    case 3: case 20:  
                        await tile.create({
                            name : 'Impot',
                            price : price,
                            tileType: 11 
                        })
                        break;
                    case 4: case 12: case 18: case 26:
                        await tile.create({
                            name : 'Ile',
                            price : price,
                            tileType: 9 
                        })
                        break;
                    case 5: case 6: case 7:
                        await tile.create({
                            name : 'Case2',
                            price : price,
                            tileType: 2
                        })
                        break;
                    case 8:
                        await tile.create({
                            name : 'Malus',
                            price : price,
                            tileType: 12 
                        })
                        break;
                    case 9: case 10: case 11:
                        await tile.create({
                            name : 'Case3',
                            price : price,
                            tileType: 3 
                        })
                        break;
                    case 13: case 14: case 15:
                        await tile.create({
                            name : 'Case4',
                            price : price,
                            tileType: 4
                        })
                        break;
                    case 16:
                        await tile.create({
                            name : 'Prison',
                            price : price,
                            tileType: 13 
                        })
                        break;
                    case 17: case 19:
                        await tile.create({
                            name : 'Case5',
                            price : price,
                            tileType: 5 
                        })
                        break;
                    case 21: case 29:
                        await tile.create({
                            name : 'Chance',
                            price : price,
                            tileType: 10 
                        })
                        break;
                    case 22: case 23:
                        await tile.create({
                            name : 'Case6',
                            price : price,
                            tileType: 6
                        })
                        break;
                    case 24: 
                        await tile.create({
                            name : 'Bonus',
                            price : price,
                            tileType: 14 
                        })
                        break;

                    case 25: case 27: case 28:
                        await tile.create({
                            name : 'Case7',
                            price : price,
                            tileType: 7
                        })
                        break;
                    case 30: case 31:
                        await tile.create({
                            name : 'Case8',
                            price : price,
                            tileType: 8
                        })
                        break;
                    default :
                        console.log("error")
                        break;
                }
            }
        }
        catch (err){
            sails.log(err)
        }
        console.log('Case génerée')
    },

    GetAllTiles: async function(req, res){
        try{
            let allTiles = await tile.find({
               
                select: ['id', 'name', 'price']
            })
            return JSON.stringify(allTiles)
        } catch (err){
            sails.log(err)
        }
    },

    RollingDice : function(){
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
module.exports.GetAllTiles();
