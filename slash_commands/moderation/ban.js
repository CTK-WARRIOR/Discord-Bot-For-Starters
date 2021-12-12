const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Client, CommandInteraction } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Allows the admin or owner to ban the member.")
    .addUserOption((option) => option.setName('user').setDescription('The person who you want to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason to ban member').setRequired(true)),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */
    run: async (client, interaction) => {

       if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "You do not have enough permissions to use this command.", ephemeral: true });

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.followUp("😅 | Unable to get details related to given member.");
        const reason = interaction.options.getString('reason')

        if(!member.bannable || member.user.id === client.user.id) 
        return interaction.followUp("😅 | I am unable to ban this member");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.followUp('Given member have higher or equal rank as you so i can not ban them.')
        
        const embed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** is banned from the server for \`${reason}\``)
        .setColor("GREEN")
        .setFooter("Ban Member")
        .setTimestamp()

        await member.user.send(`You are banned from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {})
        member.ban({ reason })

        return interaction.followUp({ embeds: [ embed ]})

    },
    
};
