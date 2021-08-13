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
        return message.reply({ content: "There is no command in the bot with name **" + args[0] + "**."});
      }

      let embed = new MessageEmbed()
        .setTitle(command.name[0].toUpperCase() + command.name.slice(1) + " Command")
        .setDescription(command.description || "Not Provided :C")
        .addField("Command usage", command.usage ? "```js\n" + default_prefix + command.usage + "```" : "Not Provided")
        .setColor("GREEN")


      if(command.aliases && command.aliases.length) embed.addField("Aliases", command.aliases.map(x => "`" + x +"`").join(", "))
      if(command.botPermission && command.botPermission.length) embed.addField("Bot Permissions", command.botPermission.map(x => "`" + x +"`").join(", "), true)
      if(command.authorPermission && command.authorPermission.length) embed.addField("Author Permissions", command.authorPermission.map(x => "`" + x +"`").join(", "), true)

      return message.channel.send({ embeds: [embed] });
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription("Join my server or Die :D")
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());
      
      //help command
      let cmds = {}
      for(let item of [...commands]) {
        cmds[item[1].category] ? cmds[item[1].category].push(item[0]) : cmds[item[1].category] = [item[0]]
      }

      for(let key of Object.keys(cmds)) {
        emx.addField(key.toUpperCase(), cmds[key].join(", "))
      }

      return message.channel.send({ embeds: [emx] });
    }
  }
};
