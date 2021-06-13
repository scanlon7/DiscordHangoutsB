const guildNumber = new Map();
const guildAttempts = new Map();

function guildNumberMap(message) {
    const guildId = message.guild.id;

    var number = Math.floor(Math.random() * 10) + 1;
    // If there is no command running map for the guild, create one
    if (!guildNumber.get(guildId)) {
        guildNumber.set(guildId, number);
    }
}

function guildAttemptsMap(message) {
    const guildId = message.guild.id;
    // If there is no command running map for the guild, create one
    if (!guildAttempts.get(guildId)) {
        guildAttempts.set(guildId, { attempts: 1 });
    } else {
        guildAttempts.get(guildId).attempts++;
    }
}

module.exports = {
    name: "guessthenumber",
    aliases: ['gtn'],
    cooldown: 0,
    description: {
        usage: 'gtn <gtn number>',
        content: "Try and guess the number!",
    },
    async execute(message, args, cmd, client, Discord, profileData) {
        const { member, channel, guild } = message;

        const provideaguess = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**❌ Please provide a guess!**`)

        const pickinganumber = new Discord.MessageEmbed()
            .setColor('#33F304')
            .setDescription('**Picking a number between 1 and 10**\nTo guess please use `9gtn <number>`!')



        await guildNumberMap(message);
        await guildAttemptsMap(message);

        let guess = args[0];
        if (!guess && guildAttempts.get(guild.id).attempts === 1) {
            return channel.send(pickinganumber)
        } else if (!guess) {
            return channel.send(provideaguess);
        }

        if (+guess === guildNumber.get(guild.id)) {
            let attempts = guildAttempts.get(guild.id);

            const guessedthenumber = new Discord.MessageEmbed()
                .setColor('#33F304')
                .setDescription(`✅ Perfect, <@${member.id}>the number was ${guildNumber.get(guild.id)}, it only took you ${attempts.attempts} attempts!`)

            channel.send(guessedthenumber);
            guildNumber.delete(guild.id);
            guildAttempts.delete(guild.id);
            

            return;
        } else if (+ guess < guildNumber.get(guild.id)) {
            return message.reply(`${guess} Is too low!`).then(guessTooLow => {
                setTimeout(() => guessTooLow.delete(), 10000)
            })
        } else if (+guess > guildNumber.get(guild.id)) {
            return message.reply(`${guess} Is too high!`).then(guessTooHigh => {
                setTimeout(() => guessTooHigh.delete(), 10000)
            })
        } else {
            return message.reply("Invalid number please try again").then(invalidNumber => {
                setTimeout(() => invalidNumber.delete(), 10000)
            })
        }
    },
};