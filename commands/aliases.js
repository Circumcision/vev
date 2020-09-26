const { Client, Collection, MessageEmbed }= require('discord.js');
//List of aliases
module.exports.config = {
  name: "aliases",
  aliases: [] // Have to add the aliases or cmd won't work.
}

module.exports.run = async (client, message, args) => {
  const als = new MessageEmbed()
  .setTitle("List of aliases")
  .setDescription("**!close:**\n!end\n\n**!new:**\n!ticket\n\n**!help:**\n!cmds\n\n**!ping:**\n!test\n\n**!developers**\n!devs, staff")
  .setFooter("List of command aliases")
  .setColor("BLUE")
  message.channel.send(als)
}
