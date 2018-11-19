/**
 * InGameControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    GenerateTiles: async function(req, res){
        for(let i=0; i <= 34; i++){
            let price = 10
            let fonction = await tile.create({
                name : 'Case',
                price : price
            })
        console.log('Case génerée')    
        }
    }

};

module.exports.GenerateTiles();
