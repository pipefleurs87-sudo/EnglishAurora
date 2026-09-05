/* Tests unitarios para Telemetría y Ghost Vault (Fase 0).
   Correr: node --test build/test/
*/
const { test } = require('node:test');
const assert = require('node:assert');
const S = require('../../js/ea-scoring.js');
const T = require('../../js/ea-telemetry.js');

// Mock simple de localStorage para entorno Node
global.localStorage = (function () {
  let store = {};
  return {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; }
  };
})();

test('T1 — crearSesion inicializa con valores por defecto y sin PII', () => {
  const ses = T.crearSesion({ tema_id: 'a1-articles-01', nivel: 'A1' });
  assert.ok(ses.sesion_id.startsWith('ses_'));
  assert.strictEqual(ses.tema_id, 'a1-articles-01');
  assert.strictEqual(ses.nivel, 'A1');
  assert.strictEqual(ses.modo, 'libre');
  assert.strictEqual(typeof ses.startTime, 'number');
});

test('T2 — registrarItem y registrarInteraccion calculan latencia y titubeo', async () => {
  const ses = T.crearSesion({ tema_id: 'b1-test', nivel: 'B1' });
  ses.registrarItem('q1');
  ses.registrarItem('q2');

  // Simular titubeo en q1 (cambió de opción 2 veces)
  ses.registrarInteraccion('q1');
  ses.registrarInteraccion('q1');

  const tel = ses.obtenerItemsTelemetry();
  assert.strictEqual(tel.q1.cambios_opcion, 2);
  assert.strictEqual(tel.q2.cambios_opcion, 0);
  assert.ok(tel.q1.renderTime > 0);
});

test('T3 — empaquetarResultado genera payload estructurado con errores[] filtrados', () => {
  const ses = T.crearSesion({ tema_id: 'a1-verbs-01', nivel: 'A1', modo: 'tarea' });
  ses.registrarItem('i0');
  ses.registrarItem('i1');
  ses.registrarInteraccion('i1'); // falló y titubeó

  const items = [
    { id: 'i0', tipo: 'multiple_choice', answers: 'is', given: 'is' },
    { id: 'i1', tipo: 'gap_fill', answers: ['went'], given: 'goed' }
  ];

  const scoreResult = S.scoreAssessment(items);
  const payload = T.empaquetarResultado(scoreResult, ses);

  assert.strictEqual(payload.tema_id, 'a1-verbs-01');
  assert.strictEqual(payload.nivel, 'A1');
  assert.strictEqual(payload.modo, 'tarea');
  assert.strictEqual(payload.items_total, 2);
  assert.strictEqual(payload.items_correctos, 1);
  assert.strictEqual(payload.score_pct, 50);

  // Solo i1 debe estar en el array de errores
  assert.strictEqual(payload.errores.length, 1);
  const err = payload.errores[0];
  assert.strictEqual(err.item_id, 'i1');
  assert.strictEqual(err.dado, 'goed');
  assert.deepStrictEqual(err.esperado, ['went']);
  assert.strictEqual(err.cambios_opcion, 1);
  assert.strictEqual(typeof err.latencia_ms, 'number');
});

test('T4 — Ghost Vault persiste en localStorage y respeta límite de items', () => {
  localStorage.clear();
  const ses = T.crearSesion({ tema_id: 'vault-test', nivel: 'A2' });
  const payload = T.empaquetarResultado({ grade: 80, byCategory: { grammar: { items: [] } } }, ses);

  const ok = T.guardarEnGhostVault(payload);
  assert.strictEqual(ok, true);

  const vault = T.obtenerGhostVault();
  assert.strictEqual(vault.length, 1);
  assert.strictEqual(vault[0].tema_id, 'vault-test');

  // Llenar más allá del límite (50 items)
  for (let i = 0; i < 60; i++) {
    T.guardarEnGhostVault({ id: 'bulk_' + i });
  }
  const fullVault = T.obtenerGhostVault();
  assert.strictEqual(fullVault.length, 50);
});

test('T5 — Ghost Vault no contiene PII (Personally Identifiable Information)', () => {
  const ses = T.crearSesion({ tema_id: 'no-pii-test', nivel: 'C1' });
  const payload = T.empaquetarResultado({ grade: 100, byCategory: {} }, ses);

  const jsonStr = JSON.stringify(payload);
  assert.ok(!jsonStr.includes('email'));
  assert.ok(!jsonStr.includes('nombre'));
  assert.ok(!jsonStr.includes('token_privado'));
});
