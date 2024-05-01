

let handler = async (m, { text }) => {

    let user = global.db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    let thumb = 'https://telegra.ph/file/4f82a67f6bbfff59e481e.jpg'
    let dann = `@${m.sender.split("@")[0]} Sekarang AFK${text ? ': ' + text : ''}`
    conn.sendMessage(m.chat, {
          text: dann,
          contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                  title: namebot,
                  body: wm,
                  thumbnailUrl: thumb,
                  sourceUrl: sgc,
                  mediaType: 1,
                  renderLargerThumbnail: true
              }
          }
      });
  }
  handler.help = ['afk <alasan>']
  handler.tags = ['main']
  handler.command = /^afk$/i
  handler.limit = true
  
  module.exports = handler