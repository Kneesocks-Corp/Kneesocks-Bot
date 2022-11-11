const {
  SlashCommandBuilder,
  EmbedBuilder,
  Message,
  TextChannel,
} = require("discord.js");
const Booru = require("booru");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("booru")
    .setDescription("Search for an Picture on Booru")
    .addStringOption((option) =>
      option
        .setName("tags")
        .setDescription("The tags you want to search for")
        .setRequired(true)
    ),
  async execute(interaction, client, config, db, Discord, allowed) {
    const errormess = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle(":warning:  **Error** :warning:")
      .setDescription("**Please use this Command in an NSFW Channel**")
      .setThumbnail("https://i.imgur.com/SL1L9Bn.png");
    if (!interaction.channel.nsfw) {
      interaction.reply({ embeds: [errormess] });
    } else {
      tags = interaction.options.getString("tags");
      Booru.search("gb", [tags, "rating:e"], {
        limit: 1,
        random: true,
      }).then((posts) => {
        if (posts.length === 0) {
          const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle(":warning:  **Error** :warning:")
            .setDescription(
              "**No Results Found, Please try again with different tags**"
            )
            .setThumbnail("https://i.imgur.com/SL1L9Bn.png");
          interaction.reply({ embeds: [embed] });
        } else {
          for (let post of posts) {
            const embed = new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle(
                `:frame_photo:  **Booru** :frame_photo: | Tags: ${tags}`
              )
              .setImage(post.fileUrl)
              .setURL(post.postView)
              .setDescription(`**Post Link:** ${post.postView}`)
              .addFields({
                name: "ID",
                value: post.id,
                inline: true,
              });
            interaction.reply({ embeds: [embed] });
          }
        }
      });
    }
  },
};
