let cooldown = new Map();

let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukkan jumlah exp yang akan diberi";

  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;

  if (!who) throw "Tag salah satu lah";

  let txt = text.replace("@" + who.split`@`[0], "").trim();
  if (isNaN(txt)) throw "Hanya angka";

  let xp = parseInt(txt);
  let exp = xp;

  if (xp >= 999999) throw `Anjir lu mau bot overload?`;
  else if (xp < 999999) {
    let users = global.db.data.users;

    // Check if user has cooldown
    if (cooldown.has(who)) {
      let cooldownTime = cooldown.get(who);
      let remainingTime = (cooldownTime - Date.now()) / 1000;
      throw `Cooldown masih aktif. Silakan tunggu ${remainingTime.toFixed(0)} detik lagi.`;
    }

    users[who].exp += xp;

    conn.reply(
      m.chat,
      `Selamat @${who.split`@`[0]}. Kamu mendapatkan +${xp}XP!`,
      m,
      { mentions: [who] },
      {
        contextInfo: {
          mentionedJid: [who],
        },
      },
    );

    // Set cooldown for 1 hour (3600000 milliseconds)
    cooldown.set(who, Date.now() + 3600000);

    // Remove cooldown after 1 hour
    setTimeout(() => {
      cooldown.delete(who);
    }, 3600000);
  }
};

handler.help = ["addxp @user <amount>"];
handler.tags = ["owner"];
handler.command = /^addxp$/;
handler.mods = true;
handler.premium = false;

module.exports = handler;
