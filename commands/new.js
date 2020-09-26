const { Client, Collection, MessageEmbed }= require('discord.js');

module.exports.config = {
  name: "new",
  aliases: ["ticket"] // Have to add the aliases or cmd won't work.
}

module.exports.run = async (client, message, args) => {
  const reason = message.content.split(" ").slice(1).join(" ");


  let SupportCategory = message.guild.channels.cache.find(category => category.name === "Tickets");

  if(message.guild.me.hasPermission('MANAGE_CHANNELS') && !SupportCategory){
    SupportCategory = await message.guild.channels.create('Tickets', {
      type: 'category',
    })
  }

  if(!message.guild.me.hasPermission('MANAGE_CHANNELS') && !SupportCategory){
    message.channel.send(" I don't have the ``MANAGE_CHANNELS`` permission! Tell a Administrator to give me permission and try again!\n\n**Error:** Missing Permission.")
  }
  if(!message.guild.roles.cache.find(role=>role.name === "Support Team")) {
    await (message.guild.roles.create({
      name: 'Support Team',
      color: 'BLUE',
    }));
  };

  let supportrole = message.guild.roles.cache.find(role=>role.name === "Support Team")
  if(!supportrole){
    return message.channel.send("There is no Support Team Role! Create a role named **Support Team** and try again.")
  }
  if(!reason){
    return message.channel.send("To prevent spamming, please specify a reason to create the ticket.\n\nExample: `!new {subject}`")

  }
  const channelName = `ticket-${message.author.id}`


  message.guild.channels.create(channelName, { parent: SupportCategory.id, topic: `Ticket Owner: ${message.author.id}` }).then(c => {
    const sr = message.guild.roles.cache.get(supportrole)
    const everyone = message.guild.roles.cache.get(role => role.name === "@everyone")
    c.updateOverwrite(sr, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
    });

    c.updateOverwrite(everyone, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
    });
    c.updateOverwrite(message.author, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
    });

    let cticket = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("New Support Ticket")
    .setDescription(`<@${message.author.id}> Your support ticket is <#${c.id}>`)
    .setTimestamp()
    message.channel.send(cticket)
    let greet = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("New Support Ticket")
    .setDescription(`<@${message.author.id}> Thanks for making a ticket! Our support team will contact you shortly.\nIssue: ${reason}`)
    .setTimestamp()
    c.send(greet)
  }).catch(console.error)
}
