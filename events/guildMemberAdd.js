const profileModel = require(`../models/profileSchema`);

module.exports = async(message, args, cmd, client, Discord, member) => {
    let profile = await profileModel.create({
        userID:  member.id,
        serverID: member.guild.id,
        coins: 1000,
        bank: 0,
        cooldowns: []
    });
    profile.save();
}

module.exports = (member) => {
    const channel = client.channels.cache.find(c => c.id === '701731578161922099');

    channel.send(`<@${member.id}> has joined the server! (MEMBER ID: ${member.id})\n${member.name} account age is ${member.createdAt}`)
}
