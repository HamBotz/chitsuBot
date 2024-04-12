var yts = require("yt-search");
var ytdl = require("ytdl-core");
var ffmpeg = require("fluent-ffmpeg");
var fs = require("fs");

var handler = async (m, { conn, text, usedPrefix, command }) => {
  var query = text;

  if (!query) {
    return conn.reply(m.chat, `Masukkan Judul!\n\nContoh: *${usedPrefix + command} strong one direction*`, m);
  }

  try {
    var searchResults = await yts(query);
    if (searchResults && searchResults.all && searchResults.all.length > 0) {
      var videoUrl = searchResults.all[0].url;
      var audioStream = ytdl(videoUrl, {
        quality: 'highestaudio',
        filter: 'audioonly',
      });

      var title = searchResults.all[0].title;
      var filename = `${title}.mp3`;

      ffmpeg()
        .input(audioStream)
        .audioCodec('libmp3lame')
        .toFormat('mp3')
        .on('end', () => {
          var fileBuffer = fs.readFileSync(filename);
          conn.sendMessage(m.chat, { audio: fileBuffer, mimetype: 'audio/mpeg', filename: title }, { quoted: m });
          fs.unlinkSync(filename);
        })
        .on('error', (err) => {
          console.error(err);
          conn.reply(m.chat, 'Terjadi kesalahan saat mengonversi audio.', m);
        })
        .save(filename);
    } else {
      conn.reply(m.chat, 'Tidak dapat menemukan lagu yang sesuai.', m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Terjadi kesalahan saat mencari lagu.', m);
  }
};

handler.command = handler.help = ["yta", "ytmp3", "play"];
handler.tags = ["downloader"];
handler.limit = 5;

module.exports = handler;