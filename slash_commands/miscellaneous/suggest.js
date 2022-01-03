const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction } = require('discord.js');
const simply = require('simply-djs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggest something to the bot.')
        .addStringOption((option) => option.setName('suggestion').setRequired(true).setDescription('The suggestion you want to send to the bot.')),
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
    run: async (client, interaction, args) => {
        simply.suggestSystem(client, interaction, args, {
            chid: '613085870718976070'
        });
    }
}