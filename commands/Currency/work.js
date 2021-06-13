const language = require('../../language')
const profileModel = require(`../../models/profileSchema`);
module.exports = {
    name: 'work',
    cooldown: 3600,
    description: "Economy: Work for coins!",
    async execute(message, args, cmd, client, profileData){
        const { guild } = message
        const randomNumber = Math.floor(Math.random(100) * 10000) + 10000 ;
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
        return message.channel.send(`${message.author.username}, ${language(guild, 'WORK_GET')} **${randomNumber}**!`);
    },
};
