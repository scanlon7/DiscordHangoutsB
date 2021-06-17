const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});
module.exports = {
    name: 'activity',
    aliases: ['status'],
    execute(message, args, cmd, client, Discord){
        //here you tell the bot to choose the kind of activity
        if (args[0] === "playing"){
            types = 0
        } else if (args[0] === "streaming"){
            types = 1
        } else if (args[0] === "listening"){
            types = 2
        } else if (args[0] === "watching"){
            types = 3
        } else if (args[0] === "competing"){
            types = 5
        } else if (args[0] === "reset"){
            client.user.setActivity(`Discord`, {type:"LISTENING"})
            return message.channel.send('Status changed succesfully!');
        } else {
            return message.channel.send("Invalid activity type\n **Usage**: `9status <listening/streaming/watching> <content>`");
        }
        args.shift()
        content = args.join(' ')
        client.user.serPresence({
            activity: {
                name: content,
                type: types
            }
        })
        message.channel.send(`**${message.author.username}** DONE :D`)
    }
}