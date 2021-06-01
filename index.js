/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, Distube Event Handler ...
["command", "events", "distube-handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});



client.on('guildCreate', (guild) => {
  try {
      channelToSend;

      guild.channels.cache.forEach((channel) => {
          if (channel.type === 'text' && !channelToSend && channel.permissionFor(guild.me).has("SEND_MESSAGES")
          ) channelToSend = channel;
      });

      if (!channelToSend) return;

      channelToSend.send(
          new MessageEmbed()
              .addFields(
                  {
                      name: 'Basic commands', value: `
              [\`m!play\`](https://www.jockiemusic.com/commands.html?q=play&category=playback&selected=play)
              [\`m!skip\`](https://www.jockiemusic.com/commands.html?q=skip&category=queue+state&selected=skip)
              [\`m!leave\`](https://www.jockiemusic.com/commands.html?q=leave&category=playback&selected=leave)

              Visit our [website](https://www.jockiemusic.com/commands.html) or use the [\`m!help\`](https://www.jockiemusic.com/commands.html?q=help&selected=help) command for more commands. To switch page of the help menu or any other command write \`next page\` or \`previous page\`.
              `},
                  { name: 'Support Server', value: `Join our [support server](https://discord.gg/3nTFpUpq8M) if you need help, want to get information about updates and issues or want to engage in community discussions with the developers!` }
              )
      )

  } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: Meezy#0226", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)
      );

  }
})
//login into the bot
client.login(require("./botconfig/config.json").token);

/**
 * Made by Meezy#0226
 * 
 * Join SERVER TO SUPPORT ME https://discord.gg/3nTFpUpq8M
 * 
 * INVITE MY BOT TO YOUR SERVER (https://discord.com/oauth2/authorize?client_id=796578809360547891&scope=bot&permissions=8589934591)
 * 
 * Keep My cradit
 * 
 * CommandHandles by Tomato6966 his youtube: https://www.youtube.com/channel/UC1AgotpFHNhzolUtAjPgZqQ
 * 
 * 
 */
