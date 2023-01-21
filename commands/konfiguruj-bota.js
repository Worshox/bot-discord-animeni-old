const { SlashCommandBuilder, PermissionFlagsBits, ActivityType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('konfiguruj-bota')
        .setDescription('Skonfiguruj nazwę/avatar/aktywność/status')
        .addStringOption(option => option
            .setName('nazwa')
            .setDescription('Nazwę bota'))
        .addStringOption(option => option
            .setName('avatar')
            .setDescription('Dokładny URL do pliku z obrazkiem'))
        .addStringOption(option => option
            .setName('aktywność')
            .setDescription('Aktywność bota, musisz podać też parametr "szczegóły-aktywności"')
            .addChoices(
                { name: 'Ogląda', value: 'watching' },
                { name: 'Stramuje', value: 'streaming' },
                { name: 'Gra', value: 'playing' },
                { name: 'Słucha', value: 'listening' },
                { name: 'Uczestniczy', value: 'competing' },
            ))
        .addStringOption(option => option
            .setName('szczegóły-aktywności')
            .setDescription('Np. Ogląda <nazwa> (Podajesz wartośść <nazwa>)'))
        .addStringOption(option => option
            .setName('status')
            .setDescription('Aktualny status bota: online/zaraz wracam/nie przeszkadzać/niewidoczny')
            .addChoices(
                { name: 'Online', value: 'online' },
                { name: 'Zaraz warcam', value: 'idle' },
                { name: 'Nie przeszkadzać', value: 'dnd' },
                { name: 'Niedostępny', value: 'invisible' }
            ))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        if (interaction.options.getString('nazwa'))
            interaction.client.user.setUsername(interaction.options.getString('nazwa'));

        if (interaction.options.getString('avatar'))
            try{
                interaction.client.user.setAvatar(interaction.options.getString('avatar'));
            } catch (error) {
                await interaction.reply({ content: 'Wystąpił błąd, najprawdopodomniej podałeś zły URL', ephemeral: true});
            }
        
        if (interaction.options.getString('aktywność') && interaction.options.getString('szczegóły-aktywności')){
            const activity = interaction.options.getString('szczegóły-aktywności');
            switch (interaction.options.getString('aktywność')){
                case 'watching': interaction.client.user.setActivity(activity, { type: ActivityType.Watching }); break;
                case 'streaming': interaction.client.user.setActivity(activity, { type: ActivityType.Streaming }); break;
                case 'playing': interaction.client.user.setActivity(activity, { type: ActivityType.Playing }); break;
                case 'listening': interaction.client.user.setActivity(activity, { type: ActivityType.Listening }); break;
                case 'competing': interaction.client.user.setActivity(activity, { type: ActivityType.Competing }); break;
            }
        }

        if (interaction.options.getString('status'))
            switch (interaction.options.getString('status')) {
                case 'online': interaction.client.user.setStatus('online'); break;
                case 'idle': interaction.client.user.setStatus('idle'); break;
                case 'dnd': interaction.client.user.setStatus('dnd'); break;
                case 'invisible': interaction.client.user.setStatus('invisible'); break;
            }

        await interaction.reply('Zapisano ustawienia statusu bota!');
    },
};