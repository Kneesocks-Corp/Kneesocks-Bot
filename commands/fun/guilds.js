const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'guilds',
            memberName: 'guilds',
            group: 'fun',
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
        message.react("đ")
        message.delete(1500);

        message.channel.send("Im in " + client.guilds.size);
    };
}
