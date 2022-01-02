const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require("ms")

module.exports = {
 data: new SlashCommandBuilder()   
 .setName("timeout")
 .setDescription("Put member in timeout.")
 .addUserOption((option) => option.setName("member").setDescription('Person who you want to put in timeout.').setRequired(true))
 .addStringOption((option) => option.setName("time").setDescription('For how much time you want to timeout member').setRequired(true))
 .addStringOption((option) => option.setName("reason").setDescription('Reason to put member in timeout')),
 run: async (client, interaction) => {

    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: "You do not have permission to use this command." });

    const member = interaction.options.getMember('member')
    const reason = interaction.options.getString('reason') || null
    const time = ms(interaction.options.getString('time'))

    if(!time) return interaction.followUp({ content: "Given time is not valid, it is necessary that you provide valid time."})
    const response = await member.timeout(time, reason)

    if(!response) return interaction.followUp({ content: "I am sorry but for some reason I am unable to timeout this member."})
    return interaction.followUp({ content: `${member} has been timed out for ${ms(time, { long: true })}`})
 }
}
