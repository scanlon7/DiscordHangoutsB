const { MessageEmbed } = require('discord.js');
const child = require('child_process');


module.exports = {
    name: 'terminal',
    aliases: ['shell'],
    description: 'wait... Terminal on a command !?!?',
    usage: '',
    async execute(message, args, cmd, client, Discord) {
        if(message.author.id !== '383401432948277249') return message.channel.send(
            new MessageEmbed()
            .setTitle("Special List")
            .setColor('RED')
            .setDescription("❌ | You do not have permission to use this command (Owner only)"))

        const command = args.join(" ");

        if(!command) return message.reply("Please specify a command to execute!");

        child.exec(command, (err, res) => {
            if(err) return console.log(err);
            message.channel.send(res.slice(0, 2000), { code: 'js' })
        })
    }
}
