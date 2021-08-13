const db = require('quick.db')
const discord = require('discord.js')
const {
    getInfo
} = require("../../handlers/xp.js")
const {
    CanvasSenpai
} = require("canvas-senpai")
const canva = new CanvasSenpai();

module.exports = {
    name: "level",
    description: "Get the level of author or mentioned",
    usage: "level <user>",
    category: "info",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        if (user.id === client.user.id) { //IF BOT
            return message.channel.send({ content: "😉 | I am on level 100"})
        }

        if (user.bot) {
            return message.channel.send({ content: "Bot do not have levels"})
        }

        let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;

        const {
            level,
            remxp,
            levelxp
        } = getInfo(xp);

        if (xp === 0) {
            level = 0,
                remxp = 0,
                levelxp = 100
        }


        let data = await canva.rankcard({
            gradiant: "coldsky",
            name: user.username,
            discriminator: user.discriminator,
            level: level,
            rank: "0",
            currentXP: remxp,
            fullXP: levelxp,
            avatar: user.displayAvatarURL({
                format: "png"
            })

        })

        const attachment = new discord.MessageAttachment(
            data,
            "welcome-image.png"
        );

        message.channel.send({
            files: [ attachment ]
        });
    }
}