const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { bot_info } = require("../../settings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get info about the Kneesocks bot."),
  async execute(interaction) {
    const ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(0);
    const guildsize = interaction.client.guilds.cache.size;

    const embed = new EmbedBuilder();
    embed.setTitle(":wrench:  **Bot Statistics** :wrench:");
    embed.setColor("#ff0000");
    embed.setThumbnail("https://i.imgur.com/SL1L9Bn.png");
    embed.addFields(
      { name: "Bot Version", value: bot_info.version, inline: false },
      { name: "Node Version", value: process.version, inline: false },
      { name: "Bot Creator", value: bot_info.creator, inline: false },
      { name: "Bot Memory Usage", value: `${ram}MB`, inline: false },
      {
        name: "Server Count",
        value: `${guildsize} Servers`,
        inline: false,
      }
    );
    interaction.reply({ embeds: [embed] });
  },
};
