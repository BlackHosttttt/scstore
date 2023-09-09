// [ NOTE:
//PLISS SCRIPT INI JANGAN DI-JUAL
//ATAU DI SHARE SECARA GRATIS
//MOHON HARGA CREATOR UTAMANYA ]



"use strict";
const { default: makeWASocket, DisconnectReason, useSingleFileAuthState, makeInMemoryStore, downloadContentFromMessage, jidDecode, generateForwardMessageContent, generateWAMessageFromContent } = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const chalk = require('chalk')
const logg = require('pino')
const { serialize, fetchJson, sleep, getBuffer } = require("./SCRIPT BY RAMAA GNZZ/myfunc");
const { nocache, uncache } = require('./SCRIPT BY RAMAA GNZZ/chache.js');

let setting = JSON.parse(fs.readFileSync('./setting.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)


const memory = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const connectToWhatsApp = async () => {
const ramz = makeWASocket({
printQRInTerminal: true,
logger: logg({ level: 'fatal' }),
browser: ['YT :MiMiXd Solo','Safari','1.0.0'],
auth: state
})
memory.bind(ramz.ev)

ramz.ev.on('messages.upsert', async m => {
var msg = m.messages[0]
if (!m.messages) return;
if (msg.key && msg.key.remoteJid == "status@broadcast") return
msg = serialize(ramz, msg)
msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
require('./byRama')(ramz, msg, m, setting, memory)
})

ramz.ev.on('creds.update', () => saveState)
console.log(chalk.yellow(`${chalk.red('[ Made By MiMiXd Solo ]')}\n\n${chalk.italic.magenta(`SV MiMiXd Solo\nNomor: 081231319622\nSebut NamaðŸ‘†,`)}\n\n\n${chalk.red(`ADMIN SEDIA`)}\n${chalk.white(`-PANEL RUN BOT\n-SCRIT CREATE PANEL\n-SCRIPT MD\n-THEMES PANEL\n`)}`))
 
 
ramz.reply = (from, content, msg) => ramz.sendMessage(from, { text: content }, { quoted: msg })

ramz.ev.on('connection.update', (update) => {
console.log('Connection update:', update)
if (update.connection === 'open') 
console.log("Connected with " + ramz.user.id)
else if (update.connection === 'close')
connectToWhatsApp()
})



ramz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await ramz.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

ramz.sendText = (jid, text, quoted = "", options) => ramz.sendMessage(jid, { text: text, ...options }, { quoted });


ramz.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

ramz.sendTextMentions = async (jid, teks, mention, quoted = '') => {
        	return ramz.sendMessage(jid, { text: teks, mentions: mention }, { quoted })
        }

ramz.downloadAndSaveMediaMessage = async(msg, type_file, path_file) => {
           if (type_file === 'image') {
             var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           } else if (type_file === 'video') {
             var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage, 'video')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           } else if (type_file === 'sticker') {
             var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           } else if (type_file === 'audio') {
             var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage, 'audio')
             let buffer = Buffer.from([])
             for await(const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
             }
             fs.writeFileSync(path_file, buffer)
             return path_file
           }
        }

return ramz
}
connectToWhatsApp()
.catch(err => console.log(err))
