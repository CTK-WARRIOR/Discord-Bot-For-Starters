const { Client, Message, MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'ass',
    description: 'Show ass pictures.',
    aliases: ['asspics'],
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    run: async (client, message, args) => {
        //check if channel tyoe is nsfw
        if(!message.channel.nsfw) return message.channel.send('This channel is not nsfw.');
        
        const ass = await superagent.get('https://nekos.life/api/v2/img/ass');
        const embed = new MessageEmbed()
            .setTitle('Ass')
            .setImage(ass.body.url)
            .setColor('RANDOM');
        message.channel.send({ embeds: [embed] });
    } 
}