const simplydjs =  require('simply-djs');

module.exports = {
    name: 'chatbot',
    description: 'Chat bot i think.',
    usage: '>chatbot <question>',
    run: async (client, message, args) => {
        simplydjs.chatbot(client, message, {
            chid: "912291692248440872"
        })
    }
}