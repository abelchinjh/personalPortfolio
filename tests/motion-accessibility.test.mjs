import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('static scene fallback is honest and readable without JavaScript',()=>{
 const html=read('dist/index.html');
 assert.doesNotMatch(html,/Liquid Lens|still image|motion film pending/i);
 assert.doesNotMatch(html,/<video|Play light motion|light-sweep/);
 assert.match(read('src/index.css'),/prefers-reduced-motion:\s*reduce/);
 assert.match(html,/Scoped mandate/);assert.match(html,/Authoritative quote/);
 assert.match(html,/Payment evidence/);assert.match(html,/Exactly-once order/);
});
test('archive counts are correct before client enhancement',()=>{
 const html=read('dist/index.html');
 for(const value of [26,22,4]) assert.ok(html.includes(`data-counter-target="${value}"`));
 const archive=read('dist/portfolio/index.html');
 assert.match(archive,/<label for="project-search">Search projects/);
 assert.match(archive,/role="status"/);assert.match(archive,/26<!-- --> of <!-- -->26/);
});
