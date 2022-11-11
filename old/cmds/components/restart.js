const write = require("fs").writeFileSync;

module.exports = {
  description: "Null",
  name: "restart",
  category: "Owner",
  ownerOnly: true,
  guildOnly: true,

  async execute(yukii, message) {
    if (["202740603790819328"].indexOf(message.author.id) === -1)
      return message.channel.send(
        `Access has been denied \`${message.author.tag}\`. \nReason: \nDo not have correct permission.`
      );
    let m = await message.channel.send("**Restarting. . .**");
    write(
      "./restartMessage",
      JSON.stringify({
        channel: m.channel.id,
        message: m.id,
      }),
      "utf8"
    );
    process.exit();
  },
};
