const { Client, Intents, Collection } = require("discord.js"),
{ token, prefix, color, ownerId } = require("./settings.json"),
client = new Client( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES ] })

client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId }

for(let handler of  ["slash_command", "prefix_command", "event"]) require(`./handlers/${handler}`)(client);

client.login(token)
