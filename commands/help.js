const { Client, Collection, MessageEmbed }= require('discord.js');

module.exports.config = {
  name: "help",
  aliases: ["cmds"] // Have to add the aliases or cmd won't work.
}

module.exports.run = async (client, message, args) => {
  const h = new MessageEmbed()
  .setTitle("Help")
  .addField("Fun / Info Commands", "!userinfo, serverinfo")
  .addField("Utility Commands", "!ping, !aliases, !staff")
  .addField("Ticket Commands", "!new/ticket, close(DISABLED)")
  .setColor("BLUE")
  .setFooter("Made by js#0002")
  .setThumbnail(message.guild.iconURL())
  message.channel.send(":ballot_box_with_check: Sent you a list with all the commands!")
  message.author.send(h)
}
