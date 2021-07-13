const client = require("../../index.js");

module.exports = (Discord, client, message, args) => {
    let snipes = client.snipes.get(message.channel.id) || [];
    if (snipes.length > 10000) snipes = snipes.slice(0, 9999);

    snipes.unshift({
        msg: message,
        image: message.attachments.first()?.proxyURL || null,
        time: Date.now,
    });

    client.snipes.set(message.channel.id, snipes)
}