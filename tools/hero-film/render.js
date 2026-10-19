const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const FPS = 24, DUR = 20;
  fs.mkdirSync(__dirname + '/frames', { recursive: true });
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  await p.goto('file://' + __dirname + '/film.html');
  await p.waitForTimeout(400);
  for (let i = 0; i < FPS * DUR; i++) {
    const data = await p.evaluate(t => { render(t); return document.getElementById('c').toDataURL('image/png'); }, i / FPS);
    fs.writeFileSync(`${__dirname}/frames/f${String(i).padStart(4, '0')}.png`, Buffer.from(data.split(',')[1], 'base64'));
  }
  await b.close();
  console.log('frames done');
})();
