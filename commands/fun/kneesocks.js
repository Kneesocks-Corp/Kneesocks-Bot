const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kneesocks',
            memberName: 'kneesocks',
            group: 'fun',
            description: 'Sends a random Kneesocks Image from our API',
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
            .setImage("https://kneesocks.now.sh/api/v2/RKS-high")
            .setFooter(`Requested by ${msg.member.displayName}`)
            .setTimestamp();
        setTimeout(function(){ 
           msg.channel.send(embed);
        }, 5000);
    }
}
