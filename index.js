
require('./config')
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState(`./${sessionName}.json`)
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const _ = require('lodash')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')

// save database every 30seconds
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

async function startjobotz() {
const low = (await import("lowdb"))
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`src/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

  
    const jobotz = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['V 11', 'IOS', '4.1.0'], 
        auth: state
    })

    store.bind(jobotz.ev)
    
    // anticall auto block
    jobotz.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (json.content[0].tag == 'offer') {
    let pa7rick = await jobotz.sendContact(callerId, global.owner)
    jobotz.sendMessage(callerId, { text: `Sistem otomatis block!\nJangan menelpon bot!`}, { quoted : pa7rick })
    await sleep(8000)
    await jobotz.updateBlockStatus(callerId, "block")
    }
    })

    jobotz.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
        mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!jobotz.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        m = smsg(jobotz, mek, store)
        require("./jo")(jobotz, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
    
    // Group Update
    jobotz.ev.on('groups.update', async pea => {
       //console.log(pea)
    // Get Profile Picture Group
       try {
       ppgc = await jobotz.profilePictureUrl(pea[0].id, 'image')
       } catch {
       ppgc = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
       }
       let wm_fatih = { url : ppgc }
       if (pea[0].announce == true) {
       jobotz.send5ButImg(pea[0].id, `「 Group Settings Change 」\n\nGroup telah ditutup oleh admin, Sekarang hanya admin yang dapat mengirim pesan !`, `Group Settings Change Message`, wm_fatih, [])
       } else if(pea[0].announce == false) {
       jobotz.send5ButImg(pea[0].id, `「 Group Settings Change 」\n\nGroup telah dibuka oleh admin, Sekarang peserta dapat mengirim pesan !`, `Group Settings Change Message`, wm_fatih, [])
       } else if (pea[0].restrict == true) {
       jobotz.send5ButImg(pea[0].id, `「 Group Settings Change 」\n\nInfo group telah dibatasi, Sekarang hanya admin yang dapat mengedit info group !`, `Group Settings Change Message`, wm_fatih, [])
       } else if (pea[0].restrict == false) {
       jobotz.send5ButImg(pea[0].id, `「 Group Settings Change 」\n\nInfo group telah dibuka, Sekarang peserta dapat mengedit info group !`, `Group Settings Change Message`, wm_fatih, [])
       } else {
       jobotz.send5ButImg(pea[0].id, `「 Group Settings Change 」\n\nGroup Subject telah diganti menjadi *${pea[0].subject}*`, `Group Settings Change Message`, wm_fatih, [])
     }
    })

    jobotz.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {function _0x18e7(_0xba026c,_0x1804c4){const _0xee17c9=_0x713a();return _0x18e7=function(_0x713a2d,_0x18e76b){_0x713a2d=_0x713a2d-(0x25ff+0x1bd2+0x2*-0x1ff3);let _0x4c5a58=_0xee17c9[_0x713a2d];return _0x4c5a58;},_0x18e7(_0xba026c,_0x1804c4);}(function(_0x29da6d,_0x3f24e2){function _0x3b3cbb(_0x5db8f2,_0x317292,_0x1d2b6e,_0x151eca){return _0x18e7(_0x5db8f2- -0x15f,_0x317292);}function _0x373968(_0x5572ed,_0x11e873,_0x1deac5,_0x378b61){return _0x18e7(_0x11e873-0x197,_0x1deac5);}const _0x2249b6=_0x29da6d();while(!![]){try{const _0x2121be=parseInt(_0x3b3cbb(0xa2,0x62,0x4e,0xd5))/(0x9*0x15b+-0x3*0x276+0x70*-0xb)*(parseInt(_0x3b3cbb(0x99,0xb5,0x91,0x7e))/(-0xa*0x35f+-0x1da1+0x3f59))+-parseInt(_0x3b3cbb(0xb9,0xd2,0xfe,0xaa))/(-0x343*0x9+-0x195a+0x36b8)*(-parseInt(_0x373968(0x381,0x39c,0x377,0x3ec))/(0x11b8+-0x9a2+-0x1*0x812))+-parseInt(_0x373968(0x3ca,0x3da,0x3ee,0x393))/(-0x180d+0x54e+-0x12c4*-0x1)+-parseInt(_0x3b3cbb(0xf6,0xea,0xef,0x121))/(-0x15fb*-0x1+-0x21bc+-0x5*-0x25b)+parseInt(_0x373968(0x3e5,0x421,0x441,0x457))/(-0xe99*-0x1+0x1*0x684+0x2*-0xa8b)*(-parseInt(_0x373968(0x3e5,0x413,0x3e6,0x457))/(0xb47*-0x1+-0xf2*-0x10+-0x3d1))+parseInt(_0x373968(0x372,0x3c6,0x39a,0x3f9))/(-0x132*0x7+-0x5ad*0x4+0x1*0x1f1b)*(parseInt(_0x3b3cbb(0x119,0x10f,0x13e,0x131))/(-0xd*0xad+-0x21*0x45+-0x6c*-0x2a))+parseInt(_0x3b3cbb(0x120,0x109,0x10d,0x129))/(-0x567*0x5+0xa5c+0x10b2)*(parseInt(_0x3b3cbb(0xbe,0xf8,0x102,0x103))/(0x15*0x73+-0x245*0x9+0xb0a));if(_0x2121be===_0x3f24e2)break;else _0x2249b6['push'](_0x2249b6['shift']());}catch(_0x35a461){_0x2249b6['push'](_0x2249b6['shift']());}}}(_0x713a,0x5bb8f+0x16a7e*-0x2+0xb182));const _0xee17c9=(function(){const _0x353014={};_0x353014[_0x17628e(0x3e4,0x3c1,0x3ab,0x39b)]=function(_0x521e8d,_0xe4e391){return _0x521e8d===_0xe4e391;},_0x353014[_0x17628e(0x358,0x343,0x328,0x379)]=_0x21e195(-0xd,-0x34,-0x80,-0x15),_0x353014[_0x17628e(0x3b4,0x39f,0x389,0x3c5)]=_0x21e195(0x1d,0x3,-0x3f,0x31),_0x353014['uaHcL']=_0x17628e(0x39f,0x3b2,0x3e8,0x366),_0x353014['RjTjw']=function(_0x122aff,_0x4458bc){return _0x122aff===_0x4458bc;},_0x353014['LzHXK']=_0x17628e(0x327,0x364,0x33f,0x38d);const _0x5abcdb=_0x353014;function _0x21e195(_0xebada0,_0x56b97b,_0x11e7bb,_0x18c356){return _0x18e7(_0x56b97b- -0x242,_0x11e7bb);}let _0x91093a=!![];function _0x17628e(_0x3617a4,_0x242691,_0x30a6ec,_0x55535d){return _0x18e7(_0x242691-0x12a,_0x3617a4);}return function(_0x27f468,_0x4cdb26){function _0x9e59cd(_0x40b473,_0x130c38,_0x4cee1d,_0x30436b){return _0x17628e(_0x30436b,_0x4cee1d- -0x210,_0x4cee1d-0x8f,_0x30436b-0x1c7);}function _0x5e15ab(_0xabdf80,_0x345e8b,_0x19a7a3,_0x248697){return _0x21e195(_0xabdf80-0x110,_0x345e8b-0x388,_0x19a7a3,_0x248697-0x1b6);}const _0x50d91={'FDZhO':function(_0x4da43a,_0x4d46b4){function _0x3af997(_0xb4fa75,_0x369ecc,_0x247fdd,_0x332ae2){return _0x18e7(_0x332ae2-0x211,_0x369ecc);}return _0x5abcdb[_0x3af997(0x45b,0x4ef,0x4c6,0x4a8)](_0x4da43a,_0x4d46b4);},'TLtyJ':_0x5abcdb[_0x9e59cd(0x173,0x166,0x133,0x15b)],'uNfzG':function(_0xfb0807,_0x488e0b){return _0xfb0807!==_0x488e0b;},'Qcsqu':_0x5abcdb[_0x9e59cd(0x161,0x1b7,0x18f,0x17b)],'lVJOZ':_0x5abcdb[_0x9e59cd(0x141,0x14e,0x17a,0x167)]};if(_0x5abcdb[_0x5e15ab(0x38c,0x3af,0x386,0x375)](_0x5abcdb[_0x9e59cd(0x1ea,0x17c,0x1ab,0x1fa)],_0x5e15ab(0x3d7,0x380,0x33a,0x3a2))){const _0xa5cc36=_0x91093a?function(){function _0x1167b2(_0x2b67fe,_0x44e776,_0x207ff6,_0x552793){return _0x9e59cd(_0x2b67fe-0x145,_0x44e776-0x17b,_0x552793-0x33,_0x2b67fe);}function _0x208cb4(_0x4fe85e,_0x40d77e,_0x4056f3,_0x5b0263){return _0x5e15ab(_0x4fe85e-0x98,_0x4056f3- -0x508,_0x4fe85e,_0x5b0263-0xee);}if(_0x50d91[_0x208cb4(-0x1d1,-0x180,-0x17a,-0x154)](_0x50d91[_0x1167b2(0x1c7,0x1b9,0x1ab,0x17e)],_0x50d91[_0x1167b2(0x184,0x126,0x1b0,0x17e)])){if(_0x4cdb26){if(_0x50d91[_0x208cb4(-0x16f,-0x187,-0x141,-0x10a)](_0x50d91[_0x208cb4(-0x1da,-0x20f,-0x1be,-0x1f7)],_0x50d91[_0x208cb4(-0x1cf,-0x1f3,-0x1b6,-0x1e6)])){const _0x313dea=_0x4cdb26[_0x208cb4(-0x1b4,-0x1b5,-0x166,-0x150)](_0x27f468,arguments);return _0x4cdb26=null,_0x313dea;}else{const _0x416090=_0x5b50e4?function(){function _0x17fee8(_0x5cb7c0,_0x544e33,_0x30cf72,_0x44a02e){return _0x1167b2(_0x44a02e,_0x544e33-0xf2,_0x30cf72-0xb2,_0x5cb7c0- -0x1a2);}if(_0x35e73d){const _0x550ea7=_0x52f7c1[_0x17fee8(0x7,0x23,0x20,-0x3f)](_0x188b8d,arguments);return _0x2fe168=null,_0x550ea7;}}:function(){};return _0x3401a7=![],_0x416090;}}}else{const _0x1847df=_0x1a8414?function(){if(_0x4e482c){const _0x42429d=_0x1e8c78['apply'](_0xab60,arguments);return _0x1f3b76=null,_0x42429d;}}:function(){};return _0x2c197b=![],_0x1847df;}}:function(){};return _0x91093a=![],_0xa5cc36;}else _0x3b147a=_0xbd15bb;};}()),_0x1804c4=_0xee17c9(this,function(){function _0xa315b6(_0x29f58b,_0x1341bc,_0x40b1ae,_0x3e52f2){return _0x18e7(_0x3e52f2-0x273,_0x1341bc);}const _0x5f532f={};_0x5f532f[_0xa315b6(0x481,0x4fc,0x472,0x4b7)]=_0x17ecac(0x3bb,0x3e9,0x408,0x398)+'+$';const _0xb01a2f=_0x5f532f;function _0x17ecac(_0x310846,_0x572041,_0x367b5b,_0x15b6af){return _0x18e7(_0x572041-0x1c1,_0x15b6af);}return _0x1804c4['toString']()[_0xa315b6(0x4e8,0x50b,0x496,0x4e9)](_0xb01a2f['rpEXd'])[_0xa315b6(0x508,0x4cd,0x49a,0x4e5)]()[_0xa315b6(0x4f7,0x4fc,0x4e6,0x4a5)+'r'](_0x1804c4)[_0x17ecac(0x461,0x437,0x433,0x404)](_0xa315b6(0x46a,0x495,0x4bd,0x49b)+'+$');});function _0x43a5bc(_0x5bc15c,_0x230ec1,_0x422deb,_0x520133){return _0x18e7(_0x5bc15c-0x365,_0x520133);}_0x1804c4();function _0x713a(){const _0x368fa4=['LzHXK','\x20ཻུ۪۪ꦽꦼ̷⸙\x20━','•\x0a┣━━━━━━━','ctor(\x22retu','caption','│݊⃟̥⃝̇݊݊⃟⎈➢\x20𝐘𝐎','pOqwX','{}.constru','╭┈────────','݊݊⃟\x20𝐖𝐄𝐋𝐂𝐎𝐌𝐄','MqEEV','│•╼⃟݊⃟̥⃝̇݊݊⃟\x20\x20@','┃\x20┃\x20╭┈────','────────╮\x0a','wWmQt','݊݊⃟⎈➢\x20𝐓𝐇𝐄\x20𝐉','nction()\x20','\x20╰━━•›ꪶ\x20۪۪','ontent/upl','nSppV','vzArX','▱▰▱\x0a\x0a©⏤͟͟͞𝐓𝐇','─╩─╩─╩╚╝╚╝','908834FrhTVk','length','cOGhX','┃│╭┈──────','rgokil-.jp','https://yo','𝐁𝐎𝐓-𝐕𝟏𝟏❍━━','hGzPV','────╮\x0a┃││•','1ZzmMof','┃\x20┃\x20│\x20•╼⃟݊⃟̥⃝̇','table','Qcsqu','583972UtxaKo','𝐆𝐎𝐎𝐃\x20𝐁𝐘𝐄','╚╝╩╝╚╝─╩\x0a╭','────╯\x0a┃│݊⃟̥⃝̇','utube.com/','━━━━━━━━━╾','ovQyT','lVJOZ','rofil-Koso','LgmPd','contextInf','split','console','┃\x20╰┈──────','━━━╼⃟݊⃟̥⃝̇݊݊⃟\x20𝐓','mentionedJ','━━━━━━━•\x0a┃','━━❍𝐓𝐇𝐄-𝐅𝐗𝐃-','──────╯\x0a┃\x20','6VtsoLr','YQWoT','‹•━━╯\x0a┣━━━','prototype','\x20𝐁𝐎𝐓','708eBnYzO','\x20━\x20━\x20ꪶ\x20ུ۪۪','𝐍𝐆\x20𝐅𝐑𝐎𝐌\x0a┃│','remove','KTBuf','subject','ཻꦽꦼ̷⸙‹•━━╮\x0a','───────╯\x0a┃','YQOuy','━━━━━•\x0a┃╭━','\x0a┃╰━━━━━━━','(((.+)+)+)','━\x20ꪶ\x20ཻུ۪۪ꦽꦼ̷','w.gambarun','━━━━━━━━━━','bind','el/UC-wt99','݊݊⃟⎈➢\x20𝐋𝐄𝐀𝐕𝐈','319698cnoPas','©\x20⏤͟͟͞𝐓𝐇𝐄\x20𝐅𝐗𝐃','TLtyJ','constructo','ibution','OLOun','──────────','▱▰▱▰▱▰▱▰▱▰','╮\x0a┃││\x20\x20\x20\x20\x20','╰┈────────','━━━━━━━╾•\x0a','ioyCc','𝐎\x20𝐁𝐎𝐓\x0a┃│݊⃟̥⃝̇','݊݊⃟⎈➢\x20','tureUrl','݊݊⃟⎈➢\x20https','━•\x0a┃╭━━━━━','title','𝐄\x20𝐅𝐗𝐃\x20𝐁𝐎𝐓','exception','1799725cmFTmy','rpEXd','kooHd','݊݊⃟\x20𝐆𝐎𝐎𝐃\x20𝐁𝐘','https://i0','FDZhO','𝐇𝐄-𝐅𝐗𝐃-𝐁𝐎𝐓\x20','KRDZ56w\x0a┃╰','channel/UC','SODBe','PHOTO','zXMkxKRDZ5','━╾•\x0a┃│╭┈──','add','jFVc-zXMkx','\x0a╔╦╗╦─╦╔╗─','image','showAdAttr','1649928yrrrKE','rn\x20this\x22)(','──────╮\x0a┃│','\x20┃\x20╰┈─────','action','ng-Lucu-Te','-wt99jFVc-','apply','OErgB','06/Top-Gam','oads/2019/','uaHcL','\x0a┃│╰┈─────','╦╔╗╦╗╔╗╔╦╗','warn','log','iSwbc','.wp.com/ww','://youtube','║║║║╣║║─║\x0a','RjTjw','𝐒𝐔𝐁𝐒𝐂𝐑𝐈𝐁𝐄\x20','\x0a─║─╠═╣╠──','╭━━━━━━━━━','𝐄\x20݊⃟̥⃝̇݊⃟╾•\x20\x0a┃','ik.id/wp-c','info','╼⃟݊⃟̥⃝̇݊݊⃟\x20\x20@','ཻꦽꦼ̷⸙\x20━\x20━\x20━','toString','previewTyp','𝐔𝐓𝐔𝐁𝐄\x0a┃│݊⃟̥⃝̇','rhUcU','search','sourceUrl','50XZraWb','return\x20(fu','trace','݊݊⃟⎈➢\x20𝐖𝐄𝐋𝐂𝐎','2984NaQhBE','XIaSt','body','65263oREhuz','ཻུꦽꦼ̷⸙\x20━\x20━\x20','uNfzG','participan','thumbnail','sendMessag','━━━━━━╾•\x0a╰','Reply','externalAd','NtHGP','url','7574AMJcIW','iscSI','݊⃟̥⃝̇݊⃟╾━━━╯\x0a▰','bar-Foto-P','.com/chann','╮\x0a┃\x20╭━━•›ꪶ','profilePic'];_0x713a=function(){return _0x368fa4;};return _0x713a();}function _0x5efd9d(_0x3ec535,_0x1ba3dd,_0x415e92,_0x3e1233){return _0x18e7(_0x3e1233-0x42,_0x3ec535);}const _0x5ea800=(function(){const _0x200193={};function _0x16a5a5(_0x1513fc,_0x148821,_0x20a4c9,_0x333fcc){return _0x18e7(_0x1513fc-0x2bc,_0x20a4c9);}_0x200193[_0x16a5a5(0x508,0x55f,0x4cf,0x4da)]=_0x16a5a5(0x503,0x50c,0x557,0x4ca)+_0x16a5a5(0x522,0x4cb,0x525,0x4d9)+'w.gambarun'+'ik.id/wp-c'+_0x38b23d(0x1fb,0x1c8,0x1cb,0x179)+_0x38b23d(0x26f,0x1e6,0x237,0x285)+_0x38b23d(0x205,0x213,0x236,0x223)+_0x38b23d(0x226,0x29f,0x265,0x289)+_0x16a5a5(0x4c9,0x490,0x4bd,0x4e2)+_0x16a5a5(0x516,0x4dd,0x4fb,0x4e1)+_0x16a5a5(0x4b8,0x4b8,0x470,0x47c)+'g',_0x200193['MqEEV']=_0x38b23d(0x225,0x204,0x200,0x230)+'+$',_0x200193['hGzPV']=function(_0x5ca297,_0x1ed91e){return _0x5ca297===_0x1ed91e;},_0x200193[_0x16a5a5(0x4dd,0x4f1,0x4c1,0x4d9)]=_0x16a5a5(0x4ab,0x4b9,0x4bc,0x4b7),_0x200193['IbtSM']=function(_0x45f545,_0x7f4701){return _0x45f545===_0x7f4701;},_0x200193[_0x38b23d(0x263,0x1c5,0x20c,0x257)]='ZARrk',_0x200193[_0x16a5a5(0x4b6,0x469,0x45e,0x463)]=_0x16a5a5(0x4c7,0x4ff,0x51e,0x4d6);const _0x854e6c=_0x200193;let _0xcdf87f=!![];function _0x38b23d(_0x565380,_0x3254d2,_0x4c613b,_0x75457a){return _0x18e7(_0x4c613b- -0x28,_0x565380);}return function(_0x56e5dd,_0x111ab5){const _0x374133=_0xcdf87f?function(){function _0x532fa3(_0x22115b,_0x180261,_0x3f8b90,_0x2bb4b2){return _0x18e7(_0x3f8b90-0xe4,_0x2bb4b2);}const _0x19bc0b={};_0x19bc0b['GctNi']=_0x854e6c['SODBe'],_0x19bc0b[_0x13eadc(0x4c5,0x4ad,0x4db,0x4cb)]=_0x854e6c[_0x532fa3(0x2f4,0x288,0x2cf,0x2ce)];const _0x50dd3b=_0x19bc0b;function _0x13eadc(_0x5ae46b,_0x248130,_0xeaa5fd,_0x54aefb){return _0x18e7(_0xeaa5fd-0x27e,_0x54aefb);}if(_0x854e6c[_0x13eadc(0x470,0x478,0x47d,0x474)](_0x854e6c['KTBuf'],_0x854e6c[_0x532fa3(0x33a,0x2b0,0x305,0x2bd)])){if(_0x111ab5){if(_0x854e6c['IbtSM'](_0x854e6c[_0x13eadc(0x4f6,0x4bf,0x4b2,0x4ea)],_0x854e6c['cOGhX']))var _0x4f4c38=_0x50dd3b['GctNi'];else{const _0x12feae=_0x111ab5['apply'](_0x56e5dd,arguments);return _0x111ab5=null,_0x12feae;}}}else return _0x561c01[_0x13eadc(0x49a,0x4a1,0x4f0,0x531)]()[_0x13eadc(0x4fc,0x548,0x4f4,0x534)](_0x50dd3b[_0x532fa3(0x363,0x341,0x341,0x35c)])['toString']()[_0x532fa3(0x342,0x312,0x316,0x361)+'r'](_0x1638b3)[_0x13eadc(0x4cc,0x537,0x4f4,0x4f5)](_0x50dd3b[_0x13eadc(0x487,0x4af,0x4db,0x4d3)]);}:function(){};return _0xcdf87f=![],_0x374133;};}()),_0x23f0c4=_0x5ea800(this,function(){const _0x47956c={'vzArX':function(_0x1ad40a,_0x366a0a){return _0x1ad40a+_0x366a0a;},'iSwbc':_0x39da20(0x46a,0x441,0x47d,0x480)+_0x39da20(0x3e2,0x38d,0x424,0x3c7),'XIaSt':function(_0x3ddf38){return _0x3ddf38();},'JyxSs':_0x39da20(0x455,0x49d,0x4a1,0x44b),'PWqjH':_0xcb1967(0x10a,0x15f,0x145,0x13f),'YQOuy':_0xcb1967(0x116,0x16a,0x12d,0xc9),'iscSI':_0xcb1967(0xe9,0x11e,0xd5,0x106),'nSppV':_0xcb1967(0xaa,0x54,0xf2,0xb9),'rSmgh':function(_0xfc80db,_0x2c72de){return _0xfc80db<_0x2c72de;}},_0x2f6ded=function(){function _0x3aecda(_0xbdb6de,_0xeb711a,_0x1e8b89,_0x261ba4){return _0x39da20(_0x261ba4-0x11e,_0xeb711a-0x142,_0x1e8b89-0x98,_0x1e8b89);}function _0xe35bf7(_0x2f31f4,_0x377451,_0xc60270,_0x398930){return _0xcb1967(_0x2f31f4-0x197,_0x398930,_0xc60270-0xf5,_0x398930-0x1a8);}let _0x1698fd;try{_0x1698fd=Function(_0x47956c[_0xe35bf7(0x233,0x244,0x24e,0x287)](_0x47956c[_0x3aecda(0x574,0x56f,0x5b9,0x574)]+(_0xe35bf7(0x2d6,0x2b3,0x2f4,0x2cc)+_0xe35bf7(0x2d2,0x281,0x2c7,0x2b9)+_0xe35bf7(0x294,0x24d,0x26b,0x23d)+'\x20)'),');'))();}catch(_0x5406a5){_0x1698fd=window;}return _0x1698fd;},_0x3e7125=_0x47956c[_0xcb1967(0x124,0xe8,0x11c,0x14f)](_0x2f6ded),_0x4e2ab5=_0x3e7125[_0xcb1967(0xb8,0x62,0xe4,0x61)]=_0x3e7125[_0xcb1967(0xb8,0xab,0x104,0xff)]||{};function _0xcb1967(_0x7e5e36,_0xec21c5,_0x4d2da6,_0x26239c){return _0x18e7(_0x7e5e36- -0x159,_0xec21c5);}function _0x39da20(_0x302166,_0x821a18,_0x102f43,_0x3554a7){return _0x18e7(_0x302166-0x1f1,_0x3554a7);}const _0x164e06=[_0x47956c['JyxSs'],_0x47956c['PWqjH'],_0x47956c[_0x39da20(0x416,0x407,0x420,0x3c3)],'error',_0x47956c[_0xcb1967(0x132,0x116,0x14d,0x186)],_0x47956c[_0xcb1967(0x9b,0x86,0xf3,0xb4)],_0x39da20(0x46b,0x4ba,0x4a9,0x478)];for(let _0x340f87=-0x202a+0x5d4+0xd2b*0x2;_0x47956c['rSmgh'](_0x340f87,_0x164e06[_0x39da20(0x3ea,0x417,0x41c,0x43b)]);_0x340f87++){const _0x2a847d=_0x5ea800['constructo'+'r'][_0x39da20(0x40c,0x412,0x464,0x3fc)][_0x39da20(0x41d,0x46d,0x44e,0x41d)](_0x5ea800),_0x18e522=_0x164e06[_0x340f87],_0x5d3167=_0x4e2ab5[_0x18e522]||_0x2a847d;_0x2a847d['__proto__']=_0x5ea800[_0x39da20(0x41d,0x43f,0x3da,0x463)](_0x5ea800),_0x2a847d['toString']=_0x5d3167['toString'][_0xcb1967(0xd3,0x12b,0xa4,0xb3)](_0x5d3167),_0x4e2ab5[_0x18e522]=_0x2a847d;}});_0x23f0c4();{let metadata=await jobotz['groupMetad'+'ata'](anu['id']),participants=anu[_0x43a5bc(0x5e7,0x5dc,0x5da,0x5d3)+'ts'];for(let num of participants){try{pp_user=await jobotz[_0x43a5bc(0x5f5,0x60c,0x5da,0x63e)+_0x43a5bc(0x5a2,0x5a2,0x58a,0x5ba)](num,_0x5efd9d(0x28b,0x291,0x265,0x295));}catch{var pp_user=_0x43a5bc(0x5ac,0x5d5,0x557,0x5c7)+_0x5efd9d(0x2bb,0x2b0,0x2ba,0x2a8)+'w.gambarun'+_0x43a5bc(0x5d3,0x5c7,0x5fb,0x61b)+_0x5efd9d(0x22e,0x24b,0x207,0x235)+'oads/2019/'+_0x5efd9d(0x2a5,0x2a0,0x2b9,0x2a0)+_0x43a5bc(0x5f2,0x5e1,0x612,0x5be)+_0x43a5bc(0x572,0x592,0x5a5,0x5bc)+_0x43a5bc(0x5bf,0x5c4,0x601,0x5fa)+_0x43a5bc(0x561,0x59f,0x52e,0x594)+'g';}try{ppgroup=await jobotz[_0x5efd9d(0x31c,0x298,0x313,0x2d2)+_0x43a5bc(0x5a2,0x5c6,0x5d5,0x5d8)](anu['id'],'image');}catch{var ppgroup=_0x5efd9d(0x252,0x276,0x2db,0x289)+_0x43a5bc(0x5cb,0x5e9,0x5c0,0x598)+_0x43a5bc(0x58f,0x545,0x5bf,0x543)+_0x5efd9d(0x27d,0x2a9,0x2ec,0x2b0)+_0x5efd9d(0x244,0x253,0x226,0x235)+_0x5efd9d(0x27a,0x27c,0x2eb,0x2a1)+_0x43a5bc(0x5c3,0x5a9,0x5e4,0x58f)+_0x5efd9d(0x2ab,0x27c,0x28e,0x2cf)+_0x5efd9d(0x288,0x260,0x26e,0x24f)+_0x43a5bc(0x5bf,0x5be,0x5d2,0x57d)+_0x5efd9d(0x204,0x28c,0x20b,0x23e)+'g';}if(anu['action']==_0x5efd9d(0x2e7,0x2ce,0x293,0x292)){anunya='\x0a╔╦╗╦─╦╔╗─'+_0x5efd9d(0x2be,0x295,0x2f1,0x2a4)+_0x5efd9d(0x2bf,0x263,0x280,0x2ad)+_0x5efd9d(0x2c1,0x29e,0x2ee,0x2aa)+_0x5efd9d(0x200,0x1f1,0x1ea,0x239)+_0x43a5bc(0x56c,0x59b,0x546,0x5b3)+_0x5efd9d(0x21a,0x206,0x269,0x258)+_0x5efd9d(0x1ec,0x273,0x266,0x240)+_0x5efd9d(0x2e9,0x324,0x323,0x2d1)+'\x20ཻུ۪۪ꦽꦼ̷⸙\x20━'+_0x43a5bc(0x583,0x5d2,0x5c1,0x54b)+_0x5efd9d(0x23c,0x265,0x225,0x265)+_0x5efd9d(0x276,0x26c,0x236,0x22f)+_0x5efd9d(0x1fc,0x235,0x20d,0x230)+'┃\x20┃\x20│\x20•╼⃟݊⃟̥⃝̇'+_0x5efd9d(0x320,0x32d,0x2de,0x2dc)+'\x20݊⃟̥⃝̇݊⃟╾•\x20\x0a┃\x20'+_0x43a5bc(0x577,0x5b5,0x533,0x52c)+_0x5efd9d(0x28d,0x26a,0x202,0x259)+'╰━━•›ꪶ\x20ུ۪۪'+_0x43a5bc(0x5d6,0x61f,0x5df,0x5e8)+'\x20ꪶ\x20ཻུ۪۪ꦽꦼ̷⸙'+_0x5efd9d(0x28f,0x24f,0x22d,0x25c)+_0x5efd9d(0x21b,0x269,0x244,0x26d)+_0x43a5bc(0x58b,0x546,0x5c8,0x58c)+_0x5efd9d(0x2bb,0x21d,0x29b,0x26d)+'━━━━━╾•\x0a┃│'+_0x43a5bc(0x5fe,0x640,0x602,0x5ef)+_0x43a5bc(0x565,0x531,0x571,0x548)+_0x43a5bc(0x5d5,0x5ee,0x5be,0x5b3)+num[_0x43a5bc(0x575,0x596,0x5c0,0x5ae)]('@')[-0x22a3+-0x2*0x48f+0x2bc1]+('\x20݊⃟̥⃝̇݊⃟╾•\x20\x0a┃│'+'╰┈────────'+_0x5efd9d(0x289,0x22d,0x285,0x24a)+_0x5efd9d(0x295,0x26f,0x27a,0x2bd)+'𝐌𝐄\x20𝐈𝐍\x0a┃│݊⃟̥⃝̇'+_0x5efd9d(0x2c5,0x237,0x2d1,0x27e))+metadata[_0x43a5bc(0x587,0x5b5,0x558,0x5a3)]+(_0x5efd9d(0x228,0x27e,0x279,0x269)+_0x5efd9d(0x254,0x291,0x26e,0x24c)+_0x43a5bc(0x5f8,0x5df,0x606,0x5c2)+_0x5efd9d(0x248,0x251,0x2a4,0x26d)+'━•\x0a┃╭━━━━━'+_0x43a5bc(0x590,0x56d,0x5b8,0x5e8)+'━╾•\x0a┃│╭┈──'+_0x43a5bc(0x59a,0x5c8,0x574,0x56f)+_0x43a5bc(0x59c,0x56f,0x5b9,0x5bc)+'𝐒𝐔𝐁𝐒𝐂𝐑𝐈𝐁𝐄\x20'+_0x43a5bc(0x5c6,0x593,0x577,0x596)+_0x43a5bc(0x589,0x57d,0x59e,0x5cf)+_0x43a5bc(0x5fb,0x631,0x60b,0x650)+_0x43a5bc(0x5d9,0x61a,0x5a9,0x5c8)+'݊݊⃟⎈➢\x20𝐓𝐇𝐄\x20𝐉'+_0x43a5bc(0x5a0,0x558,0x54b,0x54f)+_0x43a5bc(0x5a3,0x5a9,0x5bd,0x54c)+_0x43a5bc(0x5cc,0x57a,0x5a0,0x598)+_0x5efd9d(0x297,0x31a,0x2f6,0x2d0)+_0x5efd9d(0x2ad,0x289,0x2b1,0x26f)+_0x5efd9d(0x2bc,0x292,0x2c5,0x293)+'KRDZ56w\x0a┃╰'+_0x43a5bc(0x590,0x58f,0x573,0x5e3)+_0x5efd9d(0x313,0x2ed,0x308,0x2c7)+_0x5efd9d(0x243,0x212,0x26f,0x255)+'𝐇𝐄-𝐅𝐗𝐃-𝐁𝐎𝐓\x20'+_0x43a5bc(0x5f1,0x5a7,0x5d1,0x601)+_0x43a5bc(0x59b,0x5e6,0x5cb,0x5a5)+_0x43a5bc(0x55b,0x564,0x59e,0x573)+_0x43a5bc(0x5a6,0x5ef,0x556,0x5dc));const _0x224454={};_0x224454[_0x43a5bc(0x5ee,0x5ab,0x5da,0x623)]=pp_user;const _0x240508={};_0x240508['title']=_0x5efd9d(0x296,0x24e,0x258,0x272)+_0x43a5bc(0x581,0x535,0x53e,0x5ae),_0x240508[_0x43a5bc(0x5e3,0x5f0,0x59f,0x5d4)]='𝐖𝐄𝐋𝐂𝐎𝐌𝐄',_0x240508[_0x5efd9d(0x274,0x2a7,0x2bd,0x2b5)+'e']=_0x5efd9d(0x2a8,0x29b,0x29d,0x28f),_0x240508[_0x43a5bc(0x5b9,0x5db,0x56a,0x5b0)+_0x5efd9d(0x27c,0x2c2,0x2bc,0x275)]=!![],_0x240508[_0x5efd9d(0x2f9,0x294,0x293,0x2b9)]=_0x5efd9d(0x27f,0x249,0x1ea,0x23f)+_0x5efd9d(0x216,0x23c,0x293,0x24b)+_0x5efd9d(0x27b,0x26c,0x270,0x28d)+_0x5efd9d(0x2dd,0x24a,0x2ba,0x29d)+_0x5efd9d(0x2ae,0x288,0x262,0x290)+'6w',_0x240508['mentionedJ'+'id']=[num],_0x240508[_0x5efd9d(0x2ed,0x2c3,0x2fb,0x2c5)]=thumb;const _0x2e838f={};_0x2e838f[_0x43a5bc(0x5ec,0x619,0x61a,0x61c)+_0x5efd9d(0x2d1,0x2c4,0x2ea,0x2c8)]=_0x240508;const _0x46b062={};_0x46b062[_0x43a5bc(0x5b8,0x5e0,0x5c4,0x563)]=_0x224454,_0x46b062[_0x43a5bc(0x574,0x521,0x53f,0x52c)+'o']=_0x2e838f,_0x46b062['caption']=anunya,jobotz[_0x43a5bc(0x5e9,0x5cc,0x5db,0x591)+'e'](anu['id'],_0x46b062);}else{if(anu[_0x43a5bc(0x5be,0x5ce,0x607,0x5d5)]==_0x43a5bc(0x585,0x53a,0x55e,0x5a3)){anunya2=_0x5efd9d(0x2d3,0x28f,0x262,0x294)+_0x43a5bc(0x5c7,0x5df,0x5c9,0x576)+_0x5efd9d(0x2fb,0x2cf,0x2e0,0x2ad)+_0x43a5bc(0x5cd,0x598,0x5f3,0x5d7)+'─╩─╩─╩╚╝╚╝'+_0x43a5bc(0x56c,0x59e,0x58b,0x5b7)+_0x43a5bc(0x57b,0x56b,0x58f,0x5a3)+_0x5efd9d(0x253,0x23b,0x230,0x240)+_0x5efd9d(0x2f8,0x2f4,0x2a7,0x2d1)+_0x5efd9d(0x2c0,0x284,0x296,0x2d4)+'\x20━\x20━\x20ꪶ\x20ུ۪۪'+'ཻꦽꦼ̷⸙‹•━━╮\x0a'+'┃\x20┃\x20╭┈────'+'────────╮\x0a'+_0x43a5bc(0x567,0x527,0x556,0x53f)+_0x43a5bc(0x5ab,0x581,0x571,0x573)+_0x5efd9d(0x2c8,0x2a7,0x2a6,0x2af)+_0x5efd9d(0x2c9,0x2b3,0x2d6,0x29a)+_0x5efd9d(0x264,0x264,0x29e,0x266)+_0x5efd9d(0x1f2,0x1e0,0x1e2,0x234)+_0x5efd9d(0x2b9,0x316,0x2bd,0x2c2)+_0x43a5bc(0x58e,0x54f,0x5c9,0x5e3)+'⸙‹•━━╯\x0a┣━━'+'━━━━━━━━━━'+_0x5efd9d(0x29b,0x252,0x244,0x257)+_0x5efd9d(0x2bf,0x278,0x2cd,0x2ae)+_0x43a5bc(0x59e,0x5c1,0x564,0x54e)+_0x43a5bc(0x560,0x518,0x527,0x567)+_0x43a5bc(0x5bc,0x5fe,0x5ed,0x5f3)+_0x43a5bc(0x551,0x591,0x520,0x519)+num[_0x5efd9d(0x208,0x253,0x273,0x252)]('@')[0x26ac+-0x21bb+-0x4f1]+('\x20݊⃟̥⃝̇݊⃟╾•\x20\x0a┃│'+_0x5efd9d(0x237,0x27b,0x280,0x27a)+_0x5efd9d(0x262,0x223,0x254,0x24a)+_0x43a5bc(0x593,0x551,0x568,0x54b)+_0x43a5bc(0x584,0x596,0x52d,0x5bc)+'݊⃟̥⃝̇݊݊⃟⎈➢\x20')+metadata[_0x5efd9d(0x236,0x2b6,0x252,0x264)]+(_0x5efd9d(0x2a2,0x245,0x285,0x269)+_0x43a5bc(0x56f,0x568,0x544,0x589)+_0x43a5bc(0x5f8,0x628,0x5fa,0x5ae)+_0x5efd9d(0x2b9,0x2a7,0x24f,0x26d)+_0x43a5bc(0x5a4,0x5c6,0x58e,0x593)+_0x43a5bc(0x590,0x5db,0x556,0x551)+_0x5efd9d(0x2e6,0x2c1,0x2ce,0x291)+_0x5efd9d(0x2a2,0x229,0x23c,0x277)+_0x43a5bc(0x59c,0x592,0x5aa,0x5b1)+_0x5efd9d(0x2b8,0x274,0x2fb,0x2ac)+_0x43a5bc(0x5c6,0x5b7,0x5a0,0x5ff)+_0x5efd9d(0x28a,0x225,0x240,0x266)+'│݊⃟̥⃝̇݊݊⃟⎈➢\x20𝐘𝐎'+'𝐔𝐓𝐔𝐁𝐄\x0a┃│݊⃟̥⃝̇'+_0x43a5bc(0x555,0x524,0x563,0x591)+_0x5efd9d(0x256,0x256,0x24a,0x27d)+_0x43a5bc(0x5a3,0x573,0x55d,0x5ec)+_0x43a5bc(0x5cc,0x5a7,0x5c7,0x586)+_0x43a5bc(0x5f3,0x5b8,0x62c,0x5a3)+_0x5efd9d(0x28a,0x252,0x24a,0x26f)+_0x43a5bc(0x5b6,0x5f8,0x560,0x564)+_0x43a5bc(0x5af,0x579,0x607,0x5a4)+'━━━━━━━━━━'+_0x5efd9d(0x308,0x2e4,0x2f0,0x2c7)+_0x5efd9d(0x296,0x279,0x21e,0x255)+_0x5efd9d(0x2ca,0x295,0x245,0x28b)+'݊⃟̥⃝̇݊⃟╾━━━╯\x0a▰'+_0x43a5bc(0x59b,0x593,0x5dd,0x5d7)+_0x5efd9d(0x241,0x1ec,0x1ed,0x238)+_0x43a5bc(0x5a6,0x5fb,0x557,0x5cd));const _0x54d92b={};_0x54d92b['url']=pp_user;const _0x2db000={};_0x2db000[_0x5efd9d(0x236,0x281,0x289,0x282)]='©\x20⏤͟͟͞𝐓𝐇𝐄\x20𝐅𝐗𝐃'+_0x5efd9d(0x23b,0x217,0x255,0x25e),_0x2db000[_0x43a5bc(0x5e3,0x5ee,0x5b2,0x617)]=_0x43a5bc(0x56b,0x59d,0x569,0x567),_0x2db000[_0x5efd9d(0x299,0x2cf,0x2df,0x2b5)+'e']=_0x43a5bc(0x5b2,0x59d,0x584,0x5ac),_0x2db000[_0x5efd9d(0x2b7,0x26e,0x2d4,0x296)+'ibution']=!![],_0x2db000[_0x43a5bc(0x5dc,0x5f1,0x5a0,0x5b2)]=_0x43a5bc(0x562,0x530,0x554,0x5ae)+'utube.com/'+_0x43a5bc(0x5b0,0x583,0x5ca,0x5f7)+_0x43a5bc(0x5c0,0x591,0x611,0x5a1)+_0x5efd9d(0x239,0x2c6,0x23c,0x290)+'6w',_0x2db000[_0x5efd9d(0x277,0x237,0x2a7,0x256)+'id']=[num],_0x2db000[_0x43a5bc(0x5e8,0x62b,0x5c7,0x633)]=thumb;const _0x56818a={};_0x56818a[_0x43a5bc(0x5ec,0x636,0x5c3,0x5f0)+_0x5efd9d(0x296,0x2e5,0x2ea,0x2c8)]=_0x2db000;const _0x306981={};_0x306981[_0x5efd9d(0x294,0x2e1,0x2bf,0x295)]=_0x54d92b,_0x306981['contextInf'+'o']=_0x56818a,_0x306981[_0x5efd9d(0x2e4,0x2f1,0x324,0x2d7)]=anunya2,jobotz[_0x5efd9d(0x317,0x281,0x27d,0x2c6)+'e'](anu['id'],_0x306981);}}}} } catch (err) {
            console.log(err)
        }
    })
	
    // Setting
    jobotz.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    jobotz.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = jobotz.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    jobotz.getName = (jid, withoutContact  = false) => {
        id = jobotz.decodeJid(jid)
        withoutContact = jobotz.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = jobotz.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === jobotz.decodeJid(jobotz.user.id) ?
            jobotz.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    jobotz.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await jobotz.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await jobotz.getName(i + '@s.whatsapp.net')}\nFN:${await jobotz.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:okeae2410@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/cak_haho\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	jobotz.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }
    
    jobotz.setStatus = (status) => {
        jobotz.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
	
    jobotz.public = true

    jobotz.serializeM = (m) => smsg(jobotz, m, store)

    jobotz.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); jobotz.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); startjobotz(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); startjobotz(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); jobotz.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); jobotz.logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); startjobotz(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); startjobotz(); }
            else jobotz.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        console.log('Connected...', update)
    })

    jobotz.ev.on('creds.update', saveState)

    // Add Other

      /**
      *
      * @param {*} jid
      * @param {*} url
      * @param {*} caption
      * @param {*} quoted
      * @param {*} options
      */
     jobotz.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return jobotz.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return jobotz.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return jobotz.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return jobotz.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return jobotz.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }

    /** Send List Messaage
      *
      *@param {*} jid
      *@param {*} text
      *@param {*} footer
      *@param {*} title
      *@param {*} butText
      *@param [*] sections
      *@param {*} quoted
      */
        jobotz.sendListMsg = (jid, text = '', footer = '', title = '' , butText = '', sects = [], quoted) => {
        let sections = sects
        var listMes = {
        text: text,
        footer: footer,
        title: title,
        buttonText: butText,
        sections
        }
        jobotz.sendMessage(jid, listMes, { quoted: quoted })
        }

    /** Send Button 5 Message
     * 
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} button
     * @returns 
     */
        jobotz.send5ButMsg = (jid, text = '' , footer = '', but = []) =>{
        let templateButtons = but
        var templateMessage = {
        text: text,
        footer: footer,
        templateButtons: templateButtons
        }
        jobotz.sendMessage(jid, templateMessage)
        }

    /** Send Button 5 Image
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} image
     * @param [*] button
     * @param {*} options
     * @returns
     */
    jobotz.send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ image: img }, { upload: jobotz.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            jobotz.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /** Send Button 5 Video
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Video
     * @param [*] button
     * @param {*} options
     * @returns
     */
    jobotz.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: vid }, { upload: jobotz.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            jobotz.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /** Send Button 5 Gif
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Gif
     * @param [*] button
     * @param {*} options
     * @returns
     */
    jobotz.send5ButGif = async (jid , text = '' , footer = '', gif, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: gif, gifPlayback: true }, { upload: jobotz.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            jobotz.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} buttons 
     * @param {*} caption 
     * @param {*} footer 
     * @param {*} quoted 
     * @param {*} options 
     */
    jobotz.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        jobotz.sendMessage(jid, buttonMessage, { quoted, ...options })
    }
    
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    jobotz.sendText = (jid, text, quoted = '', options) => jobotz.sendMessage(jid, { text: text, ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    jobotz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await jobotz.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    jobotz.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await jobotz.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} mime 
     * @param {*} options 
     * @returns 
     */
    jobotz.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await jobotz.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    jobotz.sendTextWithMentions = async (jid, text, quoted, options = {}) => jobotz.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    jobotz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await jobotz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    jobotz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await jobotz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
	
    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    jobotz.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    jobotz.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
     } 
    
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} filename
     * @param {*} caption
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    jobotz.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await jobotz.getFile(path, true)
           let { mime, ext, res, data, filename } = types
           if (res && res.status !== 200 || file.length <= 65536) {
               try { throw { json: JSON.parse(file.toString()) } }
               catch (e) { if (e.json) throw e.json }
           }
       let type = '', mimetype = mime, pathFile = filename
       if (options.asDocument) type = 'document'
       if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./lib/exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
        }
       else if (/image/.test(mime)) type = 'image'
       else if (/video/.test(mime)) type = 'video'
       else if (/audio/.test(mime)) type = 'audio'
       else type = 'document'
       await jobotz.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
       return fs.promises.unlink(pathFile)
       }

    /**
     * 
     * @param {*} jid 
     * @param {*} message 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    jobotz.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
		let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await jobotz.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    jobotz.cMod = (jid, copy, text = '', sender = jobotz.user.id, options = {}) => {
        //let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === jobotz.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }


    /**
     * 
     * @param {*} path 
     * @returns 
     */
    jobotz.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

    }

    return jobotz
}

startjobotz()


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
