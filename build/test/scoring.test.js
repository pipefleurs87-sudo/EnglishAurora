/* Criterios de aceptacion del briefing, §7.1.  Correr:  node --test build/test/ */
const { test } = require('node:test');
const assert = require('node:assert');
const S = require('../../js/ea-scoring.js');

const item = (o) => Object.assign({ id: 'x', tipo: 'gap_fill', answers: ['a'], given: 'a' }, o);

test('1 — todo correcto, una categoria -> ratio 1', () => {
  const r = S.scoreAssessment([
    item({ id: 'a', answers: ['red'], given: 'red' }),
    item({ id: 'b', answers: ['blue'], given: 'blue' }),
  ]);
  assert.strictEqual(r.ratio, 1);
  assert.strictEqual(r.grade, 100);
});

test('2 — gap-fill 5 huecos, 4 aciertos -> percent 0.8, no 0', () => {
  const items = ['a', 'b', 'c', 'd', 'e'].map((v, i) =>
    item({ id: 'g' + i, answers: [v], given: i === 4 ? 'zzz' : v }));
  const r = S.scoreAssessment(items);
  assert.strictEqual(r.byCategory.grammar.percent, 0.8);
  assert.notStrictEqual(r.byCategory.grammar.percent, 0);
});

test('3 — listening formative: no altera la nota, si aparece en el reporte', () => {
  const items = [
    item({ id: 'g1', answers: ['ok'], given: 'ok' }),
    item({ id: 'l1', tipo: 'banked_choice', answers: 'C', given: 'A' }),
  ];
  const r = S.scoreAssessment(items, { modes: { listening: 'formative' } });
  assert.strictEqual(r.grade, 100, 'el listening fallado no debe bajar la nota');
  assert.ok(r.byCategory.listening, 'debe seguir en byCategory');
  assert.deepStrictEqual(r.reported, ['listening']);
  assert.deepStrictEqual(r.counted, ['grammar']);
});

test('4 — listening skipped: ausente por completo de byCategory', () => {
  const items = [
    item({ id: 'g1', answers: ['ok'], given: 'ok' }),
    item({ id: 'l1', tipo: 'banked_choice', answers: 'C', given: 'A' }),
  ];
  const r = S.scoreAssessment(items, { modes: { listening: 'skipped' } });
  assert.strictEqual(r.byCategory.listening, undefined);
  assert.strictEqual(r.grade, 100);
});

test('5 — weights aplicados sobre porcentajes, no sobre items', () => {
  // grammar 100% (1 item)  ·  listening 0% (10 items)
  const items = [item({ id: 'g1', answers: ['ok'], given: 'ok' })];
  for (let i = 0; i < 10; i++) {
    items.push(item({ id: 'l' + i, tipo: 'banked_choice', answers: 'C', given: 'A' }));
  }
  const r = S.scoreAssessment(items, { weights: { grammar: 1, listening: 0.5 } });
  // (1*1 + 0*0.5) / 1.5 = 0.6667 — si sumara items crudos daria 1/11 = 0.09
  assert.ok(Math.abs(r.ratio - 2 / 3) < 1e-9, 'ratio fue ' + r.ratio);
});

test('6 — todas las categorias formative -> grade null, NO 0', () => {
  const r = S.scoreAssessment(
    [item({ id: 'g1', answers: ['ok'], given: 'ok' })],
    { defaultMode: 'formative' });
  assert.strictEqual(r.grade, null);
  assert.strictEqual(r.ratio, null);
  assert.notStrictEqual(r.grade, 0, 'un 0 le pone un cero real al estudiante');
});

test('7 — vacia cuenta como unanswered, no como incorrect', () => {
  const r = S.scoreAssessment([
    item({ id: 'a', answers: ['red'], given: '' }),
    item({ id: 'b', answers: ['red'], given: '   ' }),
    item({ id: 'c', answers: ['red'], given: null }),
    item({ id: 'd', answers: ['red'], given: 'azul' }),
  ]);
  const b = r.byCategory.grammar;
  assert.strictEqual(b.unanswered, 3);
  assert.strictEqual(b.incorrect, 1);
  assert.strictEqual(b.correct, 0);
});

test('8 — apostrofo curvo: we’ll == we\'ll', () => {
  assert.ok(S.matchesAny(["we'll"], 'we’ll'));
  assert.ok(S.matchesAny(['it’s'], "it's"));
});

test("9 — I 'd con espacio antes del apostrofo", () => {
  assert.ok(S.matchesAny(["I'd"], "I 'd"));
  assert.ok(S.matchesAny(["I'd travel"], "I 'd travel"));
});

test('10 — punto final ignorado con stripFinalPunctuation', () => {
  assert.ok(S.matchesAny(['will stay'], 'will stay.', { stripFinalPunctuation: true }));
  const r = S.scoreAssessment([item({ answers: ['will stay'], given: 'will stay.' })]);
  assert.strictEqual(r.ratio, 1, 'gap_fill debe aplicarlo por defecto');
});

test('11 — scale 5 con ratio 0.8 -> grade 4.0', () => {
  const items = ['a', 'b', 'c', 'd', 'e'].map((v, i) =>
    item({ id: 'g' + i, answers: [v], given: i === 4 ? 'zzz' : v }));
  const r = S.scoreAssessment(items, { scale: 5 });
  assert.strictEqual(r.grade, 4);
});

test('12 — regresion: normalize es estable entre llamadas', () => {
  const a = S.normalize("It’s  fine.");
  const b = S.normalize("It’s  fine.");
  assert.strictEqual(a, b);
  for (let i = 0; i < 5; i++) assert.ok(S.matchesAny(['do not'], "don't"));
});

test('13 — unanswered no cuenta como correcto aunque la respuesta sea vacia', () => {
  const r = S.scoreAssessment([item({ answers: [''], given: '' })]);
  assert.strictEqual(r.byCategory.grammar.unanswered, 1);
  assert.strictEqual(r.byCategory.grammar.correct, 0);
});

test('14 — banked_choice compara por id de opcion, sin normalizar texto', () => {
  const r = S.scoreAssessment([
    item({ id: 's1', tipo: 'banked_choice', answers: 'C', given: 'C' }),
    item({ id: 's2', tipo: 'banked_choice', answers: 'A', given: 'B' }),
  ], { modes: { listening: 'scored' } });
  const b = r.byCategory.listening;
  assert.strictEqual(b.correct, 1);
  assert.strictEqual(b.incorrect, 1);
  assert.strictEqual(b.percent, 0.5);
});

test('15 — sin items -> grade null, no explota', () => {
  const r = S.scoreAssessment([]);
  assert.strictEqual(r.grade, null);
  assert.deepStrictEqual(r.counted, []);
});

test('16 — categoria derivada del tipo, sobreescribible por item', () => {
  assert.strictEqual(S.categoriaDe({ tipo: 'gap_fill' }), 'grammar');
  assert.strictEqual(S.categoriaDe({ tipo: 'banked_choice' }), 'listening');
  assert.strictEqual(S.categoriaDe({ tipo: 'gap_fill', category: 'listening' }), 'listening');
});

test('17 — el mapa de contracciones heredado sigue vigente', () => {
  assert.ok(S.matchesAny(['do not'], "don't"));
  assert.ok(S.matchesAny(['cannot'], "can't"));
  assert.ok(S.matchesAny(['it is'], "it's"));
});

test('18 — weightMode byItems reproduce EXACTAMENTE la nota plana historica', () => {
  const items = [];
  for (let i = 0; i < 18; i++) items.push(item({ id: 'g' + i, answers: ['ok'], given: 'ok' }));
  for (let i = 0; i < 3; i++) items.push(item({ id: 'r' + i, tipo: 'reading_comprehension', answers: ['ok'], given: 'mal' }));
  const r = S.scoreAssessment(items, { weightMode: 'byItems' });
  assert.strictEqual(Math.round(r.grade), 86, 'debe dar la misma nota que 18/21');
  assert.strictEqual(r.ratio, 18 / 21);

  const igual = S.scoreAssessment(items, { weightMode: 'equal' });
  assert.strictEqual(igual.ratio, 0.5, 'con pesos iguales reading pesaria la mitad');
});

test('19 — byItems respeta un weight explicito si se da', () => {
  const items = [];
  for (let i = 0; i < 18; i++) items.push(item({ id: 'g' + i, answers: ['ok'], given: 'ok' }));
  for (let i = 0; i < 3; i++) items.push(item({ id: 'r' + i, tipo: 'reading_comprehension', answers: ['ok'], given: 'mal' }));
  const r = S.scoreAssessment(items, { weightMode: 'byItems', weights: { reading: 18 } });
  assert.strictEqual(r.ratio, 0.5);
});
