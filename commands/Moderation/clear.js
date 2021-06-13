module.exports = {
    name: 'clear',
    aliases: ['purge', 'cl'],
    description: "Clears amout of messages!",
    async execute(message, args, cmd, client, Discord){
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command!') // Check if the user who execute the command have the right permission

        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I do not have permissions to execute this command!') //Check if the bot doesn't have permission 

        if(!args[0]) return message.reply("Enter an amout of messages you wanna clear!");
        if(isNaN(args[0])) return message.reply("Cannot clear any messages, please enter a real number");
        if(args[0] < 1) return message.reply("You must delete at least 1 message!");
        message.delete();

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
        message.channel.bulkDelete(messages);    
        message.channel.send(`I have deleted ${args[0]} messages!`).then(msgDelete => {
                setTimeout(() => msgDelete.delete(), 10000)
            })
            throw err;
        })
    }
};