const Discord = require("discord.js");
const { dependencies } = require("./../../package.json");

module.exports = {
  name: "dependencies",
  description: "null",
  category: "information",
  guildOnly: true,

  execute(message, yukii) {
    const StatsEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setThumbnail("https://i.imgur.com/SL1L9Bn.png")
      .setTitle(":wrench:  **Dependencies** :wrench:")
      .addField("**DiscordJS**", `**${dependencies["discord.js"]}**`)
      .addField("**Moment**", `**${dependencies.moment}**`)
      .addField(
        "**Moment-duration-format**",
        `**${dependencies["moment-duration-format"]}**`
      )
      .addField("**Eslint**", `**${dependencies.eslint}**`)
      .addField("**Standard**", `**${dependencies.standard}**`);

    return yukii.channel.send(StatsEmbed);
  },
};
