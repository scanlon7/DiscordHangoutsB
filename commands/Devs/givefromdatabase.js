const profileModel = require("../../models/profileSchema");

const DevList = new Set(
  ["383401432948277249"], 
  ["723491267144581201"]
);

module.exports = {
  name: "givefromdatabase",
  aliases: ["givefromdb", "givefdb"],
  description: "give a player some coins",
  async execute(message, args, cmd, client, discord, profileData) {

    if(message.member.id != DevList) return message.channel.send(`Sorry only **The Devs** can run this command 😔`);

    if (!args.length) return message.channel.send("You need to mention a player to give them coins");
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send("That user does not exist");

    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Give amount must be a whole number");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(`This user doens't exist in the db`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: amount,
          },
        }
      );

      return message.channel.send(`This player has been given their coins! ${amount} of coins!`);
    } catch (err) {
      console.log(err);
    }
  },
};
