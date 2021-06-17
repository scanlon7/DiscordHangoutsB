const Discord = require('discord.js');
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES']
});
const { version, versionModerator } = require('../../package.json')

module.exports = {
  name: 'botinfo',
  aliases: ['info', 'information'],
  description: "Show's the bot information!",
  async execute(message, args, cmd, client, Discord){
    let totalMembers = 0

    for (const guild of client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size
    }

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `Information about the ${client.user.username} Bot`,
        client.user.displayAvatarURL()
      )
      .addFields(
        {
          name: 'Bot tag',
          value: client.user.tag,
        },
        {
          name: 'Creation Date',
          value: new Date(client.user.createdTimestamp).toLocaleDateString(),
        },
        {
          name: 'Version',
          value: version,
        },
        {
          name: 'Version (for Moderators)',
          value: versionModerator,
        },
        {
          name: "Server's command prefix",
          value: `\`9\` **(Per-Server Prefix soon)**`,
        },
        {
          name: 'Time since last restart',
          value: `${process.uptime().toFixed(2)}s`,
        },
        {
          name: 'Server count',
          value: client.guilds.cache.size,
        },
        {
          name: 'Total members',
          value: totalMembers,
        }
      )

    try {
       message.channel.send(embed)
    } catch (err) {
       console.log(err);
    }
    
  }
}
