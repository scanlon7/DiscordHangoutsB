const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'djs',
    aliases: ['docs'],
    description: 'Discord JS documentation search! (You can execute this command in Bot DM!)',
    usage: '<search>',
    async execute(message, args, cmd, client, Discord) {
        const query = args.join(" ");
        if(!query) return message.reply("Please specify a query!")
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
            query
        )}`;

        axios.get(url).then(({ data }) => {
            if(data) {
                message.reply({ embed: data })
            }
        })


    }
}
