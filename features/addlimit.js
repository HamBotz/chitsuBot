const handler = async (m, { conn, text, command }) => {
  const lastCommand = global.db.data.lastCommand || {};
  const time = lastCommand[`${m.sender}.${command}`] || 0;
  const cooldown = 5 * 60 * 1000; // 5 menit

  if (new Date() - time < cooldown) {
    const timeLeft = (cooldown - (new Date() - time)) / 1000;
    throw `Harap tunggu ${timeLeft.toFixed(1)} detik sebelum menggunakan perintah ini lagi.`;
  }

  lastCommand[`${m.sender}.${command}`] = new Date();
  global.db.data.lastCommand = lastCommand;

  if (!text) throw "Masukkan jumlah Limit yang akan diberi";
  let who;

  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;

  if (!who) throw "Tag salah satu lah";
  let txt = text.replace("@" + who.split`@`[0], "").trim();

  if (isNaN(txt)) throw "Hanya angka";

  let poin = parseInt(txt);
  let limit = poin;

  if (limit < 1) throw "Minimal 1";
  if (limit > 100000) throw "Lu mau bot jadi lemot?????";

  let users = global.db.data.users;
  users[who].limit += poin;
  conn.reply(
    m.chat,
    `Selamat @${who.split`@`[0]}. Kamu mendapatkan +${poin} LIMIT!`,
    m,
    { mentions: [who] },
    {
      mentions: [m.sender],
    },
  );
};

handler.help = ["addlimit @user <amount>"];
handler.tags = ["owner"];
handler.command = /^addlimit$/;
handler.mods = true;
handler.group = true;

module.exports = handler;
