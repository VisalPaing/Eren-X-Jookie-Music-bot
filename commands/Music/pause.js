const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "pause",
    category: "Music",
    aliases: [""],
    cooldown: 4,
    useage: "pause",
    description: "Pauses the Music",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: Meezy#0226", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Please join a Channel first`)
        );
      if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: Meezy#0226", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | I am not playing Something`)
          .setDescription(`The Queue is empty`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: Meezy#0226", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Please join **my** Channel first`)
          .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
        );
      if(client.distube.isPaused(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: Meezy#0226", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Cannot pause the Song`)
          .setDescription(`It's already paused, so I cant!`)
        );
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | powered by: Meezy#0226",client.user.displayAvatarURL())
        .setDescription("Paused the Song")
      ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))

      client.distube.pause(message);
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by: Meezy#0226", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}

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
