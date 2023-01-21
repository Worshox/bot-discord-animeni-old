const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, channelMention } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { statuteMessageId, statuteChannelId } = require('../configs/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aktualizuj-regulamin')
        .setDescription('Aktualizuje wiadomość regulaminu na czacie')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const client = interaction.client;
        const channel = client.channels.cache.get(statuteChannelId);
        const statuteFile = path.resolve(__dirname, '../configs/statute.txt');
        
        try {
            const statuteContent = fs.readFileSync(statuteFile, 'utf8') || "Brak regulaminu";

            const statuteEmbed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL()})
                .setTitle('Regulamin serwera Discord AnimeNi.pl')
                .setDescription(statuteContent)
                // .setColor(0x950A0A)
                .setFooter({ text: 'AnimeNi', iconURL: client.user.avatarURL()})
                .setTimestamp();

            channel.messages.fetch(statuteMessageId)
                .then(message => message.edit({ embeds: [statuteEmbed]}));
                
        }
        catch (error) {
            interaction.reply('Wystąpił błąd wewnętrzny aplikacji, skontaktuj się z developerem bota');
            console.error(error);
            return;
        }
           
        await interaction.reply(`Regulamin zaktualizowano pomyślnie! Sprawdź kanał ${channelMention(channel.id)}`);
    }
}