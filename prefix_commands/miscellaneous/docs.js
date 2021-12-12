const fetch = require('node-fetch');

module.exports = {
    name: 'djsdocs',
    description: 'HMM!',
    run: async (client, message, args) => {
        const url = `https://djsdocs.sorta.moe/v2/embed?src=${args[1] || "stable"}&q`

    let query = args[0];
    if(!query) return message.channel.send("Provide a search query")
    let response = await fetch(`${url}=${query}`);
    let json = await response.json();
    if (json == null) return message.reply("not found!");
    return message.channel.send({ embeds: [json] });
    }
}