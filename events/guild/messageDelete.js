const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});

module.exports = async (message, args, cmd, client, Discord) => {
 client.snipes.push({
     channel: message.channel,
     content: message.content,
     author: message.author,
     image: message.attachments.first() ? message.attachments.first().proxyURL : null,
     date: new Date()
 })
}
