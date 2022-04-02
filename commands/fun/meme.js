const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const https = require(`https`)

module.exports = {
    name: "meme",
    data: {
        name: "meme",
        description: "get a meme from reddit"
    },
    execute(interaction){
        interaction.deferReply()
        let url = 'https://www.reddit.com/r/memes/hot/.json?limit=100'
            https.get(url, (result) => {
                let body = ''
                result.on('data', (chunk) => {
                    body += chunk
                })
                result.on('end', () => {
                    let response = JSON.parse(body);
                    let index = response.data.children[Math.floor(Math.random() * 99) + 1].data
                    let embed = new MessageEmbed()
                        .setTitle(index.title)
                        .setImage(index.url_overridden_by_dest)
                        .setFooter({text: `👍🏻${index.ups}`})
                        .setColor(`RANDOM`)
                        interaction.editReply({embeds: [embed]})         
                })

            })
    }
}