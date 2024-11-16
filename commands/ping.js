const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('odpowiada na ping'),
    async execute(interaction) {
        await interaction.reply('Pong');
    }
};