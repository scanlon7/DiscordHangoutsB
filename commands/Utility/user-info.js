const Discord = require('discord.js');
const client = new Discord.Client();
//const disbut = require('discord-buttons')(client);

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {
    name:'userinfo',
    aliases: ['whois', 'infouser'],
    cooldown: 5,
    description: 'Shows user info of the person!',
    async execute(message, args, cmd, client, Discord) {
        const { guild, channel } = message

        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)

        const userFlags = await user.flags.toArray();

        //let UsrInf = new disbut.MessageButton()
        //.setLabel('User Info (UPCOMING)')
        //.setStyle('green')
        //.setID('usrinf')

        //let MemberInfo = new disbut.MessageButton()
        //.setLabel('Member Info (UPCOMING)')
        //.setStyle('red')
        //.setID('meminf')


    

                const MemInfE = new Discord.MessageEmbed()
                .setAuthor(`User info for ${user.username}`,//Member info for ${user.username}`,
                user.displayAvatarURL()
                )
                .setColor('RANDOM')
                .addFields(
                    {
                        name: '**❯ User Tag**',
                        value: user.tag,
                    },
                    {
                        name: '**❯ User ID**',
                        value: user.id,
                    },
                    {
                        name: '**❯ Is BOT**',
                        value: user.bot,
                    },
                    {
                        name: '**❯ Flags:**',
                        value: await userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None',
                    },
                    {
                        name: '**❯ Status:**',
                        value: user.presence.status,
                    },
                    {
                        name: '**❯ Game:**',
                        value: user.presence.game || 'Not playing a game.',
                    },
                    {
                        name: '**❯ Joined Discord**',
                        value: new Date(user.createdTimestamp).toLocaleDateString(),
                    },
                    {
                       name: '**❯ Nickname**',
                       value: member.nickname || 'None',
                    },
                    {
                       name: '**❯ Joined Server**',
                       value: new Date(member.joinedTimestamp).toLocaleDateString(),
                    },
                    {
                       name: '**❯ Role Count**',
                       value: member.roles.cache.size - 1,
                    }
                )


                const UsrInfE = new Discord.MessageEmbed()
                .setAuthor(`User info for ${user.username}`,
                 user.displayAvatarURL()
                 )
                .setColor('RANDOM')
                .addFields(
                    {
                        name: '**❯ User Tag**',
                        value: user.tag,
                    },
                    {
                        name: '**❯ User ID**',
                        value: user.id,
                    },
                    {
                        name: '**❯ Is BOT**',
                        value: user.bot,
                    },
                    {
                        name: '**❯ Flags:**',
                        value: await userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None',
                    },
                    {
                        name: '**❯ Status:**',
                        value: user.presence.status,
                    },
                    {
                        name: '**❯ Game:**',
                        value: user.presence.game || 'Not playing a game.',
                    },
                    {
                        name: '**❯ Joined Discord**',
                        value: new Date(user.createdTimestamp).toLocaleDateString(),
                    }
                )

    try {
        const choose = await message.channel.send('What Do You wanna see?', {
          //buttons: [
            //UsrInf, MemberInfo
          //],
          embed: MemInfE
        });

        
    } catch (err) {
        console.log(err)
    }





    }
}
//client.on('clickButton', async (button) => {
  //button.think(true)
  //if (button.id === 'meminf') {
                
      //await button.channel.send({embed: MemInfE});
  //}
  //if (button.id === 'usrinf') {

                
      //await button.channel.send({embed: UsrInfE});
  //}
//button.defer()
//});
