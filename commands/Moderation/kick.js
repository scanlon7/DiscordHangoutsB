const { MessageEmbed } = require('discord.js')

// YOU CAN READ THE NOTES IF YOU DONT KNOW HOW THE PROCESS WORKS 

module.exports = {
    name: 'kick',
    description: "kicks a member!",
    async execute(message, args, cmd, client, Discord) { // You may have to change this line to match your Command Handler
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You do not have permissions to use this command!') // Check if the user who execute the command have the right permission

        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('I do not have permissions to execute this command!') //Check if the bot doesn't have permission

        const user = message.member // the Person who execute the command

        let member = message.mentions.members.first() // the person that gonna be kicked
        let reason = args[1] // Reason 



        if (!member) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (!member) {
            try {
                member = await client.users.fetch(args[0])
            } catch (e) {
                console.log('An error occured.')
                return message.channel.send("Could not find that member!")
            }
        }

        if (!args[1]) {
            reason = "No reason provided";
        } else if (args[1]) {
            reason = args.slice(1).join(" ");
        }

        if (reason.length > 1024) reason = reason.slice(0, 1021) + "..."; // if the reason is more than 1024 word, the bot will cut it

        const kickedEmbed = new MessageEmbed() // telling that the user has been kicked
            .setTitle('Kicked Member!')
            .setDescription(`${member} was successfully kicked.`)
            .addField('Responsible Moderator', message.member, true)
            .addField('Member', member, true)
            .addField('Reason', reason)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp()
            .setColor('RANDOM')

        const dmEmbed = new MessageEmbed() // DM'ing the kicked person
            .setTitle("Uh Oh..")
            .setDescription(`You have been kicked from **${message.guild}**!`)
            .addField('Responsible Moderator', message.member, true)
            .addField('Member', member, true)
            .addField('Reason', reason)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp()
            .setColor('ORANGE')

        try {
            await message.guild.members.kick(member.id, { // Trying to kick using ID, also can be used to ban people outside the guild
                reason: reason
            })

            message.channel.send(kickedEmbed)

            try {
                await member.send(dmEmbed)

                user.send('I have successfully send the reason to the user!')
            } catch (e) {
                user.send('I could not DM the user! Reason logged.')
                console.log('An error occured while sending the DM embed!' + e)
            }
        } catch (e) {
            message.channel.send('An error occured while executing the action!')
            console.log("An error occured while executing the ban command!" + e)
        }
    }
}





// module.exports = {
//     name: 'kick',
//     description: "kicks a member!",
//     execute(message, args, cmd, client, Discord){
//         if (!message.member.hasPermission("KICK_MEMBERS")){
//             messages.channel.send(new Discord.MessageEmbed() .setDescription('You Cannot do that, Missing Permissions') .setColor('RED'))
//             return;
//         }
//         const member = message.mentions.users.first();
//         if(member){
//             const memberTarget = message.guild.members.cache.get(member.id);
//             memberTarget.kick();
//             message.channel.send(`User has been kicked!`);
//         } else {
//             message.channel.send('You cannot kick that members!');
//         }
//     }
// }