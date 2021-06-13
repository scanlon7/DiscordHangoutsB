module.exports = {
    name: 'simjoin',
    description: 'Simulates the join event!',
    execute(message, args, cmd, client, Discord) {
           if (!message.member.hasPermission("ADMINISTRATOR")){
               message.channel.send(new Discord.MessageEmbed() 
               .setDescription('You Cannot do that, Missing Permissions') 
               .setColor('RED'))
           }
        client.emit('guildMemberAdd', message.member)
    }
} 
