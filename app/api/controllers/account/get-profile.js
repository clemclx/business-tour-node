module.exports = {


    friendlyName: 'Get profile',


    description: 'Get the profile for the logged-in player.',


    fn: async function (inputs, exits) {
        if(this.req.session.playerId) {
            let playerRecord = await player.findOne({
                id: this.req.session.playerId,
            });
            return exits.success(playerRecord)
        } else {
            return exits.success();
        }

    }


};
