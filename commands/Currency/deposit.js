const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "deposit",
  aliases: ["dep"],
  description: "Economy: Deposit coins into your bank!",
  async execute(message, args, cmd, client, discord, profileData) {
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");
    try {
      if (amount > profileData.coins) return message.channel.send(`You don't have that amount of coins to deposit`);
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: -amount,
            bank: amount,
          },
        }
      );

      return message.channel.send(`${message.author} **${amount} deposited**, current bank balance is **${profileData.bank}**`);
    } catch (err) {
      console.log(err);
    }
  },
};