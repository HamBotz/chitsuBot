let fetch = require("node-fetch");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `Masukkan URL!\n
Contoh: *${usedPrefix + command} https://vt.tiktok.com/xxx*`, m);
  }
  let res = await fetch(`https://api.tiklydown.eu.org/api/download/v2?url=${text}`)
  rest = await res.json()
  hasil = `Title ${rest.result.desc}`
  conn.sendFile(m.chat, rest.result.video1, '', hasil, m);
}

handler.command = handler.help = ["tiktok", "tt"];
handler.tags = ["downloader"];

module.exports = handler;