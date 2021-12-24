const { Client, Message, MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'pussy',
    description: 'Show pussy pictures.',
    aliases: ['pussypics'],
    /**
     *  @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    run: async (client, message, args) => {
        //check if channel tyoe is nsfw
        if(!message.channel.nsfw) return message.channel.send('This channel is not nsfw.');
        
        const pussy = await superagent.get('https://nekos.life/api/v2/img/pussy');
        const embed = new MessageEmbed()
            .setTitle('Pussy')
            .setImage(pussy.body.url)
            .setColor('RANDOM');
        message.channel.send({ embeds: [embed] });
    } 
}