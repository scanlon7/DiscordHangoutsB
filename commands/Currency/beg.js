const language = require('../../language')
const profileModel = require(`../../models/profileSchema`);
module.exports = {
    name: 'beg',
    cooldown: 45,
    description: "Economy: Beg for coins!",
    async execute(message, args, cmd, client, profileData){
        const { guild } = message
        const chance = Math.random();
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        if (chance > 0.17) {
            const response = await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: randomNumber,
                    },
                }
            );
            return message.channel.send(`${message.author.username}, ${language(guild, 'BEG_RECEIVED')} **${randomNumber}**!`);
        } else {
            return message.channel.send(`${message.author.username}, ${language(guild, 'BEG_FAILED')}.`);
        }
    },
};
