const policeCooldown = 300000; // 5 minutes in milliseconds

const policeMissions = [
  {
    result: (user) => {
      const rewardMoney = Math.floor(Math.random() * 1000);
      const rewardExp = Math.floor(Math.random() * 10);
      return {
        text: `👮 You successfully caught the thief!\n💰 Money: +${rewardMoney}\n✨ Experience: +${rewardExp}`,
        money: rewardMoney,
        exp: rewardExp,
        ordersCompleted: 1,
      };
    },
    time: 27000, // Time it takes to complete this mission in milliseconds
  },
  // Add more mission objects as needed
];

const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];
  const now = new Date();

  if (now - user.lastPoliceMission < policeCooldown) {
    const remainingTime = policeCooldown - (now - user.lastPoliceMission);
    const remainingTimeString = clockString(remainingTime);
    conn.reply(
      m.chat,
      `You're too tired to go on another mission!\n⏳ Cooldown remaining: ${remainingTimeString}`,
      m,
    );
    return;
  }

  const mission = random(policeMissions);
  const missionResult = mission.result(user);

  const dimas = `👮 Chasing the thief...`;
  const dimas2 = `👮 Successfully caught the thief...`;
  const dimas3 = `🚔 Taking the thief to the police station and to jail`;
  const dimas4 = `💰 💹 Receiving salary...`;
  const dimas5 = `👋 Hello, it's time for another police mission...`;

  conn.reply(m.chat, dimas, m);

  setTimeout(() => {
    conn.reply(m.chat, dimas2, m);
  }, mission.time / 3);

  setTimeout(
    () => {
      conn.reply(m.chat, dimas3, m);
    },
    (2 * mission.time) / 3,
  );

  setTimeout(() => {
    conn.reply(m.chat, dimas4, m);
  }, mission.time);

  setTimeout(() => {
    conn.reply(m.chat, dimas5, m);
  }, mission.time + 5000);

  const missionText = missionResult.text;
  user.money += missionResult.money;
  user.exp += missionResult.exp;
  user.lastPoliceMission = now;
  user.ojekk += missionResult.ordersCompleted;

  conn.reply(m.chat, missionText, m);
};

handler.help = ["polisi"];
handler.tags = ["rpg"];
handler.command = /^(polisi)$/i;
handler.register = true;

module.exports = handler;

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clockString(ms) {
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms / 3600000) % 24;
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return `\n${d} *Days ☀️*\n ${h} *Hours 🕐*\n ${m} *Minute ⏰*\n ${s} *Second ⏱️*`;
}
