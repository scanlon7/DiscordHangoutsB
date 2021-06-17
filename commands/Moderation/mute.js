const ms = require('ms')
const Discord = require('discord.js')
const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});

module.exports = {
    name: 'mute',
    aliases: ['shut'],
    description: "Mutes a member!",
    execute(message, args, cmd, client, Discord) {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send(new Discord.MessageEmbed().setDescription('You Cannot do that, Missing Permissions').setColor('RED'))
            return;
        }
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.id === '701732612330487828');
            let mutedRole = message.guild.roles.cache.find(role => role.id === '745635204814864424');

            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(mutedRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted!`);
                return
            }

            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(mutedRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}!`);

            setTimeout(function () {
                memberTarget.roles.remove(mutedRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been unmuted!`);
            }, ms(args[1]));
        } else {
            message.channel.send('I cant find the user!');
        }
    }
}