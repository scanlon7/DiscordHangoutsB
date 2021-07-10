const Discord = require('discord.js');
const client = require("../../index.js")
module.exports = {
    name: 'ping',
    description: "Check the bot pings!",
    async execute(message, args, cmd, client, Discord){

        const WebSocket = client.ws.ping;

        const msg = await message.channel.send({ embeds: [new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`🏓Pinging....`)
        .addField(`🤖 Bot Latency`, `🏓Pinging....`, true)
        .addField(`⚙️ API Latency`, `🏓Pinging....`, true)
        .setFooter(`Ping Requested by: ${message.author.tag}`)
        ]})

        msg.edit({ embeds: [new Discord.MessageEmbed()
        .setColor(WebSocket < 150 ? "GREEN" : WebSocket < 500 ? "YELLOW" : "RED")
        .setAuthor(`🏓 Pong!`)
        .addField(`🤖 Bot Latency`, `${Math.floor(msg.createdAt - message.createdAt)}ms`, true)
        .addField(`⚙️ API Latency`, `${WebSocket}ms`, true)
        .addField(`Shard`, `Shard #${client.shard.ids}, **Total Shards: ${client.shard.count}**`, true)
        .setFooter(`Ping Requested by: ${message.author.tag}`)
        ]});

    }
}
        // .setDescription(`🤖 Bot Latency is ${Math.floor(msg.createdAt - message.createdAt)}ms\n⚙️ API Latency is ${client.ws.ping}ms`)//\n||9??? 1||`);)
