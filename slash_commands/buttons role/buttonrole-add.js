const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");
const simply = require("simply-djs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buttonrole-add")
    .setDescription("Add a button role to the button role panel.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "Select the channel where the buttonrole-panel message is sended"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription(
          "Enter the message id of the buttonrole-panel command which you execute in that channel"
        )
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role you want to add to button panel")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("label")
        .setDescription("Enter the name of the button role?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("style")
        .setDescription("Select the color for the button role")
        .setRequired(false)
        .addChoice("PRIMARY", "PRIMARY")
        .addChoice("SECONDARY", "SECONDARY")
        .addChoice("SUCCESS", "SUCCESS")
        .addChoice("DANGER", "DANGER")
    )
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("Select the emoji for the button role")
        .setRequired(false)
    ),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    try {
      simply.betterBtnRole(client, interaction, {
        type: "add",
      });
    } catch (err) {
      console.error(err);
    }
  },
};
