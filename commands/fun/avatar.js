const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "avatar",
    data: {
        name: "avatar",
        description: "get a user avatar",
        options: [
            {
                name: "user",
                description: "get avatar of the specific user",
                type: "USER",
                required: false
            }
        ]
    },
    execute(interaction) {
        let utente = interaction.options.getUser("user") || interaction.user;
        let member = interaction.guild.members.cache.get(utente.id);

        var embed = new MessageEmbed()
            .setTitle("Avatar - " + (utente.username))
            .setDescription(`Avatar Of This User
Other formats: **[.gif](${member.displayAvatarURL({ dynamic: true, size: 1024, format: `gif` })})** | **[.jpeg](${member.displayAvatarURL({ dynamic: false, size: 1024, format: `jpeg` })})** | **[.webp](${member.displayAvatarURL({ dynamic: false, size: 1024, format: `webp` })})** | **[.png](${member.displayAvatarURL({ dynamic: false, size: 1024, format: `png` })})**`)
            .setImage(utente.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 1024
            }))

        interaction.reply({ embeds: [embed] })
    }
}