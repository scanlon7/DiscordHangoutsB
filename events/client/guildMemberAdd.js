module.exports = (member) => {
    const channel = client.channels.cache.find(c => c.id === '701731578161922099');

    channel.send(`<@${member.id}> has joined the server! (MEMBER ID: ${member.id})\n${member.name} account age is ${member.createdAt}`)
}
