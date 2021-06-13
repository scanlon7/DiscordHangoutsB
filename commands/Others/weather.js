const weather = require('weather-js');

const Discord = require('discord.js');

const language = require('../../language')

module.exports = {
    name: 'weather',
    aliases: ['wthr'],
    async execute(message, args, cmd, client, Discord) {
        const { guild } = message
    
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Please specify a location')

        if(result === undefined || result.length === 0) return message.channel.send(':x: **Invalid** location');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`${language(guild, 'WEATHER_FORECAST_FOR')} ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField(`${language(guild, 'TIMEZONE')}`, `UTC${location.timezone}`, true)
        .addField(`${language(guild, 'DEGREE_TYPE')}`, 'Celsius', true)
        .addField(`${language(guild, 'TEMPERATURE')}`, `${current.temperature}°`, true)
        .addField(`${language(guild, 'WIND')}`, current.winddisplay, true)
        .addField(`${language(guild, 'FEELS_LIKE')}`, `${current.feelslike}°`, true)
        .addField(`${language(guild, 'HUMIDITY')}`, `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}