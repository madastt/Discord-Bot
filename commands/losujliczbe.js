const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('losujliczbę')
        .setDescription('losuje liczbę z podanego zbioru')
        .addIntegerOption(option =>
            option.setName('od')
                .setDescription('Liczba początkowa')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('do')
                .setDescription('Liczba końcowa')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('ilość')
                .setDescription('Ilość wylosowanych liczb')),
        
        async execute(interaction) {
            const first = interaction.options.getInteger('od');
            const second = interaction.options.getInteger('do');
            const amount = interaction.options.getInteger('ilość');
            var wynik = "";

            if (second < first){
                await interaction.reply({ content: 'Liczba początkowa nie może być wyższa od końcowej głuptasie >w<', ephemeral: true });
            }
            else    {
            if (amount == null) {
                wynik += (Math.floor(Math.random() * (second - first + 1)) + first);
                var result = `*Wylosowano liczbę z zakresu od ${first} do ${second}:*\n**${wynik}**`;
            } else {
                for (let i = 1; i <= amount; i++ ){
                    wynik += (Math.floor(Math.random() * (second - first + 1)) + first);
                    if (i < amount){
                        wynik += ", ";
                    }
                }
                var result = `*Wylosowano ${amount} liczby z zakresu od ${first} do ${second}:*\n**${wynik}**`;
            }
        
            await interaction.reply(result);
        }
            


        }
};