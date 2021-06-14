// const ytdl = require('ytdl-core');
// const ytSearch = require('yt-search');
// const { repeat } = require('ffmpeg-static');
const Discord = require('discord.js');
const client = new Discord.Client();
// const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop', 'pause', 'dc', 'disconnect', 'leave', 's', 'resume', 'continue'],
    async execute(message, args, cmd, client, Discord) {
        const HighVulErrorYTS = new Discord.MessageEmbed()
        .setAuthor('Dependency Error')
        .setDescription('I Don\'t know if this YT-Search dependency error or \"css-what\" error, but its making this \"4 ***high*** severity vulnerabilities\". I tried to update all of it, no fix. BUT when i uninstall yt-search it got fixed\n So yeah.. No music commands atm until the issue is resolved! (This issue also occurs to other developers so yeah.) <3\n~~~ AHumanThatUKnow#5275')
        .setColor('RED')
        .setFooter(`Written: 10/06/2021. The commands will be open once this issue got resolved! <3`)
        message.channel.send({ embeds: [HighVulErrorYTS] })
//         const voice_channel = message.member.voice.channel;
//         if (!voice_channel) return message.channel.send(':x: ***You need to be in a voice channel to use this command!.***');
//         const permissions = voice_channel.permissionsFor(message.client.user);
//         if (!permissions.has('CONNECT')) return message.channel.send(':x: You dont have the correct permissions');
//         if (!permissions.has('SPEAK')) return message.channel.send(':x: You dont have the correct permissions');

//         const server_queue = queue.get(message.guild.id);

//         if (cmd === 'play') {
//             if (!args.length) return message.channel.send(':x: You need to put a link or the music name!');
//             let song = {};

//             if (ytdl.validateURL(args[0])) {
//                 const song_info = await ytdl.getInfo(args[0]);
//                 song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
//             } else {
//                 const video_finder = async (query) => {
//                     const videoResult = await ytSearch(query);
//                     return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
//                 }

//                 const video = await video_finder(args.join(' '));
//                 if (video) {
//                     song = { title: video.title, url: video.url }
//                 } else {
//                     message.channel.send(':x: Error finding video');
//                 }
//             }

//             if (!server_queue) {
//                 const queue_constructor = {
//                     voice_channel: voice_channel,
//                     text_channel: message.channel,
//                     connection: null,
//                     songs: []
//                 }

//                 queue.set(message.guild.id, queue_constructor);
//                 queue_constructor.songs.push(song);

//                 try {
//                     const connection = await voice_channel.join();
//                     queue_constructor.connection = connection;
//                     video_player(message.guild, queue_constructor.songs[0]);
//                 } catch (err) {
//                     queue.delete(message.guild.id);
//                     message.channel.send(':x: There was an error connecting!');
//                     throw err;
//                 }
//             } else {
//                 server_queue.songs.push(song);
//                 return message.channel.send(`:white_check_mark: **${song.title}** has been added to queue!`);
//             }
//         }

//         else if (cmd === 'skip', 's') skip_song(message, server_queue);
//         else if (cmd === 'stop', 'dc', 'disconnect', 'leave') stop_song(message, server_queue);
//         if (args[0] == "pause") {
//             if (server_queue.connection.dispatcher.paused) return message.channel.send("Song is already paused!");//Checks if the song is already paused.
//             server_queue.connection.dispatcher.pause();//If the song isn't paused this will pause it.
//             message.channel.send("Paused the song!");//Sends a message to the channel the command was used in after it pauses.
//         }

//         //Unpause command
//         if (args[0] == "resume") {
//             if (!server_queue.connection.dispatcher.paused) return message.channel.send("Song isn't paused!");//Checks if the song isn't paused.
//             server_queue.connection.dispatcher.resume();//If the song is paused this will unpause it.
//             message.channel.send("Resumed the song!");//Sends a message to the channel the command was used in after it unpauses.
//         }
//         // else if(cmd === 'pause'){
//         //     if(server_queue.connection.dispatcher.paused) return message.channel.send("Song already paused!");
//         //     server_queue.connection.dispatcher.pause();
//         //     message.channel.send("Paused the song!");
//         // }
//         // else if(cmd === 'resume', 'continue'){
//         //     if(!server_queue.connection.dispatcher.paused) return message.channel.send("Song isn't paused!");
//         //     server_queue.connection.dispatcher.resume();
//         //     message.channel.send("Resumed the song!");
//         // }
    }
}

// const video_player = async (guild, song) => {
//     const song_queue = queue.get(guild.id);

//     if (!song) {
//         song_queue.voice_channel.leave();
//         queue.delete(guild.id);
//         return;
//     }
//     const stream = ytdl(song.url, { filter: 'audioonly' });
//     song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
//         .on('finish', () => {
//             song_queue.songs.shift();
//             video_player(guild, song_queue.songs[0]);
//         });
//     await song_queue.text_channel.send(`🎵 Now playing **${song.title}**`);
// }

// const skip_song = (message, server_queue) => {
//     if (!message.member.voice.channel) return message.channel.send(':x: You need to be in the same channel to execute this command!');
//     if (!server_queue) {
//         return message.channel.send(':x: There are no songs in queue!');
//     }
//     server_queue.connection.dispatcher.end();
// }

// const stop_song = (message, server_queue) => {
//     if (!message.member.voice.channel) return message.channel.send(':x: You need to be in the same channel to execute this command!');
//     message.channel.send('Stopping all songs and leaving the channel...:white_check_mark:');
//     server_queue.songs = [];
//     server_queue.connection.dispatcher.end();
//}