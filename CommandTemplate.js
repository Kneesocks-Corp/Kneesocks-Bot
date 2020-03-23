const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kneesocks',
            memberName: 'kneesocks',
            group: 'bla',
            description: 'Description',
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
        console.log(type);
        booru.posts({
            tags: 'rating:safe kneehighs order:ranking'
        }).then(posts => {
            const index = Math.floor(Math.random() * posts.length);
            const post = posts[index];

            const url = booru.url(post.file_url)
            const embed = new Discord.RichEmbed()
                .setDescription(`${type}`)
                .setColor('#FFFFFF')
                .setImage(post.file_url)
                .setFooter(`Requested by ${msg.member.displayName}`)
                .setTimestamp();
            msg.channel.send(embed);
        })
    }
}
