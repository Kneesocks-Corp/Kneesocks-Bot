const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const Danbooru = require('danbooru')
const booru = new Danbooru()



client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content.startsWith(botSettings.prefix + 'ahegao')) {
        booru.posts({
            tags: 'rating:safe ahegao order:date'
        }).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]

            // Get post's url and create a filename for it
            const url = booru.url(post.file_url)
            let cnt = message.content
            const cn = message.channel
            message.delete(1500) // deletes message in 1500ms
            const embed = new Discord.RichEmbed()
                .setImage(post.file_url)
                .setDescription("Here are some Ahegao Faces")
                .setColor('#FFFFFF')
                .setTimestamp();
            message.channel.send({
                embed
            }, )
        })
    }
}, )

client.on('message', message => {
    if (message.content.startsWith(botSettings.prefix + 'kneesocks')) {
        booru.posts({
            tags: 'rating:safe kneesocks order:date'
        }).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]

            // Get post's url and create a filename for it
            const url = booru.url(post.file_url)
            const embed = new Discord.RichEmbed()
                .setImage(post.file_url)
                .setDescription("Here are some Kneesocks")
                .setColor('#FFFFFF')
                .setTimestamp();
            message.channel.send({
                embed
            }, )
        })
    }
}, )


client.on('message', message => {
        if (message.content.startsWith(botSettings.prefix + 'avatar')) {
            let user = message.mentions.users.first();
            if (!user) user = message.author;
            let cnt = message.content
            const cn = message.channel
            message.delete(1500) // deletes message in 1500ms
            const embed = new Discord.RichEmbed()
                .setImage(user.avatarURL)
                .setDescription(`Here is the Avatar of ${message.mentions.users.displayName}`)
                .setColor('#FFFFFF')
                .setTimestamp();
            message.channel.send({
                embed
            });
        }
    }),

    client.login(botSettings.token);
