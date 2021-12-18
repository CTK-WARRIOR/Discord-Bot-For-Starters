const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('dm someone ofc')
    .addUserOption((option) => option.setName('user').setRequired(true).setDescription('mention the user'))
    .addStringOption((option) => option.setName('message').setRequired(true).setDescription('message you want to send.')),
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

        if(interaction.user.id !== "414075055023063040") return interaction.reply({
            content: 'Only the bot owner can use this command.',
            ephemeral: true
        });

        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {});

        const message = interaction.options.getString('message');

        await member.send(`${message}`).catch(err => {});
        return interaction.reply({
            content: 'Send the message successfully',
            ephemeral: true
        })
    }
}