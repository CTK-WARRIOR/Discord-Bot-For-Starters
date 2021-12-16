const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, Message } = require("discord.js");
const simply = require('simply-djs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-ticket")
    .setDescription("Setup ticket system in your server."),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {Message} message
     */
  run: async (client, message, interaction) => {
	  simply.ticketSystem(message, message.channel);
  },
};
