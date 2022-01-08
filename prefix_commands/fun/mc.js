const util = require('minecraft-server-util');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mc',
    description: 'Get information about a Minecraft server',
    args: true,
    usage: '<ip> <port>',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async (client, message, args) => {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setTitle("Please enter a valid minecraft server IP")
            .setColor('RED')
            .setDescription(`\`\`Please enter a valid minecraft server IP.\`\``)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        }

        if(args.length <= 1) {
            util.status(args[0], {
                port: 25565
            }).then((response) => {
                let embed = new MessageEmbed()
                .setTitle("Mincecraft Server Status")
                .setColor('#2f3136')
                .setDescription(`\`\`\`${response.description.descriptionText.replace(/§[a-zA-Z0-9]/g, '')}\`\`\``)
                .addFields(
                    {
                        name: '<:globe:896718155416760340> Online Players',
                        value: `${response.onlinePlayers.toLocaleString()}/${response.maxPlayers.toLocaleString()}`,
                        inline: false
                    },
                    {
                        name: '<:channel:896717996326809641> Version',
                        value: `${response.version}`,
                        inline: false
                    },
                    {
                        name: '<:link:896718291572240474> Server IP',
                        value: `${response.host}`,
                        inline: false
                    },
                    {
                        name: '<:desktop:896718080821047346> Port',
                        value: `${response.port}`,
                        inline: false
                    }
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                message.channel.send({ embeds: [embed] })
            }).catch((err) => {
                let embed = new MessageEmbed()
                .setTitle("Please enter a valid minecraft server IP")
                .setColor('RED')
                .setDescription(`${err}`)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                message.channel.send({ embeds: [embed] });
                throw err;
            })
        }
        if(args[1]) {
            util.status(args[0], {
                port: parseInt(args[1])
            }).then((response) => {
                let embed = new MessageEmbed()
                .setTitle("Mincecraft Server Status")
                .setColor('#2f3136')
                .setDescription(`\`\`\`${response.description.descriptionText.replace(/§[a-zA-Z0-9]/g, '')}\`\`\``)
                .addFields(
                    {
                        name: '<:globe:896718155416760340> Online Players',
                        value: `${response.onlinePlayers.toLocaleString()}/${response.maxPlayers.toLocaleString()}`,
                        inline: false
                    },
                    {
                        name: '<:channel:896717996326809641> Version',
                        value: `${response.version}`,
                        inline: false
                    },
                    {
                        name: '<:link:896718291572240474> Server IP',
                        value: `${response.host}`,
                        inline: false
                    },
                    {
                        name: '<:desktop:896718080821047346> Port',
                        value: `${response.port}`,
                        inline: false
                    }
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                message.channel.send({ embeds: [embed] })
            }).catch((err) => { 
                let embed = new MessageEmbed()
                .setTitle("Please enter a valid minecraft server IP")
                .setColor('RED')
                .setDescription(`${err}`)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
                message.channel.send({ embeds: [embed] });
                throw err;
            })
        }
    }
}