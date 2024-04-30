// Daftar nama-nama pemain
const playerNames = [
  "Pemain 1",
  "Pemain 2",
  "Pemain 3",
  "Pemain 4",
  "Pemain 5",
];

let handler = async (m, { conn, text }) => {
  try {
    let user = global.db.data.users[m.sender];

    // Cek apakah pengguna memiliki cukup kesehatan untuk duel
    if (user.health <= 0) {
      conn.reply(
        m.chat,
        "😓 Nyawa Anda habis. Anda perlu memulihkan nyawa Anda terlebih dahulu.",
        m,
      );
      return;
    }

    // Cek apakah pengguna sudah berduel dalam 1 jam terakhir
    if (new Date() - user.lastduel < 3600000) {
      conn.reply(m.chat, "⏰ Anda hanya dapat berduel sekali dalam 1 jam.", m);
      return;
    }

    // Batasi penggunaan perintah ini sekali dalam 1 jam
    let cooldown = 3600000; // 1 jam dalam milidetik
    user.lastduel = new Date() * 1 + cooldown;

    // Cek apakah pengguna melakukan duel
    if (text.toLowerCase() == ".duel" && m.mentionedJid.length > 0) {
      return duelHandler(m, conn, user);
    }

    // Lakukan pertarungan dengan bos
    user.lastbossbattle = new Date();

    // Hitung serangan pengguna
    let userAttack = Math.floor(Math.random() * 1000);

    // Hitung serangan bos
    let bossAttack = bossData.attack;

    // Kurangi nyawa bos sesuai dengan serangan pengguna
    bossData.health -= userAttack;

    // Kurangi nyawa pengguna sesuai dengan serangan bos
    user.health -= bossAttack;

    // Pesan hasil pertarungan
    let message = `🗡️ Hasil pertarungan dengan bos ${pickRandom(animeIsekaiBossNames)} 🐉:\n\n`;
    message += `❤️ Nyawa pengguna: ${user.health}/${user.maxHealth}\n`;
    message += `❤️ Nyawa bos: ${bossData.health}/${bossData.maxHealth}\n`;

    // Hitung reward dan tambahkan ke pengguna jika bos telah dikalahkan
    if (bossData.health <= 0) {
      let expReward = Math.floor(Math.random() * 100) + 50; // Reward exp acak antara 50 hingga 149
      let moneyReward = Math.floor(Math.random() * 1000) + 500; // Reward money acak antara 500 hingga 1499

      user.exp += expReward;
      user.money += moneyReward;

      message += `\n🎉 Anda menang dalam pertarungan! Bos telah dikalahkan.\n`;
      message += `💰 Anda mendapatkan +${moneyReward} Money\n`;
      message += `🌟 Anda mendapatkan +${expReward} Exp\n`;

      // Anda dapat menambahkan lebih banyak reward atau item di sini sesuai kebutuhan
    } else {
      message += `\n⚔️ Serangan pengguna: ${userAttack}\n`;
      message += `⚔️ Serangan bos: ${bossAttack}\n\n`;
      message += `🔄 Pertarungan berlanjut...`;
    }

    conn.reply(m.chat, message, m);
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, "Error", m);
  }
};

// Fungsi untuk duel dengan pengguna lain
let duelHandler = async (m, conn, user) => {
  let opponent = m.mentionedJid[0];

  if (!opponent || !global.db.data.users[opponent]) {
    return conn.reply(m.chat, "Pilih pengguna yang valid untuk duel", m);
  }

  let betAmount = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  if (user.money < betAmount) {
    return conn.reply(m.chat, "Money Anda tidak mencukupi", m);
  }

  if (user.lastWar && new Date() - user.lastWar < 10000) {
    let remainingTime = Math.ceil((10000 - (new Date() - user.lastWar)) / 1000);
    return conn.reply(
      m.chat,
      `Anda harus menunggu ${remainingTime} detik sebelum dapat bertarung lagi`,
      m,
    );
  }

  conn.reply(m.chat, "Mempersiapkan arena...");

  setTimeout(() => {
    conn.reply(m.chat, "Mendapatkan arena...");

    setTimeout(() => {
      conn.reply(m.chat, "Bertarung...");

      setTimeout(() => {
        let result = Math.random() >= 0.5;
        let wonAmount = result ? betAmount : -betAmount;

        user.money += wonAmount;
        global.db.data.users[opponent].money -= wonAmount;

        let opponentName = conn.getName(opponent);

        let caption = `*Hasil pertempuran:*\n\n`;
        caption += `🏆 *Pemenang*: ${result ? user.name : opponentName}\n`;
        caption += `😔 *Kalah*: ${result ? opponentName : user.name}\n`;
        caption += `💰 *Hadiah*: ${wonAmount}\n`;

        conn.reply(m.chat, caption, m);

        user.lastWar = new Date();

        setTimeout(() => {
          conn.reply(m.chat, `Anda dapat bertarung lagi setelah 5 detik`);
        }, 5000);
      }, 2000);
    }, 2000);
  }, 2000);
};

handler.help = ["duel"];
handler.tags = ["rpg"];
handler.command = /^duel$/i;
handler.group = true;

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
