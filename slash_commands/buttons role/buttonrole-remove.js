const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");
const simply = require("simply-djs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buttonrole-remove")
    .setDescription("Removes a button role from the click button menu.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to remove the button role from.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message id")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to remove from the button role.")
        .setRequired(true)
    ),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    simply.betterBtnRole(client, interaction, {
      type: "remove",
    });
  },
};
