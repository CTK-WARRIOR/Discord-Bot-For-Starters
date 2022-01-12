const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");
const player = require("../../client/player.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song from YouTube.")
    .addStringOption((option) =>
      option
        .setName("query")
        .setRequired(true)
        .setDescription("The song to play.")
    ),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
  run: async (client, interaction) => {
      const songTitle = interaction.options.getString("query");
      
  },
};
