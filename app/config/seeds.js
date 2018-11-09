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
            numberOfCurrentPlayers: '4',
            isWin: 0,
            hasBegun: 1
        },
        {
            numberOfCurrentPlayers: '4',
            isWin: 0,
            hasBegun: 0
        },
        {
            numberOfCurrentPlayers: '2',
            isWin: 0,
            hasBegun: 1
        }
    ]
}
