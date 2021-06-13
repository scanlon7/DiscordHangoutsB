const levelingSystem = require('../../level');
const profileModel = require('../../models/levelingSystemSchema')
module.exports = {
    name: 'rank',
    aliases: ['level'],
    cooldown: 5,
    description: "Show up your rank!",
    async execute(message, args, cmd, client, Discord, profileData) {
        const { guild } = message
        const user = await profileModel.findOne({ userID: message.author.id, serverID: guild.id, xp: message.author.id, level: message.author.id });
        if(user.level < 1) return message.channel.send('You don\'t have any level! go send some messages!')
        message.channel.send(`${message.author}, you're at **Level ${user.level}** with **${user.xp} XP**!`)
    }
}

// const Discord = require('discord.js');
// const client = new Discord.Client();
// const levels = require('discord-xp');
// require('dotenv').config()
// levels.setURL(process.env.MONGODB_SRV);

// client.on("message", async message => {
//     if(!message.guild) return;
//     if(message.author.bot) return;

//     const randomXp = Math.floor(Math.random() * 44) + 1;
//     const hasLeveledUp = await levels.appendXp(message.author.id, message.guild.id, randomXp);
//     if(hasLeveledUp) {
//         const user = await levels.fetch(message.author.id, message.guild.id);
//         message.channel.send(`⚡ [LEVELUP] Congrats ${user.author}, you're now at **level ${user.level}**!`)
//     }
// });

// module.exports = {
//     name: 'rank',
//     aliases: ['level'],
//     cooldown: 5,
//     description: "Show up your rank!",
//     async execute(message, args, cmd, client, Discord) {
//         const user = await levels.fetch(message.author.id, message.guild.id);
//         if(user.length < 1) return message.channel.send('You didnt have a level! go send some messages!')
//         message.channel.send(`${user.author}, you're at **level ${user.level}**!`)
//     }
// }

// module.exports = {
//     name: 'leaderboard',
//     aliases: ['lb'],
//     cooldown: 10,
//     description: "Show the top 10 of xp syatem!",
//     async execute(message, args, cmd, client, Discord) {
//         const rawLeaderboard = await levels.fetchLeaderboard(message.guild.id, 10);
//         if(rawLeaderboard.length < 1) return message.channel.send('❌ no one is on leaderboard yet!');
//         const leaderboard = levels.computeLeaderboard(client, rawLeaderboard);
//         const lb = new Discord.MessageEmbed()
//         .setAuthor('TOP 10 HIGHEST RANK')
//         .setDescription(leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`))
//         .setTimestamp()
//         .setFooter(`${message.guild.name}'s Leaderboard.`);

//         message.channel.send(`${lb.join("\n\n")}`);
//     }
// }
