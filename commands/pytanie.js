const {SlashCommandBuilder, CommandInteractionOptionResolver} = require('discord.js');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages
	], });


module.exports = {
    data: new SlashCommandBuilder()
    .setName('pytanie')
    .setDescription('zadaj pytanie a UwU Bot ci odpowie ^.^')
    .addStringOption(option =>
        option.setName('pytanie')
            .setDescription('zadaj pytanie a UwU Bot ci odpowie ^.^')
            .setRequired(true)),
    async execute(interaction) {
        const pled = client.emojis.cache.get('1037837610082635889');
        const up = client.emojis.cache.get('1037837600297332756');
        const pytanie = interaction.options.getString('pytanie');
        var odpowiedzi;
        if (pytanie.includes('spac') || pytanie.includes('spać')){
            odpowiedzi = ["Proszę zostań jeszcze chwilkę ", "Tak pozwalam ci wyśpij się kotku 😽", "Nie","Tak","Nie możesz iść teraz spać potrzebujemy cię ", 
            "Spadaj"]
        }
        else {odpowiedzi = ["A można jak najbardziej", "Tak słodziaczku :3", "To nie moja sprawa sorki", "Dobrze sie czujesz?","Głupota", "Nie ma bata", 
        "Zapytaj później ok","Na to się nie zgadzam","To się nie uda","Tak","Nie","Tak jest","Jestem na tak","Podobasz mi się ^_^","Nie wiem","Spadaj","Durne","Oczywiście",
        "Nie ma tak, że dobrze albo że nie dobrze","Być może","Beznadzieja","Nie ładnie tak","Pogadamy jutro","Mosz recht","Jeszcze sie doigrasz >.<",
        "Ładnie ładnie bardzo ciekawie elegancko haj","Dokladnie tak dokladnie tak","Odczep sie >.<"] }
        
        const odpowiedzi2 = odpowiedzi[Math.floor(Math.random() * odpowiedzi.length)];
        //console.log(odpowiedzi[odpowiedzi2])
       await interaction.reply(`*${pytanie}*\n**${odpowiedzi2}**`)},
       
        
        }
    
    
    

    
    
