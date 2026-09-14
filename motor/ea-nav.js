/* EnglishAngel — navegacion compartida (2026-07-26)
   UN solo archivo controla los enlaces de modo de TODAS las paginas de tema.
   build.py lo genera desde /contenido (lista de temas con fluidez incrustada abajo),
   igual que hace con los demas artefactos: contenido = datos.

   Por que hace falta la lista: las paginas ya publicadas llevan incrustado el
   window.SEQUENCE_DATA de cuando se generaron, anterior al bloque fases.fluency.
   Por eso no se puede deducir de la propia pagina. Igual se comprueba SEQUENCE_DATA
   para que las paginas nuevas funcionen aunque la lista se quede corta.

   Idempotente: no duplica un enlace que ya exista. Si este archivo faltara,
   la pagina sigue funcionando exactamente igual que antes.

   Para añadir un modo nuevo (ej. Games) en TODO el sitio: se edita SOLO este archivo. */
(function () {
  var CON_FLUIDEZ = {{FLUENCY_IDS}};

  function init() {
    var D = window.SEQUENCE_DATA;
    if (!D || !D.id) return;
    var mb = document.querySelector('.modebar') || document.querySelector('.modebar-fixed');
    if (!mb) return;

    var isEs = (D.id && D.id.indexOf('es-') === 0) || D.idioma === 'es';
    var tieneFluidez = (D.fases && D.fases.fluency) ||
      CON_FLUIDEZ.indexOf(D.id) !== -1;
    var modos = [];
    if (tieneFluidez) modos.push([isEs ? '🗣 Fluidez' : '🗣 Fluency', '../fluency/']);
    var yaTieneJuegos = false;
    var links = mb.querySelectorAll('a');
    for (var j = 0; j < links.length; j++) {
      var txt = links[j].textContent || '';
      var hr = links[j].getAttribute('href') || '';
      if (/juegos|games/i.test(txt) || /ludoteca|juegos/i.test(hr)) {
        yaTieneJuegos = true;
        break;
      }
    }
    if (!yaTieneJuegos) {
      modos.push([isEs ? '🎮 Juegos' : '🎮 Games', '../juegos/']);
    }

    modos.forEach(function (m) {
      var destino = m[1] + D.id + '.html';
      if (mb.querySelector('a[href="' + destino + '"]')) return;
      var a = document.createElement('a');
      a.textContent = m[0];
      a.href = destino;
      mb.appendChild(a);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
