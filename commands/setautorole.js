const { SlashCommandBuilder } = require('discord.js');
const { PermissionsBitField, EmbedBuilder } = require(`discord.js`);
const { QuickDB } = require(`quick.db`);
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setautorole')
    .setDescription(`Ustawia automatyczną rolę dla nowych użytkowników`)
    .addRoleOption(option =>
        option.setName(`role`).setDescription(`To rola, którą chcesz jako twoją autorolę`).setRequired(true)),
    async execute(interaction) {
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return await interaction.reply({ content: "Ups wygląda na to, że nie masz odpowiedniej rangi aby użyć tej komendy >.<", ephemeral: true});

        const role = interaction.options.getRole(`role`);

        await db.set(`autorole_${interaction.guild.id}`, role.id);

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:thumbsup_tone1:  Twoja autorola została ustawiona na ${role}`)

        await interaction.reply({embeds: [embed]});
    }
}