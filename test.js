const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
const env = require("./now.json");
require('http').createServer().listen(3000)
require("dotenv").config();
const Danbooru = require('danbooru')
const booru = new Danbooru()
const {
    CommandoClient
} = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: botSettings.prefix,
    owner: '202740603790819328',
    unknownCommandResponse: true,
});


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['fun', 'Fun'],
        ['nsfw', 'NSFW'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: true,
        ping: true,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

const activities_list = [
    "with the *help command.",
    "with kneesocks",
    "with Akira <3",
    "with Danbooru API"
]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 200000); // Runs this every 10 seconds.
});

client.login(process.env.token);
