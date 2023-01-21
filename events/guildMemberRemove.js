const { Events, EmbedBuilder, userMention } = require('discord.js');
const { welcomeChannel } = require('../configs/config.json')

module.exports = {
    name: Events.GuildMemberRemove,
    once: true,
    execute(member){
        const dateTime = new Date();
        console.log(`Użytkownik ${member.user.tag} opuścił serwer, ${dateTime}`);
        const client = member.client;

        const channelWelcomeEmbed = new EmbedBuilder()
            .setColor(0x950A0A)
            .setTitle("Szkoda, że nas opuszczasz :(")
            .setAuthor({ name: client.user.username, iconURL: 'https://animeni.pl/wp-content/uploads/2022/12/logo-v2.png' })
            .setDescription(
                `${userMention(member.id)} i tak wiemy, że kiedyś do nas wrócisz, ale tymczasem bywaj!`
            )
            .setImage('https://i.imgur.com/JT6Bmqr.png')
            .setTimestamp()
            .setFooter({ text: `Jest ${member.guild.memberCount} członków na serwerze`, iconURL: member.avatar });

        const channel = client.channels.cache.get(welcomeChannel);
        channel.send({ embeds: [channelWelcomeEmbed] });
    },
};