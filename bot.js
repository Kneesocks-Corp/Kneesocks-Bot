const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const Danbooru = require('danbooru')
const booru = new Danbooru()



client.once('ready', () => {
    console.log('Ready!');
});


client.on('message', message => {
    if (message.content.startsWith(botSettings.prefix + 'danbooru')) {
        booru.posts({
            tags: 'rating:safe order:rank'
        }).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]

            // Get post's url and create a filename for it
            const url = booru.url(post.file_url)
            const embed = new Discord.RichEmbed()
                .setImage(post.file_url)
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
            message.react('👍')
            let cnt = message.content
            const cn = message.channel
            message.delete(1500) // deletes message in 1500ms
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
            message.react('👍') // reacts with emojie. can be changed if you need
            let cnt = message.content
            const cn = message.channel
            message.delete(1500) // deletes message in 1500ms
        }

    });

client.login(botSettings.token);
