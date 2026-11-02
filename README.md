<h1 align="center">Free Source Code, Base64 Session ID Generator</h1>

<p align="center">
  <a href="https://github.com/adevos-x/pair-site/fork"><img alt="Fork" src="https://img.shields.io/badge/Fork-24292e?style=flat-square&logo=github&logoColor=white"/></a>
  <a href="https://github.com/adevos-x/pair-site"><img alt="Star" src="https://img.shields.io/badge/Star-e3b341?style=flat-square&logo=github&logoColor=white"/></a>
  <a href="https://github.com/adevos-x/pair-site/archive/refs/heads/main.zip"><img alt="Download Zip" src="https://img.shields.io/badge/Download%20Zip-2ea44f?style=flat-square&logo=github&logoColor=white"/></a>
  <img alt="Visitors" src="https://visitor-badge.laobi.icu/badge?page_id=adevos-x.pair-site&left_color=555555&right_color=0e75b6&left_text=Visitors"/>
  <img alt="Forks" src="https://img.shields.io/github/forks/adevos-x/pair-site?style=flat-square&label=Forks"/>
  <img alt="Stars" src="https://img.shields.io/github/stars/adevos-x/pair-site?style=flat-square&label=Stars"/>
</p>

<br>

<h2 align="center">Simple &amp; Easy to it your</h2>

Everything that identifies this website lives in **one single file: `clone.js`**. Nothing is hard-coded anywhere else, so to make the site yours you only open `clone.js`, change the values you want, save, and restart (or redeploy). You never have to touch the HTML or the other JavaScript files.

Two general rules apply to every text option in the file. First, if you leave a text option empty (`''`) that part is simply switched off and the site keeps working normally. Second, if you delete an option completely, the default value is used. Inside any text you can also use these placeholders, which are replaced automatically: `{name}` for your brand name, `{botName}` for the bot name, `{owner}` for the owner, `{developer}` for the developer, and `{year}` for the current year.

**Branding.** The `brand` section holds your names. `name` is the main brand name used in headings, texts and WhatsApp messages. `botName` is the name shown on the pair page and in the browser tab of that page. `owner` and `developer` are the names of the owner and the developer; they are not forced anywhere, you decide where they appear by using `{owner}` and `{developer}` in the texts. `siteTitle` is the title in the top bar of the home page, it is always shown in capital letters and fits on one line on phones, so keep it reasonably short.

**Logo.** You can set the logo in two ways. The first way is to put a file named `logo.png` in the root folder, next to `clone.js`; `logo.jpg`, `logo.jpeg`, `logo.webp`, `logo.svg` and `logo.gif` also work, and the site picks it up automatically. The second way is to paste a direct image link inside `logo.url`. If you do both, the file in the root folder wins. If you leave `logo.url` empty and add no file, the site simply shows no logo. The same logo is also used as the browser tab icon.

**Session ID.** The `session` section controls what is generated and what is sent to the user on WhatsApp. `prefix` is the text placed in front of the Session ID, for example `ADEVOS-X:~`. If you leave it empty, the Session ID is just the plain base64 text with nothing in front; everything still works, but remember that your bot must remove the same prefix when it loads the session, so change the prefix in the bot and here together. `footer` is the small line shown under the Session ID message in WhatsApp; leave it empty to send the Session ID without a footer. `message` is the extra message sent right after the Session ID, for example the warning to keep it safe; leave it empty and no extra message is sent at all. WhatsApp formatting works inside it, such as `*bold*`, `_italic_` and `> quote`, and `\n` makes a new line.

**Website texts.** The `website` section controls the text of the home page. `badge` is the small label above the big title, `title` is the big heading, and `description` is the paragraph under it. Each of these three can be changed to anything you like or left empty to hide it completely. `footer` is the line at the very bottom of the home page; leave it empty and the footer disappears. In the footer you may use `<b>bold</b>` and it will be shown in your accent colour.

**Colour.** In the `theme` section, `color` is where you type the colour you want, just by writing its name: `green`, `blue`, `red`, `purple`, `orange`, `pink`, `cyan`, `yellow`, `teal`, `gold`, `lime`, `indigo` and many more. Any standard CSS colour name such as `crimson`, `tomato` or `dodgerblue` works too, and so does a hex code like `#ff0055`. Buttons, headings, borders and glows all follow this one colour, and the text on the buttons automatically switches between dark and light so it stays readable. If you type a name the browser does not know, the default green is used.

**Layout.** `layout` changes the whole look of the website, on both the home page and the pair page. `modern` is the default clean dark style with soft glow. `gradient` uses a colourful background and gradient buttons and headings. `glass` gives frosted, see-through panels on a coloured background. `minimal` is flat and simple with thin borders and no glow. `cyber` is a neon, hacker style with a monospace font, sharp corners and a grid background.

**Mode.** `mode` can be `dark` or `light`. Every layout works in both, and `minimal` looks especially nice in `light`.

Example of a fully re-branded site:

```js
brand:   { name: 'Cilly Tech', botName: 'Cilly Bot', owner: 'Cilly', developer: 'Cilly Dev', siteTitle: '{name} Pair Site' },
logo:    { url: '' },                       // and a logo.png placed in the root folder
session: { prefix: 'CILLY:~', footer: '', message: '' },
website: { badge: '', title: 'Get your Session ID', description: 'Fast and safe.', footer: '' },
theme:   { color: 'purple', layout: 'glass', mode: 'dark' },
```

Only two files are not controlled by `clone.js`: `package.json` and `app.json`. They are plain JSON files read by the hosting platforms (for example the Heroku deploy card), so if you want your own name in them, edit them by hand.

<br>

<h2 align="center">Where can you host it ?</h2>

<p align="center"><i>The Deploy buttons take you straight to the platform. The other buttons only show where it can run, follow the steps below each one.</i></p>

<br>

<p align="center">
  <a href="https://dashboard.heroku.com/new?template=https://github.com/adevos-x/pair-site/tree/main"><img alt="Deploy on Heroku" src="https://img.shields.io/badge/Deploy%20on%20Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/></a>
</p>

(i) Make sure you have a Heroku account with billing enabled, then click the **Deploy on Heroku** button above.

(ii) Type a name for your app and choose a region close to your users.

(iii) You can leave the config vars as they are. `PORT` is set by Heroku itself, so there is nothing you must fill in.

(iv) Click **Deploy app**, wait until it says the app was deployed, then click **View** to open your pair site.

(v) To customise it, fork the repository first, edit `clone.js` in your fork, and deploy from your fork (or connect your fork under the **Deploy** tab of your app and deploy again).

<br>

<p align="center">
  <a href="https://render.com/deploy?repo=https://github.com/adevos-x/pair-site"><img alt="Deploy to Render" src="https://img.shields.io/badge/Deploy%20to%20Render-46E3B7?style=for-the-badge&logo=render&logoColor=black"/></a>
</p>

(i) Click the **Deploy to Render** button above and sign in (you can use your GitHub account).

(ii) Render reads the included `render.yaml` and fills in everything for you: Node environment, `npm install` as the build command and `npm start` as the start command.

(iii) Click **Apply** or **Deploy**, then wait for the build to finish and open the URL Render gives you.

(iv) To customise it, fork the repository, edit `clone.js`, and create the service from your fork instead. Every time you push a change Render redeploys automatically.

(v) On the free plan the service goes to sleep after a period without visitors and takes a short time to wake up, so open the site once and wait before you start pairing.

<br>

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/adevos-x/pair-site"><img alt="Deploy with Vercel" src="https://img.shields.io/badge/Deploy%20with%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/></a>
</p>

(i) Click the **Deploy with Vercel** button above and sign in.

(ii) Vercel clones the repository into your own GitHub account and reads the included `vercel.json`, so no settings need to be changed.

(iii) Click **Deploy** and open the link when it finishes.

(iv) To customise it, edit `clone.js` in the repository Vercel created for you; each commit redeploys the site.

(v) Please read the Note at the bottom first: Vercel runs serverless functions, which are not made for a long WhatsApp connection, so pairing can fail or time out there.

<br>

<p align="center">
  <img alt="Railway" src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white"/>
</p>

(i) Sign in at railway.app and choose **New Project**, then **Deploy from GitHub repo**, and pick your fork of this repository.

(ii) Railway detects the project automatically (it can use the included `railway.json` or the `Dockerfile`), installs the packages and starts it with `npm start`.

(iii) Open the **Settings** tab of the service and click **Generate Domain** under Networking to get a public link.

(iv) You do not need to set variables, Railway provides `PORT` by itself. Edit `clone.js` in your fork and push to redeploy.

<br>

<p align="center">
  <img alt="Koyeb" src="https://img.shields.io/badge/Koyeb-121212?style=for-the-badge&logo=koyeb&logoColor=white"/>
</p>

(i) Sign in at koyeb.com, click **Create Service** and choose **GitHub**, then select your fork.

(ii) Choose the **Dockerfile** builder (the repository includes one), keep the exposed port at `8000`, and make sure only one instance is running.

(iii) Click **Deploy**, then open the public URL shown on the service page.

<br>

<p align="center">
  <img alt="Pterodactyl Panel" src="https://img.shields.io/badge/Pterodactyl%20Panel-0E4688?style=for-the-badge&logo=pterodactyl&logoColor=white"/>
</p>

(i) Create a server with the **Node.js** egg and choose Node **22** (or newer). Give it at least 512 MB of RAM.

(ii) Open the **File Manager**, delete the default files, and upload the zip of this repository, then use **Unarchive** on it. Make sure `index.js` and `package.json` are in the root folder of the server and not inside another folder.

(iii) Open the **Startup** tab and set the start command so that it installs and then runs the site: `npm install && node index.js`. If your panel has a variable for the main file, set it to `index.js`.

(iv) Set the `PORT` variable to the port allocated to your server (shown in the **Network** tab). The site listens on `PORT`.

(v) Start the server and open `http://YOUR-NODE-IP:PORT`. Edit `clone.js` in the File Manager and restart the server to apply changes.

<br>

<p align="center">
  <img alt="VPS" src="https://img.shields.io/badge/VPS%20%2F%20Linux%20Server-1793D1?style=for-the-badge&logo=linux&logoColor=white"/>
</p>

(i) Install Node 22 and git on your server, then clone the repository: `git clone https://github.com/adevos-x/pair-site && cd pair-site`.

(ii) Install the packages with `npm install`.

(iii) Edit `clone.js` with any editor, for example `nano clone.js`.

(iv) Keep it running in the background with PM2: `npm install -g pm2`, then `pm2 start index.js --name pair-site`, then `pm2 save` and `pm2 startup` so it starts again after a reboot. The site runs on port `8000` unless you set the `PORT` variable.

(v) For a real domain and HTTPS, put Nginx (or Caddy) in front of port `8000` as a reverse proxy and add a free certificate with Certbot.

(vi) Prefer Docker? Run `docker build -t pair-site .` and then `docker run -d -p 8000:8000 --restart unless-stopped pair-site`.

<br>

> **Note:**
> Pairing needs a program that stays running and keeps one live connection to WhatsApp while the user links the device. That is why platforms that keep your app running all the time work best: a **VPS**, a **Pterodactyl** server, **Heroku**, **Railway**, **Koyeb** and **Render** (paid, or free with the sleeping limitation). A VPS or Pterodactyl server is the most reliable because you control it and nothing sleeps.
>
> **Vercel is the weakest choice for this project.** It runs short serverless functions that are frozen or stopped between requests, so the pairing connection can be cut before the Session ID is created, and the temporary Session ID that waits in memory can disappear. Use it only to test the design, not for real pairing.
>
> Free plans that put the app to sleep (such as Render free) can break a pairing that was just started, so open the site first and wait until it is awake. Always run **only one instance** of the site, because the temporary session store lives in the memory of a single process. Files are written to a temporary folder and deleted after pairing, so a restart will never keep old sessions. Finally, WhatsApp sometimes refuses to link from some shared data-centre addresses; if linking keeps failing on one host, try another host or region.

<br>

<p align="center"><b>Powered by Adevos-X Tech</b></p>
