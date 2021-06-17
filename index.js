const Discord = require('discord.js');
const fs = require('fs')
require('dotenv').config()
const moment = require('moment');
const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});

const quick = require('quick.db');
const ms = require('ms');



client.snipes = [];
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const mongoose = require("mongoose");

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
    console.log('Connected to Database!')
}).catch((err) => {
    console.log(err)
});



require('discord-buttons')(client)










client.on('message', async (message) =>{
    if (message.author.bot) return;


    if (message.author.bot || message.content.toLowerCase() === "`afk") return;

    // see if the user of this message is afk and has set there status as afk in the messaged server
    const status = quick.get(`${message.author.id}_${message.guild.id}_afk`);
    // if the statue is afk then take them out of the afk status
    if (status && status.active && message.guild.me.hasPermission('MANAGE_NICKNAMES' || 'ADMINISTRATOR')) {
      // restart the data if this users afk status without removing them form the database
      quick.set(`${message.author.id}_${message.guild.id}_afk`, {
        username: message.author.username,
        active: false,
        date: null,
      });
      // try changing the members nickname
       await message.member
        .setNickname(status.username)
        // Once the members nickname has been changed back then send a message with the time they were afk
        .then(() => {
          message.reply(`You were afk for ${ms(Date.now() - (status.date || 0))}`);
        })
        // catch an error and then remove the member form the database and send a message
        .catch(_e => {
            console.log(_e),
          quick.delete(`${message.author.id}_${message.guild.id}_afk`);
        });
    }
    


    const AFKMention = message.mentions.members.first();
    if (AFKMention) {
        const data = quick.get(`${message.author.id}_${message.guild.id}_afk`)
        if(data) {
            const { date, reason } = data;
            const timeAgo = moment(date).fromNow()

            message.reply(`${AFKMention} is currently AFK (${timeAgo})\nReason: ${reason}`)
        }
    }


})

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
   const command = require(`./commands/${file}`);

   client.commands.set(command.name, command);
}


const PREFIX = process.env.prefix;

// client.on('messageDelete', function(message, channel) {
//     if(message.author.client) return;
//     client.snipes.set(message.channel.id, {
//         author: message.author.tag,
//         content: message.content,
//         member: message.member,
//         // time: message.createdAt,
//         image: message.attachments.first() ? message.attachments.first().proxyURL : null
//     })
// });


client.on('message', async message=>{

    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    
    const args = message.content.slice(PREFIX.length).split(/ +/);
    
    // if (command === 'snipe'){
    //     if(message.author.client) return;
    //     client.snipes.set(message.channel.id, {
    //         author: message.author.tag,
    //         content: message.content,
    //         member: message.member,
    //         time: message.createdAt,
    //         image: message.attachments.first() ? message.attachments.first().proxyURL : null
    //     })
    //     const msg = client.snipes.get(message.channel.id, {})
    //     const embed = new Discord.MessageEmbed()
    //     .setAuthor(msg.member.user.displayAvatarURL())
    //     .setDescription(msg.content)
    //     .setTimestamp(msg.time);
    //     message.channel.send(embed);

    // }

});

client.login(process.env.token);


//client.on('ready', () => { 

    //client.api.applications(client.user.id).guilds('701675821751992331').commands.post({
      //data: {
          //name: "Hello",
          //description: "Say hello world!"
        //}
    //});

    //client.api.applications(client.user.id).guilds('701675821751992331').commands.post({
      //data: {
        //name: "Echo",
        //description: "Echos your messages as embed!",

        //options: [
            //{
                //name: "content",
                //description: "Content of the embed",
                //type: 3,
                //required: true
            //}
        //]
      //}
    //});

    //client.api.applications(client.user.id).guilds('701675821751992331').commands.post({
      //data: {
        //name: "ping",
        //description: "Call the API Latency!",
          //}
    //});

    //client.ws.on('INTERACTION_CREATE', async interaction => {
        //const command = interaction.data.name.toLowerCase();
        //const args = interaction.data.options;

        //if(command === 'hello'){
            //client.api.interactions(interaction.id, interaction.token).callback.post({
                //data: {
                    //type: 4,
                    //data: {
                        //content: "Hello world!\nthis is test for slash command that discord added recently!"
                    //}
                //}
            //});
        //}

        //if(command === 'echo') {
            //const discord = require('discord.js');
            //const description = args.find(arg => arg.name.toLowerCase() == "content").value;
            //const embed = new Discord.MessageEmbed()
                //.setTitle("Echo command")
                //.setDescription(description)
                //.setAuthor(interaction.member.user.username);
            
            //client.api.interactions(interaction.id, interaction.token).callback.post({
                //data: {
                    //type: 4,
                    //data: await createAPIMessage(interaction, embed)
                //}
            //});
        //}

        //if(command === 'ping'){
            //client.api.interactions(interaction.id, interaction.token).callback.post({
                //data: {
                    //type: 4,
                    //data: {
                        //content: `API Latency is ${client.ws.ping}ms!\n***for full command please use 9ping***`

                    //}
                //}
            //});
        //}
    //});
//});

//async function createAPIMessage(interaction, content) {
    //const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        //.resolveData()
        //.resolveFiles();

    //return {...apiMessage.data, files: apiMessage.files};
//}


    //console.log(`${client.user.tag} is online!`)

//    function randomStatus() {
//        //let status = ["YouTube", "Discord", "Twitch", "for the next update", "me rick rolling someone", "You", "Someone", "This server", " /???", "who", ]
//        //let status = ["the NEW 1.3.0b update AND PREFIX! (use 9updatelog)"]
//        let status = ["on a update ???(WORKING)"]
//        //let status = ["9updatelog"]
//        let rstatus = Math.floor(Math.random() * status.length);
//        client.user.setActivity(status[rstatus], {type: "STREAMING"});
//    }; setInterval(randomStatus, 30000) // time in ms. 10000 = 10s
//});

//client.on('guildMemberAdd', guildMember =>{
//    let welcomeRole = guildMember.guild.roles.cache.find(role => role.id === '701732612330487828');

//    guildMember.roles.add(welcomeRole);
//    guildMember.guild.channels.cache.get('701731578161922099').send(`Welcome <@${guildMember.user.id}> to ${Discord.Guild}! Make sure to read our server <#701694366875516959>!`);
//})
//client.on('guildMemberRemove', guildMember =>{
//    guildMember.guild.channels.cache.get('701731578161922099').send(`Goodbye <@${guildMember.user.id}>, We hope to see you again!`)
//})

//client.on('message', async message=>{

//    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

//    const args = message.content.slice(PREFIX.length).split(/ +/);
//    const command = args.shift().toLowerCase();

//    if (command === 'ping'){
//        const msg = await message.channel.send('🏓Pinging....')

//        msg.edit(`🏓 Pong!\nBot Latency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${client.ws.ping}ms`);
//    } else if (command === 'commands'){
//        message.channel.send('comming soon :eyes:');
//    } else if (command === '???'){
//        message.channel.send('??? ||(You unlocked something, but what?)||');
//        message.member.roles.add('786877556833910785').catch(console.error);
//    } else if (command === 'info'){
//        client.commands.get('info').execute(message, args);
//    } else if (command === 'updatelog'){
//        client.commands.get('updatelog').execute(message, args);
//    } else if (command === 'lock'){
//        client.commands.get('lock').execute(message, args);
//    } else if (command === 'mute'){
//        client.commands.get('mute').execute(message, args);
//    } else if (command === 'unmute'){
//        client.commands.get('unmute').execute(message, args);
//    } else if (command === 'clear'){
//        client.commands.get('clear').execute(message, args);
//    } else if (command === 'play'){
//        client.commands.get('play').execute(message, args);
//    } else if (command === 'leave'){
//        client.commands.get('leave').execute(message, args);
//   }

//});
