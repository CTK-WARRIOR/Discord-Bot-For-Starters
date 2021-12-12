const { MessageEmbed } = require('discord.js')

module.exports = {
    description: "Deploy the slash commands in your guild.",
    run: async (client, message) => {
        let error = new MessageEmbed()
        .setDescription('<:error:896718126991966269> Sorry but this command can only be performed by the server owner.')
        .setColor('RED')
        //if(message.author.id !== message.guild.ownerId) return message.channel.send({ embeds: [error] })
        await message.guild.commands.set([...client.slash_commands].map(x => x[1].data))

        let embed = new MessageEmbed()
        .setDescription("<a:9603discordverifygreen:905408501864603658> Slash commands are deployed for this guild.")
        .setColor('GREEN')
        return message.channel.send({ embeds: [embed] });
    }
}