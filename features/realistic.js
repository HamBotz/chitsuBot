const { G4F } = require("g4f")

const g4f = new G4F()

let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command,
}) => {
  if (!text) {
    return m.reply(`Masukkan Prompt!\n\nContoh: *${usedPrefix + command} a village*`)
  }
  let res = await realistic(text)
  let rest = Buffer.from(res, 'base64')
  conn.sendFile(m.chat, rest, '', `*${text}*\n\n${wm}`, m)
}

handler.command = handler.help = ["realistic"]
handler.tags = ["ai"]

module.exports = handler

async function realistic(prompt) {
  const imageGenerator = await g4f.imageGeneration(prompt, {
    debug: true,
    providers: g4f.providers.Pixart,
    providersOptions: {
      height: 512,
      width: 512,
      samplingMethod: "SA-Solver"
    }
  });
  
  return imageGenerator
}