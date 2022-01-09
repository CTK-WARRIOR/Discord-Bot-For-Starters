const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("servercount")
    .setDescription("Sends the exact amount of servers the bot is in."),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    try {
      client.shard
        .fetchClientValues((client) => {
          [
            client.shard.ids,
            client.ws.status,
            client.ws.ping,
            client.guilds.cache.size,
          ];
        })
        .then((results) => {
          const embed = new MessageEmbed().setTitle(
            `Bot Shards ${interaction.client.shard.count}`
          );
          results.map((data) => {
            embed.addField(
              `📡 Shard ${data[0]}`,
              `**Status:** ${data[1]}\n**Ping:** ${data[2]}ms\n**Guilds:** ${data[3]}`,
              false
            );
          });
          interaction.followUp({
            embeds: [embed],
          });
        });
    } catch (error) {
      console.error(error);
      return interaction.followUp({
        content: `An error occurred while running the \`servercount\` command.\n\`\`\`${error}\`\`\``,
      });
    }
  },
};
