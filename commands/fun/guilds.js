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
            name: 'guilds',
            memberName: 'guilds',
            group: 'fun',
            description: 'Displays in how many Servers the Bot is',
            guarded: true,
        })
    }
    run(msg) {
        msg.react("đ")
        msg.delete(1500)
        const embed = new Discord.MessageEmbed()
            .setDescription("")
            .setColor('#FFFFFF')
            .addField('The Bot is in ' + msg.client.guilds.size)
            .setImage("https://i.imgur.com/dvD87vx.png")
            .setFooter(`Requested by ${msg.member.displayName}`)
            .setTimestamp();
        msg.channel.send(embed);
    }
}
