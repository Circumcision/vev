const { Client, Collection, MessageEmbed }= require('discord.js');
const js = require('./devs.json')

module.exports.config = {
  name: "developers",
  aliases: ["devs", "staff"] // Have to add the aliases or cmd won't work.
}

module.exports.run = async (client, message, args) => {
  const dev = new MessageEmbed()
  .setTitle("Staff for Vev")
  .setDescription(`<:Developer:749793987430318172> **Developers**\njs#0002`)
  .setFooter('List of our amazing Staff!')
  .setTimestamp()
  message.channel.send(dev)
}
