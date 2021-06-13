const profileModel = require(`../../models/profileSchema`);
module.exports = {
    name: 'coinflip',
    aliases:['cf', 'flip', 'coinf'],
    cooldown: 5,
    async execute(message, args, client, Discord, profileData){
        const memberCoins = profileData.coins;
        const choices = ["heads", "tails"];
        const bet = args[1];
        let coinSide;

        switch (args[0]) {
            case "tails":
                coinSide = "tails";
            break;
            case "heads":
                coinSide = "heads";
            break;
            default:
                return message.channel.send("**Usage:** `9coinflip <tails/heads> <bet amount>`");
        }
        if (bet % 1 != 0 || bet <= 0) return message.channel.send(`${message.author}, bet amount must be a number!`);
        if (bet > 250000) return message.channel.send(`${message.author}, the current max bet is 250,000`);

        if (bet > memberCoins) return message.channel.send(`${message.author}, you dont have ${bet} to spend!`);

        const output = choices[Math.floor(Math.random() * choices.length)];

        if(output == coinSide){
            const response = await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: bet,
                    },
                }
            );
            return message.channel.send(
                `**${message.author.username}**, it was \`${output}\`. You **won ${bet.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** coins!`
            );
        } else {
            const response = await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: -bet,
                    },
                }
            );
            return message.channel.send(
                `**${message.author.username}**, it was \`${output}\`. You **lost ${bet.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** coins!`
            );
        }
    }
}