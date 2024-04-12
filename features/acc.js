let handler = async function (m, { text, args, usedPrefix }) {
  if (!args[0]) return m.reply("Siapa");
  for (let i = 0; i < args.length; i++) {
    let who = m.mentionedJid[i];
    let user = global.db.data.users[who];
    if (!who) return m.reply(args[i] + " harus berupa tag");
    user.registered = true;
  }
  conn.reply(m.chat, `Ok Kak sekarang user tersebut dapat menggunakan Bot`, m);
};
handler.tags = ["owner"];
handler.rowner = true;
handler.command = /^(acc)$/i;
module.exports = handler;
