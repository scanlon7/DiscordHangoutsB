const Discord = require('discord.js');
const { Client } = require('discord.io');
const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});


module.exports = (Discord, Client, message, args) => {
    if (message.content.toLowerCase().includes() === 'hello') {
        message.channel.send('Hello there!');
    } else if (message.content.toLowerCase().includes() === 'hi') {
        message.channel.send('Hello there!');
    } else if (message.content.toLowerCase().includes() === 'hallo') {
        message.channel.send('Hello there!');
    } else if (message.content.toLowerCase().includes() === 'allo') {
        message.channel.send('Hello there!');
    }else if (message.content.toLowerCase().includes() === 'good morning') {
        message.channel.send(`Good morning, ${message.author}!`);
    } else if (message.content.toLowerCase().includes() === 'good night') {
        message.channel.send(`Good night, ${message.author}!`);
    } else if (message.content.toLowerCase().includes() === 'bye') {
        message.channel.send('Goodbye.');
    }


}
