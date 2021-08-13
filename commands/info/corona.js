const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
  name: "corona",
  category: "info",
  description: "Get the stats of corona",
  usage: "corona all or jsonData <country>",
  aliases: ["covid", "covid19"],
  run: async (client, message, args) => {

    let link;
    let embed = new MessageEmbed()

    if (!args[0] || args[0].match(/all|global|globe|world/gi)) { //if country is not provided or the args contains all, global, globe or world string then execute the statement.
      let jsonData = await fetch("https://disease.sh/v3/covid-19/all")
      jsonData = await jsonData.json()
      embed
       .setTitle("Global Cases")
           .setColor("GREEN")
           .setDescription("Sometimes cases number may differ from small amount.")
           .addField("Total Cases", jsonData.cases.toLocaleString(), true)
           .addField("Total Deaths", jsonData.deaths.toLocaleString(), true)
           .addField("Total Recovered", jsonData.recovered.toLocaleString(), true)
           .addField("Today's Cases", jsonData.todayCases.toLocaleString(), true)
           .addField("Today's Deaths", jsonData.todayDeaths.toLocaleString(), true)
           .addField("Active Cases", jsonData.active.toLocaleString(), true);
    } else {
      let jsonData = await fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
      jsonData = await jsonData.json()

      if(!jsonData.country) return message.reply({ content: "I am unable to get the **" + args[0] + "** details." })

      embed.setTitle(`${jsonData.country.toUpperCase()}`)
           .setColor("GREEN")
           .setDescription("Sometimes cases number may differ from small amount.")
           .setThumbnail(jsonData.countryInfo.flag || "")
           .addField("Total Cases", jsonData.cases.toLocaleString(), true)
           .addField("Total Deaths", jsonData.deaths.toLocaleString(), true)
           .addField("Total Recovered", jsonData.recovered.toLocaleString(), true)
           .addField("Today's Cases", jsonData.todayCases.toLocaleString(), true)
           .addField("Today's Deaths", jsonData.todayDeaths.toLocaleString(), true)
           .addField("Active Cases", jsonData.active.toLocaleString(), true);
    }

    return message.channel.send({ embeds: [embed]}).catch(err => {
      return message.reply({ content: "Something went wrong, please try again later."})
    }) 
  }
}