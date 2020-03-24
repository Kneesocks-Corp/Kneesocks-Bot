const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class AhegaoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'couple',
            memberName: 'couple',
            group: 'nsfw',
            description: 'Sends a random Couple Image from Danbooru',
            guarded: true,
            guildOnly: true,
        })
    }
    run(msg) {
        booru.posts({
            random: "true",
            tags: 'couple order:date'
        }).then(posts => {
            const index = Math.floor(Math.random() * posts.length);
            const post = posts[index];

            const url = booru.url(post.large_file_url);
            msg.react("đ");
            msg.delete(1500);
            const embed = new Discord.RichEmbed()
                .setDescription("Here are some hot Couples")
                .setColor('#FFFFFF')
                .setImage(url)
                .setFooter(`Requested by ${msg.member.displayName}`)
                .setTimestamp();
            msg.channel.send(embed);
        })
    }
}