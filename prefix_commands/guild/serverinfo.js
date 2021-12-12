const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Replies with servers information.',
    run: async (client, message, args) => {
        const owner = await message.guild.fetchOwner().then(m => m.user.tag)
        let embed = new MessageEmbed()
        .setTitle(`${message.guild.name} Information`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields(
            {
                name: '<:id:896718193106755634> Guild ID',
                value: `\`${message.guild.id}\``,
                inline: true
            },
            {
                name: '<:owner:896718381884006442> Guild Owner', 
                value: `\`${owner}\``,
                inline: true
            },
            {
                name: '<:Members:908713435766865920> Total Members',
                value: `\`${message.guild.memberCount}\``,
                inline: true
            },
            {
                name: '<:boost:896717392523198505> Server Boost',
                value: `\`${message.guild.premiumSubscriptionCount}\``,
                inline: true
            },
            {
                name: '<:boost:896717392523198505> Server Level',
                value: `\`${message.guild.premiumTier}\``,
                inline: true
            },
            {
                name: '<:info:896718244461826140> Total Roles',
                value: `\`${message.guild.roles.cache.size.toString()}\``,
                inline: true
            },
            {
                name: '<:Members:908713435766865920> Total Real Members',
                value: `\`${message.guild.members.cache.filter(member => !member.user.bot).size}\``,
                inline: true
            },
            {
                name: '<:Bots:908703648534650880> Total Bots',
                value: `\`${message.guild.members.cache.filter(member => member.user.bot).size}\``,
                inline: true
            },
            {
                name: '<:channel:896717996326809641> Total Channels',
                value: `\`${message.guild.channels.cache.size}\``,
                inline: true
            },
            {
                name: '<:channel:896717996326809641> Total Text Channels',
                value: `\`${message.guild.channels.cache.filter(ch => ch.type === "text").size}\``,
                inline: true
            },
            {
                name: '<:vc:896718508589740112> Total Voice Channels',
                value: `\`${message.guild.channels.cache.filter(ch => ch.type === "voice").size}\``,
                inline: true
            },
            {
                name: '<:settings:900305618592739348> Server Created on',
                value: `\`${message.guild.createdAt.toDateString()}\``,
                inline: true
            },
            {
                name: '<:join:900353137381097493> Joined Server on',
                value: `\`${message.guild.joinedAt.toDateString()}\``,
                inline: true
            }
        )
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        return message.channel.send({ embeds: [embed] })        
    }
}