const seconds = 5
const startingCounter = 60
let counter = startingCounter
let importantData = ''

const fetchData = async () => {
  importantData = 'Hello! This is A Countdown Message, this feature will probably be used for an update or so.. Goodbye  ~ AHumanThatUKnow#5275'
}

const getText = () => {
  return `${importantData}\n\nUpdating in ${counter}s...`
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

module.exports = async (client) => {
  await fetchData()

  const guild = client.guilds.cache.get('701675821751992331')
  const channel = guild.channels.cache.get('797114195966689320')

  const message = await channel.send(getText())

  updateCounter(message)
}
