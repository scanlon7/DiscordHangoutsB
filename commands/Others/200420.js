const { Client } = require('discord.io');
const Discord = require('discord.js');

require('dotenv').config();
const client = new Discord.Client();

const code = 200420;
//info.js = 2
//Free from executing = 0
//Free from executing = 0
//avatar.js = 4
//ping.js = 2
//Free from executing = 0
module.exports = {
    name: '???',
    aliases: ['200420'],
    description: "To unlock something!",
    execute(message, args, cmd, client, Discord){
        args.slice(/ +/).length === 2
        args.join(' ');
        if(args.slice(/ +/).length !== 1){
            message.channel.send('||Did you think u get it that easy ???. ***You need to find the code, theres 6 code in total. (HINT: Each of the code is in one of the commands.***)||\n||***Good Luck finding the code =)*** (3 of the code are 0 btw)||').then((message1) => {
                setTimeout(() => {
                message1.delete();
                }, 10000)
            });
        }

        if(code) {
            message.channel.send('||You got the code right!, now go search the secrets... SHARING THE CODE ARE NOT ALLOWED!!!!||').then((message3) => {
                setTimeout(() => {
                message3.delete();
                }, 5000)
            });
            message.member.roles.add('810740251739422720').catch(console.error);
        }

        if(isNaN){
            message.channel.send('||You need to put a number||').then((message2) => {
            setTimeout(() => {
                message2.delete();
            }, 3000)
            });
        }

        if(!code) {
            message.channel.send('||Wrong code!||').then((message4) => {
                setTimeout(() => {
                message4.delete();
            }, 5000)
            })
        }
        
        message.delete();
    }
}
