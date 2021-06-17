const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});

let emojiID = ["802859067264466975", "799977886421221446", "721307177431728158"]

function emoji (id) {
    return client.emojis.get(id).toString();
}
const picker = Math.floor(Math.random() * emojiID.length)

module.exports = {
    name: 'emoji',
    description: 'Pick an random emoji',
    execute(message, args, cmd, client, Discord) {
           message.channel.send(picker)
    }
} 
