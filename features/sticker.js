var { sticker } = require('../lib/sticker');
var uploadFile = require('../lib/uploadFile');
var uploadImage = require('../lib/uploadImage');
var { webp2png } = require('../lib/webp2mp4');
var fetch = require('node-fetch');

var handler = async (m, { conn, args, usedPrefix, command }) => {
  var stiker = false;
  var pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './src/avatar_contact.png');
  var name = await conn.getName(m.sender);
  try {
    var q = m.quoted ? m.quoted : m;
    var mime = (q.msg || q).mimetype || '';
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!');
      var img = await q.download();
      if (!img) return m.reply(`Balas gambar/video/stiker dengan perintah ${usedPrefix + command}`);
      var out;
      try {
        if (/webp/g.test(mime)) out = await webp2png(img);
        else if (/image/g.test(mime)) out = await uploadImage(img);
        else if (/video/g.test(mime)) out = await uploadFile(img);
        if (!isUrl(out)) out = await uploadImage(img);
        stiker = await sticker(false, out, global.packname, global.author);
      } catch (e) {
        console.error(e);
        if (!stiker) stiker = await sticker(img, false, global.packname, global.author);
      }
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author);
      else return m.reply('URL tidak valid!');
    }
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) {
    conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    } else {
      throw 'Conversion Failed';
    }
  }
};

handler.help = ['stiker <caption|reply media>', 'stiker <url>', 'stikergif <caption|reply media>', 'stikergif <url>'];
handler.tags = ['sticker'];
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i;
handler.limit = true;

module.exports = handler;

var isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};