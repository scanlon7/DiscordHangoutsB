module.exports = {
    name: 'simleave',
    description: 'Simulates the leave event!',
    execute(message, args, cmd, client, Discord) {
           if (!message.member.hasPermission("ADMINISTRATOR")){
               message.channel.send(new Discord.MessageEmbed() 
               .setDescription('You Cannot do that, Missing Permissions') 
               .setColor('RED'))
           }
        client.emit('guildMemberLeave', message.member)
    }
}
