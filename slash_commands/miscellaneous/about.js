const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { bot_invite, support_server_invite } = require('../../settings.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Bot's about nothing else."),
  run: async (client, message, args, interaction) => {
	let embed = new MessageEmbed()
        .setAuthor(message.author.username)
        .setTitle(`About`)
        .setDescription(
            `**<:info:896718244461826140> All Emojis used in the bot are not own by us, all emojis are claimed by [Icons](https://discord.gg/bgEPdg4E4J) made by [Danu#4422](https://dhanishdanu.xyz/) and they are all free to use and giving credits is compulsory.**\n\n**<:Owner:908703796157362196> Owner and <:developerbadge:896715172004118599> Developer is [DevMirza#6447](https://cyclonebotlist.xyz)**\n\n<:greendot:905759869750104084> PingPongBot is mainly developed as a small bot which can do some basic Stuffs as time flies developer has decided to add more features to the bot like moderation,. etc... PingPongBot is been used by **${client.users.cache.size}** users and keeps Growing, As of 2021 discord has announced alot of new features for bot and bot developers, its hard for some developer to move there bot to new discord updates, DevMirza is putting his hard work to update the bot to latest features like slash commands, buttons etc,. My main goal is to provide slash commands as well as prefix commands too and added a deploy command which allow a discord server owner to deploy slash commands for there guild as they want and its all non-mandatory totally depends on server owner if they want slash command in there guild. With all that prefix commands are still available until we completely move to slash commands. Till then please keep suppporting the Bot it mesans alot.`)
        .setTimestamp()
        .setFooter(`PingPongBot © All rights are reserved.`, message.author.avatarURL({ dynamic: true }))

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
    await interaction.followUp({ embeds: [botping], compnents: [row] });
  },
};
