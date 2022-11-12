const Discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
let config = require("../config.json");

intents = new Discord.IntentsBitField(3243773);
const client = new Discord.Client({ intents: intents });

// DB Shit

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const cmdCache = db.table("cmdCache");

client.commands = new Discord.Collection();
const commandsPath = path.join(__dirname, "cmds");
const cmdFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of cmdFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.on("ready", async () => {
  console.log("Ready!");
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(client);
  if (!cmdCache.get("cache")) {
    await cmdCache.set("cache", 0);
    console.error("Cache not found, creating new cache.");
  } else {
    console.log("Cache found, loading cache.");
    console.log(await cmdCache.get("cache"));
  }
  client.user.setActivity(`${client.guilds.cache.size} servers!`, {
    type: Discord.ActivityType.Watching,
  });

  // Send slash commands to discord
  const { REST } = require("@discordjs/rest");
  const { Routes } = require("discord-api-types/v10");
  const { token } = config;
  const commands = [];
  const clientId = config.clientID;
  for (const file of cmdFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }
  const rest = new REST({ version: "10" }).setToken(token);
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }

  client.commands.forEach((cmd) => {
    console.log(`🗸 Loaded ${cmd.data.name}`);
  });

  console.log("Logged in as: " + client.user.tag);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.type != Discord.InteractionType.ApplicationCommand) return;
  const { commandName } = interaction;
  const command = client.commands.get(commandName);
  if (!command) return;
  if (!interaction.inGuild()) return;

  interaction.author = interaction.user;
  interaction.send = interaction.reply;

  try {
    await command.execute(interaction, client, config).catch(async (error) => {
      console.log(error);
    });
    await cmdCache.add("cache", 1);
  } catch (error) {
    console.log(error);
  }
});

client.login(config.token);
