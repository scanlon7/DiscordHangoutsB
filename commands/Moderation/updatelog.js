const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'updatelog',
    aliases: ['update', 'log'],
    cooldown: 60,
    description: "Update Log of the bot",
    execute(message, args, cmd, client, Discord){
        const update = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('1.5.5 UPDATE IS HERE!')
        .setDescription(`1.Added FUN command\n2.HELP command is finnaly here!\n3.More UTILITY command\n3.More Revamp!, i guess.\n4.Bot cooldown now saved and didn't reset when reboot\n5.Some command now support Language Feature\nAnd Others!`)
        .setFooter(`${client.user.displayAvatarURL()}| Requested by: ${message.author.tag}`)
        
        .addField('NOTE', `Because "Discord JS" v13 is following the new Discord API (v8), some of the features may missing or the bot didnt respond at all!. Hope you all understand!\n\n\n   ~AHumanThatUKnow#5275`)
      
        message.channel.send({ embed: update });
 
    }
};