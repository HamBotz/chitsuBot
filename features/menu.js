const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let levelling = require('../lib/levelling')
let { platform } = require('node:process')
let os = require('os')

let tags = {
  'rpgabsen': '*Rpg-Absen*',
  'rpg': '*Rpg*',
  'game': '*Game*',
  'xp': '*Exp & Limit*',
  'asupan': '*Asupan*',
  'anime': '*Anime*',
  'sticker': '*Stiker*',
  'main': '*Main*',
  'kerang': '*Kerang Ajaib*',
  'quotes': '*Quotes*',
  'admin': '*Admin*',
  'group': '*Group*',
  'internet': '*Internet*',
  'ai': '*AI*',
  'anonymous': '*Anonymous*',
  'downloader': '*Downloader*',
  'store': '*Store*',
  'berita': '*Berita*',
  'tools': '*Tools*',
  'fun': '*Fun*',
  'database': '*Database*', 
  'vote': '*Voting*',
  'absen': '*Absen*',
  'catatan': '*Catatan*',
  'jadian': '*Jadian*',
  'islami': '*Islami*',
  'owner': '*Owner*',
  'advanced': '*Advance*',
  'info': '*Info*',
  'audio': '*Audio*',
  'maker': '*Maker*',
}
const defaultMenu = {
  before: `
%kki *U S E R* %kka
*Name:* %names
*Tag:* %name2
*Status:* %prem
*Limit:* %limit
*Money:* %money
*Role:* %role
*Level:* %level [ %xp4levelup Xp For Levelup]
*Xp:* %exp / %maxexp
*Total Xp:* %totalexp

%kki *T O D A Y* %kka
*${ucapan()} %name2!*
*Days:* %week %weton
*Date:* %date
*Islamic Date:* %dateIslamic
*Time:* %wib WIB %wita WITA %wit WIT

%kki *I N F O*  %kka
*Bot Name:* %me
*Mode:* %mode
*Platform:* %platform
*Type:* Node.Js
*Baileys:* Multi Device
*Prefix:* [ *%p* ]
*Uptime:* %uptime
*Database:* %rtotalreg dari %totalreg
%readmore`.trimStart(),
  header: '%htki %category %htka',
  body: '◦ %cmd %islimit %isPremium',
  footer: '',
  after: 'ChitsuBot masih dalam tahap pengembangan.',
}
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, balance, money } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = m.sender
    let names = await conn.getName(m.sender)
    let name2 = `@${m.sender.split("@")[0]}`
    let ucapans = ucapan()
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    const dd = new Date('2023-01-01');
    let htki = `${global.htki}`
    let htka = `${global.htka}`
    let kki = `${global.kki}`
    let kka = `${global.kka}`
    const locales = 'en';
    let mode = global.opts['self'] ? 'Private' : 'Publik'
    let premium = global.db.data.users[m.sender].premiumTime
    let prem = `${premium > 0 ? 'Premium' : 'Free'}`
    const wib = moment.tz('Asia/Jakarta').format("HH:mm:ss")
    const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    
    const platform = os.platform()

    const targetDate = new Date('January 1, 2024 00:00:00');
    const currentDate = new Date();
    const remainingTime = targetDate.getTime() - currentDate.getTime();
    const seconds = Math.floor(remainingTime / 1000) % 60;
    const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
    const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
    const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
    let dateCountdown = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik lagi menuju tahun baru!`;
    
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.features).filter(features => !features.disabled).map(features => {
      return {
        help: Array.isArray(features.tags) ? features.help : [features.help],
        tags: Array.isArray(features.tags) ? features.tags : [features.tags],
        prefix: 'customPrefix' in features,
        limit: features.limit,
        premium: features.premium,
        enabled: !features.disabled,
      }
    })
    for (let features of help)
      if (features && 'tags' in features)
        for (let tag of features.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      ucapan: ucapan(),
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, names, prem, money, mode, name2, weton, week, kki, kka, htki, htka, date, dateIslamic, dateCountdown, platform, wib, wit, wita, time, totalreg, rtotalreg, balance, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    var fkonn = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '6287729860010@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${await conn.getName(name)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    var thumbs = 'https://telegra.ph/file/b210a500a085eb399bf2c.mp4'
    var thumb = 'https://telegra.ph/file/974aa388af1165069f753.jpg'
    var nomor = '6287729860010'
    var nomorown = nomor + '@whatsapp.net'
    /*const arr = [
    { text: "[▒▒▒▒▒▒▒▒▒▒]", timeout: 100 },
    { text: "[█▒▒▒▒▒▒▒▒▒]", timeout: 100 },
    { text: "[██▒▒▒▒▒▒▒▒]", timeout: 100 },
    { text: "[███▒▒▒▒▒▒▒]", timeout: 100 },
    { text: "[████▒▒▒▒▒▒]", timeout: 100 },
    { text: "[█████▒▒▒▒▒]", timeout: 100 },
    { text: "[██████▒▒▒▒]", timeout: 100 },
    { text: "[███████▒▒▒]", timeout: 100 },
    { text: "[████████▒▒]", timeout: 100 },
    { text: "[█████████▒]", timeout: 100 },
    { text: "[██████████]", timeout: 100 },
    { text: `👋 ${ucapans} *${names}*\n\n_*Menu akan muncul dalam...*_\n3...`, timeout: 100 },
    { text: `👋 ${ucapans} *${names}*\n\n_*Menu akan muncul dalam...*_\n2...`, timeout: 100 },
    { text: `👋 ${ucapans} *${names}*\n\n_*Menu akan muncul dalam...*_\n1...`, timeout: 100 },
    { text: `*${wait}*\n\n👋 ${ucapans} *${names}*`, timeout: 100 }
  ];

  const lll = await conn.sendMessage(m.chat, { text: wait }, { quoted: fkonn });

  for (let i = 0; i < arr.length; i++) {
    await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: lll,
        type: 14,
        editedMessage: {
          conversation: arr[i].text
        }
      }
    }, { quoted: fkonn });
  }*/
  /*conn.sendFile(m.chat, thumbs, 'danz.mp4', text, fkonn, true, {
    gifPlayback: true,
    gifAttribution: 2,
    mentions: conn.parseMention(text)
  });*/
  conn.reply(m.chat, text, '');
  } catch (e) {
    console.error(e)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

handler.register = true
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  const hour_now = moment.tz('Asia/Jakarta').format('HH')
  var ucapanWaktu = 'Selamat Pagi'
  if (hour_now >= '03' && hour_now <= '10') {
    ucapanWaktu = 'Selamat Pagi'
  } else if (hour_now >= '10' && hour_now <= '15') {
    ucapanWaktu = 'Selamat Siang'
  } else if (hour_now >= '15' && hour_now <= '17') {
    ucapanWaktu = 'Selamat Sore'
  } else if (hour_now >= '17' && hour_now <= '18') {
    ucapanWaktu = 'Selamat Petang'
  } else if (hour_now >= '18' && hour_now <= '23') {
    ucapanWaktu = 'Selamat Malam'
  } else {
    ucapanWaktu = 'Selamat Malam!'
  }
  return ucapanWaktu
}