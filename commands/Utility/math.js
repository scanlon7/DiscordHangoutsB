const { Client, message, MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = {
  name: 'math',
  description: 'Math Command',
  /** 
   * @param {Client} client
   * @param {message} message
   * @param {String[]} args
  */
  async execute(message, args, cmd, client, Discord) {
     try {
       const embed = new MessageEmbed()
         .setAuthor('Math Command:')
         .setColor('RANDOM')
         .addField('Question', args.join(" "))
         .addField('Solution', math.evaluate(args.join(" ")));

       message.channel.send(embed);
     } catch (err) {
       console.log(err)
       message.channel.send('❌ | Your question is not valid/nIf you use "×", "÷" "nⁿ", please change it to "*" for Multiplied, "/" for Divide, "^" for Rank letters.');
     }
   },
};




//const { Calculator } = require('weky')

//const { MessageButton, MessageActionRow } = require('discord-buttons')

//module.exports = {
   //name: 'math',
   //description: 'Math Command',
   //async execute (message, args, cmd, client, Discord) {
      //await message.channel.send(Calculator(message))
     ////Errors or questions? https://discord.gg/2EZSpxNB5z (Support server for weky npm)
   //}
//}
