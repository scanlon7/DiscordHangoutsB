const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});
const validateFlag = f => f === 'true' || f === 'false' || f === 'null';

module.exports = {
    name: 'channellock',
    aliases: ['lock', 'lockchannel'],
    description: "Lock channel for specific roles!",
    async execute(message, args, cmd, client, Discord){
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You do not have permissions to use this command!') // Check if the user who execute the command have the right permission

        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('I do not have permissions to execute this command!') //Check if the bot doesn't have permission

        msg = args.slice(2).join(" ");
        const unlock = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Channel Unlock 🔓`)
        .setDescription(`This Channel has been unlocked! 🔓`)
        .setFooter(`Channel Unlocked by: ${message.author.tag}`);
        const lock = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Channel Lock 🔒`)
        .setDescription(`This channel has been Locked 🔒.\nReason: ${msg}`)
        .setFooter(`Channel Locked by: ${message.author.tag}`);
        if(!args[1])
          return message.channel.send('9lock <ROLE_ID> TRUE | FALSE | NULL <Reason>');
        let [ roleId, flag ] = args.slice(/ +/)
        if(!isNaN(roleId) && validateFlag(flag.toLowerCase())) {
            if(message.guild.roles.cache.has(roleId)) {
                flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);
                const channels = message.channel
                channels.updateOverwrite(roleId, {
                    SEND_MESSAGES: !flag
                }).then(g => {
                    console.log(`Updating ${g.name} to ${flag} (Channel ID:${g.id})`)
                    if(flag) {
                        message.channel.send(lock)
                        if(!g.name.endsWith('🔒')) {
                            g.edit({ name: g.name + '|🔒'});
                        }
                    } else {
                        message.channel.send(unlock)
                        g.edit({ name: g.name.replace(/\s*🔒/, '') || g.name.replace(/\s*|🔒/, '')});
                    }
                })
            }
            else {
                message.channel.send('Invalid Role');
            }
            
        message.delete()
        }
    }
    
}