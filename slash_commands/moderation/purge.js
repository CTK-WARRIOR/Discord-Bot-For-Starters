const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete messages from the channel.')
    .addNumberOption((option) => option.setName('amount').setDescription('amount to clear').setRequired(true))
    .addStringOption((option) => option.setName('phrase').setDescription('phrase to delete').setRequired(false)),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            //permissions
            if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({
                content: 'You dont have permissions to use this command.',
                ephemeral: true
            });
            if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply({
                content: 'I dont have permissions to use this command.',
                ephemeral: true
            });

            const amount = interaction.options.getNumber('amount');
            const phrase = interaction.options.getString('phrase');

            if(isNaN(amount)) return interaction.reply('Please enter a valid amount to delete messages!');

            if(amount > 100) return interaction.reply('Please enter a nuumber less than 100');
            if(amount < 1) return interaction.reply('Please enter a number more than 1');

            if(!phrase) {
                interaction.channel.bulkDelete(amount, {
                    filterOld: true
                }).then(async (mssages) => {
                    await interaction.reply(`Successfully deleted \`${messages.size}/${amount}\` messages`);
                    setTimeout(async () => {
                        await interaction.deferReply();
                    }, 2000)
                }).catch(() => null);
            } else {
                interaction.channel.bulkDelete(
                    (await interaction.channel.messages.fetch({
                        limit: amount
                    })).filter(
                        filterMsg => filterMsg.content.toLowerCase() === phrase.toLowerCase()
                    ), {
                        filterOld: true
                    }
                ).then(async (messages) => {
                    await interaction.reply(`Successfully deleted \`${messages.size}/${amount}\` messages`);
                    setTimeout(async () => {
                        await interaction.deferReply();
                    }, 2000);
                }).catch(() => null);
            }
        } catch (error) {
            console.error(error);
            return interaction.reply(`An error occured: \`${error.message}\`!`);
        }
    }
}