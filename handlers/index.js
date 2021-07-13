
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        } else {
            continue;
        }
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    //Slash Commands
    const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);

    const arrayOfSlashCommands = [];

    slashCommands.map((value) => {
        const file = require(value);
        if(!file?.name) return;

        client.slashCommands.set(file.name, file);
    });

    client.on('ready', async () => {
        await client.guilds.cache.get("701675821751992331").commands.set(arrayOfSlashCommands);
    })
};;
