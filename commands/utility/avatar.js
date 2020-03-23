const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            memberName: 'avatar',
            group: 'utility',
            description: 'Get the Avatar of yourself or an User with *avatar @User',
            guarded: true,
            args: [{
                key: 'member',
                prompt: 'Please mention a member to get their avatar',
                type: 'member',
            }, ]
        })
    }
    run(message, {
        member
    }) {
        const embed = new Discord.RichEmbed()
            .setTitle(`${member.user.username}'s Avatar`)
            .setImage(member.user.avatarURL)
            .setColor('#FFFFFF')
            .setFooter(`Requested by ${message.member.displayName}`)
            .setTimestamp();
        message.channel.send(embed);
    };
}
