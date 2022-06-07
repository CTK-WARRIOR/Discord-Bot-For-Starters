/* Required Modules */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("addemoji")
    .setDescription("Allows the admin to add emoji to the server.")
    .addStringOption((option) => option.setName('emoji').setDescription('The emoji you want to add, can be url/emoji').setRequired(true))
    .addStringOption((option) => option.setName('name').setDescription('The name of the emoji').setRequired(true)),
    run: async (client, interaction) => {
        /* Check for permissions */
        if(!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) 
        return interaction.followUp({ content: "You do not have enough permissions to use this command." })
        
        /* Get options and save it to varibale for later use */
        let emoji = interaction.options.getString('emoji')?.trim()
        const name = interaction.options.getString('name')

        /* If "emoji" as variable starts with "<" and ends with ">" */
        if(emoji.startsWith("<") && emoji.endsWith(">")) {
            /* Extract ID using basic regex */
            const id = emoji.match(/\d{15,}/g)[0] // "\d" -> takes digit, "{15, }" makes sure to get digit with more than 15 numbers 
            
            /* Send request to emoji url with gif as extension to check if emoji is gif or not */
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
            .then(image => {
                if(image) return "gif"
                else return "png"
            }).catch(err => {
                return "png"
            })

            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
        }

        /* Create emoji and send embed, if error catch it and send error message */
        interaction.guild.emojis.create(emoji, name)
        .then(emoji => {
            const embed = new MessageEmbed()
            .setTitle("Emoji Added ✅")
            .setDescription(`Added new emoji [ ${emoji.toString()} ] with name **\`[ ${emoji.name} ]\`**`)
            .setColor("GREEN")

            return interaction.followUp({ embeds: [ embed ]})
        }).catch(err => {
            return interaction.followUp("😅 | Unable to add emoji.")
        })
    }
}