const profileModel = require("../../models/profileSchema");

module.exports = {
  name: "removefromdatabase",
  aliases: ["removefromdb", "removefdb"],
  description: "Removes player coins",
  async execute(message, args, cmd, client, discord, profileData) {
    if (!args.length) return message.channel.send({ content: "You need to mention a player to remove their coins" });
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send({ content: "That user does not exist"});

    if (amount % 1 != 0 || amount <= 0) return message.channel.send({ content: "Remove amount must be a whole number" });

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send({ content: `This user doens't exist in the db` });

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: -amount,
          },
        }
      );

      return message.channel.send({ content: `${amount} of coins has been removed from ${target}!` });
    } catch (err) {
      console.log(err);
    }
  },
};
