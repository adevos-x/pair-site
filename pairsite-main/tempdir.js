// Where temporary auth files are written.
// Serverless hosts (Vercel) only allow writing to /tmp; everywhere else keeps ./temp
const path = require('path');
const fs = require('fs');
const TEMP_DIR = process.env.VERCEL ? '/tmp/adevos-temp' : path.join(__dirname, 'temp');
try { fs.mkdirSync(TEMP_DIR, { recursive: true }); } catch (e) {}
module.exports = { TEMP_DIR };
