const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('node:fs');
const readline = require('node:readline');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dodaj-ping')
        .setDescription('Dodaje nową rolę do pingowania odcinków')
        .addRoleOption(option =>
            option
                .setName('rola')
                .setDescription('Rola krórą chcesz dodać')
                .setRequired(true))
        .addStringOption(option  =>
            option
                .setName('slug')
                .setDescription('Fragment w linku z nazwą serii (2 słowa oddzielone "-")')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const role = interaction.options.getRole('rola');
        const slug = interaction.options.getString('slug');
        const file = path.resolve(__dirname, '../configs/pings.txt');

        const readStream = fs.createReadStream(file);
        const readLines = readline.createInterface({input: readStream});
        let roleAlreadyExists = false;
        let interactionReplyText;
        readLines.on('line', (line) => {
            if (line === `${role.name};${role.id};${slug}`){
                roleAlreadyExists = true;
                console.log(`Role \t ${role.name} \t has been already added to pings!`)
                interactionReplyText = `Rola **${role.name}** już była dodana do pingów!`;
            }
        });
        readLines.on('close', async () => {
            if (!roleAlreadyExists){
                const writeStream = fs.createWriteStream(file, {flags: 'a'});
                writeStream.write(`${role.name};${role.id};${slug}\n`);
                writeStream.on('finish', () => {
                    console.log(`Role \t ${role.name} (id ${role.id}) \t was added to pings.`);
                });
                writeStream.end();
                interactionReplyText = `Rola **${role.name}** została dodana do pingów odcinków.`;
            }
            await interaction.reply(interactionReplyText);
        });
    },
};