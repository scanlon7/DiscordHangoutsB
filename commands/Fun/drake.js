const Discord = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: 'drake',
    description: 'drake meme maker',
    usage: '<text1>, <text2>',
    async execute(message, args, cmd, client, Discord) {

        const split = args.join(" ").split(",")
        const user = split[0];
        const user2 = split[1]
        const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/drake/?text1=${user}&text2=${user2}`, {

        });
        let Image = await res.buffer();
        const drakememe = new Discord.MessageAttachment(Image);
        message.channel.send({ content: 'If you getting "undefined" on Text 2, be sure to use coma (",") after text 1!', embeds: [drakememe] });

    }
}