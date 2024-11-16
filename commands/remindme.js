const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('minutnik')
        .setDescription('pinguje cie po podanym czasie')
        .addIntegerOption(option =>
            option.setName('minuty')
                .setDescription('ile minut')
                .setRequired(true))
        .addIntegerOption(option =>    
            option.setName('sekundy')
                .setDescription('ile sekund')
                .setRequired(false)),

async execute(interaction) {
    const minutes = interaction.options.getInteger('minuty');
    let seconds = interaction.options.getInteger('sekundy') || 0;
    
    if (minutes < 0 || seconds < 0){
        await interaction.reply({ content: 'nie może być ujemna liczba głuptasie >w<', ephemeral: true });
    } 

    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes()+ minutes);
    currentDate.setSeconds(currentDate.getSeconds()+ seconds);

    const answer = `Minutnik ustawiony na **${minutes} minut** i **${seconds} sekund** do ${currentDate}`;
    await interaction.reply(answer);
    const time = minutes*60000 + seconds*1000;
    setTimeout(() => {
        interaction.followUp(`<@${interaction.user.id}> Czas minął! 🔔`);
    },time);
}

};