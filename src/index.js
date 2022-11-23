const Discord = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
let config = require('../config.json');
const logger = require('pino')();
const SQLit3 = require('better-sqlite3');
exports.db = new SQLit3('database.db');
exports.logger = logger;
const db = require('./index.js').db;

intents = new Discord.IntentsBitField(3243773);
const client = new Discord.Client({ intents: intents });

db.pragma('journal_mode = WAL');

async function test() {
   // get id of all guilds
   const guilds = client.guilds.cache.map((guild) => guild.id);
   // loop through all guilds
   for (const guild of guilds) {
      // if guild is not in database, add it
      if (!db.prepare('SELECT * FROM guilds WHERE guild_id = ?').get(guild)) {
         db.prepare('INSERT INTO guilds (guild_id) VALUES (?)').run(guild);
         // add guild with membercount to Database
         db.prepare('UPDATE guilds SET usercount = ? WHERE guild_id = ?').run(
            client.guilds.cache.get(guild).memberCount,
            guild
         );
         // else if guild is in database, update membercount
      } else {
         // if membercount of guild in Database is not equal to membercount of guild in cache
         if (
            db
               .prepare('SELECT usercount FROM guilds WHERE guild_id = ?')
               .get(guild).membercount !==
            client.guilds.cache.get(guild).memberCount
         ) {
            // update membercount of guild in Database
            db.prepare(
               'UPDATE guilds SET usercount = ? WHERE guild_id = ?'
            ).run(client.guilds.cache.get(guild).memberCount, guild);
         }
      }
   }
}

client.commands = new Discord.Collection();
const commandsPath = path.join(__dirname, 'cmds');
const cmdFiles = fs
   .readdirSync(commandsPath)
   .filter((file) => file.endsWith('.js'));

for (const file of cmdFiles) {
   const filePath = path.join(commandsPath, file);
   const command = require(filePath);
   // Set a new item in the Collection with the key as the command name and the value as the exported module
   if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
   } else {
      logger.info(
         `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
   }
}

client.on('ready', async () => {
   logger.info('Ready!');
   logger.info(`Logged in as ${client.user.tag}!`);
   //logger.info(client);
   client.user.setActivity('Loading Servers into Database...', {
      type: 'WATCHING',
   });

   test();

   client.user.setActivity(`${client.guilds.cache.size} servers!`, {
      type: Discord.ActivityType.Watching,
   });

   // Send slash commands to discord
   const { REST } = require('@discordjs/rest');
   const { Routes } = require('discord-api-types/v10');
   const { token } = config;
   const commands = [];
   const clientId = config.clientID;
   for (const file of cmdFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      commands.push(command.data.toJSON());
   }
   console.clear();
   const rest = new REST({ version: '10' }).setToken(token);
   try {
      logger.info('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
      logger.info('Successfully reloaded application (/) commands.');
   } catch (error) {
      console.error(error);
   }

   client.commands.forEach((cmd) => {
      logger.info(`🗸 Loaded ${cmd.data.name}`);
   });

   logger.info('Logged in as: ' + client.user.tag);
});

client.on('interactionCreate', async (interaction) => {
   if (interaction.type != Discord.InteractionType.ApplicationCommand) return;
   const { commandName } = interaction;
   const command = client.commands.get(commandName);
   if (!command) return;
   if (!interaction.inGuild()) return;

   interaction.author = interaction.user;
   interaction.send = interaction.reply;

   try {
      await command
         .execute(interaction, client, config)
         .catch(async (error) => {
            logger.info(error);
         });
      // increase numbercount by 1
      db.prepare(
         'INSERT INTO commandcount (id, numbercount) values (0, 0) ON conflict (id) DO UPDATE SET numbercount=commandcount.numbercount+1;'
      ).run();
   } catch (error) {
      logger.info(error);
   }
});

client.login(config.token);
