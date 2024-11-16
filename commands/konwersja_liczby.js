const {SlashCommandBuilder, User, userMention} = require('discord.js');
var NumberConverter = require("number-converter").NumberConverter;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('przelicz')
    .setDescription('przeliczam na rozne systemy liczbowe pozdro')
    .addStringOption(option =>
        option.setName('baza')
        .setDescription('Z jakiego systemu przeliczamy mordeczko')
        .setRequired(true)
        .addChoices(
            {name:'Dziesiętny', value: 'DECIMAL'},
            {name:'Dwójkowy', value: 'BINARY'},
            {name:'Szesnastkowy', value: 'HEXADECIMAL'}
        )
    )
    .addIntegerOption(option =>
        option.setName('liczba')
        .setDescription('Liczba do przeliczenia')
        .setRequired(true)
    ),
    async execute(interaction){
        const base = interaction.options.getString('baza');
        const number = interaction.options.getInteger('liczba');

        let fromBase;
        if (base === 'DECIMAL') {
            fromBase = NumberConverter.DECIMAL;
        } else if (base === 'BINARY') {
            fromBase = NumberConverter.BINARY;
        } else if (base === 'HEXADECIMAL') {
            fromBase = NumberConverter.HEXADECIMAL;
        }


        var nc1 = new NumberConverter(fromBase, NumberConverter.DECIMAL);
        var nc2 = new NumberConverter(fromBase, NumberConverter.BINARY);
        var nc3 = new NumberConverter(fromBase, NumberConverter.HEXADECIMAL);

        var result = 'Dziesiętnie: ' + nc1.convert(number)+'\nDwójkowo: ' + nc2.convert(number) + '\nSzesnastkowo: ' + nc3.convert(number);

    await interaction.reply(result);
    }
}