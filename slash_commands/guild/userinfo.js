const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Replies with users information.')
    .addUserOption((option) => option.setName('user').setDescription('The user to get information about.')),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = interaction.options.getMember("user") || interaction.member;
            const activity = member.presence?.activities || [];

            const focusActivity = activity.find(x => x.assets);
            let embed = new MessageEmbed()
            .setColor(member.displayHexColor)
            .setThumbnail(focusActivity ? `https://cdn.discordapp.com/app-assets/${focusActivity.applicationId}/${focusActivity.assets.largeImage}` : member.user.displayAvatarURL())
            .setAuthor(member.user.tag, member.user.avatarURL())
            .addFields(
                {
                    name: 'Username',
                    value: `\`\`${member.user.tag}\`\``,
                    inline: true
                },
                {
                    name: 'User ID',
                    value: `\`\`${member.id}\`\``,
                    inline: true
                },
                {
                    name: 'Server Nickname',
                    value: `\`\`${member.nickname || 'None'}\`\``,
                    inline: true
                },
                {
                    name: 'Highlighted Role',
                    value: `\`\`${member.roles.cache.filter(x => x.color !== 0).first()?.name || 'None'}\`\``,
                    inline: true
                },
                {
                    name: 'Bot?',
                    value: `\`\`${member.user.bot ? 'Yes' : 'No'}\`\``,
                    inline: true
                },
                {
                    name: 'Pending Member?',
                    value: `\`\`${member.pending ? 'Yes' : 'No'}\`\``,
                    inline: true
                },
                {
                    name: 'Server Booster',
                    value: `\`\`${member.premiumSince ? 'Since' + member.premiumSince.toLocaleString() : 'Nope'}\`\``,
                    inline: true
                },
                {
                    name: 'Joined Server At',
                    value: `\`\`${member.joinedAt.toLocaleString()}\`\``,
                    inline: true
                },
                {
                    name: 'Account Created At',
                    value: `\`\`${member.user.createdAt.toLocaleString()}\`\``,
                    inline: true
                },
                {
                    name: 'Roles',
                    value: `\`\`${member.roles.cache.map(x => x.name).join(', ')}\`\``,
                    inline: true
                }
            )
            .setTimestamp()
            return interaction.followUp({
                embeds: [embed]
            })
        } catch (error) {
            console.error(error);
        }
    }
}