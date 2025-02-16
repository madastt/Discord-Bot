const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const axios = require('axios');

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stan')
        .setDescription('Screenshot z streama')
        .addStringOption(option =>
            option.setName('platforma')
                .setDescription('Jaka platforma streama')
                .setRequired(true)
                .addChoices(
                    { name: 'Kick', value: 'kick' },
                    { name: 'Twitch', value: 'twitch' }
                )
        )
        .addStringOption(option =>
            option.setName('nazwa')
                .setDescription('Nazwa kanału')
                .setRequired(true)
        ),
        
    async execute(interaction) {
        puppeteer.use(StealthPlugin());
        await interaction.deferReply(); // Defer the reply since screenshot might take time
        
        const platform = interaction.options.getString('platforma');
        const channelName = interaction.options.getString('nazwa');
        let url;
        
        // Determine URL based on platform
        if (platform === 'kick') {
            url = `https://kick.com/${channelName}`;
        } else if (platform === 'twitch') {
            url = `https://player.twitch.tv/?channel=${channelName}&parent=twitch.tv`;
        }

        let browser;
        try {
            browser = await puppeteer.launch({ 
                headless: true,
                defaultViewport: {
                    width: 1920,
                    height: 1080
                },
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process'
                ]
            });
            
            const page = await browser.newPage();
            
            // Set a user agent
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

            await page.setExtraHTTPHeaders({
                'accept-language': 'en-US,en;q=0.9',
                'sec-ch-ua': '"Chromium";v="121", "Google Chrome";v="121", ";Not A Brand";v="99"'
            });

            await page.goto(url, { 
                waitUntil: 'networkidle2',
                timeout: 60000 
            });

            // Wait for content to load
            await page.waitForSelector('video');


            if (platform === 'kick') {
                const button = await page.$$("xpath/.//button[contains(., '18')]");
            if (button.length > 0) {
                await button[0].click();
                console.log("Kliknięto przycisk 18+");
            } else {
                console.log("Przycisk 18+ nie znaleziony");
            }
            }   
            else if (platform === 'twitch'){
                {const button = await page.$$("xpath/.//button[contains(., 'Watching')]");
                    if (button.length > 0) {
                        await button[0].click();
                        console.log("Kliknięto przycisk 18+");
                    } else {
                        console.log("Przycisk 18+ nie znaleziony");
                    }
            }
        }

            await page.keyboard.press('f');

            // Take screenshot
            const screenshotPath = 'stream-screenshot.png';
            await page.screenshot({ path: screenshotPath, fullPage: true });

            const image = fs.readFileSync(screenshotPath, { encoding: 'base64' });
            const response = await axios.post('https://api.imgur.com/3/image', {
            image: image,
            type: 'base64'
         }, {
            headers: { Authorization: `Client-ID ${IMGUR_CLIENT_ID}` }
         });

            // Create attachment and send reply
           // const attachment = new AttachmentBuilder('stream-screenshot.png');
           await interaction.editReply({
            content: `Screenshot z kanału ${channelName} na platformie ${platform}: ${response.data.data.link}`
        });

            

            // Clean up
            await browser.close();
            if (fs.existsSync('stream-screenshot.png')) {
                fs.unlinkSync('stream-screenshot.png');
            } // Delete the screenshot file after sending

        } catch (error) {
            console.error('An error occurred:', error);
            if (browser) {
                await browser.close();
            }
            await interaction.editReply('Wystąpił błąd podczas robienia screenshota. Spróbuj ponownie później.');
        }
    },
};