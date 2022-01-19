const { Client, Collection, Intents } = require("discord.js");
const { token, prefix, color, ownerId } = require("./settings.json");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  ws: {
    properties: {
      $browser: "Discord Android",
    },
  },
  partials: ["CHANNEL", "MESSAGE", "REACTION"],
});

client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId };

for (let handler of ["slash_command", "prefix_command", "event"])
  require(`./handlers/${handler}`)(client);

const { Player } = require("discord-player");

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

module.exports = player;

// Export client
module.exports = client;

// Login
client.login(token);
