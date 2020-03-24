const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ahegao',
            memberName: 'ahegao',
            group: 'fun',
            description: 'Sends a random Ahegao Image from Danbooru',
            guarded: true,
        })
    }
    run(msg, {
        type
    }) {
        booru.posts({
            random: "true",
            tags: 'rating:safe ahegao order:date'
        }).then(posts => {
            const index = Math.floor(Math.random() * posts.length);
            const post = posts[index];

            const url = booru.url(post.file_url)
            msg.react("👍")
            msg.delete(1500)
            const embed = new Discord.RichEmbed()
                .setDescription("Here are random Ahegao Faces")
                .setColor('#FFFFFF')
                .setImage(post.file_url)
                .setFooter(`Requested by ${msg.member.displayName}`)
                .setTimestamp();
            msg.channel.send(embed);
        })
    }
}
