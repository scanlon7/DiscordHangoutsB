const mongo = require('../../mongo')
const { languages } = require('../../lang.json');
const languageSchema = require('../../models/languageSchema');
const { setLanguage } = require('../../language')

module.exports = {
    name: 'setlanguage',
    aliases: ['setlang'],
    async execute(message, args, cmd, client, Discord) {
        const { guild } = message

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(new Discord.MessageEmbed()
                .setDescription('You Cannot do that, Missing Permissions')
                .setColor('RED'))
            return;
        }

        const targetLanguage = args[0].toLowerCase()
        if (!languages.includes(targetLanguage)) return message.reply('That language is not supported.');

        setLanguage(guild, targetLanguage)

        await mongo().then(async (mongoose) => {
            try {
                await languageSchema.findOneAndUpdate({
                    _id: guild.id,
                }, {
                    _id: guild.id,
                    language: targetLanguage
                }, {
                    upsert: true
                })

                message.reply(`Language has been set to \`${targetLanguage}\``)
            } catch (error) {
                console.log(err)
            }
        })
    }
}