//LETS GET STARTED
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js")

module.exports = {
name: "anime",
  category: "info",
  aliases: ["kitsu"],
  description: "Get anime information",
  usage: "anime <anime_name>",
  run: async (client, message, args) => {
    
    
    
    if(!args.length) {
      return message.channel.send("Please Give Anime Name")
    }


      let msg = await message.channel.send("Fetching The Info....")
    

    try {

    let body = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`)
    body = await body.json()

  
     
    
        let embed = new MessageEmbed()
        .setTitle(body.data[0].attributes.slug)
        .setColor("RED")
        .setDescription(body.data[0].attributes.synopsis)
        .setThumbnail(body.data[0].attributes.posterImage.original)
        .addField("Ratings", body.data[0].attributes.averageRating)
        .addField("TOTAL EPISODES", body.data[0].attributes.episodeCount)
        //.setImage(body.data[0].attributes.coverImage.large)
        //try it
        
        
        message.channel.send(embed)
        msg.delete();
    
          

      } catch (err) {
        msg.delete();
     
         return message.channel.send("Unable to find this anime");
       }               
                       
    
  }

}