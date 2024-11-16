const {SlashCommandBuilder, CommandInteractionOptionResolver} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('losuj')
        .setDescription('losuje z podanych elementów')
        .addStringOption(option =>
            option.setName('wartosci')
                .setDescription('Wpisz wartości oddzielone spacją')
                .setRequired(true)),
                               

    async execute(interaction) {
        const wartosci = interaction.options.getString('wartosci');
        // console.log(wartosci)
        const slowa = wartosci.split(' ')
        //console.log(slowa)
       
        const random = slowa[Math.floor(Math.random()*slowa.length)];
        // console.log(random)
        await interaction.reply(`*${wartosci}*\n**${random}**`);
    }
};