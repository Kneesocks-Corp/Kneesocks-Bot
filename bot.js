const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content === botSettings.prefix + 'av') {
        let embed = new Discord.RichEmbed()
            // Replace "message.member" with "message.author"
            .setImage(message.author.avatarURL)
            .setColor('#275BF0')
        message.channel.send(embed)
    }
});

client.on('message', message => {
    if (message.content === botSettings.prefix + 'ranime') {
        message.channel.send('Pong.');
    }
});

client.login(botSettings.token);
