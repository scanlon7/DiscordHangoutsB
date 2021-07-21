const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Get profile picture of you or mentioned user!",
    options: [
        {
            name: "user",
            description: "The user you want to use this command with",
            type: "USER",
            required: false,
        },
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args) => {
        const [ user ] = args;
        if (!user) return interaction.followUp({ content: `**Your Avatar: ** ${interaction.user.displayAvatarURL({ dynamic: true })}`, ephemeral: false });
        console.log({ user })
        const member = client.users.cache.get(user);
        interaction.followUp({ content: `**${member.username}'s Avatar: ** ${member.displayAvatarURL({ dynamic: true })}`, ephemeral: false });
    }
}
