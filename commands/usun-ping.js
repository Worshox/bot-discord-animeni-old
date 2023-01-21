const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const arrayToTxtFile = require('array-to-txt-file');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('usun-ping')
        .setDescription('Usuwa rolę z pingowania odcinków')
        .addRoleOption(option => option
            .setName('rola')
            .setDescription('Rola krórą chcesz usunąć')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const role = interaction.options.getRole('rola');
        const file = path.resolve(__dirname, '../configs/pings.txt');

        let pingFile;
        let pingDeleted = false;
        fs.readFile(file, async (err, data) => {
            if (err) throw err;
            pingFile = data.toString().split('\n');
            for (line of pingFile) {
                if (line.split(';')[0] === role.name && line.split(';')[1] === role.id){
                    pingFile.splice(pingFile.indexOf(line), 1);
                    pingDeleted = true;
                }
            }
            
            pingFile = pingFile.filter(Boolean);

            if (pingDeleted)
            arrayToTxtFile(pingFile, './pings.txt', (err) => {if(err) throw err;});
            
            let interactionReplyText;
            if(pingDeleted){
                console.log(`Role \t ${role.name} (id ${role.id}) \t has been removed from pings.`);
                interactionReplyText = `Rola **${role.name}** została usunięta z pingów odcinków.`;
            } else{
                console.log(`Role \t ${role.name} (id ${role.id}) \t does not exist in pings!`);
                interactionReplyText = `Rola **${role.name}** nie jest zapisana do pingów!`;
            }
            await interaction.reply(interactionReplyText);
        });
    },
};