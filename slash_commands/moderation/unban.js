const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("use to unban banned user.")
    .addUserOption((option) =>
      option
        .setName("id")
        .setDescription("The user you want to unban.")
        .setRequired(true)
    ),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const userId = interaction.options.getUser("id");

    interaction.guild.members
      .unban(userId)
      .then((user) => {
        interaction.reply({
          ephemeral: true,
          content: `${user.tag} is unbanned.`,
        });
      })
      .catch((err) => {
        console.log(err);
        return interaction.reply({
          content: "That is not a valid banned user.",
        });
      });
  },
};
