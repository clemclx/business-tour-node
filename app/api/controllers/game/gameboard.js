let data;
//function who get id of game launch
//TODO Add this id to players table when player joning and set at 0 when player leave
async function getGameStarted(data){
  let j = 0;
  let idArray = [];
  try {
        data = await gameBoard.find({
        where: {hasBegun: '1'},
        select: ['id', 'numberOfCurrentPlayers']
      })
      for (let i=0; i < data.length; i++)
      { 
        idArray[i] = getOnlyIdGameStarted(data, j)
        j++
      }
      return idArray
  }catch(err){
    sails.log(err)
  }
}
async function getOnlyIdGameStarted(gameStarted, j){
  let res = [];
  try {
      res = gameStarted[j].id
      return res
  }catch(err){
    sails.log(err)
  }
}
getGameStarted(data)
