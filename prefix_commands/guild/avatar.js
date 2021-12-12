const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Send the mentioned or yourself avatar.',
    run: async (client, message) => {
        const Target = message.mentions.users.first() || message.author;

        let embed = new MessageEmbed()
        .setTitle(`<:image:896718205584834602> Avatar for ${Target.username}`)
        .setImage(Target.avatarURL({ dynamic: true, size: 4096 }))
        .setDescription(`[Png](${Target.avatarURL({ format: 'png', size: 1024 })}) | [Webp](${Target.avatarURL({ format: "webp", size: 1024 })}) | [Jpg](${Target.avatarURL({ format: 'jpg', size: 1024 })})`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })
    }
}