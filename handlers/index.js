
const { glob } = require("glob");
const { promisify } = require("util");
const fs = require("fs");
const globPromise = promisify(glob);
const Discord = require("discord.js");
const client = require("../index.js");

module.exports = async (client, Discord) => {
    // Commands
    // const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    // commandFiles.map((value) => {
    //     const file = require(value);
    //     const splitted = value.split("/");
    //     const directory = splitted[splitted.length - 2];

    //     if (file.name) {
    //         const properties = { directory, ...file };
    //         client.commands.set(file.name, properties, file);
    //     }
    // });

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



    // Events
    // const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    // eventFiles.map((value) => require(value));
    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

        for(const file of event_files){
            const event = require(`../events/${dirs}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client))
        }
    }

    ['events'].forEach(e => load_dir(e));


    //Slash Commands
    const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);

    const arrayOfSlashCommands = [];

    slashCommands.map((value) => {
        const file = require(value);
        if(!file?.name) return;

        client.slashCommands.set(file.name, file);
        arrayOfSlashCommands.push(file)
    });

    // client.on('ready', async () => {
    //     await client.guilds.cache.get("701675821751992331").set(arrayOfSlashCommands);
    // })
};;
