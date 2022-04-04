const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "8ball",
    data: {
        name: "8ball",
        description: "8ball command",
        options: [
            {
                name: "question",
                description: "question for 8ball",
                type: "STRING",
                required: true
            }
        ]
    },
    execute(interaction){
        let question = interaction.options.getString('question')
       
        let embed1 = new MessageEmbed()
        .setTitle("8Ball Command")
        .setDescription(`Question: \n  **${question}** \n Reply: **Yes**`)
        .setColor("RANDOM")
        let embed2 = new MessageEmbed()
        .setTitle("8Ball Command")
        .setDescription(`Question: \n ** ${question}** \n Reply: **No**`)
        .setColor("RANDOM")
        let embed3 = new MessageEmbed()
        .setTitle("8Ball Command")
        .setDescription(`Question: \n **${question}** \n   Reply: **likely**`)
        .setColor("RANDOM")
        var messaggi = [embed1, embed2, embed3]
        interaction.reply({ embeds: [messaggi[Math.floor(Math.random() * messaggi.length)]] });
    }
}