const Discord = require('discord.js')

module.exports = {

  description: 'Null',
  name: 'invite',
  category: 'Misc',
  guildOnly: true,

  execute (yukii, message) {
    const Invite = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setThumbnail('https://i.imgur.com/SL1L9Bn.png')
      .setTitle(':love_letter: *** Heres the Invite *** :love_letter:')
      .addField('***Heres an Invite:***', '***https://discord.com/oauth2/authorize?client_id=691622066713133155&scope=bot&permissions=379968***')
      .setTimestamp()
  return message.channel.send(Invite);
  }
}