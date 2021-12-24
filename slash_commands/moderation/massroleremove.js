//require @discordjs/builders
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("massroleremove")
        .setDescription("Mass role remove.")
        .addRoleOption((option) =>
            option.setName("role").setDescription("role to remove").setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        try {
            //permission check
            if (!interaction.member.permissions.has("MANAGE_ROLES"))
                return interaction.followUp({
                    content: "You do not have enough permissions to use this command.",
                    ephemeral: true,
                });
            if (!interaction.guild.me.permissions.has("MANAGE_ROLES"))
                return interaction.followUp({
                    content: "I do not have enough permissions to use this command.",
                    ephemeral: true,
                });

            const role = interaction.options.getRole("role");
            const members = interaction.guild.members.cache.filter(
                (member) => member.roles.cache.has(role.id)
            );
            members.forEach((member) => member.roles.remove(role));
            let embed = new MessageEmbed()
                .setTitle("<:error:896718126991966269> Role removed")
                .setDescription(`\`\`${members.size}\`\` members were removed the role: \`\`${role.name}\`\``)
                .setColor("#ed4245")
                .setTimestamp()
                .setFooter(`${client.user.username}`, client.user.avatarURL());
            interaction.followUp({
                embeds: [embed]
            });
        } catch (error) {
            console.error(error);
            return interaction.followUp({
                content: "An error occured while executing this command.",
                ephemeral: true,
            });
        }
    },
};  //end of module.exports
//end of file