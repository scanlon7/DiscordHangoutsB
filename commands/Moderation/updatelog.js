module.exports = {
    name: 'updatelog',
    aliases: ['update', 'log'],
    description: "Update Log of the bot",
    execute(message, args, cmd, client, Discord){
        message.channel.send('Update 1.5.5:\n1.Added AFK command(9afk [reason])\n2.Revamped ping command\n3.Revamped info command\n3.Fixed Guess The Number bug!\n4.Leveling system is now LIVE!\nAnd Others!');
 
        message.channel.send(`Note: This is probably my last update for now, i have to focus on exams and its really stressing me out. Hope you all enjoy the update!\n\n\n   ~AHumanThatUKnow#5275`);
    }
};