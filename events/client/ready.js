const Discord = require('discord.js');
const { Client } = require('discord.io');

const client = new Discord.Client();

require('dotenv').config();
client.login(process.env.token); 

const { loadLanguages } = require('../../language')
const levels = require ('../../level.js')





module.exports = () =>{
    console.log(`HANGOUTS bot is online!`)
    
    loadLanguages(client)
    levels (client)

    function randomStatus() {
        //let status = ["YouTube", "Discord", "Twitch", "for the next update", "never gonna give you up", "You", "Someone", "This server", "who", ]
        let status = ["the NEW 1.5.0 UPDATE (9log)"]
        //let status = ["on a update ???(WORKING)"]
        //let status = ["9updatelog"]
        let rstatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[rstatus], {type: "WATCHING"});
    }; setInterval(randomStatus, 30000) // time in ms. 10000 = 10s
}
