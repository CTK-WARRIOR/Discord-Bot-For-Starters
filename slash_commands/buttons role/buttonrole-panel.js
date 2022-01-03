const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const simply = require('simply-djs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('buttonrole-panel')
    .setDescription('This command will send a pre-build message to the channel.'),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        let embed = new MessageEmbed()
        .setTitle('Button Role Panel')
        simply.btnrole(client, interaction, {
            embed: embed,
            data: [

            ]
        });
    }
}