let handler = m => m

handler.before = function(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let sender = global.db.data.chats[m.sender]
  let hapus = m.key.participant
  let bang = m.key.id
  let isAudio = m.mtype
  if (chat.antiAudio && isAudio) {
    if(isAudio === "audioMessage"){
        if (isAdmin || !isBotAdmin){		  
        } else {
          m.reply(`*Audio Terdeteksi*\n\nMaaf Tapi Harus Saya Hapus, Karna Admin/Owner Mengaktifkan Anti Audio Untuk Chat Ini`)
          return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
        }return true
    }
  }
  return true
}

module.exports = handler