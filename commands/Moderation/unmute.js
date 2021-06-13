module.exports = {
    name: 'unmute',
    aliases: ['unshut'],
    description: "Unmutes a member!",
    execute(message, args, cmd, client, Discord){
        if(message.member.roles.cache.has('749595218864766997')){
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.id === '701732612330487828');
            let mutedRole = message.guild.roles.cache.find(role => role.id === '745635204814864424');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(mutedRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted!`);
        } else {
            message.channel.send('I cant find the user!');
        }
        } else {
            message.channel.send('You dont have permission to do this action!')
        }
    }
}