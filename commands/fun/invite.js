const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            memberName: 'invite',
            group: 'fun',
            description: 'Invites the Bot to your Server',
            guarded: true,
        })
    }
    run(msg) {
        msg.react("đ")
        msg.delete(1500)
        const embed = new Discord.RichEmbed()
            .setTitle("To invite me to your Server follow this Link")
            .setDescription("https://discordapp.com/oauth2/authorize?&client_id=691622066713133155&scope=bot&permissions=379968")
            .setColor('#FFFFFF')
            .setImage("https://images-ext-2.discordapp.net/external/BdHwzF1rEtv7LkQod9MoEUYydAbopkFRGjIvYQlK_XM/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/691622066713133155/cd5e1bc822e6a151c2542f8c8447364f.png?width=677&height=677")
            .setFooter(`Requested by ${msg.member.displayName}`)
            .setTimestamp();
        msg.channel.send(embed);
    }
}
