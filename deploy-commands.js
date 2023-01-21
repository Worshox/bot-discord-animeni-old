const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./configs/config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Zaczynam odświeżać ${commands.length} (/) komend aplikacji.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Pomyślnie odświeżono ${commands.length} (/) komend aplikacji.`)
    } catch (error) {
        console.error(error);
    }
})();