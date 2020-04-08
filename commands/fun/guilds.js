const Discord = require('discord.js');
const GuildSize = require("test.js");
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
            description: 'Sends a random Safe for Work Ahegao Image from Danbooru',
            guarded: true,
        })
    }
    run(message) {
        message.react("đ")
        message.delete(1500)
        message.channel.send("Im in " + GuildSize + " Servers");
    }
}
