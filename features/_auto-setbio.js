let handler = m => m 
  
    handler.all = async function (m) { 
    let setting = db.data.settings[this.user.jid]
      if (new Date() * 1 - setting.status > 1000) {  
          let _uptime = process.uptime() * 1000  
          let uptime = clockString(_uptime)
        await this.setBio(`Runtime: ${uptime} | Version: ${global.version}`).catch(_ => _) 
          setting.status = new Date() * 1  
      }
    }

module.exports = handler

function clockString(ms) {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000));
  let daysms = ms % (24 * 60 * 60 * 1000);
  let hours = Math.floor((daysms) / (60 * 60 * 1000));
  let hoursms = ms % (60 * 60 * 1000);
  let minutes = Math.floor((hoursms) / (60 * 1000));
  let minutesms = ms % (60 * 1000);
  let sec = Math.floor((minutesms) / (1000));
  return days + " Hari " + hours + " Jam " + minutes + " Menit " + sec + " Detik";
}