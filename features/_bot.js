let handler = async (m, { conn }) => {
let name = await conn.getName(m.sender)
let thumb = 'https://telegra.ph/file/974aa388af1165069f753.jpg'
let dann = `Hai ${name} 👋\n\nAda yang bisa ${namebot} bantu?`
conn.sendMessage(m.chat, {
text: dann,
contextInfo: {
externalAdReply: {
title: namebot,
body: wm,
thumbnailUrl: thumb,
sourceUrl: sgc,
mediaType: 1,
renderLargerThumbnail: true
}}})
}
handler.customPrefix = /^(bot|bot?|bott)$/i
handler.command = new RegExp

module.exports = handler