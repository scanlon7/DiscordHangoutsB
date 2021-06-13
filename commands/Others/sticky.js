const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const MyStickyChannelID = '844878448065118249';
let cacheMsgs = [];

client.on('ready', async () => {
  /**
   * Get channel, if found then send the message to that channel and cache it
   */
  const stickyChannel = client.channels.cache.get(MyStickyChannelID);
  if (stickyChannel) {
    const m = await stickyChannel.send(new Discord.MessageEmbed()
    .setAuthor('Sticky Channel')
    .setDescription('This is some sticky content!')
    .setColor('RANDOM')
    .setTimestamp()
    );
    cacheMsgs.push(m.id);
  }
});

client.on('message', async message => {
  if (message.author.bot) return;

  // Remove a message and remove form cache
  async function remove(id) {
    const msg = message.channel.messages.cache.get(id);
    cacheMsgs.shift();
    if (msg) await msg.delete().catch(_e => {});
  }

  // check channel is the sticky channel
  if (message.channel.id === MyStickyChannelID) {
    // if length is more or 2 but not 0 then queue delete all and return without a message
    if (cacheMsgs.length >= 2 && cacheMsgs.length !== 0) return cacheMsgs.forEach(async id => remove(id));

    // if cache is more then 0 then queue delete all AND send a message
    if (cacheMsgs.length > 0) cacheMsgs.forEach(async id => await remove(id));

    // Send message and add to cache
    const m = await message.channel.send(new Discord.MessageEmbed()
    .setAuthor('Sticky Channel')
    .setDescription('This is some sticky content!')
    .setColor('RANDOM')
    .setTimestamp()
    );
    cacheMsgs.push(m.id);
  }
});