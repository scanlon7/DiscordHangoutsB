require("dotenv").config();
const PREFIX = process.env.prefix;
const ms = require("ms");
const moment = require("moment")
const profileModel = require('../../models/profileSchema.js');
const cooldown = require('../../models/cooldownSchema')
const specialOnlySchema = require('../../models/specialOnlySchema.js');

//var quick = require('quick.db');
module.exports = async(Discord, client, message) => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    let profileData;
    try{
        profileData = await profileModel.findOne({ userID: message.author.id });
        if(!profileData){
            let profile = await profileModel.create({
                userID:  message.author.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0,
            });
            profile.save();
        }
    }catch(err){
        console.log(err);
    }

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (!command) return //message.channel.send("This command doesn't exist!");

    if (command.special && !(await specialOnlySchema.findOne({ User: message.author.id })))
       return message.channel.send({ content: "You need to have to be IN the Special List to gain this Features" });




       try {
       async function commandExecute(){
           if(command){
               command.execute(message, args, cmd, client, Discord, profileData);
           };
       }
       if(command.cooldown) {
           const current_time = Date.now();
           const cooldown_amount = (command.cooldown) * 1000
       
           cooldown.findOne({ userId: message.author.id, cmd: command.name }, async(err, data) => {
               if(data) {
                   const expiration_time = data.time + cooldown_amount;
               
                   if(current_time < expiration_time) {
                       const time_left = (expiration_time -  current_time) / 1000
                                       
                       if(time_left.toFixed(1) >= 3600){
                           let hour = (time_left.toFixed(1) / 3600).toLocaleString();
                           if(hour.includes('.')) hour = (hour.split('.'))[0]
                           return message.channel.send({ content: `Please wait ${hour.toLocaleString()} more hours before using \`${command.name}\`!` })
                       }
                       if(time_left.toFixed(1) >= 60) {
                           let minute = (time_left.toFixed(1) / 60).toLowerCase();
                           if(minute.includes('.')) minute = (minute.split('.'))[0]
                           return message.channel.send({ content: `Please wait ${minute} more minutes before using \`${command.name}\`!` })
                       }
                       let seconds = (time_left.toFixed(1)).toLocaleString();
                       if(seconds.includes('.')) seconds = (seconds.split('.'))[0]
                       return message.channel.send({ content: `Please wait ${seconds} more seconds before using \`${command.name}\`!` })
                       } else {
                           await cooldown.findOneAndUpdate({ userId: message.author.id, cmd: command.name }, { time: current_time });
                           commandExecute();
                       }
               } else {
                   commandExecute();
                   new cooldown({
                       userId: message.author.id,
                       cmd: command.name,
                       time: current_time,
                       cooldown: command.cooldown,
                   }).save();
               }
           })
       } else {
           commandExecute();
       };
    } catch (error) {
        console.log(err)
        return message.channel.send({ content: `There was an error trying to execute **${command.name}**: \`${error.message}\`` });
    }





    // if(!cooldowns.has(command.name)){
    //     cooldowns.set(command.name, new Discord.Collection());
    // }
    // if (cooldowns.has(command.name)){
    //     cooldowns.get(command.name, new Discord.Collection());
    // }

    // const current_time = Date.now();
    // const time_stamps = cooldowns.get(command.name);
    // const cooldown_amount = (command.cooldown) * 1000;

    // if(time_stamps.has(message.author.id)){
    //     const cooldowm_expire = time_stamps.get(message.author.id) + cooldown_amount;

    //     if(current_time < cooldowm_expire){
    //         const time_left = (cooldowm_expire - current_time) / 1000;

    //         return message.reply(`Please wait ${time_left.toFixed(1)} more secconds before using ***${command.name}*** again!`);
    //     }
    // }

    // time_stamps.set(message.author.id, current_time);
    // setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    




    // AFK 
    if (!message.guild || message.author.bot) return;

    const AFKMention = message.mentions.members.first();
    if (AFKMention) {
        const data = quick.get(`${message.author.id}_${message.guild.id}_afk`)
        if(data) {
            const { date, reason } = data;
            const timeAgo = moment (date) .fromNow ()

            message.reply(`${AFKMention} is currently AFK (${timeAgo})\nReason: ${reason}`)
        }
    }
})
}
module.exports = (Discord, Client, message, args) => {
    if (message.content.toLowerCase() === 'hello') {
        message.channel.send({ content: 'Hello there!' });
    } else if (message.content.toLowerCase() === 'hi') {
        message.channel.send('Hello there!');
    } else if (message.content.toLowerCase() === 'hallo') {
        message.channel.send('Hello there!');
    } else if (message.content.toLowerCase() === 'allo') {
        message.channel.send('Hello there!');
    }else if (message.content.toLowerCase() === 'good morning') {
        message.channel.send(`Good morning, ${message.author}!`);
    } else if (message.content.toLowerCase() === 'good night') {
        message.channel.send(`Good night, ${message.author}!`);
    } else if (message.content.toLowerCase() === 'bye') {
        message.channel.send('Goodbye.');
    }
}
