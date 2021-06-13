const Discord = require('discord.js');
const client = new Discord.Collection();
const validateFlag = f => f === 'true' || f === 'false' || f === 'null';
const IGNORED = new Set([
    '782169890139930644',
    '701731578161922099',
    '769724006022512682',
    '701694366875516959',
    '704938431486230568',
    '701762705844994159',
    '703496754485526609',
    '701686897453432832',
    '701797164061556797',
    '703481758632378433',
    '755592524126617710',
    '779513997161529354',
    '781788599137730611',
    '743250567715094669',
    '701678788760567860',
    '777389508450058260',
    '703496754485526609',
    '779708798578720810',
    '743250567715094669',
    '797121720330616862',
    '701676029575430176',
    '783225800002240523',
    '702085725386178610',
    '783225472125370408',
    '701690858780622858',
    '757077108064387103',
    '776811173063426059',
    '806453465291161600',
    '794198029342867526',
    '808525376238125077',
    '806022558386225183',
    '806022358333653013',
    '810132863177195591',
    '810059927288021002',
    '820232769539145728',
    '827847040343080970',
    '827844911213707304',
    '808563081704767518', //Ticket Category
    ''
]);

module.exports = {
    name: 'globallock',
    aliases: ['serverlock', 'globallockdown', 'glock'],
    description: "Lock all channel for specific roles!",
    async execute(message, args, cmd, client, Discord) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(new Discord.MessageEmbed()
                .setDescription('You Cannot do that, Missing Permissions')
                .setColor('RED'))
            return;
        }
        const channel = client.channels.cache.find(c => c.id === '797114195966689320', '794236489768763412', '757077894211174410', '819413723247804416', '783248568936955934', '779709007739879455', '706825066050224128', '783248186508312596');
        const unlock = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`Server Unlock 🔓`)
            .setDescription(`Channel has been unlocked! 🔓`)
            .setFooter(`Server Unlocked by: ${message.author.tag}`);
        const lock = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`Server Lockdown 🔒`)
            .setDescription(`This channel has been Locked 🔒.\nInformation can be found in **<#704938431486230568> OR <#797114195966689320>**\nNOTE: You are NOT MUTED.`)
            .setFooter(`Server Locked by: ${message.author.tag}`);
        if (args.slice(/ +/).length !== 2)
            return message.channel.send('9glock <ROLE_ID> TRUE | FALSE | NULL');
        let [roleId, flag] = args.slice(/ +/)
        if (!isNaN(roleId) && validateFlag(flag.toLowerCase())) {
            if (message.guild.roles.cache.has(roleId)) {
                flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);
                const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
                channels.forEach(channel => {
                    if (!IGNORED.has(channel.id)) {
                        channel.updateOverwrite(roleId, {
                            SEND_MESSAGES: !flag
                        }).then(g => {
                            console.log(`Updating ${g.name} to ${flag} (Channel ID:${g.id})`)
                            if (flag) {
                                channel.send(lock)
                                if (!g.name.endsWith('🔒')) {
                                    g.edit({ name: g.name + ' |🔒' });
                                }
                            } else {
                                channel.send(unlock)
                                g.edit({ name: g.name.replace(/\s*🔒/, '') || g.name.replace(/\s*|🔒/, '') });
                            }
                        })
                            .catch(err => console.log(err));
                    } else {
                        console.log(`Skipping ${channel.name} (${channel.id})`);
                    }
                });
            }
            else {
                message.channel.send('Invalid Role');
            }
            return
        }
    }

}
