const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('template')
        .setDescription('To jest testowy szablon do komend'),
    async execute(interaction) {
        await interaction.reply('To działa!');
    },
};