const Discord = require('discord.js');
const fetch = require('node-fetch')//npm i node-fetch if you have it then dont do it :\
                 
module.exports = {
    name: 'iphonex',
    aliases: ['iphone'],
    premium: true,
    cooldown: 15,
    category: 'Fun',
    description: 'Iphone X User Profile',
    usage: 'iphonex [user]',
    async execute(message, args, cmd, client, Discord) {
        message.channel.startTyping();
        let mention = message.mentions.members.first() || message.member.user;

        let m = await message.channel.send({ content: "***Please wait... Adding Image...**" });

        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=iphonex&url=${mention.user.displayAvatarURL({ size: 1024 })}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "iphonex-syze.png");
            await message.channel.send({ file: attachment });
            message.channel.stopTyping();
            m.delete();
        } catch (e) {
            m.edit({ content: "⚠ Error, Try Again!" });
            return message.channel.stopTyping();
        }
    }
};