const { Events, EmbedBuilder, roleMention } = require('discord.js');
const { default: axios } = require('axios');
const path = require('node:path');
const fs = require('node:fs');
const readline = require('node:readline');
const { lastKnownVideoId } = require('../configs/episodes.json');
const { animeChannelId, odcinkiRoleId } = require('../configs/config.json')

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client){
        console.log(`Bot online! Zalogowano jako ${client.user.tag}`);

        //KODU PONIŻEJ NIE DOTYKAĆ POD ŻADNYM WARUNKIEM! DZIAŁA TO NIE DOTYKAJ!
        setInterval(videoCheck, 60_000);

        async function videoCheck() {
            const response = await axios('https://animeni.pl/wp-json/wp/v2/anime?per_page=10&_embed', {headers: {"Accept-Encoding": "*"}});

            let newVideosCount = -1;

            for (const singleVideo of response.data) {
                if (singleVideo.id === lastKnownVideoId) break;

                newVideosCount++;
            }

            for (let i = newVideosCount; i >= 0; i--){
                const postData = response.data[i];
                
                const thumbnailData = `https://animeni.pl/?attachment_id=${postData.acf.okladka_filmu}`;
                const imageData = `https://animeni.pl/?attachment_id=${postData.acf['Zdjęcie w tle']}`;
                
                if (postData.acf.tlumaczy_grupa.includes('<a')) {
                    postData.acf.tlumaczy_grupa = postData.acf.tlumaczy_grupa.split('>')[1].slice(0, -4);
                }
    
                const fields = [
                    {
                        name: 'Informacje o tłumaczeniu:',
                        value: `Grupa: ${ postData.acf.tlumaczy_grupa ? postData.acf.tlumaczy_grupa : 'Brak informacji'}
                        Tłumaczenie: ${postData.acf.tlumaczenie ? postData.acf.tlumaczenie : 'Brak informacji'}
                        Korekta: ${postData.acf.korekta ? postData.acf.korekta : 'Brak informacji'}
                        Typesetting: ${postData.acf.typesetting ? postData.acf.typesetting : 'Brak informacji'}`,
                    },
                    {
                        name: 'Sezon:',
                        value: postData.acf.sezon ? `${postData.acf.sezon}` : 'Brak informacji',
                        inline: true,
                    },
                    {
                        name: 'Nr odcinka:',
                        value: postData.acf.wpisz_numer_odcinka ? `${postData.acf.wpisz_numer_odcinka}` : 'Brak informacji',
                        inline: true,
                    },
                    {
                        name: 'Długość:',
                        value: postData.acf.czas_trwania ? `${postData.acf.czas_trwania} min` : 'Brak informacji',
                        inline: true,
                    },
                ];
    
                const file = path.resolve(__dirname, '../configs/pings.txt');
                const readStream = fs.createReadStream(file);
                const readLines = readline.createInterface({input: readStream});
                let specificAnimeId;
                readLines.on('line', (line) => {
                    if (postData.link.split('/')[4].includes(line.split(';')[2]))
                        specificAnimeId = line.split(';')[1];
                });
    
                readLines.on('close', () => {
                    const descripton = `Zapraszany do oglądania! ${roleMention(odcinkiRoleId)} ${specificAnimeId ? roleMention(specificAnimeId) : ''}`;
    
                    const postEmbed = new EmbedBuilder()
                        .setColor(0x950A0A)
                        .setTitle(postData.title.rendered)
                        .setURL(postData.link)
                        .setAuthor({ name: postData._embedded.author[0].name, iconURL: postData._embedded.author[0].avatar_urls["24"], url: postData._embedded.author[0].link })
                        .setDescription(descripton)
                        .setThumbnail(thumbnailData)
                        .addFields(fields)
                        .setImage(imageData)
                        .setTimestamp()
                        .setFooter({ text: 'AnimeNi', iconURL: 'https://animeni.pl/wp-content/uploads/2022/12/logo-v2.png' });
        
                    const channel = client.channels.cache.get(animeChannelId);
                    channel.send({ embeds: [postEmbed] }); 
                });

                if (!i){
                    const newLastKnownVideoId = JSON.stringify({ "lastKnownVideoId" : postData.id });
                    const fileToUpdate = path.resolve(__dirname, '../configs/episodes.json');
                    fs.writeFile(fileToUpdate, newLastKnownVideoId, (error) => {
                        if (error) console.log(error);
                    });
                }
            }
        }
    },
};