const { Random } = require("something-random-on-discord")
 
module.exports = {
  name: "neko",
   category: "fun",
  
  description: "Get Fresh Neko Images :D",
run: async (client, message, args) => {
  
    let data = await Random.getNeko()
    message.channel.send({embeds: [data.embed]})
  
}
}
