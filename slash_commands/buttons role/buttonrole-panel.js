const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const simply = require("simply-djs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buttonrole-panel")
    .setDescription(
      "This command is needed for the buttonrole-add and buttonrole-remove commands to work."
    ),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    let embed = new MessageEmbed()
      .setTitle("Button Role Panel")
      .setDescription(
        "This is a panel for the button role system.\n\nTo add a button role, use the `buttonrole-add` command.\n\nTo remove a button role, use the `buttonrole-remove` command.\n\nServer members can click the button to get the role.\n\nAs many people dont like @everyone ping so you can use this system to give your server members a role that they can click to get.\n\nMake sure my role is higher than the role you want to give to your server members."
      )
      .setTimestamp()
      .setFooter(
        "Happy clicking!",
        interaction.user.avatarURL({ dynamic: true })
      );
    simply.btnrole(client, interaction, {
      embed: embed,
      data: [],
    });
  },
};
