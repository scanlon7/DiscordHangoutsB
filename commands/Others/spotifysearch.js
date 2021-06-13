const Discord = require('discord.js');

module.exports = {
    name: 'spotifysearch',
    aliases: ['searchspotify', 'spotify'],
    async execute(message, args, cmd, client, Discord){
        let msglink = args.join('%20')

        let msg = args.join(' ')

        if(!args[0]) return message.channel.send(':x: Please give me a song name to search!');
        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`[${msg}](https://open.spotify.com/search/${msglink})`)

        try{
            message.channel.send(embed)
        } catch (error) {
            return message.channel.send(`There was an error trying to execute this command: \`${error.message}\``);
        }
    }
}