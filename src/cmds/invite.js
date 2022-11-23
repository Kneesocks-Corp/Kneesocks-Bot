const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('invite')
      .setDescription('Get the invite of the bot.'),
   async execute(interaction) {
      const embed = new EmbedBuilder()
         .setColor('#ff0000')
         .setTitle(':wrench:  **Invite** :wrench:')
         .setThumbnail('https://i.imgur.com/SL1L9Bn.png')
         .addFields({
            name: 'Invite Link',
            value: 'https://discord.com/oauth2/authorize?client_id=691622066713133155&scope=bot&permissions=277025508416',
            inline: false,
         });

      interaction.reply({ embeds: [embed] });
   },
};
