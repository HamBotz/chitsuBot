let handler = async (m, { conn, text, usedPrefix }) => {
  function no(number) {
    return number.replace(/\s/g, "").replace(/([@+-])/g, "");
  }

  var hl = [];
  hl[0] = text.split("|")[0];
  hl[0] = no(hl[0]) + "@s.whatsapp.net";
  hl[1] = text.split("|")[1];

  if (!text)
    return conn.reply(
      m.chat,
      `*❏ GET NUMBER*\n\n• ${usedPrefix}mods number\n*Example:* ${usedPrefix}mods 6289654360447\n\n• ${usedPrefix}mods @tags\n*Example:* ${usedPrefix}mods @⁨+62 896-5436-0447⁩`,
      m,
    );
  //if (typeof db.data.users[hl[0]] == 'undefined') throw 'Pengguna tidak ada didalam data base'
  var jumlahHari = 86400000 * hl[1];
  // var jumlahHari = 1000 * text
  var now = new Date() * 1;
  global.db.data.users[hl[0]].moderator = true;
  conn.reply(
    m.chat,
    `*❏ UPGRADE MODERATOR*\n\nselamat kamu naik jabatan menjadi Moderator *@${hl[0].split("@")[0]}*`,
    m,
  );
  conn.reply(
    m.chat,
    `*❏ UPGRADE MODERATOR*\n\nselamat kamu naik jabatan menjadi Moderator *@${hl[0].split("@")[0]}*`,
    m,
  );
};
handler.help = ["mods *@tag*"];
handler.tags = ["owner"];
handler.command = /^(mods|addmods)$/i;
handler.owner = true;
handler.fail = null;
module.exports = handler;

function msToDate(ms) {
  temp = ms;
  days = Math.floor(ms / (24 * 60 * 60 * 1000));
  daysms = ms % (24 * 60 * 60 * 1000);
  hours = Math.floor(daysms / (60 * 60 * 1000));
  hoursms = ms % (60 * 60 * 1000);
  minutes = Math.floor(hoursms / (60 * 1000));
  minutesms = ms % (60 * 1000);
  sec = Math.floor(minutesms / 1000);
  return days + "H " + hours + "J " + minutes + "M";
  // +minutes+":"+sec;
}
