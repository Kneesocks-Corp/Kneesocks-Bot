const Discord = require('discord.js')
const Danbooru = require('danbooru')
const booru = new Danbooru()

module.exports = {

  description: 'Null',
  name: 'danbooru',
  category: 'fun',
  guildOnly: true,

  async execute (yukii, message, args) {

    const errormess = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(':warning:  **Error** :warning:')
      .setDescription('**Please use this Command in an NSFW Channel**')
      .setThumbnail('https://i.imgur.com/SL1L9Bn.png')

    if (message.channel.nsfw === true) {
      booru.posts({
        random: 'true',
        tags: `${args[0]} order:date`
      }).then(posts => {
        const index = Math.floor(Math.random() * posts.length)
        const post = posts[index]
        const embed = new Discord.MessageEmbed()
          .setDescription(':white_check_mark:  ***Here are the Results*** :white_check_mark: ')
          .setColor('#ff0000')
          .addField('**Tag**', `**${args[0]}**`)
          .setImage(post.large_file_url)
        return message.channel.send(embed)
      })
    } if (message.channel.nsfw === false) {
      return message.channel.send(errormess)
    }
  }
}