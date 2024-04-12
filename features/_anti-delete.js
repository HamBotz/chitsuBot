var handler = m => m

handler.before = async function (m, { conn }) {
  var chat = global.db.data.chats[m.chat]
  if (!chat.delete) return !0
  if (m.key.fromMe) return !1
  var from = m.key.remoteJid
  if (!chat.delete && m.mtype == 'extendedTextMessage') {
    var quoted = m.quoted.copy()
    if (!quoted.mediaMessage || !quoted.mediaMessage.url.endsWith('sticker')) {
      if (quoted.text) {
        chat.message = quoted.text
      } else if (quoted.mentionedJid.length) {
        chat.message = ''
        for (var i = 0; i < quoted.mentionedJid.length; i++) {
          chat.message += `${quoted.mentionedJid[i].split('@')[0]}@${quoted.mentionedJid[i].split('@')[1]}\n`
        }
        chat.message = chat.message.trim()
      }
      chat.delete = !0
      conn.sendMessage(m.chat, { text: `ANTI DELETE
          Pesan telah dihapus !\nPengirim : ${conn.getName(from)}\nPesan : \n${chat.message}` }, { quoted: m })
    }
  }
}

module.exports = {
  handler
}