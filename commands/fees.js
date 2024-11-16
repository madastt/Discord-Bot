const {SlashCommandBuilder, User, userMention} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cenasprzedaz')
    .setDescription('Oblicza cene po sprzedaniu itemu na steam market albo buff163')
    .addNumberOption(option =>
        option.setName('cena')
        .setDescription('Cena za którą wystawiasz crafta z nwordem')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('platforma')
        .setDescription('Wybierz platforme(tylko nie obywatelską (nienawidze tuska))')
        .setRequired(true)
        .addChoices(
            { name: "Steam", value: "steam"},
            { name: "Buff163", value: "buff"})),
    async execute(interaction){
        const platform = interaction.options.getString('platforma');
        const price = interaction.options.getNumber('cena');
        var wynik;

        if (platform == "steam"){
            wynik = Math.ceil(price/1.15* 100) / 100;
        }
        else if (platform == "buff") wynik = Math.floor((price-(0.025*price)) * 100) / 100;
        await interaction.reply(wynik.toString());
    }}
        

        