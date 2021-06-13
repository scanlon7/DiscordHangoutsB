const profileModel = require(`../../models/profileSchema`);
module.exports = {
    name: 'give',
    aliases: ['share'],
    cooldown: 10,
    description: "Economy: Give your coins to another person!",
    async execute(message, args, cmd, client, profileData){
        const target = message.mentions.users.first();
        let targetData = await profileModel.findOne({ userID: target.id });
        let giverMoney = await profileModel.findOne({ userID: message.author.id });
        const moneyGiven = args[1];
        if(!args[0]) return message.channel.send('Who are you giving to?');
        if(!args[1]) return message.channel.send('Forgot to put how much money??');
//        if(target, message.author) return message.channel.send("You cant give yourself money.");
        if (moneyGiven % 1 != 0 || moneyGiven <= 0) return message.channel.send("Give amount must be a number");
        try {
            if (moneyGiven > giverMoney.coins) return message.channel.send(`You only has ${giverMoney.coins} to share!`);
      
            const receiver = await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                },
                {
                    $inc: {
                        coins: moneyGiven,
                    },
                }
            );

            const giver = await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: -moneyGiven,
                    },
                }
            );
            return message.channel.send(`${message.author}, You gave ${target.username} **${moneyGiven}**, now you have ${giverMoney.coins - moneyGiven} and they've got **${targetData.coins + moneyGiven}**!`);
        } catch (err) {
            console.log(err);
        }
    },
};