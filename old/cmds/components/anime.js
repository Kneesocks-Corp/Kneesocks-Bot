const Discord = require("discord.js");
const settings = require("../../settings.json"); //Or wherever your store your token.
const anilist = require("anilist-node");
const Anilist = new anilist(settings.token /* This being your token */);

module.exports = {
  description: "Null",
  name: "anime",
  category: "fun",
  guildOnly: true,

  async execute(yukii, message, args, error) {
    const id = Anilist.media.anime(id).then((data) => {
      if (error) {
        return;
      } else {
        message.channel.send("```Heres what i found:```" + data);
        console.log(data);
      }
    });
  },
};
