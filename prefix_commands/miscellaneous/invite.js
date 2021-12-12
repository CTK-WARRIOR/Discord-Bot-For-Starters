const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { bot_invite, support_server_invite } = require('../../settings.json');

module.exports = {
    name: 'invite',
    description: 'Send invite link of the bot.',
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setTitle(`${client.user.tag}`)
        .setDescription(`Like me? Want me in your server? Invite me now by clicking the button on my profile or button after this message.`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))


        let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("LINK")
            .setLabel(`Invite ${client.user.username}`)
            .setURL(`${bot_invite}`)
            .setEmoji('896718291572240474'),

            new MessageButton()
            .setStyle("LINK")
            .setLabel("Support Server")
            .setURL(`${support_server_invite}`)
            .setEmoji('908713435766865920')
        )
        message.channel.send({ embeds: [embed], components: [row] })
    }
}