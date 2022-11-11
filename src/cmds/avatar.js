const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription(
      "Get the avatar URL of the selected user, or your own avatar."
    )
    .addUserOption((option) =>
      option.setName("target").setDescription("The user's avatar to show")
    ),
  async execute(interaction, client, config, db, Discord, allowed) {
    const user = interaction.options.getUser("target");
    if (user) {
      const embed = new EmbedBuilder()
        .setTitle(`${user.username}'s avatar`)
        .setImage(user.displayAvatarURL({ dynamic: true }))
        .setColor("#ff0000");
      interaction.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s avatar`)
        .setImage(
          interaction.user.displayAvatarURL({
            dynamic: true,
            size: 1024,
            format: "png",
          })
        )
        .setColor("#ff0000");
      interaction.reply({ embeds: [embed] });
    }
  },
};
