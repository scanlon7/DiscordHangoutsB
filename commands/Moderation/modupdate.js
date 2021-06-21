const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'modupdatelog',
    aliases: ['modupdate', 'modlog'],
    cooldown: 60,
    description: "Update Log of the bot (FOR MODERATOR)",
    execute(message, args, cmd, client, Discord){
        const update = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('1.5.0 UPDATE FOR MODERATOR IS HERE!')
        .setDescription(`1.Revamped BAN command.\n2.Revamped KICK command\n3.???\nMore soon`)
        .setFooter(`${client.user.displayAvatarURL()}| Requested by: ${message.author.tag}`)
        
        .addField('NOTE', `Because "Discord JS" v13 is following the new Discord API (v8), some of the features may missing or the bot didnt respond at all!. Hope you all understand!\n\n\n   ~AHumanThatUKnow#5275`)
      
        message.channel.send({ embed: update });
        
    }
};