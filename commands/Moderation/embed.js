const Discord = require('discord.js')

module.exports = {
    name: "embed",
    description: "make embed",

    async execute(message, args, client) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return // if the member does not have permissions to mannage messages, return/stop reading the code.
        let title = args[1] // args[0] is the first word or number after the command name
        let color = args[2]
        let textChannel = message.mentions.channels.first()
        let description = args.slice(3).join(" ") // args.slice(2).join(" ") means we're taking all the arguments including and after the second argument. An argument is just a word or number.
        const error = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('**❌ERROR INVALID ARGS**')
            .setDescription('`{prefix}embed, title(one word), color(hex code or basic colors in caps; i.e(YELLOW), description(embed body)`')

        if (!title) return message.channel.send(error) // ! means no, so if there's no title, return and send the error embed
        if (!color) return message.channel.send(error)
        if (!description) return message.channel.send(error)
        if (!message.guild.channels.cache.has(textChannel.id)) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`**${title}**`)
                .setColor(color)
                .setDescription(description)
                .setFooter(`Message From: ${message.author.username}`)
            message.delete() // this deletes the command

            message.channel.send(embed)
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(`**${title}**`)
                .setColor(color)
                .setDescription(description)
                .setFooter(`Message From: ${message.author.username}`)
            message.delete() // this deletes the command

            textChannel.send(embed)
        }
    }
}
