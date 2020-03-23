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
            const embed = new Discord.RichEmbed()
                .setImage(user.avatarURL)
            message.channel.send({
                embed
            });
        }
    }),

    client.on('message', message => {
        if (message.content === botSettings.prefix + 'Test') {
            message.channel.send('Im alive');
            then(msg => {
                msg.delete(10000)

            })
        }
    });

client.login(botSettings.token);
