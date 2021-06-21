module.exports = (Discord, Client, message, args) => {
    if (message.content.toLowerCase().includes() === 'hello') {
        message.channel.send({ content: 'Hello there!' });
    } else if (message.content.toLowerCase().includes() === 'hi') {
        message.channel.send('Hello there!');
    } else if (message.content.toLowerCase().includes() === 'hallo') {
        message.channel.send('Hello there!');
    } else if (message.content.toLowerCase().includes() === 'allo') {
        message.channel.send('Hello there!');
    }else if (message.content.toLowerCase().includes() === 'good morning') {
        message.channel.send(`Good morning, ${message.author}!`);
    } else if (message.content.toLowerCase().includes() === 'good night') {
        message.channel.send(`Good night, ${message.author}!`);
    } else if (message.content.toLowerCase().includes() === 'bye') {
        message.channel.send('Goodbye.');
    }


}
