/**
 * Required modules
 */

const discord = require("discord.js");
const axios = require("axios");

module.exports = {
name: "imdb",
  description: "Get the information about series and movie",
  category: "info",
  usage: "imdb <name>",
  run: async (client, message, args, color) => {
    
    if(!args.length) return message.channel.send({ content: "Please give the name of movie or series" })
    let msg = await message.channel.send({ embeds: [{ "description": "Getting the information...", "color": "YELLOW" }] })
    let movie = await axios(`https://www.omdbapi.com/?apikey=5e36f0db&t=${args.join("+")}`).catch(err => {})

    if(!movie || !movie.data || movie.data.Response === 'False') return msg.edit({
        embeds: [{
          "description": "Unable to find Something about `" + args.join(" ") + "`",
          "color": "RED"
        }]
      })

    movie = movie.data;
    
    let embed = new discord.MessageEmbed()
    .setTitle(movie.Title)
    .setColor("GREEN")
    .setThumbnail(movie.Poster)
    .setDescription(movie.Plot)
    .setFooter(`Ratings: ${movie.imdbRating} | Seasons: ${movie.totalSeasons || "0"}`)
    .addField("Country", movie.Country, true)
    .addField("Languages", movie.Language, true)
    .addField("Type", movie.Type, true);
    
    
    msg.edit({ embeds: [embed] })
  }    
}
