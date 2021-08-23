module.exports = {
    run: (client) => {
        console.log(`[ ${client.user?.username} ] : Connected to Discord with ${client.ws?.ping} ping!`)
    }
}