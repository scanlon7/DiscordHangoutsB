const Discord = require('discord.js');
const profileModel = require(`../../models/profileSchema`);
module.exports = {
    name: 'balance',
    aliases: ['bal'],
    cooldown: 5,
    description: "Economy: To check users balance",
    async execute(message, args, cmd, client, Discord, profileData){
        const balEmbed = new Discord.MessageEmbed().setColor("RANDOM");

        if (!message.mentions.users.size) {
            balEmbed.setAuthor(`${message.author.username}'s Balance`, message.author.displayAvatarURL({ dynamic: true })).setDescription(
                `Wallet: **${profileData.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**
Bank: **${profileData.bank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`
            );

            return message.channel.send(balEmbed);
        }

        try {
            let target = message.mentions.users.first();
            let targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) {
                return message.channel.send(`I can't find **${target.username}** data!`);
            }
            balEmbed.setAuthor(`${target.username}'s Balance`, target.displayAvatarURL({ dynamic: true })).setDescription(
                `Wallet: **${targetData.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**
Bank: **${targetData.bank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`
            );
            return message.channel.send(balEmbed);
        } catch (err) {
            console.log(err);
        }
    }
}