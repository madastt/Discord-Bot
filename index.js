require("dotenv").config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits,} = require('discord.js');
const {QuickDB} = require(`quick.db`)
const db = new QuickDB()

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
	], });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
	client.user.setActivity('');
	
});


 client.on(Events.MessageCreate, message => {
	if (message.content.includes('resetuj sie bocie')) {
		message.reply("Resetuję się!brr brr brr wziuum pik pik pik").then(() => {
			process.exit(); // Kończy proces bota
		});
	}
}
);

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Cosik nie działa', ephemeral: true });
	}
});
client.on(Events.GuildMemberAdd, async (member) => {

	const role = await db.get(`autorole_${member.guild.id}`);
	const giveRole = await member.guild.roles.cache.get(role);

	member.roles.add(giveRole);
})
const token = process.env.DISCORD_TOKEN;

client.login(token);
