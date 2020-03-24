const Discord = require('discord.js');
const {
    Command
} = require('discord.js-commando');
const Danbooru = require('danbooru');
const axios = require('axios');
const booru = new Danbooru();

module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kneesocks',
            memberName: 'kneesocks',
            group: 'fun',
            description: 'Sends a random Kneesocks Image from Danbooru',
            guarded: true,
        })
    }
    run(msg) {
        async function getRKS() {
            const res = await axios.get(`https://kneesocks.now.sh/api/v2/RKS.json`);
            if (res.length == 0) {
                return false;
            } else {
                return res.data.data;
            }
        };
        getRKS().then(result => {
            const imageStream = Buffer.from(result.split(',')[1], 'base64');
            const attachment = new Discord.MessageAttachment(imageStream);
            msg.react("👍")
            msg.delete(1500)
            const embed = new Discord.RichEmbed()
                .setDescription("Here are random Kneesocks")
                .setColor('#FFFFFF')
                .attachFiles(attachment)
                .setImage('attachment://file.jpg')
                .setFooter(`Requested by ${msg.member.displayName}`)
                .setTimestamp();
            msg.channel.send(embed);
        })
    }
}
