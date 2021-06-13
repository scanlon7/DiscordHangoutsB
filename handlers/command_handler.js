const fs = require('fs');
// const Discord = require("discord.js");
// const client = new Discord.Client();
// client.commands = new Discord.Collection();
module.exports = (client, Discord) => {
    //We let the bot read through the 'commands' folder and return an array including all category folders
    const categories = fs.readdirSync('./commands/');
    
    for (const category of categories) {
        const commandFiles = fs.readdirSync(`./commands/${category}`).filter(File => File.endsWith('.js'));
        //We now enter every sub-folder one by one and filter the files to include .js only, readdirSync() returns an array including the items/files in that directory 
    

    //We create an intended for loop (notice how the for loops are inside eachother)
    for (const file of commandFiles) {
        const command = require(`../commands/${category}/${file}`);
        //We grab that command-file and it's values, and we push it into the commands collection
        
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }}

    if(!categories) {

    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    for(const file of command_files){
        const command = require(`../commands/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }}
}
