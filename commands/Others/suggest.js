const Discord = require('discord.js');
module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion'],
    cooldown: 3600,
    description: 'creates a suggestion!',
    execute(message, args, cmd, client, discord){
        const channel = client.channels.cache.find(c => c.name === 'suggestions');
        if(!args[0]) return message.channel.send('What do you want to suggest??');
        if(!channel) return message.channel.send('suggestions channel does not exist!');

        let messageArgs = args.join(' ');
        const embed = new discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${message.author.tag}'s Suggestions`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs)
        .setFooter('Hangouts suggestion command');

        channel.send(embed).then((msg) =>{
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err)=>{
            throw err;
        });
    }
}