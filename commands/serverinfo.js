const { SlashCommandBuilder, MessageEmbed, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Informacje o serwerze'),
  async execute(interaction) {
    const { guild } = interaction;

    const { members } = guild;
    const { name, ownerId, createdTimestamp, memberCount } = guild;
    const icon = guild.iconURL() || "https://media.discordapp.net/attachments/978035586168418334/978304826351943800/unnamed.png";
    const roles = guild.roles.cache.size;
    const emojis = guild.emojis.cache.size;
    const id = guild.id;

    let baseVerification = guild.verificationLevel;

    if (baseVerification == 0) baseVerification = "Żaden";
    if (baseVerification == 1) baseVerification = "Niski";
    if (baseVerification == 2) baseVerification = "Średni";
    if (baseVerification == 3) baseVerification = "Wysoki";
    if (baseVerification == 4) baseVerification = "Najwyższy";

    const embed = new EmbedBuilder()
      .setColor("BLUE")
      .setThumbnail(icon)
      .setAuthor({ name: name, iconURL: icon })
      .setFooter({ text: `ID serwera: ${id}` })
      .addFields({ name: "Nazwa", value: `${name}`, inline: false })
      .addFields({ name: "Data utworzenia", value: `<t:${parseInt(createdTimestamp / 1000)}:R>`, inline:true })
      .addFields({ name: "Właściciel", value: `<@${ownerId}>`, inline:true })
      .addFields({ name: "Ilość użytkowników", value: `${memberCount}`, inline:true })
      .addFields({ name: "Ilość roli", value: `${roles}`, inline:true })
      .addFields({ name: "Ilość emotek", value: `${emojis}`, inline:true })
      .addFields({ name: "Poziom weryfikacji", value: `${baseVerification}`, inline:true })
      .addFields({ name: "Ilość boostów", value: `${guild.premiumSubscriptionCount}`, inline:true });

    await interaction.reply({ embeds: [embed] });
  }
};