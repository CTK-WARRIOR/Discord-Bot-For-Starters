/* Required Modules */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rememoji")
        .setDescription("Allows the admin to remove emoji from the server.")
        .addStringOption((option) => option.setName('emoji').setDescription('The emoji you want to remove, can be emoji/name').setRequired(true)),
    run: async (client, interaction) => {
        /* Check for permissions */
        if (!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) 
        return interaction.followUp({ content: "You do not have enough permissions to use this command." })

        const emojiQuery = interaction.options.getString('emoji')?.trim()

        /* Find emoji from given emoji query */
        const emoji = await interaction.guild.emojis.fetch()
            .then(emojis => {
                return emojis.find(x => x.name === emojiQuery || x.toString() === emojiQuery)
            }).catch(err => { })

        if (!emoji) return interaction.followUp("😅 | Unable to find given emoji.")

        /* Delete emoji and catch error */
        emoji.delete()
            .then(emoji => {
                return interaction.followUp({ embeds: [
                    new MessageEmbed()
                    .setTitle("Emoji Removed ✅")
                    .setDescription(`Removed emoji with name **\`[ ${emoji.name} ]\`**`)
                    .setColor("RED")
                ]})
            }).catch(err => {
                return interaction.followUp("🆘 | Unable to remove emoji.")
            })
    }
}