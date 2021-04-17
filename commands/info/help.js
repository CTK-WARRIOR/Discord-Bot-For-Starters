const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const { default_prefix } = require("../../config.json")
module.exports = {
  name: "help",
  description: "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.reply("There is no command in the bot with name **" + args[0] + "**.");
      }

      let embed = new MessageEmbed()
        .setTitle(command.name[0].toUpperCase() + command.name.slice(1) + " Command")
        .setDescription(command.description || "Not Provided :C")
        .addField("Command usage", command.usage ? "```js\n" + default_prefix + command.usage + "```" : "Not Provided")
        .setColor("GREEN")


      if(command.aliases && command.aliases.length) embed.addField("Aliases", command.aliases.map(x => "`" + x +"`").join(", "))
      if(command.botPermission && command.botPermission.length) embed.addField("Bot Permissions", command.botPermission.map(x => "`" + x +"`").join(", "), true)
      if(command.authorPermission && command.authorPermission.length) embed.addField("Author Permissions", command.authorPermission.map(x => "`" + x +"`").join(", "), true)

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription("Join my server or Die :D")
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }

      let database = db.get(`cmd_${message.guild.id}`)

      if (database && database.length) {
        let array = []
        database.forEach(m => {
          array.push("`" + m.name + "`")
        })

        emx.addField("Custom Commands", array.join(", "))
      }

      return message.channel.send(emx);
    }
  }
};
