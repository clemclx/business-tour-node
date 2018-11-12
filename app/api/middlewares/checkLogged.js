let login = require('../controllers/entrance/login')
module.exports = {
    show: async function(req, res){
        if (req.session.playerId){
          console.log(login.playerRecord.id)
          return 1;
        }
      }
}