const simplydjs = require('simply-djs');

module.exports = {
    name: 'calc',
    description: 'a simple calculaotr command.',
    aliases: ['calculator'],
    usage: '>clac',
    run: async (client, message, args) => {
        simplydjs.calculator(message, {
            embedColor: '#2f3136'
        })
    }
}