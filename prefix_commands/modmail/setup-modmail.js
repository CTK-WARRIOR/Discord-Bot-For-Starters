const { Client, Message } = require("discord.js");
const simplydjs = require('simply-djs');

module.exports = {
  name: "setup-modmail",
  description: "Setup modemail system in your server.",
  aliases: ["modmail"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message, args) => {
    simplydjs.modmail(client, message)
  },
};
