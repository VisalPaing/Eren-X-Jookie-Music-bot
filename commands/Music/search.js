const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { getTracks, getPreview } = require("spotify-url-info")
module.exports = {
    name: "search",
    category: "Music",
    aliases: ["findtrack"],
    cooldown: 4,
    useage: "search <URL / TITLE>",
    description: "Seraches 10 songs from youtube",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by:Meezy#0226", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Please join a Channel first`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by:Meezy#0226", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Please join **my** Channel first`)
          .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
        );
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by:Meezy#0226", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | You didn't provided a Searchterm`)
          .setDescription(`Usage: \`${prefix}search <URL / TITLE>\``)
        );
      let result = await client.distube.search(args.join(" "));
      let searchresult = "";
      for(let i =0; i < 10; i++){
        try{
          searchresult += `**${i+1}.** [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`
        }catch{
          searchresult = "\n";
        }
      }
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | powered by:Meezy#0226",client.user.displayAvatarURL())
        .setTitle(`Searchresult for: ${args.join(" ")}`.substr(0, 256))
        .setDescription(searchresult.substr(0, 2048))
      ).then(msg=>{
        msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["time"]}).then(collected =>{
          let userinput = collected.first().content;
          if(Number(userinput) <= 0 && Number(userinput) > 10){
            message.reply("NOT A VALID NUMBER, so i use the FIRST TRACK")
            userinput = 0;
          }
          client.distube.play(message, result[userinput - 1].url);
        }).catch(e=>{
          console.log(String(e.stack).bgRed)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username + " | powered by:Meezy#0226", client.user.displayAvatarURL())
              .setTitle(`❌ ERROR | An error occurred | Time ran out`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
          );
        })
      })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by:Meezy#0226", client.user.displayAvatarURL())
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
