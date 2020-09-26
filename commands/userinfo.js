const { Client, Collection, MessageEmbed }= require('discord.js');

module.exports.config = {
  name: "userinfo",
  aliases: [] // Have to add the aliases or cmd won't work.
}

module.exports.run = async (client, message, args) => {
  let embed = new MessageEmbed()
  var color
  var bot

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  let target = message.mentions.users.first() || message.author;
  let status = member.user.presence.status;
  if(status === "online"){
    status = `Online!`
    color = "GREEN"
  } else if(status === "idle") {
    status = "Currently Idle"
    color = "YELLOW"
  } else if(status === "offline"){
    status = "Offline"
    color = "BLACK"
  } else if(status === "dnd"){
    status = "Do Not Disturb"
    color = "RED"
  } else {
    status = "Unknown"
    color = "ORANGE"
  }


  if(member.user.bot) {
    bot =  "Yes"
  } else {
    bot = "No"
  }

  embed.setAuthor(`Info for ${member.user.username}`)
  embed.setThumbnail(member.user.displayAvatarURL())
  embed.setColor(color)
  embed.setDescription(`• **Full Username:** ${member.user.tag}\n • **ID:** ${member.user.id}\n• **Nickname:** ${member.nickname !== null ? `${member.nickname}` : `Cannot fetch user nickname.`}\n• **Are they a bot?:** ${bot}`)
  embed.addField(`\n**Status**`, `• **Status:** ${status}\n• **Activity:** ${member.user.presence.game ? `🎮 ${member.user.precense.game.name}` : "Not playing anything."}`)
  embed.addField(`\n**Permissions**`, `• **Roles:** ${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles Found"}\n`)
  embed.setFooter(`User joined discord at: ${member.user.createdAt}`)
  message.channel.send(embed)
}
