const discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
  name: "corona",
  category: "info",
  description: "Get the stats of corona",
  usage: "corona all or corona <country>",
  aliases: ["covid", "covid19"],
  run: async (client, message, args) => {
  



let msg = await message.channel.send({
  embed: {
    "description": "Getting The Information...",
    "color": "YELLOW"
  }
})
    
   
    if(!args[0] || args[0].toLowerCase() === "all" || args[0].toLowerCase() === "global") {
       try {
      let corona = await fetch("https://disease.sh/v3/covid-19/all")
      corona = await corona.json()
      
      let embed = new discord.MessageEmbed()
      .setTitle("Global Cases")
      .setColor("GREEN")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
     
      return msg.edit(embed)
      } catch(err) {
    
    msg.edit({embed: {
      
      "description": "Something went wrong :/",
      "color": "RED"
    }})
  }
      
      
    } else {

       try {

      let corona = await fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
      corona = await corona.json()
      
      let embed = new discord.MessageEmbed()
      .setTitle(`${corona.country.toUpperCase()}`)
      .setColor("GREEN")
      .setDescription("Sometimes cases number may differ from small amount.")
      .setThumbnail(corona.countryInfo.flag || "")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return msg.edit(embed)

      } catch(err) {
    
    msg.edit({embed: {
      
      "description": "Unable to find the Information related to given country!",
      "color": "RED"
    }})
  }
      
      
    }
    
  

  }
}