const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
exports.run = async (client, message, args) => {

    module.exports = class DanbooruCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'ahegao',
                memberName: 'ahegao',
                group: 'nsfw',
                description: 'Send a NSFW Ahegao Image',
                guarded: true,
                args: [{
                    key: 'type',
                    prompt: 'Please enter a type:',
                    type: 'string',
                }, ]
            })
        }
        run(msg, {
            type
        }) {
            booru.posts({
                random: "true",
                tags: 'rating:unsafe ahegao order:date'
            }).then(posts => {
                const index = Math.floor(Math.random() * posts.length);
                const post = posts[index];

                const url = booru.url(post.large_file_url)
                msg.react("đ")
                msg.delete(1500)
                const embed = new Discord.RichEmbed()
                    .setDescription("Here are random Ahegao Faces")
                    .setColor('#FFFFFF')
                    .setImage(post.large_file_url)
                    .setFooter(`Requested by ${msg.member.displayName}`)
                    .setTimestamp();
                msg.channel.send(embed);
            })
        }
    }
}
