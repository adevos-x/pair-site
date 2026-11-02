const express = require('express');
const app = express();
__path = process.cwd();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

const qrRouter = require('./qr');
const pairRouter = require('./pair');
const sessionRouter = require('./session');
const site = require('./site'); // reads clone.js (branding, logo, theme)

require('events').EventEmitter.defaultMaxListeners = 500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/qr', qrRouter);
app.use('/code', pairRouter);
app.use('/session', sessionRouter);

// Logo: if you put logo.png (or .jpg/.webp/.svg...) in the root folder it is served here
app.get('/brand-logo', (req, res) => {
    if (!site.logoFile) return res.status(404).end();
    res.sendFile(site.logoFile);
});

app.use('/pair', async (req, res) => {
    res.type('html').send(site.render('pair'));
});

app.use('/', async (req, res) => {
    res.type('html').send(site.render('main'));
});

app.listen(port, () => {
    console.log(`Connected on http://localhost:` + port);
});

module.exports = app;
