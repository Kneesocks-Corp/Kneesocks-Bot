const botSettings = require("./botsettings.json");
const ranime = require("./ranime,js")
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content === botSettings.prefix + 'ping') {
        // send back "Pong." to the channel the message was sent in
        ranime;
    }
});

client.on('message', message => {
    if (message.content === botSettings.prefix + 'ranime') {
        message.channel.send('Pong.');
    }
});

client.login(botSettings.token);
