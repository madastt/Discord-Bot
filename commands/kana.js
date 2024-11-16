const {SlashCommandBuilder, User, userMention} = require('discord.js');
const wanakana = require('wanakana');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('konwersja')
    .setDescription('konwersja na hiragane/katakane/romaji')
    .addStringOption(option =>
        option.setName('alfabet')
            .setDescription('Na który alfabet skonwertować')
            .setRequired(true)
            .addChoices(
                { name: 'Hiragana', value: 'hiragana'},
                { name: 'Katakana', value: 'katakana'},
                { name: 'Hiragana i Katakana', value: 'both'},
                { name: 'Romaji', value: 'romaji'}))
    .addStringOption(option =>
        option.setName('tekst')
            .setDescription('input')
            .setRequired(true)),
    async execute(interaction){
        var alfabet = interaction.options.getString('alfabet');
        var tekst = interaction.options.getString('tekst');
        var wynik;
        if (alfabet === 'hiragana'){
            wynik = wanakana.toHiragana(tekst)
        }
        else if (alfabet === 'katakana'){
            wynik = wanakana.toKatakana(tekst)
        }
        else if (alfabet === 'both'){
            wynik = wanakana.toHiragana(tekst) + "\n" + wanakana.toKatakana(tekst)
        }
        else if (alfabet === 'romaji'){
            wynik = wanakana.toRomaji(tekst)
        }
    
    await interaction.reply(`**${wynik}**`);
        }
    }