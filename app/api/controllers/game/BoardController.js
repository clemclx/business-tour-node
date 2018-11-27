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
                        await tiles.create({
                            name : 'Depart',
                            tileType: 0 
                        })
                        break;
                    case 1: case 2:  
                        await tiles.create({
                            name : 'Case1',
                            price : price,
                            tileType: 1 
                        })
                        break;
                    case 3: case 20:  
                        await tiles.create({
                            name : 'Impot',
                            tileType: 11 
                        })
                        break;
                    case 4: case 12: case 18: case 26:
                        await tiles.create({
                            name : 'Ile',
                            price : price,
                            tileType: 9 
                        })
                        break;
                    case 5: case 6: case 7:
                        await tiles.create({
                            name : 'Case2',
                            price : price,
                            tileType: 2
                        })
                        break;
                    case 8:
                        await tiles.create({
                            name : 'Malus',
                            tileType: 12 
                        })
                        break;
                    case 9: case 10: case 11:
                        await tiles.create({
                            name : 'Case3',
                            price : price,
                            tileType: 3 
                        })
                        break;
                    case 13: case 14: case 15:
                        await tiles.create({
                            name : 'Case4',
                            price : price,
                            tileType: 4
                        })
                        break;
                    case 16:
                        await tiles.create({
                            name : 'Prison',
                            tileType: 13 
                        })
                        break;
                    case 17: case 19:
                        await tiles.create({
                            name : 'Case5',
                            price : price,
                            tileType: 5 
                        })
                        break;
                    case 21: case 29:
                        await tiles.create({
                            name : 'Case6',
                            tileType: 10 
                        })
                        break;
                    case 22: case 23:
                        await tiles.create({
                            name : 'Case7',
                            price : price,
                            tileType: 6
                        })
                        break;
                    case 24: 
                        await tiles.create({
                            name : 'Bonus',
                            tileType: 14 
                        })
                        break;

                    case 25: case 27: case 28:
                        await tiles.create({
                            name : 'Case8',
                            price : price,
                            tileType: 7
                        })
                        break;
                    case 30: case 31:
                        await tiles.create({
                            name : 'Case9',
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
        module.exports.GetAllTiles()
    },

    GetAllTiles: async function(req, res){
        try{
            let allTiles = await tiles.find({
               
                select: ['id', 'name', 'price']
            })
            let showJson = JSON.stringify(allTiles)
            if (showJson){
              return res.json(showJson)
            }
        } catch (err){
            sails.log(err)
        }
    },

    


};

