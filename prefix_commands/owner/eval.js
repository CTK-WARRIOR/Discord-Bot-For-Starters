const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  description: "Only used by the owners.",
  run: async (client, message, args) => {
    if (message.author.id !== "414075055023063040") {
      let owner = new MessageEmbed()
      .setDescription('<:error:896718126991966269> Sorry, you are not allowed to use this command, this command is Owner-only.')
      .setTimestamp()
      return message.channel.send({ embeds: [owner] });
    }

    const embed = new MessageEmbed().addField(
      "Input",
      "```js\n" + args.join(" ") + "```"
    );

    try {
      const code = args.join(" ");
      if (!code) return message.channel.send("Please include the code.");
      let evaled;

      if (
        code.includes(`SECRET`) ||
        code.includes(`TOKEN`) ||
        code.includes("process.env")
      ) {
        evaled = "No, shut up, what will you do it with the token?";
      } else {
        evaled = await eval(code);
      }

      if (typeof evaled !== "string")
        evaled = await require("util").inspect(evaled, { depth: 0 });

      let output = clean(evaled);
      if (output.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(
          output
        );
        embed
          .addField("Output", `https://hastebin.com/${body.key}.js`)
          .setColor(message.client.embedColor);
      } else {
        embed
          .addField("Output", "```js\n" + output + "```")
          .setColor(message.client.embedColor);
      }

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      let err = clean(error);
      if (err.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(err);
        embed
          .addField("Output", `https://hastebin.com/${body.key}.js`)
          .setColor("RED");
      } else {
        embed.addField("Output", "```js\n" + err + "```").setColor("RED");
      }

      message.channel.send({ embeds: [embed] });
    }
  },
};

function clean(string) {
  if (typeof text === "string") {
    return string
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return string;
  }
}
