// build/test/phonetics_lab.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let htmlPath = path.resolve(__dirname, '../../ui-lab/teacher-hub.html');
if (!fs.existsSync(htmlPath)) {
  htmlPath = path.resolve(__dirname, '../../herramientas/teacher-hub.html');
}
const htmlContent = fs.readFileSync(htmlPath, 'utf8');


// Extract PHONEMES_DB and INTONATION_PROFILES from teacher-hub.html
const extractDbMatch = htmlContent.match(/const PHONEMES_DB = (\{[\s\S]*?\n  \};\n)/);
assert.ok(extractDbMatch, 'PHONEMES_DB must be declared in teacher-hub.html');

let PHONEMES_DB, INTONATION_PROFILES;
try {
  const sandbox = new Function(`${extractDbMatch[0]}; return PHONEMES_DB;`);
  PHONEMES_DB = sandbox();
} catch (e) {
  assert.fail('Failed to evaluate PHONEMES_DB: ' + e.message);
}

const extractIntonationMatch = htmlContent.match(/const INTONATION_PROFILES = (\{[\s\S]*?\n  \};\n)/);
assert.ok(extractIntonationMatch, 'INTONATION_PROFILES must be declared in teacher-hub.html');

try {
  const sandbox = new Function(`${extractIntonationMatch[0]}; return INTONATION_PROFILES;`);
  INTONATION_PROFILES = sandbox();
} catch (e) {
  assert.fail('Failed to evaluate INTONATION_PROFILES: ' + e.message);
}

test('BIO-1: PHONEMES_DB contains full inventory of 44 English Phonemes', () => {
  const keys = Object.keys(PHONEMES_DB);
  assert.ok(keys.length >= 44, `Expected at least 44 phonemes, found ${keys.length}`);
});

test('BIO-2: All 12 Monophthongs have F1/F2 acoustic formant values and chart coordinates', () => {
  const vowels = Object.values(PHONEMES_DB).filter(p => p.group === 'vowel');
  assert.equal(vowels.length, 12, 'Expected exactly 12 pure monophthong vowels');

  vowels.forEach(v => {
    assert.ok(v.formants, `${v.symbol} must have formants object`);
    assert.ok(v.formants.f1 >= 200 && v.formants.f1 <= 900, `${v.symbol} F1 should be between 200Hz and 900Hz`);
    assert.ok(v.formants.f2 >= 700 && v.formants.f2 <= 2600, `${v.symbol} F2 should be between 700Hz and 2600Hz`);
    assert.ok(v.chartCoords, `${v.symbol} must have chart coordinates`);
  });
});

test('BIO-3: Critical Contrastive Pairs (/iː/ vs /ɪ/, /uː/ vs /ʊ/) are acoustically distinct', () => {
  const sheep = PHONEMES_DB['/iː/'];
  const ship = PHONEMES_DB['/ɪ/'];
  assert.ok(sheep.formants.f1 < ship.formants.f1, '/iː/ must have lower F1 than /ɪ/');
  assert.ok(sheep.formants.f2 > ship.formants.f2, '/iː/ must have higher F2 than /ɪ/');

  const goose = PHONEMES_DB['/uː/'];
  const foot = PHONEMES_DB['/ʊ/'];
  assert.ok(goose.formants.f1 < foot.formants.f1, '/uː/ must have lower F1 than /ʊ/');
  assert.ok(goose.formants.f2 < foot.formants.f2, '/uː/ must have lower F2 than /ʊ/');
});

test('BIO-4: Sagittal coordinates and Spanish interference traps are present for all phonemes', () => {
  Object.entries(PHONEMES_DB).forEach(([sym, p]) => {
    assert.ok(p.biologicalGesture && p.biologicalGesture.length > 10, `${sym} must have biological gesture`);
    assert.ok(p.spanishTrap && p.spanishTrap.length > 5, `${sym} must have Spanish interference trap warning`);
    assert.ok(p.sagittal, `${sym} must have sagittal vocal tract object`);
    assert.ok(p.sagittal.tongue.startsWith('M'), `${sym} sagittal tongue path must be a valid SVG path`);
    assert.ok(typeof p.voiced === 'boolean', `${sym} must have boolean voicing state`);
  });
});

test('BIO-5: INTONATION_PROFILES contains 4 fundamental English pitch contours', () => {
  const curves = ['falling', 'rising', 'fall-rise', 'rise-fall'];
  curves.forEach(c => {
    const prof = INTONATION_PROFILES[c];
    assert.ok(prof, `Intonation profile ${c} must exist`);
    assert.ok(prof.f0Glissando && prof.f0Glissando.length === 4, `${c} must have 4-point F0 glissando sweep`);
    assert.ok(prof.points && prof.points.length >= 4, `${c} must have Bézier visual points`);
    assert.ok(prof.stressWord, `${c} must specify nuclear stressed word`);
  });

  assert.ok(INTONATION_PROFILES['falling'].f0Glissando[3] < 110, 'Falling tone must resolve to low pitch');
  assert.ok(INTONATION_PROFILES['rising'].f0Glissando[3] > 200, 'Rising tone must resolve to high pitch');
});

test('BIO-6: Consonantal voicing and labial distinctions (/v/ vs /b/, /θ/ vs /ð/, /s/ vs /z/)', () => {
  assert.equal(PHONEMES_DB['/v/'].voiced, true);
  assert.equal(PHONEMES_DB['/v/'].sagittal.lip, 'labiodental');
  assert.equal(PHONEMES_DB['/b/'].sagittal.lip, 'closed');

  assert.equal(PHONEMES_DB['/θ/'].voiced, false);
  assert.equal(PHONEMES_DB['/ð/'].voiced, true);

  assert.equal(PHONEMES_DB['/s/'].voiced, false);
  assert.equal(PHONEMES_DB['/z/'].voiced, true);
});
