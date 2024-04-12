const {
  CekNik
} = require("../lib/scrape");

let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) {
    return m.reply(`Masukkan Nik!\n\nContoh: *${usedPrefix + command} xxx*`);
  }
  if (text.length > 16) {
    return m.reply('Maksimal 16 Digit!')
  }
  if (isNaN(text)) {
    return m.reply(`NIK Harus Angka!\n\nContoh: *${usedPrefix + command} 123456xxx*`)
  }
  let res = await CekNik(text)
  let hasil = {
    nik,
    kelamin,
    lahir,
    provinsi,
    kotakab,
    kecamatan,
    uniqcode,
    tambahan: {
      kodepos,
      pasaran,
      usia,
      ultah,
      zodiak
    }
  } = res.data
  conn.reply(m.chat, `*Data Kependudukan*

    NIK: ${hasil.nik}
    Kelamin: ${hasil.kelamin}
    Tempat dan Tanggal Lahir: ${hasil.lahir}
    Provinsi: ${hasil.provinsi}
    Kota/Kabupaten: ${hasil.kotakab}
    Kecamatan: ${hasil.kecamatan}
    Kode Unik: ${hasil.uniqcode}

    *Data Tambahan*

    Kode Pos: ${hasil.tambahan.kodepos}
    Pasaran: ${hasil.tambahan.pasaran}
    Usia: ${hasil.tambahan.usia}
    Tanggal Ultah: ${hasil.tambahan.ultah}
    Zodiak: ${hasil.tambahan.zodiak}`, m)
}

handler.command = handler.help = ["ceknik"]
handler.tags = ["tools"]

module.exports = handler