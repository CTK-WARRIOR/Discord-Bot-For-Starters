const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Replies with server information.'),
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */ 
    run: async (client, interaction) => {
        try {
            const owner = await interaction.guild.fetchOwner().then(m => m.user.tag);
            let embed = new MessageEmbed()
            .setTitle(`${interaction.guild.name}'s Information`)
            .setColor(interaction.guild.me.displayHexColor)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: 'Server Owner',
                    value: `\`\`${owner}\`\``,
                    inline: true
                },
                {
                    name: 'Server ID',
                    value: `\`\`${interaction.guild.id}\`\``,
                    inline: true
                },
                {
                    name: 'Total Members',
                    value: `\`\`${interaction.guild.memberCount}\`\``,
                    inline: true
                },
                {
                    name: 'Total Roles',
                    value: `\`\`${interaction.guild.roles.cache.size.toString()}\`\``,
                    inline: true
                },
                {
                    name: 'Joined Server At',
                    value: `\`\`${interaction.guild.joinedAt.toLocaleString()}\`\``,
                    inline: true
                },
                {
                    name: 'Server Creation Date',
                    value: `\`\`${interaction.guild.createdAt.toLocaleString()}\`\``,
                    inline: true
                },
                {
                    name: 'Server Boost Tier',
                    value: `\`\`${interaction.guild.premiumTier}\`\``,
                    inline: true
                },
                {
                    name: 'Server Boost Count',
                    value: `\`\`${interaction.guild.premiumSubscriptionCount}\`\``,
                    inline: true
                }
            );
            interaction.followUp({
                embeds: [embed]
            })
        } catch (error) {
            console.error(error);
            return interaction.followUp(`Something went wrong.\n\`\`\`${error}\`\`\``);
        }
    }
}