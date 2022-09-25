const Discord = require('discord.js')
const {
  bot_info
} = require('./../../settings.json')
const {
  dependencies
} = require('./../../package.json')

module.exports = {

  name: 'info',
  description: 'Null',
  category: 'misc',
  guildOnly: true,

  execute (yukii, message) {

    let totalSeconds = (yukii.uptime / 1000)
    let days = Math.floor(totalSeconds / 86400)
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60
    let roundedseconds = (totalSeconds).toFixed(0)
    const ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(0)
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes`

    const StatsEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(':wrench:  **Bot Statistics** :wrench:')
      .setThumbnail('https://i.imgur.com/SL1L9Bn.png')
      .addField('**Name**', `**${bot_info.Name}**`)
      .addField('**Author**', `**Azariel#0004**`)
      .addField('**Servercount**', `**${yukii.guilds.fetch.size} Servers**`)
      .addField('**DiscordJS**', `**${dependencies['discord.js']}**`)
      .addField('**NodeJS**', `**${bot_info.NodeJS}**`)
      .addField('**RAM Usage**', `**${ram} MB**`)
      .addField('**Uptime**', `**${uptime}**`)
      .setFooter(`Requested by ${message.author.tag}`)

    message.channel.send(StatsEmbed)
  }
}