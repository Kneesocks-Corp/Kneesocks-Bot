const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
const client = new Discord.Client();

bot.om('ready', () => {
    console.log('Ready!');
});

bot.login(botSettings.token);
