const { Client, Message, MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: '4k',
    description: 'Show 4k pictures.',
    aliases: ['4kpics'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    run: async (client, message, args) => {
        //check if channel tyoe is nsfw
        if(!message.channel.nsfw) return message.channel.send('This channel is not nsfw.');

        const fourk = await superagent.get('https://nekos.life/api/v2/img/Random_hentai_gif');
        const embed = new MessageEmbed()
            .setTitle('4k')
            .setImage(fourk.body.url)
            .setColor('RANDOM');
        message.channel.send({ embeds: [embed] });
    } 
}