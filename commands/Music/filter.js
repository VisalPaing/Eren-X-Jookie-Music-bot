const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const filters = [
  "clear",
  "lowbass",
  "bassboost",
  "purebass",
  "8D",
  "vaporwave",
  "nightcore",
  "phaser",
  "tremolo",
  "vibrato",
  "reverse",
  "treble",
  "normalizer",
  "surrounding",
  "pulsator",
  "subboost",
  "karaoke",
  "flanger",
  "gate",
  "haas",
  "mcompand"
]
module.exports = {
    name: "filter",
    category: "Music",
    aliases: ["ap"],
    cooldown: 4,
    useage: "filter <Filtertype>",
    description: "Changes the audio Filter",
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
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: Meezy#0226", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Please add a Filtertype`)
          .setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nExample: \`${prefix}filter bassboost\``)
        );
        if(!filters.join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase()))
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by: Meezy#0226", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | Not a valid Filtertype`)
            .setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048))
          );
      client.distube.setFilter(message, args[0]);

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | powered by: Meezy#0226",client.user.displayAvatarURL())
        .setDescription(`Successfully set Filter to: \`${args[0]}\``)
      ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
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

