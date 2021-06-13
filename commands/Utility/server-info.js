const { MessageEmbed } = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    aliases: ['serverinf'],
    description: 'Show\'s the Server Information!',
    usage: '',
    async execute(message, args, cmd, client, Discord) {
        const guild = message.guild;

        const embed = new MessageEmbed()
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .setColor('RANDOM')
            .setFooter(`Requested by: ${message.author.tag}`)
            .addField('General Info', [
                `ID: ${guild.id}`,
                `Name: ${guild.name}`,
                `Server Owner: ${guild.owner}`,
            ])
            .addField('Additional Info', [
                `Created: ${moment(guild.createdTimestamp).format('LT')} ${moment(guild.createdTimestamp).format('LL')} ${moment(guild.createdTimestamp).fromNow() }`,
                `Region: ${guild.region}`,
                `Boost Tier: ${guild.premiumTier ? `Tier ${guild.premiumTier}` : "None"}`,
                `Boost Count: ${guild.premiumSubscriptionCount || "0"}`,
            ])
            .addField('Counts', [
                `Role: ${guild.roles.cache.size} Roles`,
                `Channels: ${guild.channels.cache.filter((ch) => ch.type === "text" || ch.type === "voice").size} Total (Text: ${guild.channels.cache.filter(
                    (ch) => ch.type === "text"
                ).size}, Voice: ${guild.channels.cache.filter(
                    (ch) => ch.type === "voice"
                ).size})`,
                `Emojis: ${guild.emojis.cache.size} (Regular: ${guild.emojis.cache.filter(
                    (e) => !e.animated
                ).size}, Animated: ${guild.emojis.cache.filter(
                    (e) => e.animated
                ).size})`,
            ]);
        message.channel.send(embed)
    }
}
