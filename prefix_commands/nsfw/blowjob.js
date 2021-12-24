const { Client, Message, MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'blowjob',
    description: 'Show blowjob pictures.',
    aliases: ['blowjobpics'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    run: async (client, message, args) => {
        //check if channel tyoe is nsfw
        if(!message.channel.nsfw) return message.channel.send('This channel is not nsfw.');
        
        const blowjob = await superagent.get('https://nekos.life/api/v2/img/blowjob');
        const embed = new MessageEmbed()
            .setTitle('Blowjob')
            .setImage(blowjob.body.url)
            .setColor('RANDOM');
        message.channel.send({ embeds: [embed] });
    } 
}