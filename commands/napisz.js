const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('napisz')
        .setDescription('Wyślij wiadomość na czacie przez bota')
        .addChannelOption(option => option
            .setName('kanał')
            .setDescription('Kanał na który ma zostać wysłana wiadomość')
            .setRequired(true))
        .addStringOption(option => option
            .setName('wiadomość')
            .setDescription('Co chcesz wysłać')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanał');
        const content = interaction.options.getString('wiadomość');

        channel.send(content);
        await interaction.reply(`Wysłano na kanał: ${channel} wiadomość o treści: "${content}"`);
    },
};