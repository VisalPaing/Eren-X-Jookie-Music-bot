const client = require('../../index');
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");

//guildCreateBy Meezy#0226
client.on('guildCreate', (guild) => {
    try {
        channelToSend;

        guild.channels.cache.forEach((channel) => {
            if(channel.type === 'text' && !channelToSend && channel.permissionFor(guild.me).has("SEND_MESSAGES")
            ) channelToSend  = channel;
        });

        if(!channelToSend) return;

        channelToSend.send(
            new MessageEmbed()
            .addFields(
                {name: 'Basic commands', value: `
                [\`m!play\`](https://www.jockiemusic.com/commands.html?q=play&category=playback&selected=play)
                [\`m!skip\`](https://www.jockiemusic.com/commands.html?q=skip&category=queue+state&selected=skip)
                [\`m!leave\`](https://www.jockiemusic.com/commands.html?q=leave&category=playback&selected=leave)

                Visit our [website](https://www.jockiemusic.com/commands.html) or use the [\`m!help\`](https://www.jockiemusic.com/commands.html?q=help&selected=help) command for more commands. To switch page of the help menu or any other command write \`next page\` or \`previous page\`.
                `},
                {name: 'Support Server', value: `Join our [support server](https://discord.gg/3nTFpUpq8M) if you need help, want to get information about updates and issues or want to engage in community discussions with the developers!`}
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
