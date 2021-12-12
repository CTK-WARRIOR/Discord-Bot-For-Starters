const simplydjs =  require('simply-djs');

module.exports = {
    name: 'rps',
    description: 'Rock Paper Scissors Game.',
    aliases: ['rock', 'paper'],
    usage: '>rps <@mention>',
    run: async (client, message, args) => {
        simplydjs.rps(message);
    }
}