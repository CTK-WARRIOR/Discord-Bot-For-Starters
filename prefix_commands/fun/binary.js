const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'binary',
    description: 'encode decode messages.',
    aliases: ['bi'],
    usage: 'binary encode or decode message',
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('Unknown parameters, please choose the methods first, either encode or decode it.')
        .setTimestamp()
        if(!args[0]) return message.channel.send({ embeds: [embed] });
        
        let choice = ["encode", "decode"];

        let embeds = new MessageEmbed()
        .setColor('RED')
        .setDescription('Unknown parameters, please choose the methods first, either encode or decode it.')
        .setTimestamp()
        if(!choice.includes(args[0].toLowerCase())) return message.channel.send({ embeds: [embeds] });

        let text = args.slice(1).join(" ");

        let textembed = new MessageEmbed()
        .setColor('RED')
        .setDescription('Please input some text.')
        .setTimestamp()
        if(!text) return message.channel.send({ embeds: [textembed] });

        let textlimit = new MessageEmbed()
        .setColor('RED')
        .setDescription("uwu, this is way too much, the maximum character was 1024")
        .setTimestamp()
        if (text.limit > 1024) return message.channel.send({ embeds: [textlimit] })

        function encode(char) {
            return char.split("").map(str => {
                const converted = str.charCodeAt(0).toString(2);
                return converted.padStart(0, "0")
            }).join(" ")
        };
    
        function decode(char) {
            return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
        };

        if (args[0].toLowerCase() === "encode") {
            return message.channel.send(encode(text))
        } else {
            return message.channel.send(decode(text))
        }
    }
}