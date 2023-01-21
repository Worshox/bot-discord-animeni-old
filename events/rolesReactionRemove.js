const { Events } = require('discord.js');
const { emojisMessageId } = require('../configs/config.json');
const allRoles = require('../configs/roles.json');

module.exports = {
    name: Events.MessageReactionRemove,
    async execute(reaction, user){
        if (reaction.message.id != emojisMessageId) return; 
        
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

        let role;
        for (const singleRole in allRoles)
            if (allRoles[singleRole] === reaction.emoji.name)
                role = reaction.message.guild.roles.cache.find(role => role.name === singleRole); 

        if (!role) return;
        
        member.roles.remove(role);
    },
};