const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sahegao',
            memberName: 'sahegao',
            group: 'fun',
            description: 'Sends a random Safe for Work Ahegao Image from Danbooru',
            guarded: true,
        })
    }
    run(msg) {
        booru.posts({
            random: "true",
            tags: 'rating:safe ahegao order:date'
        }).then(posts => {
            const index = Math.floor(Math.random() * posts.length);
            const post = posts[index];

            const url = booru.url(post.large_file_url)
            msg.react("👍")
            msg.delete(1500)
            const embed = new Discord.RichEmbed()
                .setDescription("Here are random Ahegao Faces")
                .setColor('#FFFFFF')
                .setImage(url)
                .setFooter(`Requested by ${msg.member.displayName}`)
                .setTimestamp();
            msg.channel.send(embed);
        })
    }
}
