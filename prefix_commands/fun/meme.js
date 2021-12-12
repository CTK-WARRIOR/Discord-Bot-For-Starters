const { MessageEmbed } = require('discord.js');
const got = require('got');

module.exports = {
    name: 'meme',
    description: 'Sends a meme.',
    usage: '>meme',
    run: async (client, message, args) => {
        got('https://www.reddit.com/r/meme/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let image = content[0].data.children[0].data.url;

            let embed = new MessageEmbed()
            .setTitle('Meme')
            .setColor('YELLOW')
            .setImage(image)
            .setTimestamp()
            .setFooter('from r/meme', message.author.avatarURL({ dynamic: true }))

            message.channel.send({ embeds: [embed] });
        })
    }
}
