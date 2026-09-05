# Reporte — Motor de ejercicios

Rama de trabajo: `testdummy/` (copia del repo). El repo real quedó **sin tocar**.
Nada commiteado, nada empujado.

---

## 1. Hallazgos de la Fase 0

| # | Pregunta | Hallazgo |
|---|---|---|
| 1 | Stack | **No es React.** HTML + JS vanilla, sin bundler ni `package.json`. El build es `build/build.py` (Python 3). Node 22 sí está disponible para tests. |
| 2 | Estilos | CSS plano embebido por plantilla. Tokens reales: `--ink:#1B2A41` `--paper:#EFF1EC` `--red:#B23A2E` `--gold:#C9962F` `--muted:#6B7079` `--line:#D8DAD1`. Verde de acierto `#2f7d4f`. Usé estos, no los hex aproximados del briefing. |
| 3 | Dónde vive | `motor/motor-generico.html` (práctica) y `motor/evaluacion-generico.html` (examen). El eyebrow `MANIPULATE` sale de un `stageMap` por tipo de ejercicio. |
| 4 | Schema | **La hipótesis del briefing era incorrecta.** No hay `prefix`/`suffix`: la oración ya se guarda entera en `texto` con `___` y `respuesta`. |
| 5 | Volumen | 81 secuencias JSON → 1368 ejercicios, 233 de tipo `gap_fill`. Ninguno con más de un hueco; ninguno con `/` ni `|` en la respuesta. |
| 6 | Listening | Existe como `fases.listening.guion` + `gaps`. Reproduce **mp3 reales** desde `audio/{id}/{n}.mp3` con fallback a `speechSynthesis`. El motor de evaluación no tiene listening en absoluto. |
| 7 | Tests | No había ninguno. Ahora hay 19 en `build/test/scoring.test.js`. |
| 8 | CEFR | Campo `nivel`, valores A1–C1 (C2 no existe todavía). La categoría por ejercicio **no existe en el schema**: se deriva del tipo. |

### Los 169 archivos duplicados son artefactos de build

```
contenido/{nivel}/{id}.json ──build.py──▶ preview/  leccion/  evaluacion/   (81 c/u)
                                   ▲
                          motor/*-generico.html
```

No hubo que editar 169 archivos: se editan 2 plantillas y se corre `build.py`.

---

## 2. El bloqueo que apareció antes de poder tocar nada

Corrí `build.py` sin cambios sobre una copia y comparé contra lo commiteado:

| Carpeta | Archivos que cambiaban |
|---|---|
| `leccion/` | 0 de 81 |
| `evaluacion/` | 5 de 81 |
| `preview/` | **81 de 81** |

El desfase iba en **dos direcciones**:

- **Los artefactos estaban adelante** en el reproductor de audio. Las 81 páginas de práctica tenían un reproductor de mp3 con fallback a voz sintética que `motor-generico.html` **no tenía** (0 ocurrencias de `new Audio`). Un rebuild lo habría borrado en silencio: sin error, solo audio grabado degradado a voz de navegador.
- **`build.py` estaba adelante** en SEO. Sus títulos acortados (`"A1 Exercises"` en vez de `"Ejercicios interactivos A1"`) son una mejora deliberada — el comentario en el código dice que fue por truncamiento de Google — que nunca se desplegó.

**Corrección a mi reporte inicial:** primero dije que el SEO era una regresión. No lo es, es una mejora pendiente tuya. Los mp3 sí eran una regresión real.

### `ea-nav.js` estaba a medio cablear

`motor/ea-nav.js` es una plantilla con marcador `{{FLUENCY_IDS}}`, pero **nada la renderizaba**: `build.py` no la conocía. `js/ea-nav.js` tenía la lista hardcodeada a mano, y el `<script>` estaba insertado manualmente en 24 de 243 páginas.

Lo cablée: `build.py` ahora genera `js/ea-nav.js` derivando la lista de `/fluency`, e inyecta el tag en las 243 páginas. La lista generada coincide **exactamente** con los 39 ids que estaban a mano.

---

## 3. Cambios por fase

### Backport (previo a todo)

| Archivo | Cambio |
|---|---|
| `motor/motor-generico.html` | Reproductor mp3 + `speakFallback` copiado **verbatim** desde el artefacto en producción |
| `build/build.py` | `build_ea_nav()` nueva; inyección del tag en las 243 páginas; llamada en `main()` |

### Fase 1 — gap-fill inline

Causa raíz: `input[type=text]{ ... width:100% }`. El input ya estaba dentro del `<p>`, pero ocupaba el ancho completo y partía la oración. `evaluacion-generico.html` además no aplicaba ninguna clase correctora.

Se añadió el bloque `.gapfill` en ambas plantillas, con las tres decisiones que el briefing marcó como no negociables: `border-bottom` en vez de caja, `vertical-align:baseline`, y `white-space:nowrap` en `.gap` con la pista `(stay)` **dentro** del span.

Ancho: `7ch` de B1 en adelante; en A1–A2 `max(len(respuesta)+2, 5)`.

### Fase 2 — schema

**No se hizo, por decisión tuya.** Los 81 JSON quedaron intactos.

Sí se endureció el render: `split('___')` usaba solo `parts[0]` y `parts[1]`, así que cualquier oración con dos huecos **perdía en silencio** todo el texto posterior al segundo. Ahora recorre N segmentos. Con un solo hueco el resultado es idéntico, y los 233 ejercicios existentes tienen exactamente un hueco — cero cambio de comportamiento, bug latente cerrado.

### Fase 3 — motor de calificación

Archivo nuevo `js/ea-scoring.js`, usable en navegador y en node.

- Tres estados por categoría: `scored` / `formative` / `skipped`.
- La unidad calificable es el ítem, no el ejercicio.
- Promedia porcentajes por categoría, ponderados.
- `unanswered` separado de `incorrect`, visible en el reporte.
- Sin nada calificable devuelve `null`, nunca `0`.

**Bug encontrado en `normalize()`:** el mapa de contracciones corría **antes** de normalizar apóstrofos curvos, así que `it's` daba `"it is"` pero `it’s` daba `"it's"` — y no coincidían. Cualquier estudiante escribiendo en móvil se marcaba mal en toda contracción. Corregido invirtiendo el orden. El mapa heredado se conservó intacto.

**Sobre los pesos:** promediar por categoría con pesos iguales habría subido reading de ~17% a 50% de la nota, cambiando la nota de las 81 evaluaciones y el umbral de 75%. Elegiste conservar la nota actual: `weightMode:'byItems'` hace que el peso de cada categoría sea su número de ítems, lo que reproduce la nota histórica **exactamente**. Verificado en las 81 secuencias: 0 desviación.

Para sacar listening de la nota más adelante, basta una línea en la página:

```js
window.EA_SCORING_CONFIG = { modes: { listening: 'formative' } };
```

### Fase 4 — banked_choice

Tipo nuevo en ambos motores, sobre `speechSynthesis`/mp3 ya existente. Banco arriba una vez, chips compactos de letras por pregunta. Cumple las cuatro reglas del §6.3: banco nunca barajado, opción tomada atenuada y no oculta, deseleccionable vía `role="radio"` (un radio nativo no lo permite), y objetivo táctil de 44px.

Un grader por pregunta, no por ejercicio: 3 aciertos de 4 valen 0.75.

---

## 4. Tests

19 tests, `node --test "build/test/*.test.js"`. Cubren los 14 criterios del §7.1 más 5 propios.

Los sometí a **mutación** para comprobar que no pasan por casualidad:

| Mutante introducido | Tests que fallan |
|---|---|
| `grade` devuelve `0` en vez de `null` | 2 |
| Pondera ítems crudos en vez de porcentajes | 2 |
| Se quita la normalización de apóstrofos | 1 |
| `unanswered` cuenta como `incorrect` | 2 |
| Control inocuo (no cambia nada) | 0 |

---

## 5. Verificación

| Feature | preview | leccion | evaluacion |
|---|---|---|---|
| Reproductor mp3 (no se perdió) | 81 | — | — |
| Fallback speechSynthesis | 81 | — | — |
| Gap-fill inline | 81 | — | 81 |
| Render de N huecos | 81 | — | 81 |
| `banked_choice` | 81 | — | 81 |
| Motor de nota | — | — | 81 |
| Desglose por categoría | — | — | 81 |
| Botón fluency | 81 | 81 | 81 |

`leccion/` cambia **solo** por la línea del `<script>` de ea-nav. Los 233 gap_fill se renderizan sin pérdida de texto. `build.py` termina con "249 archivos verificados, todos completos".

---

## 6. Decisiones que tuve que tomar

1. **No migré el schema** — el bug de layout era CSS, no schema, y migrar habría sido un no-op sobre el contenido actual.
2. **Categoría derivada del tipo** de ejercicio (`CATEGORIA_POR_TIPO`), porque el schema no la tiene y quedó congelado. Sobreescribible por ítem.
3. **Reading marcado explícitamente** en su call site: sus preguntas se renderizan como `true_false` y si no, caerían en `grammar`.
4. **`weightMode:'byItems'` por defecto** para no alterar notas ya dadas.
5. **`ea-scoring.js` como archivo aparte** en vez de embebido, para poder testearlo en node.
6. **Games quedó activo** en `motor/ea-nav.js` (venía así, marcado "activado 2026-07-27, ludoteca publicada"). Al cablear ea-nav, ese botón ahora aparece en las 243 páginas. `juegos/` tiene las 81 páginas, así que los enlaces resuelven — pero es un cambio visible que no pediste. **Revísalo.**

---

## 7. Lo que quedó pendiente

- **Capturas antes/después.** No hay navegador en el entorno donde trabajé. Lo sustituí por verificación programática y una demo abrible: `testdummy/_demo-motor.html`.
- **`EnglishAngel-Aula`** tiene una cuarta copia del renderer en `ejercicio.html` con el mismo bug de layout. Fuera del alcance que elegiste.
- **Contenido real de `banked_choice`.** El tipo funciona, pero ningún JSON lo usa. La demo lo inyecta en memoria.
- **La duplicación de raíz sigue ahí.** Las plantillas comparten código por copia. Extraer un `js/ejercicios.js` común lo arreglaría de fondo.
- **`fluency/` y `juegos/` no los genera `build.py`.** No encontré qué los produce; podría existir el mismo desfase que tenía `preview/`.
- **`prerender_texto()`** emite el `___` crudo en el HTML para bots. No lo toqué, pero ahora se ve distinto a lo que ve el usuario.

---

## 8. Para revisar

```bash
cd testdummy
node --test "build/test/*.test.js"     # 19 tests
python3 build/build.py                  # regenera 243 páginas
```

Abrir `testdummy/_demo-motor.html`: gap-fill inline, un ejercicio con **dos** huecos, y el `banked_choice` al final.
