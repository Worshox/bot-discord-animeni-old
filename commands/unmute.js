const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Odcisz użytkownika na tym serwerze')
        .addUserOption(option => option
            .setName('użytkownik')
            .setDescription('Kogo chcesz odciszyć')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('użytkownik');

        await interaction.reply(`**Odciszono** użytkownika ${user.username}.`);
        await interaction.guild.members.unban(user);
    },
};