const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yeet',
            memberName: 'yeet',
            group: 'fun',
            description: 'Sends a random Safe for Work Ahegao Image from Danbooru',
            guarded: true,
        })
    }
    run(msg) {
        msg.react("đ")
        msg.delete(1500)
        msg.channel.send("Im in " + `${bot.guilds.size} servers!`);
    }
}
