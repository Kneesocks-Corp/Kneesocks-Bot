const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    console.log(message.content);
});

client.login('NjkxNjIyMDY2NzEzMTMzMTU1.XnipSg.IHO40lKeKIM2uIwd2id2ZIm4r0c');

if (message.content === '*ranime') {
    // sends back random r/anime image
    const snekfetch = require('snekfetch');
    exports.run = async (client, message, args) => {
        try {
            const {
                body
            } = await snekfetch
                .get('https://www.reddit.com/r/Anime.json?sort=top&t=week')
                .query({
                    limit: 800
                });
            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return message.channel.send('It seems we are out of images!, Try again later.');
            const randomnumber = Math.floor(Math.random() * allowed.length)
            const embed = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle(allowed[randomnumber].data.title)
                .setDescription("Posted by: " + allowed[randomnumber].data.author)
                .setImage(allowed[randomnumber].data.url)
                .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
                .setFooter("Memes provided by r/dankmemes")
            message.channel.send(embed)
        } catch (err) {
            return console.log(err);
        }
    }

}
