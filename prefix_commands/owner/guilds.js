const { MessageEmbed, Client, Message } = require("discord.js");

module.exports = {
  name: "guilds",
  description: "List all guilds the bot is in.",
  aliases: ["guildlist", "guildslist", "guildlisting", "guildslisting"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Guilds")
      .setDescription(`${client.guilds.cache.size} guilds`)
      .addFields(
        {
          name: `Guild Name: [${client.guilds.cache.size}]`,
          value: client.guilds.cache.map((g) => g.name).join("\n"),
          inline: true,
        },
        {
          name: `Guild ID's: [${client.guilds.cache.map(g => g.id).length}]`,
          value: `${client.guilds.cache.map((g) => g.id).join("\n")}`,
          inline: true,
        },
        {
          name: `Guild Members: [${client.guilds.cache.map(g => g.memberCount).length}]`,
          value: `${client.guilds.cache.map((g) => g.memberCount).join("\n")}`,
          inline: true,
        }
      )
      .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
    message.channel.send({
      embeds: [embed]
    });
  },
};
