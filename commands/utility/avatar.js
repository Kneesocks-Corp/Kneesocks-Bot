const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');


module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            memberName: 'avatar',
            group: 'utility',
            description: 'Get the Avatar of yourself or an User with @ User',
            guarded: true,
            args: [{
                key: 'member',
                prompt: 'Please mention a member to get their avatar',
                type: 'member',
            }, ]
        })
    }
    run(msg, {
        member
    }) {
        const embed = new Discord.RichEmbed()
            .setTitle(`Avatar of @${member.displayName}`)
            .setImage(member.avatarURL)
            .setColor('#FFFFFF')
            .setFooter(`Requested by ${msg.member.displayName}`)
            .setTimestamp();
        msg.channel.send(embed);
    };
}
