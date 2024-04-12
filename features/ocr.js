const uploadImage = require('../lib/uploadImage')
const ocrapi = require("ocr-space-api-wrapper")

let handler = async (m, { conn, text }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return m.reply(`Balas gambar dengan caption .ocr`)
  if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Mimetype ${mime} tidak di dukung!`)
  let img = await q.download()
  let url = await uploadImage(img)
  let hasil = await ocrapi.ocrSpace(url)
 await m.reply(hasil.ParsedResults[0].ParsedText)    
}

handler.help = ['ocr', 'totext']
handler.tags = ['tools']
handler.command = /^(ocr|totext)$/i
handler.limit = true

module.exports = handler