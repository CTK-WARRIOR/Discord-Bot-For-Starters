const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('dm someone ofc'),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        if(interaction.channel.type === 'DM') return interaction.reply({
            content: 'I wont work in dms.',
            ephemeral: true
        });
    }
}