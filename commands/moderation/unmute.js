module.exports = {
  name: "unmute",
  category: "moderation",
  botPermission: ["MANAGE_ROLES"],
  authorPermission: ["MANAGE_ROLES"],
  run: async (client, message, args) => {

    const user = message.mentions.members.first();
    if (!user) return message.channel.send("Please mention the member to who you want to unmute");

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    if(user.roles.cache.has(muterole)) return message.channel.send("Given User do not have mute role so what i am suppose to take")
    
    user.roles.remove(muterole)
    await message.channel.send(`**${message.mentions.users.first().username}** is unmuted`)
    user.send(`You are now unmuted from **${message.guild.name}**`).catch(err => {})
    
  }
};
