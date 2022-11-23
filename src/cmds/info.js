const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { bot_info } = require('../../settings.json');

const db = require('../index.js').db;
const logger = require('../index.js').logger;

db.pragma('journal_mode = WAL');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('info')
      .setDescription('Get info about the Kneesocks bot.'),
   async execute(interaction) {
      const ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(0);
      const guildsize = interaction.client.guilds.cache.size;

      async function getCommands(number) {
         // get numbercount from database
         const numbercount = db
            .prepare('SELECT numbercount FROM commandcount;')
            .get().numbercount;
         // console.log(numbercount);
         number = numbercount;
         return number;
      }

      async function test(number) {
         // add all guild_id from database to array
         const keys = db.prepare('SELECT guild_id FROM guilds').all();

         // loop through all entries
         for (const key of keys) {
            // get the usercount of the guild in the database
            const usercount = db
               .prepare('SELECT usercount FROM guilds WHERE guild_id = ?')
               .get(key.guild_id).usercount;
            // add value to total
            number += usercount;
         }
         return number;
      }

      const embed = new EmbedBuilder();
      embed.setTitle(':wrench:  **Bot Statistics** :wrench:');
      embed.setColor('#ff0000');
      embed.setThumbnail('https://i.imgur.com/SL1L9Bn.png');
      embed.addFields(
         { name: '**Bot Version**', value: bot_info.version, inline: false },
         // { name: '**Node Version**', value: process.version, inline: false },
         { name: '**Bot Creator**', value: bot_info.creator, inline: false },
         { name: '**Bot Memory Usage**', value: `${ram}MB`, inline: false },
         {
            name: '**Global Commands Used**',
            value: JSON.stringify(await getCommands(0)),
            inline: false,
         },
         {
            name: '**Global Members**',
            value: JSON.stringify(await test(0)),
            inline: false,
         },
         {
            name: 'Server Count',
            value: `${guildsize} Servers`,
            inline: false,
         }
      );
      interaction.reply({ embeds: [embed] });
   },
};
