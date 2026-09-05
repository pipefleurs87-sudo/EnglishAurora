/* English Aurora — Motor de Telemetría y Ghost Vault (Fase 0)
   Captura silenciosa de errores a nivel ítem, latencia, titubeo y empaquetado
   para Ghost Vault en localStorage sin PII (Personally Identifiable Information).
*/
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EATelemetry = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var STORAGE_KEY = 'ea_ghost_vault';
  var MAX_VAULT_ITEMS = 50;

  function detectarPlataforma() {
    if (typeof navigator === 'undefined') return 'desktop';
    var ua = navigator.userAgent || '';
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(ua)) return 'movil';
    return 'desktop';
  }

  function generarId() {
    return 'ses_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
  }

  function crearSesion(opts) {
    opts = opts || {};
    var start = Date.now();
    var items = {};

    return {
      sesion_id: generarId(),
      tema_id: opts.tema_id || null,
      nivel: opts.nivel || null,
      modo: opts.modo || 'libre', // 'tarea' | 'libre' | 'duelo' | 'refuerzo'
      startTime: start,
      plataforma: opts.plataforma || detectarPlataforma(),

      registrarItem: function (itemId, meta) {
        if (!itemId) return;
        items[itemId] = {
          renderTime: Date.now(),
          answerTime: null,
          cambios_opcion: 0,
          meta: meta || {}
        };
      },

      registrarInteraccion: function (itemId) {
        if (items[itemId]) {
          items[itemId].cambios_opcion += 1;
          items[itemId].answerTime = Date.now();
        }
      },

      registrarRespuesta: function (itemId) {
        if (items[itemId]) {
          items[itemId].answerTime = Date.now();
        }
      },

      obtenerItemsTelemetry: function () {
        return items;
      }
    };
  }

  function empaquetarResultado(scoreResult, sesion, itemsGraded) {
    var now = Date.now();
    var start = sesion ? sesion.startTime : now;
    var duracion_seg = Math.max(1, Math.round((now - start) / 1000));
    var telItems = sesion ? sesion.obtenerItemsTelemetry() : {};

    var flatItems = [];
    if (scoreResult && scoreResult.byCategory) {
      Object.keys(scoreResult.byCategory).forEach(function (cat) {
        var catItems = scoreResult.byCategory[cat].items || [];
        catItems.forEach(function (it) {
          flatItems.push({
            id: it.id,
            tipo: it.tipo,
            category: cat,
            given: it.given,
            expected: it.expected,
            ok: it.ok,
            answered: it.answered
          });
        });
      });
    } else if (Array.isArray(itemsGraded)) {
      flatItems = itemsGraded;
    }

    var errores = [];
    var totalCorrectos = 0;

    flatItems.forEach(function (it) {
      var itTel = telItems[it.id] || {};
      var latencia = (itTel.answerTime && itTel.renderTime)
        ? Math.max(0, itTel.answerTime - itTel.renderTime)
        : null;

      if (it.ok) {
        totalCorrectos += 1;
      } else {
        errores.push({
          item_id: it.id,
          tipo: it.tipo || 'unknown',
          dado: it.given == null ? null : it.given,
          esperado: it.expected,
          answered: it.answered !== false,
          latencia_ms: latencia,
          cambios_opcion: itTel.cambios_opcion || 0
        });
      }
    });

    var scorePct = scoreResult && scoreResult.grade != null
      ? Math.round(scoreResult.grade)
      : (flatItems.length ? Math.round((totalCorrectos / flatItems.length) * 100) : 0);

    return {
      sesion_id: sesion ? sesion.sesion_id : generarId(),
      timestamp: new Date().toISOString(),
      tema_id: sesion ? sesion.tema_id : null,
      nivel: sesion ? sesion.nivel : null,
      modo: sesion ? sesion.modo : 'libre',
      plataforma: sesion ? sesion.plataforma : detectarPlataforma(),
      duracion_seg: duracion_seg,
      items_total: flatItems.length,
      items_correctos: totalCorrectos,
      score_pct: scorePct,
      errores: errores
    };
  }

  function guardarEnGhostVault(payload) {
    if (typeof localStorage === 'undefined') return false;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var vault = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(vault)) vault = [];

      vault.push(payload);
      if (vault.length > MAX_VAULT_ITEMS) {
        vault = vault.slice(vault.length - MAX_VAULT_ITEMS);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(vault));
      return true;
    } catch (e) {
      return false;
    }
  }

  function obtenerGhostVault() {
    if (typeof localStorage === 'undefined') return [];
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var vault = raw ? JSON.parse(raw) : [];
      return Array.isArray(vault) ? vault : [];
    } catch (e) {
      return [];
    }
  }

  function limpiarGhostVault() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  return {
    crearSesion: crearSesion,
    empaquetarResultado: empaquetarResultado,
    guardarEnGhostVault: guardarEnGhostVault,
    obtenerGhostVault: obtenerGhostVault,
    limpiarGhostVault: limpiarGhostVault,
    detectarPlataforma: detectarPlataforma
  };
});
