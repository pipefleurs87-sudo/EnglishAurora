const test = require('node:test');
const assert = require('node:assert');
const EAScoring = require('../../js/ea-scoring.js');

test('ES-1 — normalizacion en espanol: signos de apertura ¿ y ¡ omitidos se consideran equivalentes', () => {
  const norm = EAScoring.normalize('¿Cómo estás?', { lang: 'es' });
  const normSin = EAScoring.normalize('Cómo estás?', { lang: 'es' });
  assert.strictEqual(norm, normSin);
});

test('ES-2 — contracciones en espanol: "al" y "del" se expanden o normalizan', () => {
  const normAl = EAScoring.normalize('voy al parque', { lang: 'es' });
  const normAEl = EAScoring.normalize('voy a el parque', { lang: 'es' });
  assert.strictEqual(normAl, normAEl);

  const normDel = EAScoring.normalize('vengo del mercado', { lang: 'es' });
  const normDeEl = EAScoring.normalize('vengo de el mercado', { lang: 'es' });
  assert.strictEqual(normDel, normDeEl);
});

test('ES-3 — tildes diacriticas: distincion estricta cuando preserveAccents es true', () => {
  const normTuConTilde = EAScoring.normalize('tú', { lang: 'es', preserveAccents: true });
  const normTuSinTilde = EAScoring.normalize('tu', { lang: 'es', preserveAccents: true });
  assert.notStrictEqual(normTuConTilde, normTuSinTilde);
});

test('ES-4 — checkAccentStrictness detecta acierto con aviso de tilde', () => {
  const resConTilde = EAScoring.checkAccentStrictness('está', 'está', { lang: 'es' });
  assert.strictEqual(resConTilde.match, true);
  assert.strictEqual(resConTilde.exactMatch, true);
  assert.strictEqual(resConTilde.needsAccentWarning, false);

  const resSinTilde = EAScoring.checkAccentStrictness('está', 'esta', { lang: 'es' });
  assert.strictEqual(resSinTilde.match, true);
  assert.strictEqual(resSinTilde.exactMatch, false);
  assert.strictEqual(resSinTilde.needsAccentWarning, true);
});

test('ES-5 — sinonimos configurables en matchesAny (es-ES vs es-MX)', () => {
  const syns = { 'ordenador': ['computadora', 'computador'] };
  const match = EAScoring.matchesAny('ordenador', 'computadora', { synonyms: syns });
  assert.strictEqual(match, true);
});

test('ES-6 — calificacion de tabla de conjugacion (conjugation_table)', () => {
  const items = [
    { id: 'c1_yo', tipo: 'conjugation_table', answers: 'hablo', given: 'hablo' },
    { id: 'c1_tu', tipo: 'conjugation_table', answers: 'hablas', given: 'hablas' },
    { id: 'c1_el', tipo: 'conjugation_table', answers: 'habla', given: 'habla' },
    { id: 'c1_nosotros', tipo: 'conjugation_table', answers: 'hablamos', given: 'hablamos' },
    { id: 'c1_vosotros', tipo: 'conjugation_table', answers: 'habláis', given: 'hablais' }, // Con o sin tilde segun modo
    { id: 'c1_ellos', tipo: 'conjugation_table', answers: 'hablan', given: 'hablan' }
  ];
  const res = EAScoring.scoreAssessment(items, { lang: 'es' });
  assert.strictEqual(res.ratio, 1);
  assert.strictEqual(res.byCategory.grammar.correct, 6);
  assert.strictEqual(res.byCategory.grammar.possible, 6);
});

test('ES-7 — calificacion de contraste ser / estar / haber (ser_estar_haber)', () => {
  const items = [
    { id: 'seh_1', tipo: 'ser_estar_haber', answers: 'es', given: 'es' },
    { id: 'seh_2', tipo: 'ser_estar_haber', answers: 'está', given: 'es' } // error
  ];
  const res = EAScoring.scoreAssessment(items, { lang: 'es' });
  assert.strictEqual(res.ratio, 0.5);
  assert.strictEqual(res.byCategory.grammar.correct, 1);
  assert.strictEqual(res.byCategory.grammar.incorrect, 1);
});

test('ES-8 — calificacion de tilde diacritica (accent_choice)', () => {
  const items = [
    { id: 'acc_1', tipo: 'accent_choice', answers: 'Tú', given: 'Tú' },
    { id: 'acc_2', tipo: 'accent_choice', answers: 'tu', given: 'tu' }
  ];
  const res = EAScoring.scoreAssessment(items, { lang: 'es' });
  assert.strictEqual(res.ratio, 1);
  assert.strictEqual(res.byCategory.grammar.correct, 2);
});
