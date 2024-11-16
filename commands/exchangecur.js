const {SlashCommandBuilder, User, userMention} = require('discord.js');
const CC = require('currency-converter-lt');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('przelicznikwalut')
    .setDescription('przeliczanie waluty')
    .addStringOption(option =>
        option.setName('z')
        .setDescription('Z jakiej waluty przekonwertować')
        .setRequired(true)
        .addChoices(
            { name: 'Erłok', value: 'EUR'},
            { name: 'Dorar amerykański', value: 'USD'},
            { name: 'Rmb', value: 'CNY'},
            { name: 'Złotuwki', value: 'PLN'},
            { name: 'Jeny', value: 'JPY'}
        ))
    .addNumberOption(option =>
        option.setName('kwota')
        .setDescription('Ilość pieniendzów')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('na')
        .setDescription('Na jaką walutę przekonwertować')
        .setRequired(true)
        .addChoices(
            { name: 'Erło', value: 'EUR'},
            { name: 'Dorar amerykański', value: 'USD'},
            { name: 'Rmb', value: 'CNY'},
            { name: 'Złotuwki', value: 'PLN'},
            { name: 'Jeny', value: 'JPY'}
        )),
    async execute(interaction){
        try {
            const pocz = interaction.options.getString('z');
            const kwota = interaction.options.getNumber('kwota');
            const konc = interaction.options.getString('na');

            const currencyConverter = new CC({ from: pocz, to: konc, amount: kwota, isDecimalComma: false });

            // Using await to wait for the promise to resolve
            const result = await currencyConverter.convert();
            await interaction.reply(`${kwota} ${pocz} to ${result} ${konc}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('There was an error during currency conversion.');
        }
    },
};