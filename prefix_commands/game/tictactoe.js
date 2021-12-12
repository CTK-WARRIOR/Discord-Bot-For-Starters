const simplydjs =  require('simply-djs');

module.exports = {
    name: 'tictactoe',
    description: 'Tic Tac Toe Game.',
    aliases: ['xoxo'],
    usage: '>ticktactoe <@mention>',
    run: async (client, message, args) => {
        simplydjs.tictactoe(message);
    }
}