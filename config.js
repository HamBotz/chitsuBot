const fs = require("fs");
const chalk = require("chalk");

// Owner
global.owner = [
  ['6287729860010']
] // Put your number here
global.mods = ['6287729860010'] // Moderator
global.prems = ['6287729860010'] // Premium

global.APIs = { // API Prefix
  // name: 'https://website'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// Informasi
global.namebot = "chitsuBot";
global.version = '1.0.0'
global.sgc = 'https://chat.whatsapp.com/K4C735CSEsWAtAFsRWDI4B'
global.thumb = 'https://telegra.ph/file/974aa388af1165069f753.jpg'
global.swa = '6287729860010'
global.wm = "shinomiya Tech Bot WhatsApp"
global.done = "```© Chitsu```";
global.sig = 'https://instagram.com/_dlwrml'

// Fake Size
global.fsizedoc = '99999999999999' // default 10TB
global.fpagedoc = '999'

// Watermark
global.wait = "```Loading...```"
global.eror = "`! Error Command Failed`"
global.denied = "`! Error Command Failed`"
global.packname = "chitsuBot";
global.author = "ham"

// Tampilan
global.htki =  '⬣───「' // Hiasan kiri
global.htka = '」───⬣' // Hiasan kanan
global.htjava = '•' // Hiasan
global.sa = '╭─'
global.gx = '│✇'
global.gy = '│•'
global.gz = '│'
global.sb = '╰────࿐'
global.kki = '「'
global.kka = '」'
global.zt = '*'
global.zc = ''

global.multiplier = 1000 // The higher, The harder levelup

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈',
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚'
    };
    let results = Object.keys(emot).filter(v => new RegExp(v, 'gi').test(string));
    if (!results.length) return '';
    else return emot[results[0]];
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})