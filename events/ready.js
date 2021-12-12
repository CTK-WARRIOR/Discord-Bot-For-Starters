const { Client } = require('discord.js');

module.exports = {
    /**
     * @param {Client} client 
     */
    run: (client) => {
        const activities_list = [
            `${client.guilds.cache.size} servers | >help`,
            `${client.users.cache.size} users | >help`,
            `users using / commands`,
            `Coming Soon`,
            'top.gg'
        ];

        const type_lists = [
            'WATCHING',
            'PLAYING',
            'LISTENING',
            'STREAMING',
            'COMPETING'
        ];

        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length -1) + 1);
            client.user.setActivity(activities_list[index], {
                type: type_lists[index]
            });
        }, 10000)

        console.log(`[ ${client.user?.username} ] : Connected to Discord with ${client.ws?.ping} ping!`)
    }
}