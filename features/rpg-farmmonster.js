// Data monster dari anime isekai
const monsters = {
  slime: {
    name: "Slime",
    power: 10,
    health: 100,
  },
  goblin: {
    name: "Goblin",
    power: 15,
    health: 150,
  },
  dragon: {
    name: "Dragon",
    power: 30,
    health: 300,
  },
  orc: {
    name: "Orc",
    power: 25,
    health: 250,
  },
  skeleton: {
    name: "Skeleton",
    power: 12,
    health: 120,
  },
  demon: {
    name: "Demon",
    power: 40,
    health: 400,
  },
  // Tambahkan monster lainnya dari anime isekai di sini
};

// Handler untuk perintah farmmonster
let handler = async (m, { command }) => {
  if (command === "farmmonster") {
    const userId = m.sender;
    global.db.data.users[userId] = global.db.data.users[userId] || {
      level: 1,
      exp: 0,
      health: 100,
      monster: null,
      sword: 1,
    };
    const user = global.db.data.users[userId];
    const userLevel = user.level;
    const userMonster = user.monster;
    const userSword = user.sword; // Level pedang pengguna

    // Cek apakah pengguna sedang bertarung dengan monster
    if (userMonster) {
      await m.reply(
        `Anda sedang dalam pertarungan dengan ${monsters[userMonster].name}.`,
      );
      return;
    }

    // Pilih monster secara acak
    const monsterKeys = Object.keys(monsters);
    const randomMonsterKey =
      monsterKeys[Math.floor(Math.random() * monsterKeys.length)];
    const monster = monsters[randomMonsterKey];

    // Menghitung damage pengguna
    const userPower = userLevel * 10 + userSword * 5; // Keuatan pengguna dengan tambahan damage pedang

    // Mulai pertarungan
    await m.reply(
      `Anda bertemu dengan ${monster.name} (Kekuatan: ${monster.power}, Kesehatan: ${monster.health}).`,
    );
    user.monster = randomMonsterKey;

    // Logika pertarungan
    let battleResult = "";

    if (userPower > monster.power) {
      const expEarned = Math.floor(monster.power * 1.5); // Penghasilan exp
      user.exp += expEarned;
      user.monster = null;
      battleResult = `Anda berhasil mengalahkan ${monster.name} dan mendapatkan ${expEarned} exp.`;
    } else {
      const damageTaken = Math.floor(monster.power / 2); // Kerusakan yang diterima
      user.health -= damageTaken;
      if (user.health <= 0) {
        user.health = 100; // Reset kesehatan jika mencapai 0
        user.level -= 1; // Pengurangan level jika kalah
      }
      user.monster = null;
      battleResult = `${monster.name} mengalahkan Anda dan Anda kehilangan ${damageTaken} kesehatan.`;
    }

    await m.reply(battleResult);
  }
};

handler.help = ["farmmonster"];
handler.tags = ["game"];
handler.command = /^farmmonster$/i;
handler.register = true;

module.exports = handler;
