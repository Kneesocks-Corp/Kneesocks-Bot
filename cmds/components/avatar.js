const Discord = require('discord.js');

module.exports = {

    name: 'avatar',
    description: 'null',
    guildOnly: true,
    category: 'Misc',

    execute(message, yukii, args, error) {
        if (!args.length) {
            return yukii.channel.send(error);
        } else if (args[0]) {
          const tagged = yukii.mentions.users.first()
          const SuccessBedAvatar = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`:camera:  ${tagged.tag}'s Avatar :camera:`)
            .setImage(tagged.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

          return yukii.channel.send(SuccessBedAvatar)

        }
    }
}