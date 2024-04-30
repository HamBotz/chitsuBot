let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  if (!user) throw "Anda tidak terdaftar di database";

  let successImage = "https://telegra.ph/file/49a8c48e3fb6765cdd26a.jpg";
  let failureImage = "https://telegra.ph/file/6fb13e443750c0f728b4f.jpg";
  let successMessage =
    "Selamat Anda telah mengundang teman Anda untuk korupsi dan Anda mendapatkan *{randomBalance}* money";
  let failureMessage =
    "Maaf, teman Anda menolak untuk korupsi, teman Anda mengeluh dan Anda didenda untuk *{randomBalance}* money";
  let waitMessage =
    "Anda telah melakukan korupsi hari ini, tunggu satu jam lagi dan lakukan korupsi lagi.";

  let target = m.mentionedJid[0];
  if (!target) throw `*contoh*: ${usedPrefix}bansos @friend`;

  let currentBalance = user.balance || 0;

  let randomBalance = Math.floor(Math.random() * (10000 - 1000 + 1) + 100000);

  if (user.bansosCooldown && user.bansosCooldown > Date.now()) {
    throw waitMessage;
  } else {
    if (Math.random() < 0.5) {
      user.money += randomBalance;
      successMessage = successMessage.replace(
        "{randomBalance}",
        randomBalance.toLocaleString(),
      );
      conn.sendFile(m.chat, successImage, "korupsi.jpg", successMessage, m);

      user.bansosCooldown = Date.now() + 3600000;
    } else {
      user.money -= randomBalance;
      failureMessage = failureMessage.replace(
        "{randomBalance}",
        randomBalance.toLocaleString(),
      );
      conn.sendFile(
        m.chat,
        failureImage,
        "menolak_korupsi.jpg",
        failureMessage,
        m,
      );

      user.bansosCooldown = Date.now() + 3600000;
    }

    global.db.data.users[m.sender] = user;
  }
};

handler.help = ["bansos2 *@friend*"];
handler.tags = ["rpg"];
handler.command = /^bansos2$/i;

module.exports = handler;
