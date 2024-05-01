const { createHash } = require("crypto");
let handler = async (m, { text, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  if (user.registered !== false)
    throw "Kamu Sudah mendaftar!!\nIngin daftar ulang? ketik unreg";
  user.registered = true;
  let sn = createHash("md5").update(m.sender).digest("hex");
  let p = '```Selamat Kamu sudah Mendaftar```\n\n•Sn Kamu: *${sn}*';
  conn.reply(m.chat, p, '')
  /*const arr = [
    { text: `*[ V ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I F ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I F Y ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I F Y   S ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I F Y   S U ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I F Y   S U C ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I F Y   S U C C ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I F Y   S U C C E ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I F Y   S U C C E S ]*\n\n${p}`, timeout: 100 },
    { text: `*[ V E R I F Y   S U C C E S S ]*\n\n${p}`, timeout: 100 },
  ];

  const lll = await conn.sendMessage(
    m.chat,
    { text: "Sedang menverifikasi...." },
    { quoted: m },
  );

  for (let i = 0; i < arr.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, arr[i].timeout));
    await conn.relayMessage(
      m.chat,
      {
        protocolMessage: {
          key: lll.key,
          type: 14,
          editedMessage: {
            conversation: arr[i].text,
          },
        },
      },
      {},
    );
  }*/
};

handler.customPrefix = /^(verify)$/i;
handler.command = new RegExp();

module.exports = handler;
