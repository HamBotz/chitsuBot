// Command untuk mengatur gender pengguna
let setGenderCommand = async (m, { conn, args }) => {
  if (args.length !== 1) {
    return conn.reply(
      m.chat,
      'Gunakan perintah ini dengan format: *#setgender [gender]*\nContoh: *#setgender male* (untuk mengatur gender menjadi "male")',
      m,
    );
  }

  let gender = args[0].toLowerCase();
  if (gender === "male" || gender === "female") {
    global.db.data.users[m.sender].gender = gender;
    conn.reply(m.chat, `Gender Anda telah diatur menjadi "${gender}"`, m);
  } else {
    conn.reply(
      m.chat,
      'Pilihan gender yang valid adalah "male" atau "female".',
      m,
    );
  }
};

// Command untuk melihat gender pengguna
let viewGenderCommand = async (m, { conn }) => {
  let gender = global.db.data.users[m.sender].gender || "Belum diatur";
  conn.reply(m.chat, `Gender Anda: ${gender}`, m);
};

// Menambahkan deskripsi perintah untuk set gender
setGenderCommand.help = ["setgender [gender]"];
setGenderCommand.tags = ["rpg"];
setGenderCommand.command = /^(setgender)$/i;

// Menambahkan deskripsi perintah untuk view gender
viewGenderCommand.help = ["viewgender"];
viewGenderCommand.tags = ["rpg"];
viewGenderCommand.command = /^(viewgender)$/i;

// Ekspor command
module.exports = {
  setGenderCommand,
  viewGenderCommand,
};
