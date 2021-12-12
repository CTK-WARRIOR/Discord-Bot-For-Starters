const request = require("node-superfetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "google",
  description: "let you search anything from command.",
  run: async (client, message, args) => {
    let googlekey = "AIzaSyBtcCABeayqzhQyIYhXQi9OvqUJd0Z_k5o";
    let csx = "4566768d2817e40c3";
    let query = args.join(" ");
    let result;

    if (!query)
      return message.channel.send("Please enter some query to search!");

    href = await search(query);
    let embeds = new MessageEmbed()
    .setColor('RED')
    .setTitle("Unknown Search")
    if (!href) return message.channel.send({ embeds: [embeds] });

    const embed = new MessageEmbed()
      .setTitle(href.title)
      .setDescription(href.snippet)
      .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
      .setURL(href.link)
      .setColor("YELLOW")
      .setFooter("Powered by Google API");

    return message.channel.send({ embeds: [embed] });

    async function search(query) {
      const { body } = await request
        .get("https://www.googleapis.com/customsearch/v1")
        .query({
          key: googlekey,
          cx: csx,
          safe: "off",
          q: query,
        });

      if (!body.items) return null;
      return body.items[0];
    }
  },
};
