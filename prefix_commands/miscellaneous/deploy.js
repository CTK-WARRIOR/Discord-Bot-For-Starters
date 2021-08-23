module.exports = {
    description: "Deploy the slash commands in your guild.",
    run: async (client, message) => {
        if(message.author.id !== message.guild.ownerId) return message.channel.send(`⚔️ | This command can only be used by server owner.`)
        await message.guild.commands.set([...client.slash_commands].map(x => x[1].data))

        return message.channel.send("✅ |  Slash commands are deploied.")
    }
}