const { Events, EmbedBuilder, roleMention } = require('discord.js');
const { default: axios } = require('axios');
const { animeChannelId, odcinkiRoleId } = require('../configs/config.json');
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // if (message.webhookId === '1053816636945207437') {
        //     let postType = message.embeds[0].data.url.split('/')[3];
        //     if (postType === 'anime'){
        //         let allpostData = await axios('https://animeni.pl/wp-json/wp/v2/anime?per_page=25&_embed', {headers: {"Accept-Encoding": "*"}});
        //         for (const singlePost of allpostData.data)
        //             if (singlePost.link === message.embeds[0].data.url)
        //                 postData = singlePost;
        //         const thumbnailData = `https://animeni.pl/?attachment_id=${postData.acf.okladka_filmu}`;
        //         const imageData = `https://animeni.pl/?attachment_id=${postData.acf['Zdjęcie w tle']}`;
                
        //         if (postData.acf.tlumaczy_grupa.includes('<a')) {
        //             postData.acf.tlumaczy_grupa = postData.acf.tlumaczy_grupa.split('>')[1].slice(0, -4);
        //         }
    
        //         const fields = [
        //             {
        //                 name: 'Informacje o tłumaczeniu:',
        //                 value: `Grupa: ${ postData.acf.tlumaczy_grupa ? postData.acf.tlumaczy_grupa : 'Brak informacji'}
        //                 Tłumaczenie: ${postData.acf.tlumaczenie ? postData.acf.tlumaczenie : 'Brak informacji'}
        //                 Korekta: ${postData.acf.korekta ? postData.acf.korekta : 'Brak informacji'}
        //                 Typesetting: ${postData.acf.typesetting ? postData.acf.typesetting : 'Brak informacji'}`,
        //             },
        //             {
        //                 name: 'Sezon:',
        //                 value: postData.acf.sezon ? `${postData.acf.sezon}` : 'Brak informacji',
        //                 inline: true,
        //             },
        //             {
        //                 name: 'Nr odcinka:',
        //                 value: postData.acf.wpisz_numer_odcinka ? `${postData.acf.wpisz_numer_odcinka}` : 'Brak informacji',
        //                 inline: true,
        //             },
        //             {
        //                 name: 'Długość:',
        //                 value: postData.acf.czas_trwania ? `${postData.acf.czas_trwania} min` : 'Brak informacji',
        //                 inline: true,
        //             },
        //         ];
    
        //         const file = path.resolve(__dirname, '../configs/pings.txt');
        //         const readStream = fs.createReadStream(file);
        //         const readLines = readline.createInterface({input: readStream});
        //         let specificAnimeId;
        //         readLines.on('line', (line) => {
        //             if (message.embeds[0].data.url.split('/')[4].includes(line.split(';')[2]))
        //                 specificAnimeId = line.split(';')[1];
        //         });
    
        //         readLines.on('close', () => {
        //             const descripton = `Zapraszany do oglądania! ${roleMention(odcinkiRoleId)} ${specificAnimeId ? roleMention(specificAnimeId) : ''}`;
    
        //             const postEmbed = new EmbedBuilder()
        //                 .setColor(0x950A0A)
        //                 .setTitle(postData.title.rendered)
        //                 .setURL(postData.link)
        //                 .setAuthor({ name: postData._embedded.author[0].name, iconURL: postData._embedded.author[0].avatar_urls["24"], url: postData._embedded.author[0].link })
        //                 .setDescription(descripton)
        //                 .setThumbnail(thumbnailData)
        //                 .addFields(fields)
        //                 .setImage(imageData)
        //                 .setTimestamp()
        //                 .setFooter({ text: 'AnimeNi', iconURL: 'https://animeni.pl/wp-content/uploads/2022/12/logo-v2.png' });
        
        //             const channel = message.client.channels.cache.get(animeChannelId);
        //             channel.send({ embeds: [postEmbed] }); 
        //         });
        //     }
        // }
    },
};

