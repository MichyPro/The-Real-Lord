const { webhookid, webhooktoken } = require('../../config.json')
const { MessageEmbed, WebhookClient } = require('discord.js')
module.exports = {
    name: "ready",
    execute(ready){
    client.user.setActivity("Hi i'am Official Bot of Lord!", { type: 'WATCHING' }); 
        
            
            client.user.setStatus('dnd')
            let embed = new MessageEmbed()
            .setTitle("Ready")
            .setColor("GREEN")
            .setDescription("Il Bot: `The Real Lord` ID: `948653376835567696` è online")
            let wc = new WebhookClient({
                id: webhookid,
                token: webhooktoken
            })
            wc.send({allowedMentions: { parse: [] },embeds: [embed]})
        
    }
}