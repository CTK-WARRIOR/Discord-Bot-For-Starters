//Required Modules

const fetch = require("node-fetch")
const discord = require("discord.js")
const parseMilliseconds = require('parse-ms');

//If you do not know how GraphQL API works then you wont understand. 
var query = `
query ($search: String) { 
Media (search: $search, type: ANIME) { 
 title {
      romaji
      english
      native
    }
   coverImage {
    large
    color
  }
  nextAiringEpisode {
   timeUntilAiring
    episode
  }
  status
  episodes
  isAdult
  genres
  siteUrl
  description
  bannerImage
  }
}
`
//Through query i am trying to get only required information.

module.exports = {
    name: "anime",
    category: "info",
    aliases: ["ani"],
    description: "Get anime information",
    usage: "anime <anime_name>",
    run: async (client, message, args) => {

      if (!args.length) return message.channel.send(":warning: | You need provide anime name.")

    let embed = new discord.MessageEmbed()
      .setAuthor("Please wait...", client.user.displayAvatarURL())
      .setColor("YELLOW")
    let msg = await message.channel.send(embed)

    fetch("https://graphql.anilist.co", { //Here i will fetch the API and send the query in data along variable

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: { search: args.join(" ") } //in the variable object there is a search key which contains the value of the anime of which we want info
      })
    })
      .then(data => data.json())
      .then(json => {
        json = json.data.Media

        embed.setAuthor(json.title.english || json.title.romaji, json.coverImage.large)
          .setColor(json.coverImage.color || client.settings.color)
          .setDescription(Replacer(json.description).substring(0, 200) + ` [**[Read More](${json.siteUrl})**]`)
          .setImage(json.bannerImage)
          .addField("Genres", json.genres.join(", "))
          .addField("isAdult", json.isAdult, true)
          .addField("Status", json.status, true)
          .setFooter("Anime Hub")


          if(json.nextAiringEpisode) {
            embed.addField("Episode", (json.nextAiringEpisode.episode - 1) + "/" + (json.episodes || " --"), true)
            let time = parseMilliseconds(json.nextAiringEpisode.timeUntilAiring * 1000)
            embed.addField("Next Airing", `${time.days}d ${time.hours}h ${time.minutes}m`, true)
          }
          else embed.addField("Total Episodes",json.episodes, true)
        return msg.edit(embed);
      })
      .catch(err => { //Simply send error message if someting went wrong
        embed.setAuthor("Something went wrong or unable to find this anime")
        .setColor("RED")
        return msg.edit(embed)
      });
  }

}


//Now this is the function which i created to removed some html tags from description of anime info. i replaced them with some markdown to make it look cool.
function Replacer(string) {
  return string.replace(/<br>/g, "").replace(/<i>/g, "**").replace(/<\/i>/g, "**").replace(/<i\/>/g, "**")
}

