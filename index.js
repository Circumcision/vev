//Made by js#0003(Curcit)
const { Client, Collection, MessageEmbed }= require('discord.js');
const client = new Client();
const prefix = '!'
const { token } = require('./config.json')
client.login(token);
// ready event
client.on("ready", () => {
  setInterval(function() {
    client.user.setActivity("test")
    client.user.setActivity("Ok")
  },100)
  console.log("Hi")
})

// fs module for command handler.
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
// cmd handler
fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    return console.log("I couldnt find commands!")
  }

  jsfile.forEach((file, i) => {
    let pullcmd = require(`./commands/${file}`)
    client.commands.set(pullcmd.config.name, pullcmd)
    pullcmd.config.aliases.forEach(alias => {
      client.aliases.set(alias, pullcmd.config.name)
    })

  });

})

// message event
client.on("message", async message => {
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)
  if(!message.content.startsWith(prefix)) return;
  let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
  if(commandfile) commandfile.run(client, message, args)
})
