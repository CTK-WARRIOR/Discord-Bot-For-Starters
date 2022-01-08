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
                .setColor('YELLOW')
                .setDescription(`\`\`\`${response.description}\`\`\``)
                .addFields(
                    {
                        name: '<:globe:896718155416760340> Players',
                        value: `\`\`${response.onlinePlayers}/${response.maxPlayers}\`\``,
                        inline: false
                    },
                    {
                        name: '<:channel:896717996326809641> Version',
                        value: `\`\`${response.version}\`\``,
                        inline: false
                    },
                    {
                        name: '<:link:896718291572240474> Server IP',
                        value: `\`\`${response.host}\`\``,
                        inline: false
                    },
                    {
                        name: '<:desktop:896718080821047346> Port',
                        value: `\`\`${response.port}\`\``,
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
                .setTitle(`${response.name}`)
                .setColor('YELLOW')
                .setDescription(`\`\`${response.description}\`\``)
                .addFields(
                    {
                        name: 'Players',
                        value: `\`\`${response.players.online}/${response.players.max}\`\``,
                        inline: true
                    },
                    {
                        name: 'Version',
                        value: `\`\`${response.version}\`\``,
                        inline: true
                    },
                    {
                        name: 'MOTD',
                        value: `\`\`${response.motd}\`\``,
                        inline: true
                    },
                    {
                        name: 'IP',
                        value: `\`\`${response.host}\`\``,
                        inline: true
                    },
                    {
                        name: 'Port',
                        value: `\`\`${response.port}\`\``,
                        inline: true
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