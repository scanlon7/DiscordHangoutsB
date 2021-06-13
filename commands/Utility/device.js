const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'devices',
    aliases: ['device'],
    description: 'Check\'s for the user device!',
    usage: '[user]',
    async execute(message, args, cmd, client, Discord) {
        const user = message.mentions.users.last() || message.author;
        const devices = user.presence?.clientStatus || {};

        const description = () => {
            if (devices > 1) {
                const entries = Object.entries(devices).map((value) => value[0]);
                return `Devices: ${entries}`
            } else {
                const entries = Object.entries(devices).map((value, index) => `${index + 1}). ${value[0][0].toUpperCase()}${value[0].slice(1)}`).join("\n");
                return `Devices:\n${entries}`
            }
        };
        const embed = new MessageEmbed()
            .setAuthor(`${user.tag}'s Device(s)`, user.displayAvatarURL())
            .setDescription(description())
            .setColor('RANDOM')
            .setFooter(`Requested by: ${message.author.tag}`)
        message.channel.send(embed)
    }
}
