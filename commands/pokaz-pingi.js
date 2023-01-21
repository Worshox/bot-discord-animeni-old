const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokaz-pingi')
        .setDescription('Wyświetla listę aktualnie pingowanych ról')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const file = path.resolve(__dirname, '../configs/pings.txt');

        const readStream = fs.createReadStream(file);
        const readLines = readline.createInterface({input: readStream});
        let roles = '';
        let counter = 1;
        readLines.on('line', (line) => {
            roles += `${counter}. ${line.split(';')[0]}, slug: ${line.split(';')[2]}\n`;
            counter++;
        });
        readLines.on('close', async () => {
            const pingsEmbed = new EmbedBuilder()
                .setColor(0x950A0A)
                .setTitle('Pingowane role do odcinków:')
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
                .setDescription(roles ? roles : 'Brak pingowanych ról')
                .setTimestamp()
                .setFooter({ text: 'AnimeNi', iconURL: 'https://animeni.pl/wp-content/uploads/2022/12/logo-v2.png' });

            await interaction.reply({ embeds: [pingsEmbed] });
        });
    },
};