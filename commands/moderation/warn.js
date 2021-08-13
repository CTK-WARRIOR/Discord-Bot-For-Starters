const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  authorPermission: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    
    const user = message.mentions.members.first()
    if(!user) return message.channel.send("Please Mention the person to who you want to warn - warn @mention <reaosn>")
    if(message.mentions.users.first().bot) return message.channel.send("You can not warn bots")
    if(message.author.id === user.id) return message.channel.send("You can not warn yourself")
    if(user.id === message.guild.owner.id) return message.channel.send("You jerk, how you can warn server owner -_-")
    
    const reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send("Please provide reason to warn - warn @mention <reason>")
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    if(warnings === 3) return message.channel.send(`${message.mentions.users.first().username} already reached his/her limit with 3 warnings`)
    
    
    if(!warnings) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send(`You have been warned in **${message.guild.name}** for ${reason}`).catch(err => {})
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)
    } else if(warnings) {
       db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`You have been warned in **${message.guild.name}** for ${reason}`).catch(err => {})
       await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)
    }
  
  } 
}