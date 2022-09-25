const Discord = require('discord.js')
module.exports = {
  name: 'help',
  description: 'The help command, what do you expect?',
  guildOnly: true,

  execute (yukii, message) {

    const embed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('***Kneesocks Bot Help***')
      .setThumbnail('https://i.imgur.com/SL1L9Bn.png')
       embed.addField('`-k Avatar`', 'Returns the Avatar of Pinged User. (-k avatar @user)')
       embed.addField('`-k invite`', 'Returns the Invite of the Bot.')
       embed.addField('`-k info`', 'Returns Info about the Bot')
       embed.addField('`-k dependencies`', 'Returns the used Dependencies for the Bot')
       embed.addField('`-k danbooru`', 'Gets an image of off Danbooru. (-k danbooru KEYWORD)')
         .setFooter(`Requested by ${message.author.tag}`)
    message.channel.send(embed)

  /*
    let pages = ['Misc', 'Fun', 'Info']
    let page = 1

    const embed = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setTitle('***Kneesocks Bot Help***')
      .setFooter(`Page ${page} of ${pages.length}`)
      .setDescription(pages[page - 1])

    message.channel.send({embed}).then(msg => {
      msg.react('⬅').then(r => {
        msg.react('➡')

        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

        const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000})
        const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000})

        backwards.on('collect',r => {
          if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
          page--;
          embed.setDescription(pages[page - 1])
          embed.setFooter(`Page ${page} of ${pages.length}`)
          message.edit(embed)
          r.users.remove(r.users.cache.filter(u => u === message.author).first());
        })
        forwards.on('collect',r => {
          if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
          page++;
          embed.addField('`-k Avatar`', 'Returns the Avatar of Pinged User. (-k avatar @user)')
          embed.addField('`-k invite`', 'Returns the Invite of the Bot.')
          embed.addField('`-k paste`', 'Returns the text you sent after the Command as Pastebin Link. (-k paste 1 2 3 5...)')
          message.edit(embed)
          r.users.remove(r.users.cache.filter(u => u === message.author).first())
        })
        forwards.on('collect',r => {
          if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
          page++;
          embed.addField('`-k info`', 'Returns Info about the Bot')
          embed.addField('`-k dependencies`', 'Returns the used Dependencies for the Bot')
          message.edit(embed)
          r.users.remove(r.users.cache.filter(u => u === message.author).first())
        })
        forwards.on('collect',r => {
          if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
          page++;
          embed.addField('`-k danbooru`', 'Gets an image of off Danbooru. (-k danbooru KEYWORD)')
          message.edit(embed)
          r.users.remove(r.users.cache.filter(u => u === message.author).first())
        })
      })
    }) */

    /*
    .setTitle('Misc')
    .addField('`-k Avatar`', 'Returns the Avatar of Pinged User. (-k avatar @user)')
    .addField('`-k invite`', 'Returns the Invite of the Bot.')
    .addField('`-k paste`', 'Returns the text you sent after the Command as Pastebin Link. (-k paste 1 2 3 5...)')

    .setTitle('Info')
    .addField('`-k info`', 'Returns Info about the Bot')
    .addField('`-k dependencies`', 'Returns the used Dependencies for the Bot')

    .setTitle('Fun')
    .addField('`-k danbooru`', 'Gets an image of off Danbooru. (-k danbooru KEYWORD)')
  */
  }
}