const { Client, Collection, MessageEmbed }= require('discord.js');

module.exports.config = {
  name: "serverinfo",
  aliases: ["si"] // Have to add the aliases or cmd won't work.
}

module.exports.run = async (client, message, args) => {
  message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ")
  roles = message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **,** ")
  chans = message.guild.channels.cache.filter(c => c.id !== message.guild.id).map(chans => `\`${chans.name}\``).join(" **,** ")
  if(message.guild.member.length === 1024) members = `Failed to show due to discord's char limit insde the embed!`
  if(message.guild.roles.length === 1024) roles = `Failed to show due to discord's char limit insde the embed!`
  if(message.guild.channels.length === 1024) chans = `Failed to show due to discord's char limit insde the embed!`
  let creationDate = message.guild.createdAt;
  let join = message.member.joinedAt;

  let embed = new MessageEmbed()
  .setColor("BLUE")
  .setThumbnail(message.guild.iconURL())
  .setAuthor(`Info for ${message.guild.name}`)
  .setDescription(`• **Guild Name:** ${message.guild.name}\n • **Guild ID:** ${message.guild.id}\n • **Region:** ${message.guild.region}\n • **Verification Level:** ${message.guild.verificationLevel}`)
  .addField(`\n• **Members**`, `${message.guild.memberCount} Members`)
  .addField(`\n• **Roles**`, `Showing ${message.guild.roles.cache.size} Roles:\n${roles}`)
  .addField(`\n• **Join and Creation**`, `**Guild Created At:** ${creationDate}\n **You joined at:** ${join}`)
  message.channel.send(embed)
}
