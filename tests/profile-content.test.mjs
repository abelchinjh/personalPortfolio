import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home=read('dist/index.html'),archive=read('dist/portfolio/index.html');
const baseline=JSON.parse(read('tests/fixtures/portfolio-attribution.json'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll("'",'&#x27;').replaceAll('<','&lt;').replaceAll('>','&gt;');
test('identity, contacts and removed material are correct on both initial routes',()=>{
 assert.match(home,/<h1 id="hero-title">A founder building in stealth<\/h1>/);assert.match(home,/<h2 id="selected-title">Selected Work<\/h2>/);assert.doesNotMatch(home,/Projects with a point of view|guided illustration|major contributor|hero-actions|status-dot/);assert.match(home,/ex-NUS CS · ex-ASEAN scholar/);
 for(const html of [home,archive]){
  for(const link of ['mailto:hello@abelchinjh.com','https://github.com/abelchinjh','https://x.com/abelchinjh','https://discordapp.com/users/1334801780273315870'])assert.ok(html.includes(link),link);
  assert.doesNotMatch(html,/openclaw|\baiu\b|imotorbike|one semester|former ASEAN|technical founder|public work\. private ambition|independent work · malaysia|linkedin\.com/i);
  assert.match(html,/Skip to content/);assert.match(html,/<main id="main" tabindex="-1"/);
 }
 assert.match(home,/February–October 2026/);
});
test('all remaining project titles, source links and attribution survive removal',()=>{
 assert.equal(baseline.length,26);assert.equal((archive.match(/class="project-row"/g)||[]).length,26);
 for(const p of baseline){assert.ok(archive.includes(escape(p.title)),p.title);assert.ok(archive.includes(escape(p.eyebrow)),p.eyebrow);if(p.repoUrl)assert.ok(archive.includes(p.repoUrl),p.repoUrl);}
 assert.match(archive,/Open original UniFriend screenshot 1/);
});
test('education qualifications and original public graphics remain available',()=>{
 assert.match(home,/without completing the degree/);assert.match(home,/pioneer batch of NUS College/);
 assert.match(home,/Prior undergraduate study/);
 for(const asset of ['public/UniFriend1.png','public/UniFriend2.png','public/UniFriend3.png','public/AbelChinPhoto20260321.jpg','public/images/portrait-576.webp','public/images/portrait-864.webp','public/fonts/OFL-Manrope.txt']) assert.ok(existsSync(new URL('../'+asset,import.meta.url)),asset);
});
test('droplet favicon is vector geometry with actual small-size exports',()=>{
 assert.doesNotMatch(read('public/favicon.svg'),/<image|<text|filter|http[^:]*:\/\/(?!www.w3.org)/);
 assert.match(read('public/favicon.svg'),/droplet/i);
 for(const size of [16,32]){const png=readFileSync(new URL(`../public/favicon-${size}.png`,import.meta.url));assert.equal(png.readUInt32BE(16),size);assert.equal(png.readUInt32BE(20),size);}
});

test('Nyala history is restored only within Experience with original dates and copy',()=>{
 const experience=(home.match(/<article class="experience-entry">[\s\S]*?<\/article>/g)||[]).join('');
 assert.match(experience,/Nyala Labs/);assert.match(experience,/Founder &amp; President · Oct 2025 – Sep 2026/);
 assert.match(experience,/Founded and led a Malaysian youth AI literacy society/);assert.match(experience,/Grew a 200\+ member community in two months/);
 assert.doesNotMatch(home.replace(experience.split('</article>')[0]+'</article>',''),/Nyala Labs/);
 assert.doesNotMatch(archive,/nyala/i);assert.doesNotMatch(home,/Replay flow|Pause flow/);
});
