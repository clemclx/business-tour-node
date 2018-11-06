/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */
module.exports.seeds = {
    gameboard: [
        {
            numberOfCureentPlayers: '4',
            isWin: 0,
            hasBegun: 1,
        },
        {
            numberOfCureentPlayers: '4',
            isWin: 0,
            hasBegun: 0,
        },
        {
            numberOfCureentPlayers: '2',
            isWin: 0,
            hasBegun: 1,
        },
    ]
}
