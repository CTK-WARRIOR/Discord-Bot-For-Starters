const { Client, Message } = require("discord.js");
const simply = require('simply-djs');

module.exports = {
  name: "setup-ticket",
  description: "Setup the ticket System in your Server.",
  aliases: ["ticket"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message, args) => {
    simply.ticketSystem(message, message.channel, {
        embedColor: "#2f3136",
        embedFoot: "Thank you for using ticket system :)"
    });
  },
};
