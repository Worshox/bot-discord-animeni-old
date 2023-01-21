const { SlashCommandBuilder, Events, PermissionFlagsBits, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stworz-embeda')
        .setDescription('Wyświetla formularz, pozwalający wysłać embeda na dany kanał')
        .addChannelOption(option => option
            .setName('kanał')
            .setDescription('Kanał na który ma zostać wysłana wiadomość')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('createEmbedModal')
            .setTitle('Stwórz Embeda');

        const embedTitleInput = new TextInputBuilder()
            .setCustomId('embedTitleInput')
            .setLabel('Tytuł embeda (nagłówek na początku)')
            .setStyle(TextInputStyle.Short);

        const embedContentInput = new TextInputBuilder()
            .setCustomId('embedContentInput')
            .setLabel('Treść embeda')
            .setStyle(TextInputStyle.Paragraph);

        const embedColorInput = new TextInputBuilder()
            .setCustomId('embedColorInput')
            .setLabel('Kolor paska embeda, heksadecymalnie')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const embedImageInput = new TextInputBuilder()
            .setCustomId('embedImageInput')
            .setLabel('Zdjęcie na dole embeda (URL)')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);
        
        const embedFooterInput = new TextInputBuilder()
            .setCustomId('embedFooterInput')
            .setLabel('Zawartość stopki embeda')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const firstActionRow = new ActionRowBuilder().addComponents(embedTitleInput);
        const secondActionRow = new ActionRowBuilder().addComponents(embedContentInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(embedColorInput);
        const forthActionRow = new ActionRowBuilder().addComponents(embedImageInput);
        const fifthActionRow = new ActionRowBuilder().addComponents(embedFooterInput);
        
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, forthActionRow, fifthActionRow);

        interaction.showModal(modal);
        const channel = interaction.options.getChannel('kanał');

        interaction.client.once(Events.InteractionCreate, modalInteraction => {
            if (!modalInteraction.isModalSubmit()) return;
            
            if (channel.type != 0){
                modalInteraction.reply('Podałeś zły kanał - możesz wprowadzić tylko kanał tekstowy.');
                return;
            }

            try {
                const customEmbed = new EmbedBuilder()
                    .setAuthor({ name: modalInteraction.user.username, iconURL: modalInteraction.user.avatarURL()})
                    .setTitle(modalInteraction.fields.getTextInputValue('embedTitleInput'))
                    .setDescription(modalInteraction.fields.getTextInputValue('embedContentInput'))
                    .setColor(modalInteraction.fields.getTextInputValue('embedColorInput') ? `0x${modalInteraction.fields.getTextInputValue('embedColorInput')}` : 0x950A0A)
                    .setImage(modalInteraction.fields.getTextInputValue('embedImageInput') || null)
                    .setFooter({ text: modalInteraction.fields.getTextInputValue('embedFooterInput') || 'AnimeNi', iconURL: modalInteraction.user.avatarURL()})
                    .setTimestamp();

                channel.send({ embeds: [customEmbed] });
                modalInteraction.reply(`Embeda wysłano na kanał ${channel.name}!`);
            }

            catch (error) {
                modalInteraction.reply('Nie udało się stworzyć embeda, najprawdopodobniej popełniłeś błąd w polu "Zdjęcie" (podaj dokładny URL do zdjęcia)');
            }
            
        });
    }
}