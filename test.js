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
    "with the *help command in ",
    "with kneesocks in ",
    "with Akira in ",
    "with Danbooru API in "
]; // creates an arraylist containing phrases you want your bot to switch through.

client.on("ready", () => {
    setInterval(() => {
        let activities = ["Im in", `${client.guilds.size} servers!`],
            index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities[index])
    }, 5000);
});

client.on('message', message => {
    if (message.content === '*yeet') {
        msg.react("đ")
        msg.delete(1500)
        msg.channel.send("Im in ", `${bot.guilds.size} servers!`);

    }
}, )


client.login(process.env.token);
