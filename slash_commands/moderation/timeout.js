//require @discordjs/builders
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a user.')
    .addUserOption((option) => option.setName('user').setDescription('user to timeout').setRequired(true))
    .addStringOption((option) => option.setName('time').setDescription('time to timeout').setRequired(true))
    .addStringOption((option) => option.setName('reason').setDescription('reason for timeout').setRequired(true)),
    /**
     *  @param {Client} client
     * @param {CommandInteraction} interaction
    */
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user');
        const time = interaction.options.getString('time');
        const reason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(user.id);

        const timeInMs = ms(time);
        if(!timeInMs) {
            return interaction.followUp('Invalid time provided.');
        }
        member.timeout(timeInMs, reason);
        interaction.followUp(`${user.tag} has been timed out for ${time}! (${reason})`);
    }
}