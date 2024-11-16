const {SlashCommandBuilder, User, userMention} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iq')
        .setDescription('UwU Bot obliczy twój iloraz inteligencji'),
    async execute(interaction) {
        
        const kupa = Math.random() * 100;
       
       
        if (interaction.user.id === '570206277960073228') {
               
                if (kupa < 10){
                        iq = Math.floor(Math.random() * 99) + 50;
                } else {  iq = Math.floor(Math.random() * 301) + 50;}
        }
        
       else { 
                 if (kupa < 95){
                         iq = Math.floor(Math.random() * 99) + 50;
                 } else {  iq = Math.floor(Math.random() * 251) + 50;}
                }
      
                if (iq < 84) {
                 odpowiedz = `Twoje iq wynosi: ${iq} :zany_face:`}
          else if (iq < 116) {
                  odpowiedz = `Twoje iq wynosi: ${iq} :slight_smile:`
          }else if (iq < 132){
                  odpowiedz = `Twoje iq wynosi: ${iq} :face_with_monocle:`
          }else if (iq < 148){
                  odpowiedz = `Twoje iq wynosi: ${iq} :nerd:`
          }else {
                  odpowiedz = `Twoje iq wynosi: ${iq} :disguised_face:`
          }
        
       
        await interaction.reply(odpowiedz);
}
};