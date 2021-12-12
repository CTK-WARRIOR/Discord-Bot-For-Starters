const translate = require('@iamtraction/google-translate');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "translate",
  description: "let you translate to any language.",
  run: async (client, message, args) => {
    const query = args.join(" ");
    if(!query) return message.channel.send('Please specify a text to translate.');

    const translated = await translate(query, {
        to: 'en'
    });
    message.channel.send(translated.text);
  },
};
