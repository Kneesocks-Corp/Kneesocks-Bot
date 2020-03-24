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
                group: 'fun',
                description: 'Sends a random Kneesocks Image',
                guarded: true,
            })
        }
        run(msg, {
            type
        }) {
            msg.react("👍")
            msg.delete(1500)
            const embed = new Discord.RichEmbed()
                .setDescription("Here are random Kneesocks")
                .setColor('#FFFFFF')
                .setImage("https:kneesocks.now.sh/api/v2/RKS-high)
                    .setFooter(`Requested by ${msg.member.displayName}`)
                    .setTimestamp(); msg.channel.send(embed);
                }
        }
