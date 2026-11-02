/**
 * site.js
 *
 * Loads clone.js, fills in defaults for anything missing, and renders the
 * HTML pages in /views with the user's branding + theme.
 * You normally never need to edit this file — edit clone.js instead.
 */
const fs = require('fs');
const path = require('path');

// ---------- defaults (used for anything missing in clone.js) ----------
const DEFAULTS = {
    brand: {
        name: 'Adevos-X Tech',
        botName: 'Adevos-X Bot',
        owner: 'Adevos',
        developer: 'Ahmed',
        siteTitle: '{name} Pair Site',
    },
    logo: { url: 'https://files.catbox.moe/bdwqa7.jpg' },
    session: {
        prefix: 'ADEVOS-X:~',
        footer: '{name} Bots',
        message:
            '*Session ID Generated*\n\n1.Keep it safe and *Do NEVER* share this Session ID with anyone if Not necessary.\n\n> Powered by {name}',
    },
    website: {
        badge: '8 Pairing Code & QR Code Session Generator',
        title: 'Session ID in minute !',
        description:
            'Generate Session ID by pairing code or a QR code for {name} Bots Deployment, Delivered straight to your WhatsApp, Keep it safe.',
        footer: '{name} <b>Session Generator</b> Made by <b>{developer}</b>',
    },
    theme: { color: 'green', layout: 'modern', mode: 'dark' },
};

let user = {};
try {
    user = require('./clone');
} catch (e) {
    console.log('[site] clone.js could not be loaded, using defaults:', e.message);
}

// deep merge; a value the user set (even '') always wins, undefined/null fall back
function merge(base, extra) {
    const out = {};
    for (const k of Object.keys(base)) {
        const b = base[k];
        const x = extra && extra[k];
        if (b && typeof b === 'object') out[k] = merge(b, x && typeof x === 'object' ? x : {});
        else if (x === undefined) out[k] = b;
        else if (x === null) out[k] = '';
        else out[k] = x;
    }
    return out;
}
const config = merge(DEFAULTS, user);

// ---------- helpers ----------
const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const vars = {
    name: String(config.brand.name),
    botName: String(config.brand.botName),
    owner: String(config.brand.owner),
    developer: String(config.brand.developer),
    year: String(new Date().getFullYear()),
};
// plain-text fill (WhatsApp messages)
const fill = (tpl) => String(tpl || '').replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
// html fill (values are escaped, the template itself may contain tags like <b>)
const fillHtml = (tpl) => String(tpl || '').replace(/\{(\w+)\}/g, (m, k) => (k in vars ? esc(vars[k]) : m));

// ---------- theme ----------
const LAYOUTS = ['modern', 'gradient', 'glass', 'minimal', 'cyber'];
const LAYOUT_ALIASES = { glassmorphism: 'glass', neon: 'cyber', cyberpunk: 'cyber', clean: 'minimal', default: 'modern' };

// friendly names -> nicer, brighter shades. Anything else is passed to CSS as-is
// (so every CSS colour name, hex, rgb() ... works too).
const COLOR_ALIASES = {
    green: '#00e676', blue: '#2979ff', red: '#ff1744', purple: '#aa5cff', orange: '#ff9100',
    pink: '#ff4081', cyan: '#00e5ff', yellow: '#ffea00', teal: '#1de9b6', gold: '#ffc400',
    lime: '#c6ff00', indigo: '#6c63ff', violet: '#b388ff', white: '#f5f5f5', black: '#2b2b2b',
    silver: '#cfd8dc', grey: '#90a4ae', gray: '#90a4ae', brown: '#c68642', maroon: '#e53950',
    navy: '#3d5afe', aqua: '#18ffff', magenta: '#ff2bd6', mint: '#69f0ae', sky: '#40c4ff',
    rose: '#ff5c8d', emerald: '#00e676', ruby: '#ff1744',
};

function pickTheme() {
    let layout = String(config.theme.layout || 'modern').trim().toLowerCase();
    layout = LAYOUT_ALIASES[layout] || layout;
    if (!LAYOUTS.includes(layout)) {
        console.log(`[site] Unknown layout "${config.theme.layout}". Use one of: ${LAYOUTS.join(', ')}. Using "modern".`);
        layout = 'modern';
    }
    const mode = String(config.theme.mode || 'dark').trim().toLowerCase() === 'light' ? 'light' : 'dark';
    const raw = String(config.theme.color || 'green').trim();
    let color = COLOR_ALIASES[raw.toLowerCase()] || raw;
    if (!/^[#a-zA-Z0-9(),.%\s/-]{1,60}$/.test(color)) color = COLOR_ALIASES.green; // sanitise
    return { layout, mode, color };
}

// ---------- logo ----------
function findLogo() {
    for (const ext of ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'ico']) {
        const f = path.join(__dirname, 'logo.' + ext);
        if (fs.existsSync(f)) return f;
    }
    return null;
}
const logoFile = findLogo();
let logoSrc = '';
if (logoFile) logoSrc = '/brand-logo?v=' + Math.round(fs.statSync(logoFile).mtimeMs);
else if (config.logo.url && String(config.logo.url).trim()) logoSrc = String(config.logo.url).trim();

// ---------- session helpers (used by pair.js and qr.js) ----------
const session = {
    // final Session ID = prefix + base64 creds ('' prefix = plain base64)
    build: (b64) => String(config.session.prefix || '') + b64,
    footer: () => fill(config.session.footer).trim(),
    message: () => fill(config.session.message).trim(),
};

// ---------- page rendering ----------
const headScript = `(function(){try{var d=document.documentElement,c=d.getAttribute('data-color');
if(!c||!window.CSS||!CSS.supports('color',c))return;d.style.setProperty('--accent',c);
var e=document.createElement('span');e.style.color=c;d.appendChild(e);var rgb=getComputedStyle(e).color;d.removeChild(e);
var m=rgb.match(/[\\d.]+/g);if(!m||m.length<3)return;var r=+m[0]/255,g=+m[1]/255,b=+m[2]/255;
var L=0.2126*r+0.7152*g+0.0722*b;d.style.setProperty('--on-accent',L>0.5?'#03130a':'#ffffff');
var mx=Math.max(r,g,b),mn=Math.min(r,g,b),h=0,s=0,l=(mx+mn)/2;
if(mx!==mn){var dl=mx-mn;s=l>.5?dl/(2-mx-mn):dl/(mx+mn);h=mx===r?(g-b)/dl+(g<b?6:0):mx===g?(b-r)/dl+2:(r-g)/dl+4;h*=60;}
h=s<.12?265:(h+50)%360;
d.style.setProperty('--accent-2','hsl('+Math.round(h)+','+Math.round(Math.max(s,.55)*100)+'%,'+Math.round(Math.min(Math.max(l,.45),.65)*100)+'%)');
}catch(x){}})();`;

const themeCss = fs.readFileSync(path.join(__dirname, 'views', 'theme.css'), 'utf8');
const cache = {};

function render(view) {
    if (cache[view]) return cache[view];
    const t = pickTheme();
    const html = fs.readFileSync(path.join(__dirname, 'views', view + '.html'), 'utf8');

    const logoImg = (alt) => (logoSrc ? `<img src="${esc(logoSrc)}" alt="${esc(alt)}" />` : '');
    const footerText = String(config.website.footer || '').trim();
    const txt = (v) => String(v || '').trim();
    const badgeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z"/></svg>';

    const map = {
        HTML_ATTRS: `data-layout="${t.layout}" data-mode="${t.mode}" data-color="${esc(t.color)}"`,
        THEME_HEAD:
            (logoSrc ? `<link rel="icon" href="${esc(logoSrc)}" />\n` : '') +
            `<meta name="author" content="${esc(vars.owner)}" />\n` +
            `<style>\n${themeCss}\n</style>\n<script>${headScript}</script>`,
        BRAND: esc(vars.name),
        BOTNAME: esc(vars.botName),
        SITE_TITLE: esc(fill(config.brand.siteTitle)),
        NAV_LOGO: logoSrc
            ? `<a class="brand-logo" href="#home" aria-label="${esc(vars.name)}">${logoImg(vars.name + ' logo')}</a>`
            : '<span class="brand-logo brand-logo--empty"></span>',
        PAIR_LOGO: logoImg(vars.botName),
        HERO_BADGE: txt(config.website.badge) ? `<div class="badge">${badgeIcon} ${fillHtml(txt(config.website.badge))}</div>` : '',
        HERO_TITLE: txt(config.website.title) ? `<h1><b>${fillHtml(txt(config.website.title))}</b></h1>` : '',
        HERO_DESC: txt(config.website.description) ? `<p>${fillHtml(txt(config.website.description))}</p>` : '',
        FOOTER: footerText ? `<footer>\n  <p>${fillHtml(footerText)}</p>\n</footer>` : '',
    };
    cache[view] = html.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in map ? map[k] : m));
    return cache[view];
}

module.exports = { config, render, session, logoFile };
