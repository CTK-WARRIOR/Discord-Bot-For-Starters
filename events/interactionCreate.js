const { Client, CommandInteraction } = require('discord.js')

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */
    run: async (client, interaction) => {
        if (!interaction.isCommand()) return;
        await interaction.deferReply().catch(err => {})

        const { commandName } = interaction;
        const command = client.slash_commands.get(commandName)
        if(!command) return interaction.followUp("Unknown Command: Can not find this command in bot.")

        try {
            if(command) await command.run(client, interaction)
        } catch (err) {
            console.log(err)
            return interaction.followUp(`Something went wrong while executing the command.`)
        }

        if(interaction.isSelectMenu()) {
            if(interaction.customId !== 'reaction-roles') return;
            await interaction.deferReply({ ephemeral: true })
            const roleId = interaction.values[0];
            const role = interaction.guild.roles.cache.get(roleId);
            const memberRoles = interaction.member.roles;

            const hasRole = memberRoles.cache.has(roleId);

            if(hasRole) {
                memberRoles.roles.remove(roleId);
                interaction.followUp(`${role.name} has been removed from you.`)
            } else {
                memberRoles.add(roleId);
                interaction.followUp(`${role.name} has been added to you.`)
            }
        }
    }
}