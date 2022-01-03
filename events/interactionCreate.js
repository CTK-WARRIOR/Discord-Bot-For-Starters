const { Client, CommandInteraction } = require('discord.js');
const simply = require('simply-djs');
const { mongooseConnectionString } = require('../settings.json');
const { Database } = require('quickmongo');
const db = new Database(`${mongooseConnectionString}`);

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
        
        // Suggest System
        simply.suggestBtn(interaction, db);

        // Click Button
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