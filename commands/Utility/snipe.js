const { MessageEmbed } = require('discord.js');
const moment = require("moment");
const client = require("../../index.js");

module.exports = {
    name: 'snipe',
    aliases: ['sniper'],
    cooldown: 5,
    description: "Get sniped.",
    async execute (message, args, cmd, client, Discord) {
        const snipes = client.snipes.get(message.channel.id);
        if (!snipes) return message.channel.send({ content: "There's nothing to snipe here!" });

        const snipe = +args[0] - 1 || 0;
        const target = snipes[snipe];
        if (!target) return message.channel.send({ content: `There's only ${snipes.length} message here!` });

        const { msg, time, image } = target;

        const snipeEmbed = new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setColor("RANDOM")
        .setImage(image)
        .setDescription(msg.content)
        .setFooter(`${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}`)

        message.channel.send({ embeds: [snipeEmbed] });
    }
}