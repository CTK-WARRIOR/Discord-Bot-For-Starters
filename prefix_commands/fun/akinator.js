const akinator = require('discord.js-akinator');

module.exports = {
    name: 'akinator',
    description: 'Play with akinator and it will guess your character.',
    aliases: ['aki'],
    usage: 'akinator',
    run: async (client, message, args) => {
        const language = "en";
        const childMode = "false";
        const gameType = "character";
        const useButtons = "true";
        const embedColor = "#1F1E33";

        akinator(message, {
            language: language,
            childMode: childMode,
            gameType: gameType,
            useButtons: useButtons,
            embedColor: embedColor
        })
    }
}