//Required Modules

const fetch = require("node-fetch")
const discord = require("discord.js")
const parseMilliseconds = require('parse-ms');
//Through query i am trying to get only required information.

module.exports = {
    name: "anime",
    category: "info",
    aliases: ["ani"],
    description: "Get anime information",
    usage: "anime <anime_name>",
    run: async (client, message, args) => {

    if (!args.length) return message.channel.send({ content: ":warning: | You need provide anime name."})
    const json = await fetch("https://graphql.anilist.co", { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `query ($search: String) { 
        Media (search: $search, type: ANIME) { 
        title { romaji english native }
        coverImage { large color }
        nextAiringEpisode { timeUntilAiring episode }
        status episodes isAdult genres siteUrl description bannerImage } }
        `,
        variables: { search: args.join(" ") } //in the variable object there is a search key which contains the value of the anime of which we want info
      })
    }).then(data => data.json()).then(json => json.data.Media)
      .catch(err => { //Simply send error message if someting went wrong
        return message.channel.send({ content: err.toString() })
    });

    const embed = new discord.MessageEmbed()
          .setAuthor(json.title.english || json.title.romaji || "None", json.coverImage.large)
          .setColor(json.coverImage.color || "GREEN")
          .setDescription(Replacer(json.description).substring(0, 200) + ` [**[Read More](${json.siteUrl})**]`)
          .setImage(json.bannerImage)
          .addField("Genres", json.genres.join(", "))
          .addField("isAdult", json.isAdult ? "Yes" : "No", true)
          .addField("Status", json.status || "None", true)
          .setFooter("Anime Hub")

          if(json.nextAiringEpisode) {
            embed.addField("Episode", (json.nextAiringEpisode.episode - 1) + "/" + (json.episodes || " --"), true)
            let time = parseMilliseconds(json.nextAiringEpisode.timeUntilAiring * 1000)
            embed.addField("Next Airing", `${time.days}d ${time.hours}h ${time.minutes}m`, true)
          } else embed.addField("Total Episodes", json.episodes.toString(), true)
        
          return message.channel.send({ embeds: [embed] });

  }
}
//Now this is the function which i created to removed some html tags from description of anime info. i replaced them with some markdown to make it look cool.
function Replacer(string) {
  return string.replace(/<br>/g, "").replace(/<i>/g, "**").replace(/<\/i>/g, "**").replace(/<i\/>/g, "**")
}

