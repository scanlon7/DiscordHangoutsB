const specialSchema = require("../../models/specialOnlySchema.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "removespeciallist",
  aliases: ["rspecial"],
  description: "Remove the mentioned from the Special List, If a user had this, they can use Features that others cant!",
  async execute(message, args, cmd, client, Discord) {
    if(message.author.id !== '383401432948277249') return message.channel.send({ embed: 
      new MessageEmbed()
      .setTitle("Special List")
      .setColor('RED')
      .setDescription("❌ | You do not have permission to use this command (Owner only)") })


      let member = message.mentions.members.first() 
        

      if (!member) {
          member = await message.guild.members.cache.get(args[0])
      }

      if (!member) {
          try {
              member = await client.users.fetch(args[0]) 
          } catch (e) {
              console.log('An error occured.')
              return message.channel.send({ embeds: [
              new MessageEmbed() 
              .setTitle("Special List") 
              .setColor('RANDOM')
              .setDescription("❌ | Cannot find that user!")
              ] })
          }
      }

        specialSchema.findOne({User: member.id},async(err, data) => {
          if(!data) return message.channel.send({ embeds: [
            new MessageEmbed()
            .setTitle("Special List")
            .setColor('RED')
            .setDescription(`❌ | This user is not on the Special List features!`)
          ] })


          data.delete();
          return message.channel.send({ embeds: [
          new MessageEmbed()
          .setTitle("Special List")
          .setColor('GREEN')
          .setDescription(`✅ | ${member} has Been Removed from the Special List!`)
          ] })
        })
  }
}
