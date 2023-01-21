const { Events, EmbedBuilder, userMention, channelMention, hyperlink } = require('discord.js');
const { welcomeChannelId } = require('../configs/config.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: true,
    execute(member){
        console.log(`Użytkownik ${member.user.tag} dołączył na serwer, ${member.joinedAt}`);
        const client = member.client;

        const channelWelcomeEmbed = new EmbedBuilder()
            .setColor(0x950A0A)
            .setTitle("Witaj w ekipie AnimeNi!")
            .setAuthor({ name: client.user.username, iconURL: 'https://animeni.pl/wp-content/uploads/2022/12/logo-v2.png' })
            .setDescription(
                `${userMention(member.id)} Cieszymy się, że do nas trafiłeś/aś!
                **Yotsuba** dobrze radzi zajrzyj na ~${channelMention(876489800545361960)}
                **Raphtalia** mówi, że ciekawe role znajdziesz na ${channelMention(998928653578686474)}
                **Asuna** prosi aby czytać ${channelMention(998928955765694544)}
                **Miku** mówi, że najnowsze odcinki znajdziesz na ${channelMention(1054516184487297045)}
                
                Cała ekipa AnimeNi życzy udanego pobytu na serwerze!
                Miłej zabawy na różnych kanałach oraz rozmów na ogólnym!`
            )
            .setImage('https://i.imgur.com/JT6Bmqr.png')
            .setTimestamp()
            .setFooter({ text: `Jesteś ${member.guild.memberCount}. członkiem serwera`, iconURL: member.avatar });

        const channel = client.channels.cache.get(welcomeChannelId);
        channel.send({ embeds: [channelWelcomeEmbed] });


        const privateWelcomeEmbed = new EmbedBuilder()
            .setColor(0x950A0A)
            .setTitle("Witaj w ekipie AnimeNi!")
            .setAuthor({ name: client.user.username, iconURL: 'https://animeni.pl/wp-content/uploads/2022/12/logo-v2.png' })
            .setDescription(
                `${userMention(member.id)} Cieszymy się, że do nas trafiłeś/aś!
                **Yotsuba** dobrze radzi zajrzyj na ${channelMention(876489800545361960)}
                **Raphtalia** mówi, że ciekawe role znajdziesz na ${channelMention(998928653578686474)}
                **Asuna** prosi aby czytać ${channelMention(998928955765694544)}
                **Miku** mówi, że najnowsze odcinki znajdziesz na ${channelMention(1054516184487297045)}
                
                Cała ekipa AnimeNi życzy udanego pobytu na serwerze!
                Miłej zabawy na różnych kanałach oraz rozmów na ogólnym!
                
                Wszystkie anime znajdziesz na stronie! A jak czegoś nie ma zapytaj społeczność na kanale <#927836855272103956>
                W ostateczności napisz ticket na <#877502363135541318>

                Znajdziesz nas na:
                ${hyperlink('Fanpage', 'https://www.facebook.com/WithLoveToAnime')}
                ${hyperlink('Twitter', 'https://twitter.com/animeni_pl')}
                ${hyperlink('CDA', 'https://cda.pl/star_of_kirito')}
                `
            )
            .setImage('https://i.imgur.com/JT6Bmqr.png')
            .setTimestamp()
            .setFooter({ text: `Jesteś ${member.guild.memberCount}. członkiem serwera`, iconURL: member.avatar });

        client.users.send(member.id, { embeds: [privateWelcomeEmbed] });
    },
};