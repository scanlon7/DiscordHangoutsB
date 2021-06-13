// @ts-check // Can be removed, used to check typings and valid actions
const quick = require('quick.db');

module.exports = {
  name: 'afkset',
  aliases: ['afk'],
  description: 'Set your afk status',
  execute(message, args, cmd, client, discord) {
    let Reason = args.splice(0).join(' ')
    if(!Reason){
      Reason = 'AFK'
    }
    // check if the client can change nicknames
    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('Status change failed because i don\'t have \`MANAGE NICKNAME\` permissions!');
    // Add/update the member in the database
    setTimeout(() => 
    (quick.set(`${message.author.id}_${message.guild.id}_afk`, {
      username: message.member.displayName.replace('[AFK]', ''), // replace the AFK part of the nickname of the member is afk and uses the command again
      active: true, // Set to true so it will be passed up by the if check in the message event
      date: Date.now(), // set the data this was done
      reason: Reason
    })), 60000)


    message.member
      .setNickname(`[AFK] ${message.member.displayName.replace('[AFK]', '')}`) // Make sure on the name inplacation to replace the AFk part of the name
      // reply to say status set
      .then(() => {
        return message.channel.send(`✅${message.author}, your **AFK** has been set to: **${Reason}**`);
      })
      // catch an error and then remove the member form the database and send a message
      .catch(_e => {
        quick.delete(`${message.author.id}_${message.guild.id}_afk`);
        return message.channel.send('❌Failed to set your status.');
      });
  },
};