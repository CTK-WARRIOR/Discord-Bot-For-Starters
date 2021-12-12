const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'howgay',
    description: 'tells how much gay you are.',
    aliases: ['hgay'],
    usage: 'howgay @mention',
    run: async (client, message, args) => {
        let member = message.mentions.users.first() || message.author;

        let rng = Math.floor(Math.random() * 101);

        let embed = new MessageEmbed()
        .setTitle('🌈 Gay Machine Calculator.')
        .setDescription(`\`${member.username} is \`` + rng + "% Gay 🌈")
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}