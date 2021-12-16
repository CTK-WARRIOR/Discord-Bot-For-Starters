const { Client, CommandInteraction } = require('discord.js');
const simply = require('simply-djs');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */
    run: async (client, interaction) => {
        // Ticket System
        simply.clickBtn(interaction);
        
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
    }
}