const Discord = require('discord.js');
const client = new Discord.Collection();

module.exports = {
    name: 'ticket',
    aliases: ['support'],
    description: 'Make a support/ticket channel/system',
    async execute(message, args, cmd, client, Discord){
        const modRole = message.guild.roles.cache.find(role => role.name === '749595218864766997');
        const channel = await message.guild.channels.create(`🎟️|${message.author.tag}`);
        await channel.setParent('808563081704767518');

        channel.updateOverwrite(message.guild.id, {
            'SEND_MESSAGES': false,
            'VIEW_CHANNEL': false
        });

        channel.updateOverwrite(message.author, {
            'SEND_MESSAGES': true,
            'VIEW_CHANNEL': true
        });

        // channel.updateOverwrite(modRole, {
        //     'SEND_MESSAGES': true,
        //     'VIEW_CHANNEL': true
        // });

        const reactionMessage = await channel.send(modRole, new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Welcome to support!')
        .setDescription(`Dear, <@${message.author.id}>\nThank you for contacting our support team! We will reach to you ASAP!`)
        .setFooter('© 2020-2021 Hangouts, all rights reserved.')
        );

        message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('We will reach you ASAP!')
        .setDescription(`<#${channel.id}>`)
        .setFooter('© 2020-2021 Hangouts, all rights reserved.')
        ).then(messagedelete => {
            setTimeout(() => messagedelete.delete(), 36000);
            setTimeout(() => message.delete(), 36000);
        });

        try {
            await reactionMessage.react("🔒");
            await reactionMessage.react("🔓");
            await reactionMessage.react("⛔");
        } catch (err) {
            channel.send("Error sending emojis!");
            throw err;
        }

        const collector = reactionMessage.createReactionCollector(
        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("MANAGE_CHANNELS"),
        { dispose: true }
        );

        collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name){
                case "🔒":
                    channel.send('Channel has been locked!')
                    channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
                    break;
                case "🔓":
                    channel.send('Channel has been unlocked!')
                    channel.updateOverwrite(message.author, { SEND_MESSAGES: true });
                    break;
                case "⛔":
                    channel.send('Deleting this channel in 1 minutes!');
                    setTimeout(() => channel.delete(), 60000);
                    break;
            }
        });

    }
}