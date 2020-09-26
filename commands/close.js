const { Client, Collection, MessageEmbed }= require('discord.js');

module.exports.config = {
  name: "close",
  aliases: ["end"] // Have to add the aliases or cmd won't work.
}

module.exports.run = async (client, message, args) => {
  message.channel.send("This module is disabled!")
}
