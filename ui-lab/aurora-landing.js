/* English Aurora — motor del cielo 2.5D · v2 "Skyrim de las habilidades"
   Canvas 2D: fondos fotorealistas en parallax + starfield + constelaciones
   por habilidad comunicativa + carrusel inferior + cámara drag/zoom +
   iluminación por proximidad + amanecer al abrir una estrella. */
'use strict';

const TEMAS = [{"id": "a1-adjectives-people-things-01", "area": "Adjectives", "level": "A1", "title": "Adjectives — Describing People & Things", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-articles-01", "area": "Articles", "level": "A1", "title": "Articles — a / an / the", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-demonstratives-01", "area": "Determiners", "level": "A1", "title": "This / That / These / Those", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "reading", "writing"]}, {"id": "a1-have-got-01", "area": "Have Got", "level": "A1", "title": "Have got — Possessions", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-imperatives-01", "area": "Imperatives", "level": "A1", "title": "Imperatives — Instructions & Directions", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing", "speaking"]}, {"id": "a1-modal-have-to-01", "area": "Modals", "level": "A1", "title": "Modal 'Have to' — Obligations at Work & School", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-modal-can-ability-01", "area": "Modals", "level": "A1", "title": "Modal Verb 'Can' — Ability & the Body", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-modal-must-duties-01", "area": "Modals", "level": "A1", "title": "Modal Verb 'Must' — Duties at Home", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-modal-should-advice-01", "area": "Modals", "level": "A1", "title": "Modal Verb 'Should' — Advice & Suggestions", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-plural-nouns-01", "area": "Nouns", "level": "A1", "title": "Plural Nouns — regular & irregular", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-family-possessive-s-01", "area": "Possessives", "level": "A1", "title": "Family & Possessive 's", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-prepositions-place-01", "area": "Prepositions", "level": "A1", "title": "Prepositions of Place (in, on, under, next to...)", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-prepositions-time-01", "area": "Prepositions", "level": "A1", "title": "Prepositions of Time (at, on, in)", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-present-continuous-01", "area": "Present Simple", "level": "A1", "title": "Present Continuous — Now (vs Present Simple)", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-present-simple-frequency-01", "area": "Present Simple", "level": "A1", "title": "Present Simple — Adverbs of Frequency", "meta": "12 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-present-simple-routines-01", "area": "Present Simple", "level": "A1", "title": "Present Simple — Daily Routines", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-present-simple-likes-01", "area": "Present Simple", "level": "A1", "title": "Present Simple — Likes, Hobbies & Free Time", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-present-simple-neg-questions-01", "area": "Present Simple", "level": "A1", "title": "Present Simple — Negatives & Questions", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-present-simple-wh-questions-01", "area": "Present Simple", "level": "A1", "title": "Present Simple — Wh- Questions", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-object-pronouns-01", "area": "Pronouns & Possessives", "level": "A1", "title": "Object Pronouns (me, him, her, us, them)", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-pronouns-possessives-01", "area": "Pronouns & Possessives", "level": "A1", "title": "Subject Pronouns & Possessive Adjectives", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "reading", "writing"]}, {"id": "a1-wh-questions-bank-01", "area": "Questions", "level": "A1", "title": "Wh- Questions — Question Bank (you / he-she)", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-relative-clauses-professions-01", "area": "Relative Clauses", "level": "A1", "title": "Relative Clauses — Defining People (a person who...)", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-relative-clauses-objects-01", "area": "Relative Clauses", "level": "A1", "title": "Relative Clauses — Objects to Work & Study (a thing that you use to...)", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-relative-clauses-places-01", "area": "Relative Clauses", "level": "A1", "title": "Relative Clauses — Places in the City (a place where...)", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-review-grand-01", "area": "Review", "level": "A1", "title": "A1 Grand Review — All Topics Together", "meta": "18 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-review-identity-01", "area": "Review", "level": "A1", "title": "A1 Review — Identity: To Be, Pronouns & Demonstratives", "meta": "18 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-review-modals-preps-01", "area": "Review", "level": "A1", "title": "A1 Review — Modals & Prepositions: Advice, Duties, Time & Place", "meta": "18 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-review-present-simple-01", "area": "Review", "level": "A1", "title": "A1 Review — Present Simple: Routines, Frequency, Questions & Likes", "meta": "18 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-to-be-nationalities-01", "area": "Verb To Be", "level": "A1", "title": "Verb To Be — Nationalities", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a1-to-be-neg-questions-01", "area": "Verb To Be", "level": "A1", "title": "Verb To Be — Negatives & Questions", "meta": "10 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a1-modal-would-like-01", "area": "Wishes & Regrets", "level": "A1", "title": "Would like — Wishes & Polite Offers", "meta": "9 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a2-comparatives-superlatives-01", "area": "Comparatives", "level": "A2", "title": "Comparatives & Superlatives — The Great Dilemmas of Life", "meta": "21 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing", "speaking"]}, {"id": "a2-countables-some-any-01", "area": "Countable & Uncountable", "level": "A2", "title": "Countable & Uncountable — a / some / any / much / many (Food)", "meta": "21 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a2-going-to-future-01", "area": "Going To", "level": "A2", "title": "Going to — Plans, Decisions & Predictions", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a2-past-continuous-vs-simple-01", "area": "Past Simple", "level": "A2", "title": "Past Continuous vs Past Simple — when / while", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a2-past-simple-irregular-01", "area": "Past Simple", "level": "A2", "title": "Past Simple — Irregular Verbs (patterns)", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing", "speaking"]}, {"id": "a2-past-simple-regular-01", "area": "Past Simple", "level": "A2", "title": "Past Simple — Regular Verbs (-ed) & Time Expressions", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing", "speaking"]}, {"id": "a2-past-simple-narrative-01", "area": "Past Simple", "level": "A2", "title": "Past Simple — Telling a Story", "meta": "15 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a2-review-grand-01", "area": "Review", "level": "A2", "title": "A2 Grand Review — All Topics Together", "meta": "18 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "a2-there-is-there-are-01", "area": "There is/are", "level": "A2", "title": "There is / There are — Describing the House", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "a2-verb-to-be-past-01", "area": "Verb To Be", "level": "A2", "title": "Verb To Be — Past (was / were)", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "b1-adverbs-01", "area": "Comparatives", "level": "B1", "title": "Adverbs of Manner — quickly, carefully & comparatives", "meta": "21 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "b1-conditionals-0-1-2-01", "area": "Conditionals", "level": "B1", "title": "Conditionals 0, 1 & 2 — One Ice Cream, Three Realities", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "b1-gerund-vs-infinitive-01", "area": "Gerund vs Infinitive", "level": "B1", "title": "Gerund vs Infinitive — enjoy reading, want to read", "meta": "21 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "b1-passive-voice-01", "area": "Passive Voice", "level": "B1", "title": "Passive Voice — Present, Past & Perfect", "meta": "21 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "b1-present-perfect-ever-experiences-01", "area": "Past Simple", "level": "B1", "title": "Have You Ever...? — Experiences (details in past simple)", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing", "speaking"]}, {"id": "b1-present-perfect-vs-past-simple-01", "area": "Past Simple", "level": "B1", "title": "Present Perfect vs Past Simple — Which One?", "meta": "21 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "b1-present-perfect-bucket-list-01", "area": "Present Perfect", "level": "B1", "title": "Present Perfect — The Bucket List (already / yet)", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "b1-present-perfect-continuous-01", "area": "Present Perfect Continuous", "level": "B1", "title": "Present Perfect Continuous — for / since / just", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "listening", "reading", "writing"]}, {"id": "b1-review-grand-01", "area": "Review", "level": "B1", "title": "B1 Grand Review — All Topics Together", "meta": "18 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "b1-used-to-01", "area": "Used To", "level": "B1", "title": "Used to — Past Habits That Are Gone", "meta": "20 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "b1-will-vs-going-to-01", "area": "Will vs Going To", "level": "B1", "title": "Will vs Going to — Plans, Decisions & Promises", "meta": "21 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "b2-causative-01", "area": "Causative", "level": "B2", "title": "Causative — Have / Get Something Done", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "vocabulary", "writing", "speaking"]}, {"id": "b2-mixed-conditionals-01", "area": "Conditionals", "level": "B2", "title": "Mixed Conditionals", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "writing", "speaking"]}, {"id": "b2-third-conditional-01", "area": "Conditionals", "level": "B2", "title": "Third Conditional — If I Had Known", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "writing", "speaking", "listening"]}, {"id": "b2-idioms-money-01", "area": "Idioms", "level": "B2", "title": "Idioms — Money & Business (Abuela Carmen's Wisdom)", "meta": "17 exercises · sequence + video + test", "chips": ["vocabulary", "reading", "speaking", "listening"]}, {"id": "b2-idioms-time-effort-01", "area": "Idioms", "level": "B2", "title": "Idioms — Time & Effort (Abuela Carmen's Wisdom)", "meta": "17 exercises · sequence + video + test", "chips": ["vocabulary", "reading", "speaking", "listening"]}, {"id": "b2-linkers-01", "area": "Linkers", "level": "B2", "title": "Linking Words — Contrast, Addition, Cause, Result & More", "meta": "17 exercises · sequence + video + test", "chips": ["writing", "speaking", "reading"]}, {"id": "b2-modals-deduction-past-01", "area": "Modals", "level": "B2", "title": "Modals of Deduction — Past (must have / might have / can't have)", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing"]}, {"id": "b2-modals-deduction-present-01", "area": "Modals", "level": "B2", "title": "Modals of Deduction — Present (must / might / could / can't)", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "speaking", "listening", "reading"]}, {"id": "b2-modals-obligation-past-01", "area": "Modals", "level": "B2", "title": "Modals of Obligation — Past (had to / didn't have to / needn't have)", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "speaking", "writing", "reading"]}, {"id": "b2-phrasal-verbs-down-01", "area": "Phrasal Verbs", "level": "B2", "title": "Phrasal Verbs with DOWN", "meta": "17 exercises · sequence + video + test", "chips": ["vocabulary", "speaking", "listening", "reading"]}, {"id": "b2-phrasal-verbs-on-off-01", "area": "Phrasal Verbs", "level": "B2", "title": "Phrasal Verbs with ON vs OFF", "meta": "17 exercises · sequence + video + test", "chips": ["vocabulary", "speaking", "listening", "reading"]}, {"id": "b2-phrasal-verbs-out-01", "area": "Phrasal Verbs", "level": "B2", "title": "Phrasal Verbs with OUT", "meta": "17 exercises · sequence + video + test", "chips": ["vocabulary", "speaking", "listening", "reading"]}, {"id": "b2-phrasal-verbs-up-01", "area": "Phrasal Verbs", "level": "B2", "title": "Phrasal Verbs with UP", "meta": "17 exercises · sequence + video + test", "chips": ["vocabulary", "speaking", "listening", "reading"]}, {"id": "b2-phrasal-verbs-get-01", "area": "Phrasal Verbs", "level": "B2", "title": "Phrasal Verbs — GET: One Verb, Many Meanings", "meta": "17 exercises · sequence + video + test", "chips": ["vocabulary", "speaking", "listening", "reading"]}, {"id": "b2-relative-clauses-01", "area": "Relative Clauses", "level": "B2", "title": "Relative Clauses — Non-Defining & Advanced Structures", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "reading", "writing", "speaking"]}, {"id": "b2-reported-speech-01", "area": "Reported Speech", "level": "B2", "title": "Reported Speech — Statements, Questions & Commands", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "listening", "reading", "writing", "speaking"]}, {"id": "b2-wish-if-only-01", "area": "Wishes & Regrets", "level": "B2", "title": "Wish / If Only — Regrets & Change", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "speaking", "writing"]}, {"id": "c1-cleft-sentences-01", "area": "Cleft Sentences", "level": "C1", "title": "Cleft Sentences — It-Clefts & What-Clefts", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "writing", "speaking"]}, {"id": "c1-ellipsis-substitution-01", "area": "Ellipsis & Substitution", "level": "C1", "title": "Ellipsis & Substitution", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "speaking", "writing"]}, {"id": "c1-emphatic-structures-01", "area": "Emphatic Structures", "level": "C1", "title": "Emphatic Structures — do/does/did & so/such", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "speaking", "writing"]}, {"id": "c1-future-in-the-past-01", "area": "Future in the Past", "level": "C1", "title": "Future in the Past", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "writing", "speaking"]}, {"id": "c1-gerund-clauses-subject-01", "area": "Gerund Clauses as Subject", "level": "C1", "title": "Gerund Clauses as Subject", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "writing", "speaking"]}, {"id": "c1-inversion-01", "area": "Inversion", "level": "C1", "title": "Inversion for Emphasis", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "writing", "speaking"]}, {"id": "c1-would-rather-prefer-01", "area": "Modals", "level": "C1", "title": "Would Rather / Would Prefer", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "speaking", "writing"]}, {"id": "c1-participle-clauses-01", "area": "Participle Clauses", "level": "C1", "title": "Participle Clauses", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "writing", "reading"]}, {"id": "c1-advanced-passive-01", "area": "Passive Voice", "level": "C1", "title": "Advanced Passive — Reporting Verbs & Passive Infinitives", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "writing", "reading"]}, {"id": "c1-register-style-01", "area": "Register & Style", "level": "C1", "title": "Register & Style — Formal vs Informal Rewriting (C1–C2, capstone)", "meta": "17 exercises · sequence + video + test", "chips": ["writing", "speaking", "reading"]}, {"id": "c1-subjunctive-01", "area": "Subjunctive", "level": "C1", "title": "Subjunctive — Formal & Literary Register (C1–C2)", "meta": "17 exercises · sequence + video + test", "chips": ["grammar", "writing", "speaking", "reading"]}];

/* ---------- utilidades ---------- */
function rnd(seed){ const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
const lerp = (a,b,t)=>a+(b-a)*t;
const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));

/* ---------- habilidades comunicativas (las "escuelas" del menú) ---------- */
const SKILLS = [
  { key:'speaking',   label:'Speaking',   cx:520,  cy:760,  hue:'#8FF2D2',
    desc:'Hablar: la habilidad de producir el idioma en voz alta — fluidez, pronunciación y conversación real.' },
  { key:'listening',  label:'Listening',  cx:960,  cy:520,  hue:'#9DF2DF',
    desc:'Escuchar: entender el inglés tal como suena — acentos, velocidad y matices de nativos.' },
  { key:'reading',    label:'Reading',    cx:1410, cy:790,  hue:'#BFE8FF',
    desc:'Leer: comprender textos reales, del anuncio simple al artículo complejo.' },
  { key:'writing',    label:'Writing',    cx:1870, cy:530,  hue:'#FFE9B0',
    desc:'Escribir: construir oraciones y textos que otros entienden — precisión y estilo.' },
  { key:'grammar',    label:'Grammar',    cx:2320, cy:780,  hue:'#E3C8FF',
    desc:'Gramática: la arquitectura invisible del idioma — las estructuras que sostienen todo.' },
  { key:'vocabulary', label:'Vocabulary', cx:2750, cy:560,  hue:'#FFC9D9',
    desc:'Vocabulario: las palabras como herramientas — cuantas más tienes, más mundos describes.' },
];
const LVL_COLOR = {A1:'#BFE8FF',A2:'#9DF2DF',B1:'#FFE9B0',B2:'#E3C8FF',C1:'#FFC9D9'};

/* ---------- mundo: estrellas por habilidad ---------- */
const stars = [];
SKILLS.forEach((sk, si) => {
  const list = TEMAS.filter(t => (t.chips||[]).map(c=>c.trim()).includes(sk.key));
  sk.count = list.length;
  list.forEach((t, i) => {
    const a = i * 2.39996 + rnd(i*7+si*101)*0.5;
    const r = 40 + 26*Math.sqrt(i) + rnd(i*13+si)*22;
    stars.push({ data:t, skill:sk.key, lv:t.level,
      wx: sk.cx + Math.cos(a)*r*1.3,
      wy: sk.cy + Math.sin(a)*r*0.75,
      size: 1.9 + rnd(i*31+si)*1.5,
      phase: rnd(i*47+si)*6.28, lit: 0 });
  });
});
const WORLD = { w: 3100, h: 1500, cx: 1600, cy: 660 };

/* orden de trazado: cadena de vecino más cercano — la línea fluye
   como una constelación real, sin cruces agresivos */
SKILLS.forEach(sk => {
  const group = stars.filter(s=>s.skill===sk.key);
  if(!group.length){ sk.path=[]; return; }
  const rest = new Set(group);
  let cur = group.reduce((a,b)=> a.wy < b.wy ? a : b);   // arranca en la estrella más alta
  const path = [cur]; rest.delete(cur);
  while(rest.size){
    let best=null, bd=1e18;
    for(const s of rest){ const d=(s.wx-cur.wx)**2+(s.wy-cur.wy)**2; if(d<bd){bd=d;best=s;} }
    path.push(best); rest.delete(best); cur = best;
  }
  sk.path = path;
});

/* ---------- lienzo ---------- */
const cv = document.getElementById('sky');
const ctx = cv.getContext('2d');
let W=0, H=0, DPR=1;
function resize(){
  DPR = Math.min(window.devicePixelRatio||1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W*DPR; cv.height = H*DPR;
  cv.style.width = W+'px'; cv.style.height = H+'px';
  ctx.setTransform(DPR,0,0,DPR,0,0);
}
resize(); addEventListener('resize', resize);

/* ---------- fondos fotorealistas (2 capas parallax) ---------- */
const sky1 = new Image(); sky1.src = 'assets/cielo-profundo.jpg';
const sky2 = new Image(); sky2.src = 'assets/cielo-dorado.jpg';

/* ---------- starfield procedural encima ---------- */
const bgStars = [];
for(let i=0;i<420;i++){
  bgStars.push({ x: rnd(i*3)*(WORLD.w+400)-200, y: rnd(i*5+99)*(WORLD.h+300)-150,
    z: 0.3 + rnd(i*7)*0.55, s: 0.5 + rnd(i*11)*1.25, ph: rnd(i*17)*6.28 });
}
const glow = document.createElement('canvas'); glow.width=glow.height=64;
(function(){ const g=glow.getContext('2d');
  const gr=g.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(.22,'rgba(220,245,255,.55)');
  gr.addColorStop(1,'rgba(180,230,255,0)');
  g.fillStyle=gr; g.fillRect(0,0,64,64);
})();

/* ---------- cámara y estado ---------- */
function fitZoom(){ return Math.min(W/WORLD.w, H/WORLD.h) * 1.02; }
const cam = { x:WORLD.cx, y:WORLD.cy, z:fitZoom(), tx:WORLD.cx, ty:WORLD.cy, tz:fitZoom() };
let dawn = 0, dawnT = 0;
let mouse = {x:-999,y:-999, wx:-999, wy:-999};
let hovered = null, selected = null, activeSkill = null;
let meteor = null, nextMeteor = performance.now()+4000;
let drag = null;

const $ = id => document.getElementById(id);

/* ---------- riel MCER: filtrar por nivel ---------- */
const LEVELS = ['A1','A2','B1','B2','C1'];
let activeLevel = null;
LEVELS.forEach(lv => {
  const n = TEMAS.filter(t=>t.level===lv).length;
  const el = document.createElement('button');
  el.className = 'level-item'; el.dataset.level = lv;
  el.innerHTML = `${lv} <span>${n}</span>`;
  el.addEventListener('click', ()=> selectLevel(activeLevel===lv ? null : lv));
  $('levels').appendChild(el);
});
function selectLevel(lv){
  activeLevel = lv;
  document.querySelectorAll('.level-item').forEach(e=>e.classList.toggle('on', e.dataset.level===lv));
  if(lv){
    const n = TEMAS.filter(t=>t.level===lv).length;
    skillDesc.textContent = `Nivel ${lv}: ${n} temas encendidos en el cielo. Los demás esperan su turno.`;
    say(`<b>Nivel ${lv}</b>: ${n} estrellas agrupadas. Combínalo con una habilidad del carrusel y encuentra tu tema exacto.`);
  } else {
    skillDesc.textContent = 'Seis habilidades. Un cielo. Elige una constelación o toca una estrella.';
  }
}
const tip=$('tip'), bubble=$('bubble'), btxt=$('bubble-txt');

const AURORA_STATES = { saludo:'assets/aurora.png', explicando:'assets/aurora-explicando.png',
  celebrando:'assets/aurora-celebrando.png', corrigiendo:'assets/aurora-corrigiendo.png' };
Object.values(AURORA_STATES).forEach(u=>{ const i=new Image(); i.src=u; });
function setAurora(state){
  const el = $('aurora-img');
  if(!el || el.dataset.s===state) return;
  el.dataset.s = state;
  el.style.opacity = 0;
  setTimeout(()=>{ el.src = AURORA_STATES[state]; el.style.opacity = 1; }, 380);
}
function say(txt){
  bubble.classList.remove('show');
  setTimeout(()=>{ btxt.innerHTML = txt; bubble.classList.add('show'); }, 320);
}

/* ---------- carrusel de habilidades (estilo Skyrim) ---------- */
const skillsBar = $('skills'), skillDesc = $('skill-desc');
SKILLS.forEach(sk => {
  const el = document.createElement('button');
  el.className = 'skill-item'; el.dataset.skill = sk.key;
  el.innerHTML = `${sk.label} <span>${sk.count}</span>`;
  el.addEventListener('click', ()=> selectSkill(sk.key === (activeSkill&&activeSkill.key) ? null : sk.key));
  skillsBar.appendChild(el);
});
function selectSkill(key){
  if(!key){
    activeSkill = null; cam.tx=WORLD.cx; cam.ty=WORLD.cy; cam.tz=fitZoom();
    skillDesc.textContent = 'Seis habilidades. Un cielo. Elige una constelación o toca una estrella.';
    document.querySelectorAll('.skill-item').forEach(e=>e.classList.remove('on'));
    return;
  }
  const sk = SKILLS.find(s=>s.key===key);
  activeSkill = sk;
  cam.tx = sk.cx; cam.ty = sk.cy; cam.tz = fitZoom()*3.1;
  skillDesc.textContent = sk.desc;
  document.querySelectorAll('.skill-item').forEach(e=>e.classList.toggle('on', e.dataset.skill===key));
  say(`<b>${sk.label}</b>: ${sk.count} estrellas en esta constelación. Toca una para ver su secuencia.`);
}

/* ---------- interacción ---------- */
addEventListener('mousemove', e=>{
  mouse.x=e.clientX; mouse.y=e.clientY;
  mouse.wx = cam.x + (mouse.x - W/2)/cam.z;
  mouse.wy = cam.y + (mouse.y - H/2)/cam.z;
  if(drag){ cam.tx = clamp(cam.tx - (e.clientX-drag.x)/cam.z, 300, WORLD.w-300);
            cam.ty = clamp(cam.ty - (e.clientY-drag.y)/cam.z, 200, WORLD.h-200);
            drag = {x:e.clientX, y:e.clientY}; }
});
cv.addEventListener('mousedown', e=>{ drag = {x:e.clientX, y:e.clientY, moved:false}; });
addEventListener('mouseup', ()=>{ drag=null; });
addEventListener('wheel', e=>{
  if(document.body.classList.contains('zoomed')) return;
  const f = e.deltaY>0 ? .92 : 1.087;
  cam.tz = clamp(cam.tz*f, fitZoom(), fitZoom()*4.5);
}, {passive:true});
addEventListener('click', e=>{
  if(e.target.closest('.panel,.veil,.hud,.aurora,.skills-bar')) return;
  if(hovered && !selected){ openStar(hovered); }
  else if(!hovered && selected){ closeStar(); }
});
function openStar(s){
  selected = s;
  cam.tx = s.wx; cam.ty = s.wy; cam.tz = fitZoom()*5.2;
  dawnT = 1;
  document.body.classList.add('zoomed');
  $('p-area').textContent = `${s.data.area} · ${s.data.level} · ${SKILLS.find(k=>k.key===s.skill).label}`;
  $('p-title').textContent = s.data.title;
  $('p-meta').textContent = s.data.meta;
  setAurora('explicando');
  say('Buena elección. <b>Cada estrella es una mini-lección completa</b> — y cuando la terminas, se queda encendida para siempre.');
}
function closeStar(){
  selected = null; dawnT = 0;
  if(activeSkill){ cam.tx=activeSkill.cx; cam.ty=activeSkill.cy; cam.tz=fitZoom()*3.1; }
  else { cam.tx=WORLD.cx; cam.ty=WORLD.cy; cam.tz=fitZoom(); }
  document.body.classList.remove('zoomed');
  setAurora('saludo');
}
$('p-close').addEventListener('click', closeStar);
addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeStar(); $('veil').classList.remove('show'); }});
$('btn-ignite').addEventListener('click', ()=>{ setAurora('celebrando'); $('veil').classList.add('show'); });
$('btn-just-look').addEventListener('click', e=>{ e.preventDefault(); setAurora('saludo'); $('veil').classList.remove('show');
  say('Sin problema. El cielo es tuyo para mirarlo — <b>yo estaré aquí cuando quieras encenderlo</b>.'); });

/* ---------- noche → amanecer ---------- */
function skyMix(t){ return [lerp(6,42,t),lerp(11,66,t),lerp(22,84,t)]; }

/* ---------- dibujo de una capa de fondo ---------- */
function drawSkyLayer(img, parallax, alpha, offsetX, offsetY, scaleUp){
  if(!img.complete || !img.naturalWidth) return;
  const z = cam.z * parallax * scaleUp;
  const iw = WORLD.w, ih = WORLD.w * img.naturalHeight / img.naturalWidth;
  const dx = W/2 - (cam.x)*z - (W/2)*(1-parallax)*0 + offsetX - iw*z/2 + (WORLD.cx)*z*0;
  /* centrar la imagen en el mundo */
  const ox = W/2 + (WORLD.cx - cam.x)*z - iw*z/2 + offsetX*z;
  const oy = H/2 + (WORLD.cy - cam.y)*z - ih*z/2 + offsetY*z;
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, ox, oy, iw*z, ih*z);
  ctx.globalAlpha = 1;
}

/* ---------- bucle principal ---------- */
const t0 = performance.now();
function frame(now){
  const t = (now - t0)/1000;
  cam.x = lerp(cam.x, cam.tx, .06); cam.y = lerp(cam.y, cam.ty, .06);
  cam.z = lerp(cam.z, cam.tz, .055);
  dawn  = lerp(dawn, dawnT, .04);
  const px = (mouse.x - W/2)/W * 30, py = (mouse.y - H/2)/H * 20;

  /* cielo base */
  const ct = skyMix(dawn);
  ctx.fillStyle = `rgb(${ct[0]|0},${ct[1]|0},${ct[2]|0})`;
  ctx.fillRect(0,0,W,H);

  /* capas fotorealistas (parallax distinto = profundidad) */
  const nightA = lerp(1,.4,dawn);
  drawSkyLayer(sky1, .45, .95*nightA, 0, 0, 2.4);
  drawSkyLayer(sky2, .68, .55*nightA, 500, 260, 2.9);

  /* viñeta: concentra la mirada y da contraste a las estrellas */
  const vg = ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.32, W/2,H/2,Math.max(W,H)*.75);
  vg.addColorStop(0,'rgba(4,8,16,0)');
  vg.addColorStop(1,`rgba(4,8,16,${lerp(.42,.18,dawn)})`);
  ctx.fillStyle = vg; ctx.fillRect(0,0,W,H);

  /* starfield */
  ctx.save();
  for(const s of bgStars){
    const z = cam.z * s.z;
    const sx = W/2 + (s.x - cam.x)*z - px*s.z;
    const sy = H/2 + (s.y - cam.y)*z - py*s.z;
    if(sx<-10||sx>W+10||sy<-10||sy>H+10) continue;
    ctx.globalAlpha = (.45 + .4*Math.sin(t*1.7 + s.ph)) * lerp(.9,.3,dawn);
    ctx.fillStyle = '#DCE8F5';
    ctx.beginPath(); ctx.arc(sx, sy, s.s*z*1.7, 0, 6.28); ctx.fill();
  }
  ctx.restore();

  /* meteorito */
  if(!meteor && now > nextMeteor){ meteor = {x: rnd(now)*W, y: rnd(now*.7)*H*.4, life: 1}; nextMeteor = now + 5000 + rnd(now)*6000; }
  if(meteor){
    meteor.life -= .02; meteor.x += 9; meteor.y += 4.5;
    if(meteor.life<=0) meteor = null;
    else{ ctx.save(); ctx.globalAlpha = meteor.life*.8*(1-dawn);
      const mg = ctx.createLinearGradient(meteor.x,meteor.y,meteor.x-70,meteor.y-35);
      mg.addColorStop(0,'rgba(255,255,255,.9)'); mg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.strokeStyle=mg; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.moveTo(meteor.x,meteor.y); ctx.lineTo(meteor.x-70,meteor.y-35); ctx.stroke(); ctx.restore(); }
  }

  /* ---- constelaciones ---- */
  ctx.save();
  ctx.translate(W/2 - cam.x*cam.z - px, H/2 - cam.y*cam.z - py);
  ctx.scale(cam.z, cam.z);

  hovered = null;
  let bestD = 1e9;
  for(const s of stars){
    const d = Math.hypot(s.wx-mouse.wx, s.wy-mouse.wy);
    const prox = clamp(1 - d/160, 0, 1);
    const skillBoost = activeSkill && s.skill===activeSkill.key ? .25 : 0;
    const dimOther  = activeSkill && s.skill!==activeSkill.key ? .12 : 0;
    const lvlBoost  = activeLevel && s.lv===activeLevel ? .30 : 0;
    const lvlDim    = activeLevel && s.lv!==activeLevel ? .16 : 0;
    s.lit = lerp(s.lit, .30 + prox*.7 + skillBoost + lvlBoost - dimOther - lvlDim + (s===selected?.9:0), .09);
    if(d < bestD && d < 22/cam.z){ bestD = d; hovered = s; }
  }

  for(const sk of SKILLS){
    const group = sk.path && sk.path.length ? sk.path : stars.filter(s=>s.skill===sk.key);
    if(group.length<2) continue;
    const g = group.reduce((a,s)=>a+s.lit,0)/group.length;
    ctx.beginPath();
    ctx.setLineDash([5, 10]);                               // discontinua, respira
    ctx.lineDashOffset = -t*6;                              // deriva lenta, como polvo estelar
    group.forEach((s,i)=> i? ctx.lineTo(s.wx,s.wy) : ctx.moveTo(s.wx,s.wy));
    ctx.strokeStyle = `rgba(150,215,230,${clamp(lerp(.11,.36,g),0,.5)*lerp(1,.5,dawn)})`;
    ctx.lineWidth = 1.15/cam.z;
    ctx.stroke();
    ctx.setLineDash([]);
  }

  for(const s of stars){
    const tw = .9 + .1*Math.sin(t*2.2 + s.phase);
    const a = clamp(s.lit*tw, 0, 1) * lerp(1,.72,dawn);
    const gs = s.size * (9 + s.lit*13);
    ctx.globalAlpha = clamp(a*1.15,0,1)*.9;
    ctx.drawImage(glow, s.wx-gs/2, s.wy-gs/2, gs, gs);
    ctx.globalAlpha = clamp(a+.22,0,1);
    ctx.fillStyle = LVL_COLOR[s.lv] || '#FFF';
    ctx.beginPath(); ctx.arc(s.wx, s.wy, Math.max(s.size*(1+s.lit*.5), 1.7/cam.z), 0, 6.28); ctx.fill();
  }
  /* nombres de habilidad sobre cada constelación */
  ctx.textAlign = 'center';
  try{ ctx.letterSpacing = '6px'; }catch(e){}
  for(const sk of SKILLS){
    if(!sk.path || !sk.path.length) continue;
    const topY = Math.max.apply(null, sk.path.map(s=>s.wy)) + 58;
    const isOn = activeSkill && activeSkill.key===sk.key;
    ctx.globalAlpha = (isOn ? 1 : activeSkill ? .22 : .62) * lerp(1,.12,dawn);
    ctx.font = `500 ${15/cam.z}px 'IBM Plex Mono',monospace`;
    ctx.fillStyle = sk.hue;
    ctx.fillText(sk.label.toUpperCase(), sk.cx, topY);
    ctx.globalAlpha *= .8;
    ctx.font = `400 ${10.5/cam.z}px 'IBM Plex Mono',monospace`;
    ctx.fillText(sk.count + ' ESTRELLAS', sk.cx, topY + 20/cam.z);
  }
  try{ ctx.letterSpacing = '0px'; }catch(e){}

  ctx.restore();
  ctx.globalAlpha = 1;

  if(hovered && !selected){
    cv.style.cursor='pointer';
    tip.style.opacity=1;
    tip.style.left = mouse.x+'px'; tip.style.top = mouse.y+'px';
    tip.innerHTML = `<b>✦</b> ${hovered.data.title} · ${hovered.data.level}`;
  } else {
    cv.style.cursor = selected ? 'default' : (drag ? 'grabbing' : 'grab');
    tip.style.opacity=0;
  }

  requestAnimationFrame(frame);
}

/* ---------- arranque ---------- */
skillDesc.textContent = 'Seis habilidades. Un cielo. Elige una constelación o toca una estrella.';
say('Hola, soy <b>Aurora</b> ✨ Este cielo está dormido… <b>acércate a una estrella</b> y mira cómo despierta.');
requestAnimationFrame(frame);
