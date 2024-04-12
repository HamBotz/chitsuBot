let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) {
    return m.reply(`Masukkan Prompt!\n\nContoh: *${usedPrefix + command} halo*`)
  }

  conn.sendMessage(
    'status@broadcast',
    {
      text: text
    }, {
      backgroundColor: randomColor(),
      font: 3,
      statusJidList: [m.sender],
      broadcast: true
    });
  await m.reply(`Berhasil memposting dengan *${text}*`)
}

handler.command = handler.help = ["swtext"]
handler.tags = ["owner", "tools"]
handler.owner = true

module.exports = handler

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}