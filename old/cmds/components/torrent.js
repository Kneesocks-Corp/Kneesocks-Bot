const Discord = require("discord.js");
const xtorrent = require("xtorrent");

module.exports = {
  description: "Null",
  name: "torrent",
  category: "misc",
  guildOnly: true,

  async execute(yukii, message, args) {
    xtorrent.search({ query: args }).then((data) => {
      const Toorent = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(
          ":negative_squared_cross_mark: **Here is what i found** :negative_squared_cross_mark:"
        )
        .addField(`WIP`, `***This is WIP***`);

      message.channel.send(Toorent);
    });
  },
};
