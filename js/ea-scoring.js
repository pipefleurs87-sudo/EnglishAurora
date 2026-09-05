/* EnglishAngel / Spanish Aurora — motor de calificacion multi-idioma (2026-08-28)

   UN solo archivo con la logica de normalizacion y nota para todo el ecosistema Aurora.
   Lo usan las paginas de practica y evaluacion en el navegador y los tests en node (node --test build/test/).

   Soporta configuracion por idioma (EN / ES) manteniendo 100% de retrocompatibilidad.
*/
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EAScoring = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var APOSTROFOS = /[‘’ʼ´`]/g;
  var INVISIBLES = /[​-‍﻿]/g;
  var ESPACIOS_RAROS = /[    ]/g;

  // Contracciones en ingles (heredadas intactas)
  var CONTRACCIONES_EN = {
    "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is",
    "it's": "it is", "we're": "we are", "they're": "they are",
    "isn't": "is not", "aren't": "are not", "don't": "do not",
    "doesn't": "does not", "didn't": "did not", "can't": "cannot",
    "won't": "will not", "that's": "that is", "what's": "what is"
  };

  // Contracciones en espanol
  var CONTRACCIONES_ES = {
    "al": "a el",
    "del": "de el"
  };

  function normalize(valor, opts) {
    opts = opts || {};
    if (valor == null) return '';
    var s = String(valor)
      .replace(INVISIBLES, '')
      .replace(ESPACIOS_RAROS, ' ')
      .replace(APOSTROFOS, "'")
      .toLowerCase()
      .replace(/\s+'/g, "'")
      .trim();

    // En espanol o si se pide explicitamente, remover signos de apertura ¿ y ¡ iniciales
    if (opts.stripOpeners || opts.lang === 'es' || opts.punctuation_openers_optional) {
      s = s.replace(/^[¿¡]+/g, '');
    }

    var contracciones = opts.contractions || (opts.lang === 'es' ? CONTRACCIONES_ES : CONTRACCIONES_EN);
    for (var k in contracciones) {
      if (!Object.prototype.hasOwnProperty.call(contracciones, k)) continue;
      s = s.replace(new RegExp('\\b' + k.replace("'", "'?") + '\\b', 'g'), contracciones[k]);
    }

    // Gestion de acentos
    var shouldStripAccents = true;
    if (opts.stripAccents === false || (opts.lang === 'es' && opts.preserveAccents)) {
      shouldStripAccents = false;
    }
    if (shouldStripAccents) {
      s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    }

    s = opts.stripFinalPunctuation
      ? s.replace(/[.,;:!?¡¿]+$/, '')
      : s.replace(/[.,;:!?¡¿]/g, '');

    return s.replace(/\s+/g, ' ').trim();
  }

  function matchesAny(aceptadas, dada, opts) {
    opts = opts || {};
    var lista = Array.isArray(aceptadas) ? aceptadas.slice() : [aceptadas];
    
    // Si hay sinonimos configurados en el idioma, agregarlos a la lista
    if (opts.synonyms) {
      for (var i = 0; i < lista.length; i++) {
        var palabraNorm = normalize(lista[i], { stripAccents: true });
        if (opts.synonyms[palabraNorm]) {
          var syns = opts.synonyms[palabraNorm];
          for (var j = 0; j < syns.length; j++) {
            if (lista.indexOf(syns[j]) === -1) lista.push(syns[j]);
          }
        }
      }
    }

    var g = normalize(dada, opts);
    if (g === '') return false;
    for (var k = 0; k < lista.length; k++) {
      if (normalize(lista[k], opts) === g) return true;
    }
    return false;
  }

  function checkAccentStrictness(esperada, dada, opts) {
    opts = opts || {};
    var okSinTildes = matchesAny(esperada, dada, Object.assign({}, opts, { stripAccents: true }));
    var okConTildes = matchesAny(esperada, dada, Object.assign({}, opts, { stripAccents: false }));
    return {
      match: okSinTildes,
      exactMatch: okConTildes,
      needsAccentWarning: (okSinTildes && !okConTildes)
    };
  }

  function isAnswered(g) {
    if (g == null) return false;
    if (Array.isArray(g)) return g.length > 0;
    return String(g).trim() !== '';
  }

  var CATEGORIA_POR_TIPO = {
    multiple_choice: 'grammar', true_false: 'grammar', gap_fill: 'grammar',
    unscramble: 'grammar', correct_mistake: 'grammar',
    transformation: 'grammar', write_opposite: 'grammar',
    short_answer_production: 'writing',
    reading_comprehension: 'reading',
    banked_choice: 'listening',
    // Tipos nativos de ELE / Espanol
    conjugation_table: 'grammar',
    ser_estar_haber: 'grammar',
    accent_choice: 'grammar',
    gender_agreement: 'grammar',
    clitic_placement: 'grammar'
  };

  function categoriaDe(item) {
    return item.category || CATEGORIA_POR_TIPO[item.tipo] || 'grammar';
  }

  function checkItem(item, opts) {
    opts = opts || {};
    var dada = item.given;
    switch (item.tipo) {
      case 'banked_choice':
      case 'multiple_choice':
      case 'true_false':
      case 'ser_estar_haber':
      case 'accent_choice':
        return String(dada).trim() === String(item.answers).trim();
      default:
        return matchesAny(item.answers, dada, Object.assign({ stripFinalPunctuation: true }, opts));
    }
  }

  /* items: [{ id, tipo, category?, answers, given }]
     config: { modes, weights, defaultMode, scale, lang, langConfig } */
  function scoreAssessment(items, config) {
    config = config || {};
    var modes = config.modes || {};
    var weights = config.weights || {};
    var defaultMode = config.defaultMode || 'scored';
    var scale = config.scale == null ? 100 : config.scale;
    var weightMode = config.weightMode || 'equal';
    var opts = { lang: config.lang || 'en' };

    var byCategory = {};
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var cat = categoriaDe(it);
      var mode = Object.prototype.hasOwnProperty.call(modes, cat) ? modes[cat] : defaultMode;
      if (mode === 'skipped') continue;

      if (!byCategory[cat]) {
        byCategory[cat] = {
          mode: mode, weight: Object.prototype.hasOwnProperty.call(weights, cat) ? weights[cat] : 1,
          correct: 0, incorrect: 0, unanswered: 0, possible: 0, percent: null, items: []
        };
      }
      var b = byCategory[cat];
      var respondido = isAnswered(it.given);
      var ok = respondido && checkItem(it, opts);

      b.possible += 1;
      if (!respondido) b.unanswered += 1;
      else if (ok) b.correct += 1;
      else b.incorrect += 1;

      b.items.push({
        id: it.id, tipo: it.tipo, given: it.given == null ? null : it.given,
        expected: it.answers, ok: ok, answered: respondido
      });
    }

    var num = 0, den = 0;
    for (var cat2 in byCategory) {
      if (!Object.prototype.hasOwnProperty.call(byCategory, cat2)) continue;
      var bb = byCategory[cat2];
      bb.percent = bb.possible ? bb.correct / bb.possible : null;
      if (weightMode === 'byItems' && !Object.prototype.hasOwnProperty.call(weights, cat2)) {
        bb.weight = bb.possible;
      }
      if (bb.mode !== 'scored' || !bb.possible) continue;
      num += bb.percent * bb.weight;
      den += bb.weight;
    }

    var ratio = den ? num / den : null;
    var cats = Object.keys(byCategory);
    return {
      ratio: ratio,
      grade: ratio == null ? null : ratio * scale,
      byCategory: byCategory,
      counted: cats.filter(function (c) { return byCategory[c].mode === 'scored'; }),
      reported: cats.filter(function (c) { return byCategory[c].mode === 'formative'; })
    };
  }

  return {
    normalize: normalize,
    matchesAny: matchesAny,
    checkAccentStrictness: checkAccentStrictness,
    isAnswered: isAnswered,
    categoriaDe: categoriaDe,
    scoreAssessment: scoreAssessment,
    CATEGORIA_POR_TIPO: CATEGORIA_POR_TIPO,
    CONTRACCIONES_EN: CONTRACCIONES_EN,
    CONTRACCIONES_ES: CONTRACCIONES_ES
  };
});
