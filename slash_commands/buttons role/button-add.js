const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require('discord.js');
const simply = require('simply-djs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("button-add")
    .setDescription("Add a button to the role menu")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to send the message in")
        .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("message")
            .setDescription("The message to send")
            .setRequired(true)
    )
    .addRoleOption((option) =>
        option
            .setName("role")
            .setDescription("The role to add")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("label")
            .setDescription("name of the button?")
            .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("style")
        .setDescription("Color of the button.")
        .setRequired(false)
        .addChoice("PRIMARY", "PRIMARY")
        .addChoice("SECONDARY", "SECONDARY")
        .addChoice("SUCCESS", "SUCCESS")
        .addChoice("DANGER", "DANGER")
    )
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("Emoji to use for the button.")
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
          type: "add"
        })
      } catch (err) {
        console.error(err);
      }
    }
};
