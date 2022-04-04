const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    data: {
        name: "ping",
        description: "pong!"
    },
    execute(interaction) {
        let embed = new MessageEmbed()
            .setTitle("Pong!")
            .setDescription(`My Ping Is ${client.ws.ping} ms`)
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}