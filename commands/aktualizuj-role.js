const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, channelMention } = require('discord.js');
const fs = require('node:fs');
// const path = require('node:path');
const emojisContent = require('../configs/roles.json');
const { emojisMessageId , emojisChannelId } = require('../configs/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aktualizuj-role')
        .setDescription('Aktualizuje wiadomość ról na czacie')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const client = interaction.client;
        const channel = client.channels.cache.get(emojisChannelId);
        
        try {
            let description = '';
            console.log(emojisContent);

            for (const role in emojisContent){
                description += `${role} = ${emojisContent[role]} \n`;
            }
            
            const emojisEmbed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL()})
                .setTitle('Role na serwerze AnimeNi')
                .setDescription(description)
                .setFooter({ text: 'AnimeNi', iconURL: client.user.avatarURL()})
                .setTimestamp();

            channel.messages.fetch(emojisMessageId)
                .then(message => message.edit({ embeds: [emojisEmbed]}));
                
        }
        catch (error) {
            interaction.reply('Wystąpił błąd wewnętrzny aplikacji, skontaktuj się z developerem bota');
            console.error(error);
            return;
        }
           
        await interaction.reply(`Wiadomość z rolami zaktualizowano pomyślnie! Sprawdź kanał ${channelMention(channel.id)}`);
    }
}