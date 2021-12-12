const { Client, Message, MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'hentai',
    description: 'Show hentai pictures.',
    aliases: ['hentaipics'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message  
     */
    run: async (client, message, args) => {
        let nsfwerror = new MessageEmbed()
        .setColor('RED')
        .setDescription('This command can only be use in NSFW channel, please change the channel type.')
        if(!message.channel.nsfw) return message.channel.send({ embeds: [nsfwerror] });

        let load = new MessageEmbed()
        .setColor('RED')
        .setDescription('Loaing.....')
        .setTimestamp()

        message.channel.send({ embeds: [load] }).then(m => {
            superagent.get('https://nekobot.xyz/api/image').query().end((err, response) => {
                
            })
        })
    }
}