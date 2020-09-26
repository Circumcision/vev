const { Client, Collection, MessageEmbed }= require('discord.js');

module.exports.config = {
  name: "ping",
  aliases: ["test"]
}

module.exports.run = async (client, message, args) => {
  const D = new MessageEmbed()
  .setDescription(`\n:heartbeat: ${client.ws.ping}ms`)
  message.channel.send(D)
}
