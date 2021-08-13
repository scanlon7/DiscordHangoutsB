const Discord = require('discord.js');
const client = require("../../index.js");
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

        const EmbedInfo = new Discord.MessageEmbed()
        .setAuthor(`User info for ${user.username}`,
        user.displayAvatarURL()
        )
        .setColor('RANDOM')
        .addFields(
            {
                name: '**❯ User Tag**',
                value: `${user.tag}`,
            },
            {
                name: '**❯ User ID**',
                value: `${user.id}`,
            },
            {
                name: '**❯ Is BOT**',
                value: `${user.bot}`,
            },
            {
                name: '**❯ Flags:**',
                value: `${await userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
            },
            {
                name: '**❯ Status:**',
                value: `${user.presence.status}`,
            },
            {
                name: '**❯ Game:**',
                value: `${user.presence.game}` || 'Not playing a game.',
            },
            {
                name: '**❯ Joined Discord**',
                value: `${new Date(user.createdTimestamp).toLocaleDateString()}`,
            },
            {
                name: '**❯ Nickname**',
                value: `${member.nickname}` || 'None',
            },
            {
                name: '**❯ Joined Server**',
                value: `${new Date(member.joinedTimestamp).toLocaleDateString()}`,
            },
            {
                name: '**❯ Role Count**',
               value: `${member.roles.cache.size - 1}`,
            }
        )
        try {
            message.reply({ embeds: [EmbedInfo] });
        } catch (err) {
            console.log(err)
        }
    }
}