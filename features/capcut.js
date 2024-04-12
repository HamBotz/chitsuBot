var { capcut } = require("../lib/scrape")

var handler = async (m, {
conn,
text,
usedPrefix,
command
}) => {
  if (!text) {
  return m.reply(`Masukkan URL!\n\nContoh: *${usedPrefix + command} https://www.capcut.com/t/Zs8YEmRmj/*`)
  }
  
  if (!text.includes('capcut.com')) {
  return m.reply(`Masukkan URL Capcut!\n\nContoh: *${usedPrefix + command} https://www.capcut.com/t/Zs8YEmRmj/*`)
  }
  
  var res = await capcut(text)
  var hasil = `${htki} *CAPCUT DOWNLOADER* ${htka}

• Title: *${res.title}*
• Size: *${res.size}*`
  conn.sendFile(m.chat, res.url, 'capcut.mp4', hasil, m)
}

handler.command = handler.help = ["capcut"]
handler.tags = ["downloader"]

module.exports = handler