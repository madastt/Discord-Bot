const { SlashCommandBuilder } = require('discord.js');
const { PermissionsBitField, EmbedBuilder } = require(`discord.js`);
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	], });

module.exports = {
    data: new SlashCommandBuilder()
    .setName('roleall')
    .setDescription('Nadaje wszystkim użytkownikom podaną rolę')
    .addRoleOption( option =>
        option.setName('role').setDescription('Rola, którą dostaną wszyscy użytkownicy').setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return await interaction.reply({ content: "Ups wygląda na to, że nie masz odpowiedniej rangi aby użyć tej komendy >.<", ephemeral: true});
        
        const role = interaction.options.getRole('role');

        const guild = interaction.guild

        const members = await guild.members.fetch();

        members.forEach(async (member) => {
            await member.roles.add(role);
        });

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:thumbsup_tone1:  Każdy użytkownik ma teraz role ${role} ^.^`)

        await interaction.reply({embeds: [embed]});
    }
}