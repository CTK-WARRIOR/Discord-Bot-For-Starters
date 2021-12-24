//require @discordjs/builders
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("massroleassign")
    .setDescription("Mass role assign.")
    .addRoleOption((option) =>
      option.setName("role").setDescription("role to assign").setRequired(true)
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    try {
      //permission check
      if (!interaction.member.permissions.has("MANAGE_ROLES"))
        return interaction.followUp({
          content: "You do not have enough permissions to use this command.",
          ephemeral: true,
        });
      if (!interaction.guild.me.permissions.has("MANAGE_ROLES"))
        return interaction.followUp({
          content: "I do not have enough permissions to use this command.",
          ephemeral: true,
        });

      const role = interaction.options.getRole("role");
      const members = interaction.guild.members.cache.filter(
        (member) => !member.roles.cache.has(role.id)
      );
      members.forEach((member) => member.roles.add(role));
      let embed = new MessageEmbed()
        .setTitle("<:success:896718485089042433> Role assigned")
        .setDescription(`\`\`${members.size}\`\` members were assigned the role: \`\`${role.name}\`\``)
        .setColor("#86ea95")
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.avatarURL());
      interaction.followUp({
          embeds: [embed]
      });
    } catch (error) {
      console.error(error);
      return interaction.followUp({
        content: "An error occured while executing this command.",
        ephemeral: true,
      });
    }
  },
};
