const { Client, Intents, Collection, MessageEmbed, WebhookClient } = require('discord.js')
global.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INTEGRATIONS ]});
require('events').EventEmitter.prototype._maxListeners = 200;
const { token } = require('./script.json')
const { webhookid, webhooktoken } = require('./config.json')




client.on('message', async message => {
    if (message.content.startsWith("!setstato")) {
            var args = message.content.split(/\s+/);
            var testo;
            testo = args.slice(1).join(" ");
            if (!testo) return message.channel.send("Inserirsci idle/dnd/invisible/online")
        if (!message.member.roles.cache.has("946073760467935332")) return message.channel.send("eh no")
        if(testo != "idle" && testo != "dnd" && testo != "invisible" && testo != "online") return message.channel.send("Inserirsci idle/dnd/invisible/online")
     await client.user.setStatus(testo)
      message.channel.send(`Stato impostato su ${testo}`)
   }
})
client.login(`${token}`)


const fs = require("fs")
client.commands = new Collection()

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on("ready", () => {
    client.guilds.cache.forEach(guild => {
        client.commands.forEach(command => {
            guild.commands.create(command.data)
            console.log(command)
        })
    })
})

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    command.execute(interaction)
})



let eventsFolders = fs.readdirSync(`./events`) 
for (let folder of eventsFolders) {
    let eventsFiles = fs.readdirSync(`./events/${folder}`)

    for (let file of eventsFiles) {
        if (file.endsWith(`.js`)) {
            let event = require(`./events/${folder}/${file}`) 
            client.on(event.name, (...args) => event.execute(...args)) 
        }
        else {
            let eventsFiles2 = fs.readdirSync(`./events/${folder}/${file}`)
            for (let file2 of eventsFiles2) {
                let event = require(`./events/${folder}/${file}/${file2}`) 
                client.on(event.name, (...args) => event.execute(...args)) 
            }
        }
    }
}
client.on('guildCreate', guild => {
    let server = new MessageEmbed()
    .setTitle("New Server")
    .setThumbnail("https://i.imgur.com/7qRyhpo.png")
    .addField("Name:",  `${guild.name}` )
    .addField("ID", `${guild.id}`)
    .addField("Member" ,  `${guild.members.cache.size} `)
    .setColor("GREEN")
        client.channels.cache.get("957341750744186882").send({embeds: [server]})

})

client.on('guildDelete', guild => {
    let server = new MessageEmbed()
    .setTitle("Bye Bye")
    .addField("Name:" ,  `${guild.name}` )
    .addField("ID", `${guild.id}`)
    .addField("Member" , `${guild.members.cache.size}`)
    .setThumbnail("https://i.imgur.com/7qRyhpo.png")
    .setColor("RED")
        client.channels.cache.get("957341750744186882").send({embeds: [server]})

})

