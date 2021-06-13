const Discord = require('discord.js');
const { execute } = require('../Others/play');

module.exports = {
    name: 'say',
    aliases: ['announcement'],
    async execute(message, args, cmd, client, Discord){

        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(':x: You dont have permissions to do this command!');

        let textChannel = message.mentions.channels.first()
        if(!args[0]) return message.channels.send('Provide a channel to send the message in!');
        if(!args[1]) return message.channels.send('Provide a message to say!');
        if(!message.guild.channels.cache.has(textChannel.id)) return;
        message.delete()

        msg = args.slice(1).join(" ");
        textChannel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`Announcement From: ${message.author.tag}`)
        .setDescription(msg)
        .setAuthor('Announcement')
        )
    }
}