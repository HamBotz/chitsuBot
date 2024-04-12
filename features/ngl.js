var axios = require("axios");

var handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
  if (!text) {
    return m.reply(`Masukkan Username dan Pesan!\n
Contoh: *${usedPrefix + command} lilokkk|hai*`);
  }
  
  var [username, pesan] = text.split('|');
  var res = await axios.post(
    "https://ngl.link/api/submit",
    `username=${username}&question=${pesan}&deviceId=18d7b980-ac6a-4878-906e-087dfec6ea1b&gameSlug=&referrer=`
  );
  await m.reply(wait);
  return m.reply('Mengirim pesan kepada: '+ username + '\nPesan telah terkirim: ' + pesan);
  } catch (e) {
  console.error(e);
  }
};

handler.command = handler.help = ["ngl"];
handler.tags = ["fun"];

module.exports = handler;