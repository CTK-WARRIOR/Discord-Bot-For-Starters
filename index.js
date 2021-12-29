const { Client, Collection, MessageEmbed, Intents } = require("discord.js");
const  { token, prefix, color, ownerId } = require("./settings.json");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
    ws: {
        properties: {
            "$browser": "Discord Android"
        }
    },
    partials: [
      'CHANNEL',
      'MESSAGE',
      'REACTION'
    ]
});

client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId };

for (let handler of ["slash_command", "prefix_command", "event"])
  require(`./handlers/${handler}`)(client);

module.exports = client;

client.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.cache.find(
    ch => ch.id === "911595484509007912"
  );

  if (!channel) return;
  const embed = new MessageEmbed()
    .setTitle(`<:join:900353137381097493> ${member.user.tag} Joined`)
		.setColor("GREEN")
		.setThumbnail(member.user.avatarURL({ dynamic: true }))
		.addFields(
			{
				name: "Account Created",
				value: member.user.createdAt.toUTCString(),
				inline: true
			},
			{
				name: "User Joined",
				value: member.joinedAt.toUTCString(),
				inline: true
			}
		)
		.setTimestamp(member.joinedTimestamp)
    .setFooter('User join')
    channel.send({ embeds: [embed] })
});

client.on('guildMemberRemove', (member) => {
  const channel = member.guild.channels.cache.find(
    ch => ch.id === "911595518986158150"
  );

  if(!channel) return;

  const embed = new MessageEmbed()
            .setTitle(`<:leave:896718276376268871> ${member.user.tag} Left`)
            .setColor("RED")
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .addField("User Last Joined", member.joinedAt.toUTCString())
            .setTimestamp()
            .setFooter("User Left")
        channel.send({ embeds: [embed] });
});

client.login(token);