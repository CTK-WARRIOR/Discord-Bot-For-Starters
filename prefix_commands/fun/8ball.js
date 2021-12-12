const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Ask question with magical 8ball.',
    aliases: ['8b'],
    usage: '8ball question',
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setTitle('<:error:896718126991966269> Ask something ?')
        .setColor('RED')
        .setDescription(`\`\`Sorry this seems to be invalid question which i cannot read, please try again with a question.\`\``)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))

        if (!args[2]) return message.channel.send({ embeds: [embed] });

        let replies = ["Yes.", "No.", "Hmmm...", "I don't know k?", "Absolutely.", "Maybe...", "BIG YES!", "Na na na...", "You know the answer, right?", "Ask again later.", "It is certain.", "It is decidedly so.", "Outlook good.", "Better not tell you now.", "Cannot predict now.", "Very doubtful.", "My sources say no.", "Don't count on it.", "Outlook not so good.", "( ͡° ͜ʖ ͡°)", "°Д°", "≧☉_☉≦"]
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(1).join(" ");

        let answers = new MessageEmbed()
        .setTitle('🎱 Your Answer')
        .setColor('YELLOW')
        .addFields(
            {
                name: 'Question?',
                value: `\`\`${question}\`\``,
            },
            {
                name: 'Answer',
                value: `\`\`${replies[result]}\`\``
            }
        )
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

        message.channel.send({ embeds: [answers] })
    }
}