const { Events } = require('discord.js');
const { userAnimeNiRole, statuteMessageId } = require('../configs/config.json');

module.exports = {
    name: Events.MessageReactionRemove,
    async execute(reaction, user){
        if (reaction.message.id != statuteMessageId || reaction.emoji.name != '✅') return;
        
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error){
                console.log('Nastąpił problem przy fetchowaniu wiadomości: ', error);
                return;
            }
        }

        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        const role = reaction.message.guild.roles.cache.get(userAnimeNiRole);

        member.roles.remove(role);
    },
};