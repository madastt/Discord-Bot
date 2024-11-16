const {SlashCommandBuilder, CommandInteractionOptionResolver} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rzutmonetą')
        .setDescription('rzut monetą(po jednej stronie UwU a po drugiej OwO)'),
    async execute(interaction) {
        var wynik;
        const wartosc = Math.random() >= 0.5 ? wynik="UwU" : wynik="OwO" ;

        await interaction.reply(wynik);
    }
};