const Discord = require('discord.js');
const client = new Discord.Client();

const seconds = 10
const startingCounter = 3600
let counter = startingCounter
let importantData = 'Countdown for Hangouts server AND 1.5.5 Update!! I hope you all like it! TY <3 \n ~~~ AHumanThatUKnow#5275'

const getText = () => {
  return `${importantData}\n\nUpdating in ${counter}s...`
}

const fetchData = async () => {
  importantData = 'Please Wait...\nThis probably gonna be delayed for a bit.... ~~~ AHumanThatUKnow#5275' //'Hello! This is A Countdown Message, this feature will probably be used for an update or so.. Goodbye  ~ AHumanThatUKnow#5275'
}

const updateCounter = async (message) => {
  message.edit(getText())
  counter -= seconds

  if (counter <= 0) {
    counter = startingCounter
    await fetchData()
  }

  setTimeout(() => {
    updateCounter(message)
  }, 1000 * seconds)
}

module.exports = {
  name: 'countdown',
  async execute(message, args, cmd, client, Discord) {
    if (message.author.id !== '383401432948277249') return message.channel.send(
      new MessageEmbed()
        .setTitle("Special List")
        .setColor('RED')
        .setDescription("❌ | You do not have permission to use this command (Owner only)"))

    await fetchData()

    const guild = client.guilds.cache.get('701675821751992331')
    const channel = guild.channels.cache.get('797114195966689320')

    const messageCount = await channel.send(getText())

    updateCounter(messageCount)
  }
};
