const Distube = require("distube");
const ee = require("../botconfig/embed.json");
const config = require("../botconfig/config.json");
const { MessageEmbed } = require("discord.js");
const { format, delay } = require("../handlers/functions")
module.exports = (client) => {
  if(config.music_settings.youtube_cookie.length > "Your Cookie youtube please put here tip to get cookie youtube: https://www.youtube.com/watch?v=qymuvhBetnM".length)
  {
    client.distube = new Distube(client, {
      searchSongs: config.music_settings.searchSongs,
      emitNewSongOnly: config.music_settings.emitNewSongOnly,
      highWaterMark: config.music_settings.highWaterMark,
      leaveOnEmpty: config.music_settings.leaveOnEmpty,
      youtubeCookie: config.music_settings.youtube_cookie,
      leaveOnFinish: config.music_settings.leaveOnFinish,
      leaveOnStop: config.music_settings.leaveOnStop,
      youtubeDL: config.music_settings.youtubeDL,
      updateYouTubeDL: config.music_settings.updateYouTubeDL,
      customFilters: {
        "clear": "dynaudnorm=f=200",
        "lowbass": "bass=g=6,dynaudnorm=f=200",
        "bassboost": "bass=g=20,dynaudnorm=f=200",
        "purebass": "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
        "8D": "apulsator=hz=0.08",
        "vaporwave": "aresample=48000,asetrate=48000*0.8",
        "nightcore": "aresample=48000,asetrate=48000*1.25",
        "phaser": "aphaser=in_gain=0.4",
        "tremolo": "tremolo",
        "vibrato": "vibrato=f=6.5",
        "reverse": "areverse",
        "treble": "treble=g=5",
        "normalizer": "dynaudnorm=f=200",
        "surrounding": "surround",
        "pulsator": "apulsator=hz=1",
        "subboost": "asubboost",
        "karaoke": "stereotools=mlev=0.03",
        "flanger": "flanger",
        "gate": "agate",
        "haas": "haas",
        "mcompand": "mcompand"
      }
    })
  }
  else {
    client.distube = new Distube(client, {
      searchSongs: config.music_settings.searchSongs,
      emitNewSongOnly: config.music_settings.emitNewSongOnly,
      highWaterMark: config.music_settings.highWaterMark,
      leaveOnEmpty: config.music_settings.leaveOnEmpty,
      leaveOnFinish: config.music_settings.leaveOnFinish,
      leaveOnStop: config.music_settings.leaveOnStop,
      youtubeDL: config.music_settings.youtubeDL,
      updateYouTubeDL: config.music_settings.updateYouTubeDL,
      customFilters: {
        "clear": "dynaudnorm=f=200",
        "lowbass": "bass=g=6,dynaudnorm=f=200",
        "bassboost": "bass=g=20,dynaudnorm=f=200",
        "purebass": "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
        "8D": "apulsator=hz=0.08",
        "vaporwave": "aresample=48000,asetrate=48000*0.8",
        "nightcore": "aresample=48000,asetrate=48000*1.25",
        "phaser": "aphaser=in_gain=0.4",
        "tremolo": "tremolo",
        "vibrato": "vibrato=f=6.5",
        "reverse": "areverse",
        "treble": "treble=g=5",
        "normalizer": "dynaudnorm=f=200",
        "surrounding": "surround",
        "pulsator": "apulsator=hz=1",
        "subboost": "asubboost",
        "karaoke": "stereotools=mlev=0.03",
        "flanger": "flanger",
        "gate": "agate",
        "haas": "haas",
        "mcompand": "mcompand"
      }
    })
  }
  // Queue status template
  const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

  // DisTube event listeners, more in the documentation page
  client.distube
      .on("playSong", (message, queue, song) => {
        message.channel.send(new MessageEmbed()
          .setDescription(`
          Started playing : [**${song.name}**](${song.url})
          `)
      ).then(async msg => {

          var filter = (reaction, user) =>  user.id !== message.client.user.id;


        var collector = await msg.createReactionCollector(filter, { time: song.duration > 0 ? song.duration * 1000 : 180000 });
        collector.on("collect", async (reaction, user) => {
          if (!queue) return;
          const member = reaction.message.guild.member(user);
          reaction.users.remove(user);
          if(!member.voice.channel)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ ERROR | Please join a Voice Channel`)
            )
          if(member.voice.channel.id !== member.guild.voice.channel.id)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ ERROR | Please join my Voice Channel `)
              .setDescription(`Channelname: \`${member.guild.voice.channel.name}\``)
            )

            
        })
        collector.on("end", ()=>{
          try{
            msg.delete()
          }catch{
          }
        })
      })
      }
      )
      .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed()
      .setTitle("Added" + song.name)
      .setURL(song.url)
      .setColor(ee.color)
      .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
      .addField("Duration", `\`${song.formattedDuration}\``)
      .setThumbnail(song.thumbnail)
      .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
      )
      )
      .on("playList", (message, queue, playlist, song) => message.channel.send(new MessageEmbed()
            .setTitle("Playing Playlist :notes: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor(ee.color)
            .addField("Current Track: ", `[${song.name}](${song.url})`)
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("addList", (message, queue, playlist) => message.channel.send(new MessageEmbed()
            .setTitle("Added Playlist" + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor(ee.color)
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        )
      )
      .on("searchResult", (message, result) =>
          message.channel.send(new MessageEmbed()
                  .setTitle("**Choose an option from below**")
                  .setURL(song.url)
                  .setColor(ee.color)
                  .setDescription(`${result.map((song, i) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`)
                  .setFooter(ee.footertext,ee.footericon)
          )
      )
      .on("searchCancel", (message) => message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | Search Cancelled`)
        )
      )
      .on("error", (message, e) => {
          console.log(String(e.stack).bgRed)
          message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.stack}\`\`\``)
          )
      })
      .on("initQueue", queue => {
          queue.autoplay = false;
          queue.volume = 75;
          queue.filter = "lowbass";
      }
    )

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
