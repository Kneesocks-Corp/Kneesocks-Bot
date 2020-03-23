const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
        if (message.content.startsWith(botSettings.prefix + 'avatar')) {
            let user = message.mentions.users.first();
            if (!user) user = message.author;
            message.react('👍')
            let cnt = message.content
            const cn = message.channel
            message.delete(1000) // ?
            const embed = new Discord.RichEmbed()
                .setImage(user.avatarURL)
            message.channel.send({
                embed
            });
        }
    }),

    client.on('message', message => {
        if (message.content === botSettings.prefix + 'test') {
            message.channel.send('Im alive');
        }

    });

client.login(botSettings.token);
