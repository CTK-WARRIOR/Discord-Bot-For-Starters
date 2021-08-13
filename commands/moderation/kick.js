const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick anyone with one shot xD",
  usage: "kick <@user> <raeson>",
  botPermission: ["KICK_MEMBERS"],
  authorPermission: ["KICK_MEMBERS"],
  run: (client, message, args) => {
  
    let target = message.mentions.members.first();
    
    if(!target) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to kick`)
    }
    
    if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, You can not kick yourself`)
    }
    
  if(!args[1]) {
    return message.channel.send(`**${message.author.username}**, Please Give Reason to ban`)
  }
    
    let embed = new discord.MessageEmbed()
    .setTitle("Action: Kick")
    .setDescription(`Banned ${target} (${target.id})`)
    .setColor("#ff2050")
    .setFooter(`Banned by ${message.author.username}`);
    
    message.channel.send({embeds: [embed]})
    
    target.kick({reason: args[1]});
  }
}