const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class AhegaoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yuri',
            memberName: 'yuri',
            group: 'nsfw',
            description: 'Sends a random Yuri Image from Danbooru',
            guarded: true,
            guildOnly: true,
        })
    }
    run(msg) {
        if (msg.channel.nsfw === true) {
            booru.posts({
                random: "true",
                tags: 'yuri order:date'
            }).then(posts => {
                const index = Math.floor(Math.random() * posts.length);
                const post = posts[index];

                const url = booru.url(post.large_file_url);
                msg.react("đ");
                msg.delete(1500);
                msg.log(`Someone used Yuri Command ${guild.name} `);
                const embed = new Discord.RichEmbed()
                    .setDescription("Here are some Yuri Pics")
                    .setColor('#FFFFFF')
                    .setImage(url)
                    .setFooter(`Requested by ${msg.member.displayName}`)
                    .setTimestamp();
                msg.channel.send(embed);
            })
        }
        if (msg.channel.nsfw === false) {
            msg.react("đ")
            msg.delete(1500)
            msg.channel.send(`Hey ${msg.member.displayName}, please use this Command in an NSFW Channel`);
        }

    }
}
