const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(botSettings.token);
