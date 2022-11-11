const Discord = require("discord.js");
const fs = require("fs");
const cronJob = require("cron");
const snekfetch = require("snekfetch");
const msFix = require("ms");
const yukii = new Discord.Client({
  disableEveryone: true,
});
yukii.commands = new Discord.Collection();
const { PREFIX, APIKey, token } = require("./settings.json");

// /--- Connect-Path ---\ \\

yukii.login(token);

// /--- Command Handler ---\ \\
// Credits to rikuwu \\

for (const file of fs
  .readdirSync("./cmds/components")
  .filter((file) => file.endsWith(".js"))) {
  yukii.commands.set(yukii.name, yukii);
  yukii.commands.set(
    require(`./cmds/components/${file}`).name,
    require(`./cmds/components/${file}`)
  );
}
yukii.on("message", (message) => {
  if (
    !message.content.startsWith(PREFIX) ||
    message.author.bot ||
    message.channel.type === "DM"
  )
    return;
  const args = message.content.slice(PREFIX.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  if (!yukii.commands.has(cmd)) return;
  try {
    yukii.commands.get(cmd).execute(yukii, message, args);
  } catch (err) {
    console.error(err);
    message.channel.send("```There was an error: " + err + "```");
  }
});

yukii.on("ready", async () => {
  yukii.user.setActivity("Bot recode! " + "| -k help");
  console.log(`Logged in as ${yukii.user.tag}!`);
  // yukii.user.setActivity('in ' + `${yukii.guilds.size} Servers ` + '| Prefix: -k')
});
