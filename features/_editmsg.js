let handler = m => m
handler.before = async function (m, text, conn) {
  if (m.mtype == 'editedMessage') {
    let messageId = m.id
    let before = m.message?.extendedTextMessage?.text || '_Private_'
    let user = global.db.data.users[m.sender]
    let msg = m.message?.editedMessage?.message
    let type = Object.keys(msg)[0]
    let newText = msg[type]?.editedMessage.conversation || ''
    
    let teks = `${htki} *E D I T E D* ${htka}\n\n`
    teks += `*${user.name}* edited the message\n\n`
    teks += `Pesan ID: *${messageId}*\n`
    teks += `Pesan sebelum: *${before}*\n`
    teks += `Pesan terbaru: *${newText}*\n`
    
    return m.reply(teks)
  }
}
module.exports = handler