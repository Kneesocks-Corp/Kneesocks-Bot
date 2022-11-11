const Discord = require("discord.js");
var fs = require("fs");

// 835939997538189322

module.exports = {
  name: "avatar",
  description: "null",
  guildOnly: true,
  category: "Misc",

  execute(message, yukii, args, error) {
    if (!args.length) {
      return yukii.channel.send(error);
    } else if (args[1]) {
      const guild = Discord.Guild.cache.fetch("835939997538189322");
      let users = guild.cache.array.forEach((members) => {
        if (members.Activity.details || members.Activity.state == "flyteam") {
          fs.writeFile(
            "./data/flyteam.json",
            JSON.stringify(
              members.Activity.details + " " + members.Activity.state
            ),
            (err) => {
              console.log(err);
            }
          );
        } else {
          console.log(members.name + " is not playing anything");
        }
      });
    }
  },
};
