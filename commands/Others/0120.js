const { Client } = require('discord.io');
const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();

const code = 0120;


module.exports = {
    name: '???',
    description: "To unlock something!",
    async execute(message, args, cmd, client, Discord){
        if (message.deletable) message.delete();
        if(args.slice(/ +/).length !== 1) return message.channel.send('||Did you think u get it that easy ???. ***You need to find the code, each of the code is in one of the commands.***||\n||***Good Luck finding the code =)***||').then(m => m.delete(3000));
        if(isNaN(args[0])) return message.reply('||You need to put a number||').then(m => m.delete(3000));
        if(!isNaN(code)) {
            message.channel.send('||You got the code right!, now go search the secrets...||').then(m => m.delete(3000));
            message.member.roles.add('786877556833910785').catch(console.error);
        } else {
            message.channel.send('||Wrong code!||').then(m => m.delete(3000));
        }
    }
}
