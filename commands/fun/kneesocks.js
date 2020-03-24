const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const axious = require('axios');
const booru = new Danbooru();

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kneesocks',
            memberName: 'kneesocks',
            group: 'fun',
            description: 'Sends a random Kneesocks Image from Danbooru',
            guarded: true,
        })
    }
    run(msg) {
        booru.posts({
            random: "true",
            tags: 'rating:safe kneehighs order:date'
        }).then(posts => {
            const index = Math.floor(Math.random() * posts.length);
            const post = posts[index];

            const url = booru.url(post.large_file_url)
            msg.react("👍")
            msg.delete(1500)
            const embed = new Discord.RichEmbed()
                .setDescription("Here are random Kneesocks")
                .setColor('#FFFFFF')
                .setImage(url)
                .setFooter(`Requested by ${msg.member.displayName}`)
                .setTimestamp();
            msg.channel.send(embed);
        })
    }
}
