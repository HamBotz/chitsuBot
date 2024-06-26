var axios = require('axios');
var googleIt = require('google-it');

async function ssweb(url, device = 'desktop') {
  return new Promise((resolve, reject) => {
    var base = 'https://www.screenshotmachine.com';
    var param = {
      url: url,
      device: device,
      cacheLimit: 0
    };
    axios({
      url: base + '/capture.php',
      method: 'POST',
      data: new URLSearchParams(Object.entries(param)),
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then((data) => {
      var cookies = data.headers['set-cookie'];
      if (data.data.status == 'success') {
        axios.get(base + '/' + data.data.link, {
          headers: {
            'cookie': cookies.join('')
          },
          responseType: 'arraybuffer'
        }).then(({ data }) => {
          result = {
            status: 200,
            result: data
          };
          resolve(result);
        });
      } else {
        reject({ status: 404, statuses: 'Terjadi kesalahan!', message: data.data });
      }
    }).catch(reject);
  });
}

var handler = async (m, { conn, command, args }) => {
  var full = /f$/i.test(command);
  var text = args.join(' ');
  if (!text) return conn.reply(m.chat, 'Tidak ada teks untuk dicari', m);
  var url = 'https://google.com/search?q=' + encodeURIComponent(text);
  var search = await googleIt({ query: text });
  var msg = search.map(({ title, link, snippet}) => {
    return `*${title}*\n_${link}_\n_${snippet}_`;
  }).join('\n\n');
  try {
    var ss = await ssweb(text, 'desktop');
    if (ss.includes('html')) throw '';
    await conn.sendFile(m.chat, ss.result, 'screenshot.png', url + '\n\n' + msg, m);
  } catch (e) {
    m.reply(msg);
  }
};

handler.help = ['google <search>'];
handler.tags = ['internet'];
handler.command = /^googlef?$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.limit = true;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;

module.exports = handler;