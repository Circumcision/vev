const { Client, Collection, MessageEmbed }= require('discord.js');

module.exports.config = {
  name: "support",
  aliases: [] // Have to add the aliases or cmd won't work.
}

module.exports.run = async (client, message, args) => {
  const D = new MessageEmbed()

  const Msg = message.content.split(" ").slice(1).join(" ");
  D.setTitle("Suggestion / Bug Report")
  D.setDescription(Msg);
  message.channel.send("Your report has been sent!")

  client.channels.cache.get("748216828857417799").send(D)
}
