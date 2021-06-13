//const DevList = new Set(
  //["383401432948277249"], 
  //)["723491267144581201"]
//);


module.exports = {
    name: 'reload',
    category: 'Dev',
    aliases: ['restart', 'rl'],
    cooldown: 0,
    usage: `<category> <command>`,
    description: 'Reloads a command',
    special: true,
    execute: async (message, args, cmd, client, Discord, user, text, prefixnt) => {
        //if(message.member.id != DevList) return message.channel.send(`Sorry only **The Devs** can run this command 😔`);

        if(!args[0]) return message.channel.send('You need to include the category name!\n(CASE SENSITIVE!!)');
        if(!args[1]) return message.channel.send('You need to include the name of the command!\n(Including the command file type!');

        let command = args[1].toLowerCase();
        let categories = args[0]
        try {
            delete require.cache[require.resolve(`../${categories}/${command}`)]//Change the path depending on how are your folders located.
            client.commands.delete(command);
            const pull = require(`../${categories}/${command}`);
            client.commands.set(command, pull);

            return message.channel.send(`**${command}** has been reloaded succesfully!`);
        } catch (error) {
            return message.channel.send(`There was an error trying to reload **${command}**: \`${error.message}\``);
        }
    // } else {
    //     return message.channel.send(`Sorry only **The Devs or Special People** can run this command 😔`);
    // }
    }
}
