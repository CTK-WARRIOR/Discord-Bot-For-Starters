module.exports = {
  name: "ping",
  category: "info",
  description: "Get bot ping :/",
  usage: "ping",
  run: (client, message) => {
    message.channel.send({ content: `**Pong** ${client.ws.ping}`});
  }
  
}