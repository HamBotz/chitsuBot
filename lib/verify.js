var axios = require('axios');
var CFonts = require('cfonts');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

var accessListURL = "https://raw.githubusercontent.com/HamBotz/join-verify/main/verify";
var pluginsFolderPath = path.join(__dirname, 'features');

let accessList = [];

async function fetchAccessList() {
  try {
    var { data } = await axios.get(accessListURL);
    accessList = data;
  } catch (error) {
    throw new Error(`Terjadi kesalahan: ${error.message}`);
  }
}

async function getBotIP() {
  try {
    var response = await axios.get("https://api.ipify.org/?format=json");
    var { ip } = response.data;
    return ip;
  } catch (error) {
    throw new Error("IP Address tidak terdeteksi.");
  }
}

var logoOptions = {
  font: 'tiny',
  align: 'center',
  colors: ['system'],
};

var whatsappOptions = {
  colors: ['yellow'],
  font: 'console',
  align: 'center',
};

CFonts.say('ChitsuBot-Md', logoOptions);
CFonts.say('Contact US wa.me/6287729860010\n', whatsappOptions);

async function processPlugins() {
  var pluginFiles = fs.readdirSync(pluginsFolderPath);

  for (var pluginFile of pluginFiles) {
    var pluginFilePath = path.join(pluginsFolderPath, pluginFile);
    try {
      var pluginModule = require(pluginFilePath);
      if (typeof pluginModule === 'function') {
        await pluginModule();
      }
    } catch (error) {
      console.error(`Kesalahan pada plugins ${pluginFile}: ${error.message}`);
    }
  }
}

async function joinverify() {
  if (accessList.length === 0) {
    await fetchAccessList();
  }

  var botIP = await getBotIP();
  if (!accessList.includes(botIP)) {
    console.log(`\nIP Address ${chalk.red(botIP)} tidak terdaftar.`);
    console.log(`Contact: ${chalk.green("wa.me/6287729860010")}\n`);
    return false;
  }

  console.log(`\nIP Address ${chalk.green(botIP)} telah terdaftar.`);
  return true;
}

module.exports = { joinverify, processPlugins };