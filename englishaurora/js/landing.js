/* English Aurora — 2.5D sky engine (adapted from ui-lab/aurora-landing.js v2)
   Changes: TEMAS comes from window.EA_DATA (embedded, zero fetch),
   the panel links to the REAL Lesson/Practice/Test pages with wave A/B/C pills,
   HUD shows Aurora Essence. All UI in English. */
'use strict';

const TEMAS = (window.EA_DATA.index || []).map(t => ({
  id: t.id, base: t.base, area: t.area, level: t.level, title: t.title,
  meta: t.meta, chips: t.chips, waves: t.waves || ['a']
}));

/* ---------- student telemetry state (Firebase) ---------- */
let studentToken = null;
let studentData = null;
const studentBest = {};
const studentLast = {};
const studentCounts = {};
const studentPending = new Set();
const studentCompleted = new Set();
let isStudentMode = false;

function getStarState(tId){
  if (!isStudentMode) return null;
  const isCompletedOnly = !(tId in studentBest) && studentCompleted.has(tId);
  const score = (tId in studentBest) ? studentBest[tId] : (isCompletedOnly ? 75 : null);
  if (score == null) return 'apagada';
  if (score < 75) return 'tenue';
  if (score < 85) return 'brillante';
  return 'supernova';
}

/* ---------- utilities ---------- */
function rnd(seed){ const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
const lerp = (a,b,t)=>a+(b-a)*t;
const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));

/* ---------- communicative skills (constellations) ---------- */
const SKILLS = [
  { key:'speaking',   label:'Speaking',   cx:520,  cy:760,  hue:'#8FF2D2',
    desc:'Speaking: producing the language out loud — fluency, pronunciation and real conversation.' },
  { key:'listening',  label:'Listening',  cx:960,  cy:520,  hue:'#9DF2DF',
    desc:'Listening: understanding English as it truly sounds — accents, speed and native nuance.' },
  { key:'reading',    label:'Reading',    cx:1410, cy:790,  hue:'#BFE8FF',
    desc:'Reading: understanding real texts, from the simple notice to the complex article.' },
  { key:'writing',    label:'Writing',    cx:1870, cy:530,  hue:'#FFE9B0',
    desc:'Writing: building sentences and texts others understand — precision and style.' },
  { key:'grammar',    label:'Grammar',    cx:2320, cy:780,  hue:'#E3C8FF',
    desc:'Grammar: the invisible architecture of the language — the structures that hold everything.' },
  { key:'vocabulary', label:'Vocabulary', cx:2750, cy:560,  hue:'#FFC9D9',
    desc:'Vocabulary: words as tools — the more you have, the more worlds you can describe.' },
];
const LVL_COLOR = {A1:'#BFE8FF',A2:'#9DF2DF',B1:'#FFE9B0',B2:'#E3C8FF',C1:'#FFC9D9'};

/* ---------- world: stars per skill ---------- */
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

/* constellations: nearest-neighbour chain */
SKILLS.forEach(sk => {
  const group = stars.filter(s=>s.skill===sk.key);
  if(!group.length){ sk.path=[]; return; }
  const rest = new Set(group);
  let cur = group.reduce((a,b)=> a.wy < b.wy ? a : b);
  const path = [cur]; rest.delete(cur);
  while(rest.size){
    let best=null, bd=1e18;
    for(const s of rest){ const d=(s.wx-cur.wx)**2+(s.wy-cur.wy)**2; if(d<bd){bd=d;best=s;} }
    path.push(best); rest.delete(best); cur = best;
  }
  sk.path = path;
});

/* ---------- canvas ---------- */
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

/* ---------- photorealistic backgrounds ---------- */
const sky1 = new Image(); sky1.src = 'assets/cielo-profundo.jpg';
const sky2 = new Image(); sky2.src = 'assets/cielo-dorado.jpg';

/* ---------- procedural starfield ---------- */
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

/* ---------- camera & state ---------- */
function fitZoom(){ return Math.min(W/WORLD.w, H/WORLD.h) * 1.02; }
const cam = { x:WORLD.cx, y:WORLD.cy, z:fitZoom(), tx:WORLD.cx, ty:WORLD.cy, tz:fitZoom() };
let dawn = 0, dawnT = 0;
let mouse = {x:-999,y:-999, wx:-999, wy:-999};
let hovered = null, selected = null, activeSkill = null;
let meteor = null, nextMeteor = performance.now()+4000;
let drag = null;

const $ = id => document.getElementById(id);

/* ---------- Aurora Essence (HUD) ---------- */
function esenciaTotal(){ return parseInt(localStorage.getItem('esenciaAurora')||'0',10); }
function pintarEsencia(){ $('esencia').textContent = '✦ ' + esenciaTotal() + ' ESSENCE'; }
pintarEsencia();

/* ---------- CEFR rail ---------- */
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
    skillDesc.textContent = `Level ${lv}: ${n} topics lit in the sky. The others await their turn.`;
    say(`<b>Level ${lv}</b>: ${n} clustered stars. Combine it with a skill from the carousel to find your exact topic.`);
  } else {
    skillDesc.textContent = 'Six skills. One sky. Pick a constellation or touch a star.';
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

/* ---------- skills carousel ---------- */
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
    skillDesc.textContent = 'Six skills. One sky. Pick a constellation or touch a star.';
    document.querySelectorAll('.skill-item').forEach(e=>e.classList.remove('on'));
    return;
  }
  const sk = SKILLS.find(s=>s.key===key);
  activeSkill = sk;
  cam.tx = sk.cx; cam.ty = sk.cy; cam.tz = fitZoom()*3.1;
  skillDesc.textContent = sk.desc;
  document.querySelectorAll('.skill-item').forEach(e=>e.classList.toggle('on', e.dataset.skill===key));
  say(`<b>${sk.label}</b>: ${sk.count} stars in this constellation. Touch one to open its lesson.`);
}

/* ---------- interaction ---------- */
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
  if(e.target.closest('.panel,.hud,.aurora,.skills-bar,.levels-rail')) return;
  if(hovered && !selected){ openStar(hovered); }
  else if(!hovered && selected){ closeStar(); }
});

/* ---------- panel: waves + Lesson/Practice/Test ---------- */
const WAVE_SUFFIX = { a:'01', b:'02', c:'03' };
const WAVE_NOTE = {
  a:'The original foundational sequence.',
  b:'Wave B — 100% English Masterclass (RPG framing, cast dialogue, neural audio & printable PDF).',
  c:'Wave C — Spoken roleplay (still being forged).'
};
let panelWave = 'a';

function pageURL(topicId, wave, kind){ /* kind: leccion | preview | evaluacion */
  if (wave === 'b') {
    if (kind === 'leccion') {
      return '../leccion/' + topicId + '-wave-b.html';
    }
    return '../' + kind + '/' + topicId + '.html';
  }
  return '../' + kind + '/' + topicId + '.html';
}
function wirePanelButtons(){
  if(!selected) return;
  const topicId = selected.data.id;
  const isWaveB = (panelWave === 'b');
  if (isStudentMode && studentToken) {
    $('btn-practice').href = `../aula/ejercicio.html?t=${encodeURIComponent(studentToken)}&tema=${encodeURIComponent(topicId)}`;
    $('btn-practice').innerHTML = '✎&nbsp;&nbsp;Practice (Record Score)';
    $('btn-lesson').href   = isWaveB ? `../leccion/${topicId}-wave-b.html?t=${encodeURIComponent(studentToken)}` : `../leccion/${topicId}.html?t=${encodeURIComponent(studentToken)}`;
    $('btn-lesson').innerHTML = isWaveB ? '▶&nbsp;&nbsp;Lesson (Wave B Masterclass)' : '▶&nbsp;&nbsp;Lesson';
    $('btn-test').href     = `../evaluacion/${topicId}.html?t=${encodeURIComponent(studentToken)}`;
  } else {
    $('btn-lesson').href   = pageURL(topicId, panelWave, 'leccion');
    $('btn-lesson').innerHTML = isWaveB ? '▶&nbsp;&nbsp;Lesson (Wave B Masterclass)' : '▶&nbsp;&nbsp;Lesson';
    $('btn-practice').href = pageURL(topicId, panelWave, 'preview');
    $('btn-practice').innerHTML = '✎&nbsp;&nbsp;Practice';
    $('btn-test').href     = pageURL(topicId, panelWave, 'evaluacion');
  }
  $('wave-note').textContent = WAVE_NOTE[panelWave] || '';
  document.querySelectorAll('#p-waves .wave-pill').forEach(p=>
    p.classList.toggle('on', p.dataset.wave===panelWave));
}
function buildWavePills(){
  const box = $('p-waves'); box.innerHTML = '';
  const waves = selected.data.waves || ['a', 'b'];
  ['a','b','c'].forEach(w => {
    const b = document.createElement('button');
    const isAvailable = waves.includes(w) && w !== 'c'; // Keep C empty/locked for now as requested
    b.className = 'wave-pill' + (isAvailable ? '' : ' locked');
    b.dataset.wave = w;
    b.textContent = w.toUpperCase();
    b.title = isAvailable ? WAVE_NOTE[w] : 'Wave ' + w.toUpperCase() + ' — coming soon in next expansion';
    b.addEventListener('click', ()=>{
      if (!isAvailable) return;
      panelWave = w;
      wirePanelButtons();
    });
    box.appendChild(b);
  });
}

function openStar(s, targetWave){
  selected = s;
  cam.tx = s.wx; cam.ty = s.wy; cam.tz = fitZoom()*5.2;
  dawnT = 1;
  document.body.classList.add('zoomed');
  $('p-area').textContent = `${s.data.area} · ${s.data.level} · ${SKILLS.find(k=>k.key===s.skill).label}`;
  $('p-title').textContent = s.data.title;
  $('p-meta').textContent = s.data.meta;
  $('p-chips').innerHTML = (s.data.chips||[]).map(c=>`<span class="chip">${c}</span>`).join('');

  const sBox = $('p-student-box');
  if (sBox) {
    if (isStudentMode) {
      sBox.style.display = 'block';
      const tId = s.data.id;
      const score = (tId in studentBest) ? studentBest[tId] : null;
      const isCompletedOnly = !(tId in studentBest) && studentCompleted.has(tId);
      const isPending = studentPending.has(tId);
      const attempts = studentCounts[tId] || 0;
      const badgeEl = $('p-student-badge');
      const scoreEl = $('p-student-score');
      const pendEl = $('p-student-pend');

      if (pendEl) pendEl.style.display = isPending ? 'block' : 'none';

      if (isCompletedOnly) {
        badgeEl.textContent = 'TASK DONE';
        badgeEl.style.background = 'rgba(45,212,191,.2)';
        badgeEl.style.color = '#0F6B5C';
        scoreEl.innerHTML = `✓ Completed task (no numeric score recorded)`;
      } else if (score != null) {
        if (score >= 85) {
          badgeEl.textContent = 'SUPERNOVA ✦';
          badgeEl.style.background = 'rgba(242,193,78,.25)';
          badgeEl.style.color = '#B45309';
        } else if (score >= 75) {
          badgeEl.textContent = 'PASSED ★';
          badgeEl.style.background = 'rgba(45,212,191,.2)';
          badgeEl.style.color = '#0F6B5C';
        } else {
          badgeEl.textContent = 'IN PROGRESS ⟳';
          badgeEl.style.background = 'rgba(224,106,92,.2)';
          badgeEl.style.color = '#B23A2E';
        }
        scoreEl.innerHTML = `Best Score: <b>${score}%</b> ${attempts > 1 ? `· ${attempts} attempts` : ''}`;
      } else {
        badgeEl.textContent = 'NOT ATTEMPTED';
        badgeEl.style.background = 'rgba(94,114,118,.15)';
        badgeEl.style.color = '#5E7276';
        scoreEl.innerHTML = `This star awaits your first attempt!`;
      }
    } else {
      sBox.style.display = 'none';
    }
  }

  panelWave = (targetWave && targetWave.toLowerCase() === 'b') ? 'b' : 'a';
  buildWavePills();
  wirePanelButtons();
  
  if (isStudentMode) {
    const tId = s.data.id;
    const score = studentBest[tId];
    const isPending = studentPending.has(tId);
    if (isPending) {
      setAurora('explicando');
      say(`This star is an <b>assigned quest</b> from Felipe! Practice it now to submit your score.`);
    } else if (score >= 85) {
      setAurora('celebrando');
      say(`Radiant! You've already mastered this star with <b>${score}%</b>! Ready to review with the Wave B Masterclass?`);
    } else if (score != null) {
      setAurora('explicando');
      say(`You scored <b>${score}%</b> here. A quick practice run will push it into a <b>Supernova (≥85%)</b>!`);
    } else {
      setAurora('saludo');
      say(`A fresh star in your sky! Start with the Lesson to master the rule, then ignite it in Practice.`);
    }
  } else {
    setAurora('explicando');
    const extra = (s.data.waves||[]).includes('b') ? ' Select <b>Wave B</b> for the 100% English Masterclass with Aurora!' : '';
    say('Good choice. <b>Every star is a complete lesson</b> — and once you finish it, it stays lit forever.' + extra);
  }
}
function closeStar(){
  selected = null; dawnT = 0;
  if(activeSkill){ cam.tx=activeSkill.cx; cam.ty=activeSkill.cy; cam.tz=fitZoom()*3.1; }
  else { cam.tx=WORLD.cx; cam.ty=WORLD.cy; cam.tz=fitZoom(); }
  document.body.classList.remove('zoomed');
  setAurora('saludo');
}
$('p-close').addEventListener('click', closeStar);
addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeStar(); }});
$('btn-ignite').addEventListener('click', ()=>{
  setAurora('celebrando');
  const n = Object.keys(localStorage).filter(k=>k.startsWith('ea_best_')).length;
  say(`You carry <b>${esenciaTotal()} Aurora Essence</b> ✦ and <b>${n}</b> completed paths. <b>Sign up to keep your students' progress!</b> <a href="../herramientas/teacher-hub.html" style="color:var(--gold); text-decoration:underline; font-weight:600; display:inline-block; margin-top:4px;">Open Teacher's Hub ↗</a>`);
});

/* ---------- night → dawn ---------- */
function skyMix(t){ return [lerp(6,42,t),lerp(11,66,t),lerp(22,84,t)]; }

function drawSkyLayer(img, parallax, alpha, offsetX, offsetY, scaleUp){
  if(!img.complete || !img.naturalWidth) return;
  const z = cam.z * parallax * scaleUp;
  const iw = WORLD.w, ih = WORLD.w * img.naturalHeight / img.naturalWidth;
  const ox = W/2 + (WORLD.cx - cam.x)*z - iw*z/2 + offsetX*z;
  const oy = H/2 + (WORLD.cy - cam.y)*z - ih*z/2 + offsetY*z;
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, ox, oy, iw*z, ih*z);
  ctx.globalAlpha = 1;
}

/* ---------- main loop ---------- */
const t0 = performance.now();
function frame(now){
  const t = (now - t0)/1000;
  cam.x = lerp(cam.x, cam.tx, .06); cam.y = lerp(cam.y, cam.ty, .06);
  cam.z = lerp(cam.z, cam.tz, .055);
  dawn  = lerp(dawn, dawnT, .04);
  const px = (mouse.x - W/2)/W * 30, py = (mouse.y - H/2)/H * 20;

  const ct = skyMix(dawn);
  ctx.fillStyle = `rgb(${ct[0]|0},${ct[1]|0},${ct[2]|0})`;
  ctx.fillRect(0,0,W,H);

  const nightA = lerp(1,.4,dawn);
  drawSkyLayer(sky1, .45, .95*nightA, 0, 0, 2.4);
  drawSkyLayer(sky2, .68, .55*nightA, 500, 260, 2.9);

  const vg = ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.32, W/2,H/2,Math.max(W,H)*.75);
  vg.addColorStop(0,'rgba(4,8,16,0)');
  vg.addColorStop(1,`rgba(4,8,16,${lerp(.42,.18,dawn)})`);
  ctx.fillStyle = vg; ctx.fillRect(0,0,W,H);

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

  /* ---- constellations ---- */
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

    let baseLit = 0.30;
    if (isStudentMode) {
      const st = getStarState(s.data.id);
      if (st === 'supernova') baseLit = 0.85;
      else if (st === 'brillante') baseLit = 0.62;
      else if (st === 'tenue') baseLit = 0.40;
      else baseLit = 0.12;
    }
    s.lit = lerp(s.lit, baseLit + prox*.7 + skillBoost + lvlBoost - dimOther - lvlDim + (s===selected?.9:0), .09);
    if(d < bestD && d < 22/cam.z){ bestD = d; hovered = s; }
  }

  for(const sk of SKILLS){
    const group = sk.path && sk.path.length ? sk.path : stars.filter(s=>s.skill===sk.key);
    if(group.length<2) continue;
    const g = group.reduce((a,s)=>a+s.lit,0)/group.length;
    ctx.beginPath();
    ctx.setLineDash([5, 10]);
    ctx.lineDashOffset = -t*6;
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

    let starColor = LVL_COLOR[s.lv] || '#FFF';
    let isPending = false;
    let isReviewed = false;
    if (isStudentMode) {
      const st = getStarState(s.data.id);
      if (st === 'supernova') starColor = '#F2C14E';
      else if (st === 'brillante') starColor = '#2DD4BF';
      else if (st === 'tenue') starColor = '#E06A5C';
      else starColor = '#4B5E73';
      isPending = studentPending.has(s.data.id);
      isReviewed = (studentCounts[s.data.id] || 0) > 1 && (studentBest[s.data.id] >= 75);
    }
    ctx.fillStyle = starColor;
    ctx.beginPath(); ctx.arc(s.wx, s.wy, Math.max(s.size*(1+s.lit*.5), 1.7/cam.z), 0, 6.28); ctx.fill();

    if (isPending) {
      const pulse = 1 + 0.32 * Math.sin(t * 3.6 + s.phase);
      ctx.strokeStyle = `rgba(242,193,78,${clamp(0.65 + 0.35*Math.sin(t*3.6), 0, 1)})`;
      ctx.lineWidth = 1.6 / cam.z;
      ctx.beginPath();
      ctx.arc(s.wx, s.wy, Math.max(s.size * 3.8 * pulse, 6.5/cam.z), 0, 6.28);
      ctx.stroke();
    }
    if (isReviewed) {
      ctx.strokeStyle = 'rgba(45,212,191,0.55)';
      ctx.lineWidth = 1.0 / cam.z;
      ctx.beginPath();
      ctx.arc(s.wx, s.wy, Math.max(s.size * 2.8, 4.5/cam.z), 0, 6.28);
      ctx.stroke();
    }
  }
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
    ctx.fillText(sk.count + ' STARS', sk.cx, topY + 20/cam.z);
  }
  try{ ctx.letterSpacing = '0px'; }catch(e){}

  ctx.restore();
  ctx.globalAlpha = 1;

  if(hovered && !selected){
    cv.style.cursor='pointer';
    tip.style.opacity=1;
    tip.style.left = mouse.x+'px'; tip.style.top = mouse.y+'px';
    if (isStudentMode) {
      const st = getStarState(hovered.data.id);
      const isPend = studentPending.has(hovered.data.id);
      const scr = studentBest[hovered.data.id];
      let statusTxt = '';
      if (isPend) statusTxt = ' · <span style="color:var(--gold);">◎ PENDING QUEST</span>';
      else if (st === 'supernova') statusTxt = ` · <span style="color:var(--gold);">✦ SUPERNOVA ${scr}%</span>`;
      else if (st === 'brillante') statusTxt = ` · <span style="color:var(--teal);">★ PASSED ${scr}%</span>`;
      else if (st === 'tenue') statusTxt = ` · <span style="color:#E06A5C;">⟳ IN PROGRESS ${scr}%</span>`;
      else statusTxt = ' · <span style="color:var(--muted);">○ Not attempted</span>';
      tip.innerHTML = `<b>✦</b> ${hovered.data.title} · ${hovered.data.level}${statusTxt}`;
    } else {
      tip.innerHTML = `<b>✦</b> ${hovered.data.title} · ${hovered.data.level}`;
    }
  } else {
    cv.style.cursor = selected ? 'default' : (drag ? 'grabbing' : 'grab');
    tip.style.opacity=0;
  }

  requestAnimationFrame(frame);
}

/* ---------- Student Mode Initialization (Firebase Firestore) ---------- */
async function initStudentMode() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('t') || params.get('token') || params.get('student');
  if (!token) return;
  studentToken = token;

  try {
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK not loaded, student telemetry offline.');
      return;
    }

    const cfg = (typeof firebaseConfig !== 'undefined') ? firebaseConfig : {
      apiKey: "AIzaSyB3-Zld9m5cskqIj1h3Dmf4qfy52rVtEqM",
      authDomain: "sanguine-fusion-403621.firebaseapp.com",
      projectId: "sanguine-fusion-403621",
      storageBucket: "sanguine-fusion-403621.firebasestorage.app",
      messagingSenderId: "1048421550101",
      appId: "1:1048421550101:web:c068b31ef9873cd525a61c"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(cfg);
    }
    const db = firebase.firestore();
    const docRef = db.collection('estudiantes').doc(studentToken);
    const [snap, rq, tq] = await Promise.all([
      docRef.get(),
      docRef.collection('resultados').get(),
      docRef.collection('tareas').get()
    ]);

    if (!snap.exists) {
      console.warn('Student not found for token:', studentToken);
      return;
    }

    studentData = snap.data();
    isStudentMode = true;

    rq.docs.forEach(d => {
      const r = d.data();
      if (!r || !r.temaId) return;
      const s = Number(r.score);
      if (!isNaN(s)) {
        if (!(r.temaId in studentBest) || s > studentBest[r.temaId]) {
          studentBest[r.temaId] = s;
        }
        studentCounts[r.temaId] = (studentCounts[r.temaId] || 0) + 1;
      }
      const f = r.fecha;
      let ms = null;
      if (f) {
        ms = f.toMillis ? f.toMillis() : (f.seconds != null ? f.seconds * 1000 : new Date(f).getTime());
      }
      if (ms != null && !isNaN(ms)) {
        if (!(r.temaId in studentLast) || ms > studentLast[r.temaId]) {
          studentLast[r.temaId] = ms;
        }
      }
    });

    tq.docs.forEach(d => {
      const tr = d.data();
      if (!tr || !tr.temaId) return;
      if (tr.estado === 'hecha') {
        studentCompleted.add(tr.temaId);
      } else {
        studentPending.add(tr.temaId);
      }
    });

    applyStudentUI();
  } catch (err) {
    console.error('Error fetching student galaxy telemetry:', err);
  }
}

function applyStudentUI() {
  if (!isStudentMode || !studentData) return;
  const firstName = (studentData.nombre || '').split(' ')[0] || 'Student';

  const taglineEl = $('hud-tagline');
  if (taglineEl) {
    taglineEl.innerHTML = `✦ <b style="color:var(--gold);">${studentData.nombre}</b>'s Sky · Level ${studentData.nivel || '—'}`;
  }

  const backAulaBtn = $('btn-back-aula');
  if (backAulaBtn) {
    backAulaBtn.href = `../aula/estudiante.html?t=${encodeURIComponent(studentToken)}`;
    backAulaBtn.style.display = 'inline-block';
  }

  const supernovas = Object.values(studentBest).filter(s => s >= 85).length;
  const brillantes = Object.values(studentBest).filter(s => s >= 75 && s < 85).length;
  const tenues = Object.values(studentBest).filter(s => s < 75).length;
  const pendingCount = studentPending.size;

  const totalEssence = (supernovas * 100) + (brillantes * 60) + (tenues * 25) + (studentCompleted.size * 50);
  $('esencia').textContent = `✦ ${totalEssence} ESSENCE`;

  const heroTitle = $('hero-title');
  if (heroTitle) {
    heroTitle.innerHTML = `${firstName}'s Sky of English.<br><em>Every star ignited is mastery gained.</em>`;
  }
  const heroSub = $('hero-sub');
  if (heroSub) {
    heroSub.innerHTML = `<b style="color:var(--gold);">${supernovas}</b> Supernovas (≥85%) · <b style="color:var(--teal);">${brillantes}</b> Passed · <b style="color:#E06A5C;">${tenues}</b> In Progress${pendingCount ? ` · <b style="color:var(--gold);">◎ ${pendingCount}</b> Pending Assignment${pendingCount !== 1 ? 's' : ''}` : ''}`;
  }

  if (pendingCount > 0) {
    setAurora('explicando');
    say(`Welcome back, <b>${firstName}</b>! ✨ You have <b>${pendingCount} assigned quest(s)</b> pulsing with a golden ring in your sky. Tap one to begin!`);
  } else if (supernovas > 0) {
    setAurora('celebrando');
    say(`Welcome back, <b>${firstName}</b>! ✨ Your sky is radiant with <b>${supernovas} mastered supernovas</b>. Ready to ignite more?`);
  } else {
    setAurora('saludo');
    say(`Welcome to your sky, <b>${firstName}</b>! ✨ Drift toward any constellation to start your path.`);
  }

  $('btn-ignite').textContent = `✨ ${firstName}'s Galaxy`;
  $('btn-ignite').onclick = () => {
    setAurora('celebrando');
    say(`<b>${firstName}'s Mastery Sky:</b><br>✦ <b>${supernovas}</b> Supernovas (≥85%)<br>★ <b>${brillantes}</b> Proficient (75–84%)<br>⟳ <b>${tenues}</b> In Progress<br>◎ <b>${pendingCount}</b> Pending Quests<br><br><a href="../aula/estudiante.html?t=${encodeURIComponent(studentToken)}" style="color:var(--gold); text-decoration:underline; font-weight:600;">← Open Student Portal</a>`);
  };
}

/* ---------- boot ---------- */
skillDesc.textContent = 'Six skills. One sky. Pick a constellation or touch a star.';
say('Hi, I\'m <b>Aurora</b> ✨ This sky is asleep… <b>drift toward a star</b> and watch it wake up.');
initStudentMode();
requestAnimationFrame(frame);

/* ---------- URL Deep-Linking (Search Engines & Teacher's Hub) ---------- */
(function handleUrlDeepLink(){
  try {
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get('topic') || params.get('tema') || params.get('star') || params.get('id');
    const waveParam = params.get('wave') || params.get('w');
    if (topicParam) {
      setTimeout(() => {
        const star = stars.find(s => s.data.id === topicParam || s.data.base === topicParam || s.data.id.includes(topicParam));
        if (star) {
          openStar(star, waveParam);
        }
      }, 650);
    }
  } catch(e) {}
})();

