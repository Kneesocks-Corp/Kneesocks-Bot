const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the ping of the bot"),
  async execute(interaction, client, config, db, Discord, allowed) {
    let msg = interaction;

    let pingEm = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Ping!")
      .setDescription(`${client.ws.ping}ms`);

    msg.reply({ embeds: [pingEm] });
  },
};
