//const DevList = new Set(
  //["383401432948277249", "723491267144581201"]
//);


module.exports = {
    name: 'eval',
    special: true,
    execute(message, args, cmd, client, Discord){
        const { member, channel, content } = message
        //if(message.member.id !== DevList) return message.channel.send(`Sorry only **The Devs or Special People** can run this command 😔`);
        const result = eval(content.replace('9eval', ''))
        channel.send({ content: result })
        //} else {
           //return message.channel.send(`Sorry only **The Devs or Special People** can run this command 😔`);
        //}
        //if (message.member.id != "383401432948277249" || message.member.id != "723491267144581201") return message.channel.send(`Sorry only **The Devs** can run this command 😔`);
        //const result = eval(content.replace('9eval', ''))
        //channel.send(result)
        //console.log(err)
    }
}
