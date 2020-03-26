const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class AhegaoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ahegao',
            memberName: 'ahegao',
            group: 'nsfw',
            description: 'Sends a random NSFW Ahegao Image from Danbooru',
            guarded: true,
            guildOnly: true,
        })
    }
    run(msg) {
        if (message.channel.nsfw === true) {
            booru.posts({
                random: "true",
                tags: 'ahegao order:date'
            }).then(posts => {
                const index = Math.floor(Math.random() * posts.length);
                const post = posts[index];

                const url = booru.url(post.large_file_url);
                msg.react("👍");
                msg.delete(1500);
                const embed = new Discord.RichEmbed()
                    .setDescription("Here are random Ahegao Faces")
                    .setColor('#FFFFFF')
                    .setImage(url)
                    .setFooter(`Requested by ${msg.member.displayName}`)
                    .setTimestamp();
                msg.channel.send(embed);
            })
        } else
            message.channel.send("The Channel isnt NSFW");
    }

}
