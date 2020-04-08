const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
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
    unknownCommandResponse: false,
});


// command groups for help
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

//const GuildSize = [`${client.guilds.size}`]

client.on("ready", () => {
    setInterval(() => {
        // sets Bot Game to Guild Size on Startup
        client.user.setActivity(`in ${client.guilds.size} servers!`);
    }, 5000);
});


// didnt worked as own js command so it needs to be here sowwy <3
client.on('message', message => {
    if (message.content === '*guilds') {
        message.react("đ")
        // reacts with thumbsup emojie and then deletes in the column below
        message.delete(1500)
        message.channel.send("Im in " + [`${client.guilds.size}`] + " Servers");

    }
});

// bot token always secured as secret <3

client.login(process.env.token);
