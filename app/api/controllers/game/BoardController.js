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
            for (let i=1; i <= 32; i++) {
                switch (i) {
                    case 1:
                        await tiles.create({
                            name : 'Depart',
                            tileType: 0 
                        })
                        break;
                    case 2: case 3:  
                        await tiles.create({
                            name : 'Case1',
                            price : price,
                            tileType: 1 
                        })
                        break;
                    case 4: case 21:  
                        await tiles.create({
                            name : 'Impot',
                            tileType: 11 
                        })
                        break;
                    case 5: case 13: case 19: case 27:
                        await tiles.create({
                            name : 'Ile',
                            price : price,
                            tileType: 9 
                        })
                        break;
                    case 6: case 7: case 8:
                        await tiles.create({
                            name : 'Case2',
                            price : price,
                            tileType: 2
                        })
                        break;
                    case 9:
                        await tiles.create({
                            name : 'Malus',
                            tileType: 12 
                        })
                        break;
                    case 10: case 11: case 12:
                        await tiles.create({
                            name : 'Case3',
                            price : price,
                            tileType: 3 
                        })
                        break;
                    case 14: case 15: case 16:
                        await tiles.create({
                            name : 'Case4',
                            price : price,
                            tileType: 4
                        })
                        break;
                    case 17:
                        await tiles.create({
                            name : 'Prison',
                            tileType: 13 
                        })
                        break;
                    case 18: case 20:
                        await tiles.create({
                            name : 'Case5',
                            price : price,
                            tileType: 5 
                        })
                        break;
                    case 22: case 30:
                        await tiles.create({
                            name : 'Chance',
                            tileType: 10 
                        })
                        break;
                    case 23: case 24:
                        await tiles.create({
                            name : 'Case6',
                            price : price,
                            tileType: 6
                        })
                        break;
                    case 25: 
                        await tiles.create({
                            name : 'Bonus',
                            tileType: 14 
                        })
                        break;

                    case 26: case 28: case 29:
                        await tiles.create({
                            name : 'Case7',
                            price : price,
                            tileType: 7
                        })
                        break;
                    case 31: case 32:
                        await tiles.create({
                            name : 'Case8',
                            price : price,
                            tileType: 8
                        })
                        break;
                    default :
                        sails.log("error")
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

