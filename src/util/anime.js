const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const settings = require("../../config.json"); //Or wherever your store your token.
const anilist = require("anilist-node");
const { APIKey } = require("../../settings.json");
const Anilist = new anilist(APIKey /* This being your token */);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Search for an anime on Anilist")
    .addStringOption((option) =>
      option
        .setName("anime")
        .setDescription("The anime you want to search for")
        .setRequired(true)
    ),
  async execute(interaction) {
    const anime = interaction.options.getString("anime");
    const search = await Anilist.search("anime", anime);
    console.log(search);
    const embed = new EmbedBuilder()
      .setTitle(search[0].title.romaji)
      .setURL(search[0].siteUrl)
      .setDescription(search[0].description)
      .addFields(
        { name: "Episodes", value: search[0].episodes, inline: true },
        { name: "Status", value: search[0].status, inline: true },
        {
          name: "Average Score",
          value: search[0].averageScore,
          inline: true,
        },
        {
          name: "Genres",
          value: search[0].genres.join(", "),
          inline: true,
        },
        { name: "Format", value: search[0].format, inline: true },
        {
          name: "Studios",
          value: search[0].studios.nodes[0].name,
          inline: true,
        },
        { name: "Trailer", value: search[0].trailer.site, inline: true }
      )
      .setImage(search[0].coverImage.large)
      .setColor("#ff0000");
    interaction.reply({ embeds: [embed] });
  },
};
