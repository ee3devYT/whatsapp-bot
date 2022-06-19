// ./src/index.js
const axios = require('axios');
const qrcode = require('qrcode-terminal')
const { Client, NoAuth,MessageMedia} = require('whatsapp-web.js'); //
const { memAPI, subReditName } = require('./data/api');
const client = new Client({
    authStrategy: new NoAuth() // https://wwebjs.dev/guide/authentication.html
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log('Please scan this qr code to login with your whatsapp account.')
});

client.on('ready', () => {
    console.log('Client is ready!');
});


//  CREATING COMMANDS
client.on('message', async message => {

    // 1) Command name = test | description = reply your message
    if (message.body === 'test') {
        let reply = "I am working!"
        message.reply(reply)
    }

    // 2) Command name = meme | description = sends a random meme
if (message.body === '!meme') {
        const meme = await axios(memAPI)
        .then(res => res.data)
        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
        console.log(`Meme Sent! | REDDIT - ${subReditName} | ✅`)
    }
});


client.initialize();