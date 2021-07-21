const client = require("../../index.js");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.defer({ ephemeral: false }).catch(() => {});
        
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: "An error has occured"});
        
        const args = [];
        interaction.options._options.map((x) => {
            if (x.value) args.push(x.value);
            if (x.name) args.push(x.name);
        });
        
        cmd.run(client, interaction, args);
    }
    //console.log(interaction)
});
