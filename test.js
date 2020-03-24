const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
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
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: true,
        ping: true,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log('Ready!');
});

client.login(botSettings.token);
