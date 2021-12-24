const { Client, Message, MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'boobs',
    description: 'Show boobs pictures.',
    aliases: ['boobspics'],
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    run: async (client, message, args) => {
        //check if channel tyoe is nsfw
        if(!message.channel.nsfw) return message.channel.send('This channel is not nsfw.');
        
        const boobs = await superagent.get('https://nekos.life/api/v2/img/boobs');
        const embed = new MessageEmbed()
            .setTitle('Boobs')
            .setImage(boobs.body.url)
            .setColor('RANDOM');
        message.channel.send({ embeds: [embed] });
    } 
}