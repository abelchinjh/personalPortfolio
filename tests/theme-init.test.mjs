import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const bootstrap = readFileSync(new URL('../public/theme-init.js', import.meta.url), 'utf8');
test('pre-paint theme respects explicit choices and survives unavailable storage', () => {
  for (const [stored, osDark, expected, display] of [
    [null, false, 'bright', 'system'], [null, true, 'dark', 'system'],
    ['bright', true, 'bright', 'bright'], ['dark', false, 'dark', 'dark'],
    ['invalid', true, 'dark', 'system'], ['blocked', true, 'dark', 'system'],
  ]) {
    const dataset = {};
    runInNewContext(bootstrap, {
      document: { documentElement: { dataset } },
      matchMedia: () => ({ matches: osDark }),
      localStorage: { getItem() { if (stored === 'blocked') throw Error('Unavailable'); return stored; } },
    });
    assert.equal(dataset.theme, expected); assert.equal(dataset.display, display);
  }
});
