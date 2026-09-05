/* English Aurora — motor RPG de sendas (prototipo)
   Renderiza CUALQUIER secuencia de Dummy_alfa (olas A/B/C) con la piel RPG teal.
   Fixes del "error silencioso" documentados en HANDOFF.md / ARQUITECTURA.md:
   1. Datos embebidos (window.EA_DATA) — fetch bajo file:// falla en silencio.
   2. gap-fill recorre N huecos — split('___') con parts[0]/parts[1] perdía texto.
   3. normalize(): apóstrofos tipográficos ANTES del mapa de contracciones.
   4. Audio encadenado con 'ended' / utterance.onend — nunca setTimeout fijo. */
'use strict';
(function(){

/* ================= utilidades ================= */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const renderBold = s => esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
function shuffle(a){ const r=a.slice(); for(let i=r.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [r[i],r[j]]=[r[j],r[i]]; } return r; }

/* normalize: ORDEN IMPORTA — apóstrofos tipográficos primero, contracciones después */
const CONTRACCIONES = {
  "i'm":"i am","you're":"you are","we're":"we are","they're":"they are",
  "i've":"i have","you've":"you have","we've":"we have","they've":"they have",
  "i'll":"i will","you'll":"you will","he'll":"he will","she'll":"she will",
  "i'd":"i would","you'd":"you would","he'd":"he would","she'd":"she would",
  "it's":"it is","that's":"that is","there's":"there is","what's":"what is","who's":"who is",
  "he's":"he is","she's":"she is","let's":"let us",
  "don't":"do not","doesn't":"does not","didn't":"did not",
  "isn't":"is not","aren't":"are not","wasn't":"was not","weren't":"were not",
  "can't":"cannot","won't":"will not","couldn't":"could not","shouldn't":"should not",
  "wouldn't":"would not","mustn't":"must not","haven't":"have not","hasn't":"has not"
};
function norm(s){
  let t = String(s||'').toLowerCase().trim();
  t = t.replace(/[’‘ʼ`]/g,"'").replace(/[“”]/g,'"');      // 1º apóstrofos tipográficos
  t = t.normalize('NFD').replace(/[̀-ͯ]/g,'');       // 2º acentos
  t = t.replace(/\b[a-z]+'[a-z]+\b/g, m => CONTRACCIONES[m] || m); // 3º contracciones
  t = t.replace(/[.!?¡¿,;:"]+$/,'').replace(/^[.!?¡¿,;:"]+/,'');
  t = t.replace(/\s+/g,' ');
  return t;
}
const eq = (a,b) => norm(a) === norm(b);

/* ================= datos de la senda ================= */
const params = new URLSearchParams(location.search);
const baseId = params.get('id') || 'a1-articles';
let wave = params.get('wave') || 'a';
const DATA = window.EA_DATA;
const idxEntry = (DATA.index||[]).find(t=>t.base===baseId) || DATA.index[0];
let seq;
if(wave==='a') seq = DATA.topics.find(t=>t._base===idxEntry.base);
else seq = ((DATA.waves||{})[idxEntry.base]||{})[wave];
let waveFallback = false;
if(!seq){ wave='a'; seq = DATA.topics.find(t=>t._base===idxEntry.base); waveFallback = true; }

const F = seq.fases || {};
const EJERCICIOS = (F.practica && F.practica.ejercicios) || [];
const NIVEL = seq.nivel || 'A1';
const availableWaves = idxEntry.waves || ['a'];

/* ================= bestiario ================= */
const BESTIARIO = {
  determinantes:'GOBLIN DE LOS ARTÍCULOS PERDIDOS',
  tiempo_verbal:'ESPECTRO DEL TIEMPO ROTO',
  modales:'INQUISIDOR DE LOS DEBERES',
  pronombres:'ESPEJO DE LOS PRONOMBRES',
  comparativos:'TITÁN DE LAS COMPARACIONES',
  clausulas_relativas:'HIDRA DE LAS CLÁUSULAS',
  preposiciones:'DUENDE DEL LABERINTO',
  vocabulario:'COLECCIONISTA DE PALABRAS',
  funcional_skills:'ECO DE LAS VOCES',
  joined_exercise:'AMALGAMA DEL REPASO'
};
const areaName = (seq.tema||'').split('—')[0].split('·')[0].trim();
const ENEMY = BESTIARIO[seq.arquetipo] || ('ESPECTRO DE ' + areaName.toUpperCase());
const BOSS = 'EL ESPECTRO MAYOR DE ' + areaName.toUpperCase();

const AURORA_GOOD = [
  '¡Hechizo acertado! La runa brilla con tu luz.',
  'El enemigo retrocede. Tu magia crece.',
  '¡Así se canaliza la Esencia Aurora!',
  'Un acierto digno de los archivos de la academia.',
  'La aurora misma aplaude ese hechizo.'
];
const AURORA_BAD = [
  'El hechizo falló… pero los grandes magos fallan mil veces. Lee la pista y sigue.',
  'Respira. Vuelve a la tabla rúnica en tu memoria y compara.',
  'La runa se apagó un instante. Nada grave: el error también enseña.',
  'El enemigo celebra demasiado pronto. La próxima es tuya.'
];
const AURORA_IMG = { good:'assets/aurora-celebrando.png', bad:'assets/aurora-corrigiendo.png',
  explain:'assets/aurora-explicando.png', hi:'assets/aurora.png' };

/* ================= estado ================= */
let xp = 0, playerHP = 3;
let qi = 0, bi = 0;
let questHP = EJERCICIOS.length, bossHP = 0;
const XP_QUEST = 10, XP_ITEM = 5, XP_BOSS = 20;

function esenciaTotal(){ return parseInt(localStorage.getItem('esenciaAurora')||'0',10); }
function pintarEsencia(){ $('esencia-chip').textContent = '✦ ' + esenciaTotal(); }
pintarEsencia();

/* estrellas de fondo */
(function(){ const box=$('stars');
  for(let i=0;i<70;i++){ const s=document.createElement('div'); s.className='star';
    s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
    s.style.animationDelay=(Math.random()*3)+'s'; s.style.opacity=Math.random()*.7+.2;
    box.appendChild(s); }
})();

function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $(id).classList.add('active'); window.scrollTo({top:0, behavior:'smooth'});
}
function sparks(x,y,color){
  for(let i=0;i<14;i++){
    const p=document.createElement('div'); p.className='spark';
    p.style.left=x+'px'; p.style.top=y+'px'; p.style.background=color||'#57d98a';
    p.style.setProperty('--dx',(Math.random()*160-80)+'px');
    p.style.setProperty('--dy',(Math.random()*-120-20)+'px');
    document.body.appendChild(p); setTimeout(()=>p.remove(),850);
  }
}
function auroraReact(prefix, ok, extra){
  const box=$(prefix+'-aurora'); if(!box) return;
  box.style.display='flex';
  $(prefix+'-aurora-img').src = AURORA_IMG[ok?'good':'bad'];
  const pool = ok?AURORA_GOOD:AURORA_BAD;
  $(prefix+'-aurora-text').textContent = extra || pool[Math.floor(Math.random()*pool.length)];
}

/* máquina de escribir para Aurora */
let typer=null;
function typeText(el, text, speed){
  if(typer) clearInterval(typer);
  el.textContent=''; let i=0;
  typer=setInterval(()=>{ i++; el.textContent=text.slice(0,i);
    if(i>=text.length){ clearInterval(typer); typer=null; } }, speed||22);
  el.parentElement.onclick=()=>{ if(typer){ clearInterval(typer); typer=null; el.textContent=text; } };
}

/* ================= INTRO ================= */
const WAVE_LABEL = { a:'OLA A · SENDA ORIGINAL', b:'OLA B · NUEVO VOCABULARIO', c:'OLA C · NUEVO CONTEXTO' };
const INTRO_LINES = {
  a:'Bienvenido, aprendiz. Bajo esta aurora boreal se alza la academia donde el inglés se domina como un arte arcano. Hoy te espera la senda «'+areaName+'». Yo te guío: primero el consejo, luego las quests, y al final… el Duelo. ¿Aceptas?',
  b:'De vuelta, aprendiz. Esta senda la conoces… pero la ola B trae vocabulario nuevo y un contexto distinto. La estructura es la misma; las palabras, otras. ¿Aceptas la variante?',
  c:'Tercera ola, aprendiz. Mismo hechizo, nuevo escenario y nuevas palabras. Dominar una estructura es saber lanzarla en cualquier contexto. ¿Aceptas?'
};
$('intro-title').textContent = 'SENDA ' + NIVEL + ' · ' + areaName;
$('intro-wave').textContent = WAVE_LABEL[wave] + (waveFallback ? '  ·  (ola pedida aún en forja — se abrió la A)' : '');
const nQuests = EJERCICIOS.length;
const plan = ['Lección', nQuests + ' quests'];
if(F.listening && F.listening.guion) plan.push('listening');
if(F.reading && F.reading.texto) plan.push('reading');
plan.push('Duelo Final');
$('intro-plan').innerHTML = plan.join(' → ') + ' · Recompensa: <span class="xp-tag">✦ ESENCIA AURORA</span>';
/* pills de olas */
(function(){
  const box=$('wave-pills');
  ['a','b','c'].forEach(w=>{
    const a=document.createElement('a');
    a.className='wave-pill'+(w===wave?' on':'')+(availableWaves.includes(w)?'':' locked');
    a.textContent = w==='a'?'Ola A':(w==='b'?'Ola B':'Ola C');
    if(availableWaves.includes(w)) a.href='senda.html?id='+encodeURIComponent(idxEntry.base)+'&wave='+w;
    box.appendChild(a);
  });
})();
typeText($('intro-text'), INTRO_LINES[wave] || INTRO_LINES.a);
$('btn-start').onclick = ()=>{ buildLesson(); go('s-lesson'); };

/* ================= LECCIÓN ================= */
function buildLesson(){
  $('lesson-title').textContent = '📜 Capítulo I — ' + areaName;
  const body=$('lesson-body'); body.innerHTML='';
  const ini = F.inicio || {};

  /* diálogo de apertura (interaccion) o banco afirmativo */
  let lines = ini.interaccion && ini.interaccion.length ? ini.interaccion : null;
  if(!lines){
    const banco=(seq.banco_oraciones||[]).filter(s=>!s.forma||s.forma==='afirmativo').slice(0,4);
    lines = banco.map(s=>'Aventurero: '+s.oracion);
  }
  if(lines.length){
    const h=document.createElement('p');
    h.style.cssText='margin:10px 0 6px; font-style:italic; color:var(--muted)';
    h.textContent='Los aventureros de la academia conversan. Escucha cómo usan la estructura:';
    body.appendChild(h);
    lines.forEach((ln,i)=>{
      const d=document.createElement('div'); d.className='dialogue-line';
      d.style.animationDelay=(i*0.18)+'s';
      const m=ln.match(/^([^:]+):\s*(.*)$/);
      d.innerHTML = m ? '<b>'+esc(m[1].toUpperCase())+':</b> '+renderBold(m[2]) : renderBold(ln);
      body.appendChild(d);
    });
  }

  /* diagnóstico: el error fósil */
  if(ini.banner_diagnostico && ini.banner_diagnostico.opcion_a){
    const bd=ini.banner_diagnostico;
    const h=document.createElement('h3');
    h.style.cssText='color:var(--gold); margin-top:24px';
    h.textContent='⚔ La Trampa del Viajero — ¿cuál hechizo está bien lanzado?';
    body.appendChild(h);
    const note=document.createElement('p');
    note.style.cssText='color:var(--muted); font-style:italic; margin:6px 0';
    note.textContent='El error fósil del hispanohablante acecha. Elige con cuidado:';
    body.appendChild(note);
    const opts = shuffle([['a',bd.opcion_a],['b',bd.opcion_b]]);
    opts.forEach(([k,txt])=>{
      const b=document.createElement('button'); b.className='diag-opt'; b.textContent=txt;
      b.onclick=()=>{
        const ok = k===bd.correcta;
        b.classList.add(ok?'correct':'wrong');
        if(ok){
          [...body.querySelectorAll('.diag-opt')].forEach(x=>x.disabled=true);
          const r=document.createElement('div'); r.className='aurora-react';
          r.innerHTML='<img src="'+AURORA_IMG.good+'" alt="Aurora"><div class="bubble">Exacto. Esa es la trampa que el enemigo siempre tiende — y tú ya la ves. Sigamos.</div>';
          b.after(r);
          const rect=b.getBoundingClientRect(); sparks(rect.left+rect.width/2, rect.top, '#57d98a');
        } else {
          setTimeout(()=>b.classList.remove('wrong'), 600);
        }
      };
      body.appendChild(b);
    });
  }

  /* definición pragmática */
  if(ini.definicion_pragmatica){
    const d=document.createElement('div'); d.className='aurora-react'; d.style.marginTop='20px';
    d.innerHTML='<img src="'+AURORA_IMG.explain+'" alt="Aurora"><div class="bubble">'+esc(ini.definicion_pragmatica)+'</div>';
    body.appendChild(d);
  }

  /* tabla rúnica */
  if(ini.tabla && ini.tabla.filas){
    const h=document.createElement('h3');
    h.style.cssText='color:var(--gold); margin-top:24px';
    h.textContent='✦ Tabla Rúnica: '+(ini.tabla.titulo||'');
    body.appendChild(h);
    const t=document.createElement('table'); t.className='rune';
    const head=document.createElement('tr');
    (ini.tabla.encabezados||[]).forEach(x=>{ const th=document.createElement('th'); th.textContent=x; head.appendChild(th); });
    t.appendChild(head);
    ini.tabla.filas.forEach(f=>{
      const tr=document.createElement('tr');
      f.forEach(c=>{ const td=document.createElement('td'); td.textContent=c; tr.appendChild(td); });
      t.appendChild(tr);
    });
    body.appendChild(t);
  }

  /* grimorio de vocabulario */
  const vocab = seq.vocabulario || [];
  if(vocab.length && ini.vocab_warmup!==false){
    const h=document.createElement('h3');
    h.style.cssText='color:var(--gold); margin-top:26px';
    h.textContent='📖 Grimorio de la Senda — gemas de vocabulario';
    body.appendChild(h);
    const g=document.createElement('div'); g.className='grimorio';
    vocab.forEach((v,i)=>{
      const c=document.createElement('div'); c.className='gema';
      c.style.animationDelay=(i*0.08)+'s';
      const bandera=v.bandera||'✦';
      const palabra=v.palabra||v.nacionalidad||'';
      const trad=v.traduccion||v.pais||'';
      c.innerHTML='<span class="bandera">'+esc(bandera)+'</span><span class="palabra">'+esc(palabra)+'</span><div class="trad">'+esc(trad)+'</div>';
      g.appendChild(c);
    });
    body.appendChild(g);
  }
}
$('btn-quests').onclick = ()=>{ startQuests(); };

/* ================= QUESTS (Duelo Arcano) ================= */
const ETAPA = { multiple_choice:'RECONOCIMIENTO', true_false:'RECONOCIMIENTO',
  gap_fill:'MANIPULACIÓN', unscramble:'MANIPULACIÓN', correct_mistake:'MANIPULACIÓN', banked_choice:'MANIPULACIÓN',
  transformation:'TRANSFORMACIÓN', write_opposite:'TRANSFORMACIÓN', short_answer_production:'TRANSFORMACIÓN' };
const QUEST_KIND = { multiple_choice:'ELIGE LA RUNA', true_false:'SABIDURÍA ARCANA',
  gap_fill:'COMPLETA EL HECHIZO', unscramble:'RECONSTRUYE EL PERGAMINO', correct_mistake:'REPARA EL HECHIZO ROTO',
  transformation:'TRANSMUTA LA ORACIÓN', write_opposite:'EL CONTRAHECHIZO', short_answer_production:'RESPUESTA DEL ADEPTO',
  banked_choice:'EL BANCO DE RUNAS' };
const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV'];

function roman(n){ return ROMAN[n-1] || String(n); }

function startQuests(){
  $('enemy-name').textContent = ENEMY;
  const dots=$('dots'); dots.innerHTML='';
  EJERCICIOS.forEach(()=>{ const d=document.createElement('div'); d.className='dot'; dots.appendChild(d); });
  questHP = EJERCICIOS.length;
  go('s-quest'); renderQuest();
}

/* gap-fill inline: N huecos, pista dentro del span (reglas no cosméticas del HANDOFF) */
function construirGapFill(container, texto, respuestas){
  const p=document.createElement('div'); p.className='gapfill';
  const parts=String(texto).split('___');
  const inputs=[];
  for(let i=0;i<parts.length;i++){
    let seg=parts[i], hint='';
    if(i>0){ /* el segmento tras un hueco puede abrir con "(pista)" — va DENTRO del span */
      const m=seg.match(/^\s*(\([^)]*\))/);
      if(m){ hint=m[1]; seg=seg.slice(m[0].length); }
      const span=document.createElement('span'); span.className='gap';
      const inp=document.createElement('input'); inp.type='text'; inp.autocomplete='off';
      const ans=respuestas[Math.min(i-1,respuestas.length-1)]||'';
      const w = (NIVEL==='A1'||NIVEL==='A2') ? Math.max(ans.length+2,5) : 7;
      inp.style.width=w+'ch'; inp.dataset.ans=ans;
      span.appendChild(inp);
      if(hint){ const h=document.createElement('span'); h.className='hint'; h.textContent=' '+hint; span.appendChild(h); }
      p.appendChild(span); inputs.push(inp);
    }
    p.appendChild(document.createTextNode(seg));
  }
  container.appendChild(p);
  return inputs;
}

/* ctx: {card, input, feedback, next, auroraPrefix|null, mode:'quest'|'boss', onResolve(ok)} */
function renderExerciseInto(ej, n, ctx){
  const card=ctx.card, inp=ctx.input;
  card.innerHTML=''; inp.innerHTML='';
  ctx.feedback.className='feedback'; ctx.next.style.display='none';
  if(ctx.auroraPrefix) $(ctx.auroraPrefix+'-aurora').style.display='none';

  const etapa=ETAPA[ej.tipo]||'QUEST';
  const kind=QUEST_KIND[ej.tipo]||'QUEST';
  let html='<span class="qtype">'+kind+' · '+etapa+' · '+roman(n)+'</span>';
  if(ej.combina && ej.combina.length) html+='<span class="combina">🔗 Combina: '+esc(ej.combina.join(' + '))+'</span><br>';

  const resolve=(ok, expected, ev)=>{
    if(ctx._done) return; ctx._done=true;
    const fb=ctx.feedback;
    if(ok){
      xp += ctx.mode==='boss'?XP_BOSS:XP_QUEST;
      fb.className='feedback show good';
      fb.textContent = ctx.mode==='boss' ? '✦ +'+XP_BOSS+' Esencia Aurora — el Espectro se desvanece.' : '✦ +'+XP_QUEST+' Esencia Aurora — golpe directo.';
      if(ev) sparks(ev.clientX||innerWidth/2, ev.clientY||innerHeight/2, '#57d98a');
    } else {
      fb.className='feedback show bad';
      fb.textContent = expected ? 'El hechizo correcto era: «'+expected+'».' : 'No era esa runa. El enemigo contraataca.';
    }
    ctx.onResolve(ok);
    ctx.next.style.display='inline-block';
  };

  if(ej.tipo==='multiple_choice'){
    card.innerHTML=html+esc(ej.pregunta||'');
    const box=document.createElement('div'); box.className='options';
    ej.opciones.forEach((o,i)=>{
      const b=document.createElement('button'); b.className='opt'; b.textContent=o;
      b.style.animationDelay=(i*0.09)+'s';
      b.onclick=(ev)=>{ [...box.children].forEach(c=>c.disabled=true);
        const ok=eq(o,ej.respuesta); b.classList.add(ok?'correct':'wrong');
        if(!ok){ const c=[...box.children].find(x=>eq(x.textContent,ej.respuesta)); if(c) c.classList.add('correct'); }
        resolve(ok, ok?null:ej.respuesta, ev); };
      box.appendChild(b);
    });
    inp.appendChild(box);

  } else if(ej.tipo==='true_false'){
    card.innerHTML=html+esc(ej.afirmacion||'');
    const box=document.createElement('div'); box.className='options';
    [['✦ Verdadero','true'],['✦ Falso','false']].forEach(([t,v],i)=>{
      const b=document.createElement('button'); b.className='opt'; b.textContent=t;
      b.style.animationDelay=(i*0.09)+'s';
      b.onclick=(ev)=>{ [...box.children].forEach(c=>c.disabled=true);
        const ok=v===String(ej.respuesta); b.classList.add(ok?'correct':'wrong');
        resolve(ok, ok?null:('Era '+(ej.respuesta==='true'?'VERDADERO':'FALSO')), ev); };
      box.appendChild(b);
    });
    inp.appendChild(box);

  } else if(ej.tipo==='gap_fill'){
    card.innerHTML=html;
    const respuestas=String(ej.respuesta).split('|');
    const inputs=construirGapFill(inp, ej.texto||'', respuestas);
    const c=document.createElement('div'); c.className='center';
    const b=document.createElement('button'); b.className='btn'; b.textContent='✦ Lanzar hechizo';
    const grade=(ev)=>{
      const allOk=inputs.every(x=>eq(x.value,x.dataset.ans));
      inputs.forEach(x=>{ x.disabled=true; x.style.borderBottomColor=eq(x.value,x.dataset.ans)?'var(--ok)':'var(--danger)'; });
      resolve(allOk, allOk?null:respuestas.join(' / '), ev);
    };
    b.onclick=grade;
    inputs.forEach(x=>x.onkeydown=e=>{ if(e.key==='Enter') grade(e); });
    c.appendChild(b); inp.appendChild(c);
    if(inputs[0]) inputs[0].focus();

  } else if(ej.tipo==='unscramble'){
    card.innerHTML=html+'<span class="instr">Toca las palabras en orden. Toca la línea para deshacer la última.</span>';
    const line=document.createElement('div'); line.className='answer-line'; line.textContent='…';
    const chips=document.createElement('div'); chips.className='chips';
    let picked=[];
    const words=shuffle(ej.palabras||[]);
    words.forEach((w,i)=>{
      const c=document.createElement('button'); c.className='chip'; c.textContent=w;
      c.style.animationDelay=(i*0.05)+'s';
      c.onclick=()=>{ c.classList.add('used'); picked.push(c); repaint();
        if(picked.length===words.length){
          const ans=picked.map(x=>x.textContent).join(' ');
          resolve(eq(ans,ej.respuesta), eq(ans,ej.respuesta)?null:ej.respuesta);
        } };
      chips.appendChild(c);
    });
    function repaint(){ line.textContent=picked.length?picked.map(x=>x.textContent).join(' '):'…'; }
    line.onclick=()=>{ const last=picked.pop(); if(last){ last.classList.remove('used'); repaint(); } };
    inp.appendChild(line); inp.appendChild(chips);

  } else if(ej.tipo==='correct_mistake'){
    card.innerHTML=html+'<span class="base">«'+esc(ej.texto_con_error||'')+'»</span><span class="instr">Reescribe el hechizo completo, ya reparado.</span>';
    spellInput(ej.respuesta);

  } else if(ej.tipo==='transformation' || ej.tipo==='write_opposite'){
    card.innerHTML=html+'<span class="base">«'+esc(ej.oracion_base||'')+'»</span><span class="instr">'+esc(ej.instruccion||'')+'</span>';
    spellInput(ej.respuesta);

  } else if(ej.tipo==='short_answer_production'){
    card.innerHTML=html+esc(ej.pregunta||'');
    spellInput(ej.respuesta);

  } else if(ej.tipo==='banked_choice'){
    card.innerHTML=html+esc(ej.prompt||'');
    /* el banco NUNCA se baraja; opción tomada se atenúa, no se esconde; deseleccionable */
    const bank=document.createElement('div'); bank.className='bank';
    (ej.options||[]).forEach(o=>{
      const s=document.createElement('span'); s.className='bank-item'; s.dataset.oid=o.id;
      s.innerHTML='<b>'+esc(o.id)+'</b>'+esc(o.label); bank.appendChild(s);
    });
    inp.appendChild(bank);
    const answers={};
    (ej.items||[]).forEach(it=>{
      const row=document.createElement('div'); row.className='banked-q';
      const t=document.createElement('span'); t.innerHTML=esc(it.prompt); row.appendChild(t);
      const bopts=document.createElement('div'); bopts.className='bopts';
      (ej.options||[]).forEach(o=>{
        const b=document.createElement('button'); b.className='bopt'; b.textContent=o.id;
        b.setAttribute('role','radio'); b.setAttribute('aria-checked','false');
        b.onclick=()=>{
          const was=b.getAttribute('aria-checked')==='true';
          [...bopts.children].forEach(x=>x.setAttribute('aria-checked','false'));
          if(was){ delete answers[it.id]; }
          else { answers[it.id]=o.id; b.setAttribute('aria-checked','true'); }
          /* atenuar tomadas (allowReuse:false) */
          const taken=new Set(Object.values(answers));
          [...bank.children].forEach(x=>x.classList.toggle('taken', ej.allowReuse===false && taken.has(x.dataset.oid)));
        };
        bopts.appendChild(b);
      });
      row.appendChild(bopts); inp.appendChild(row);
    });
    const c=document.createElement('div'); c.className='center';
    const b=document.createElement('button'); b.className='btn'; b.textContent='✦ Sellar el banco';
    b.onclick=(ev)=>{
      const items=ej.items||[];
      const nOk=items.filter(it=>answers[it.id]===it.answer).length;
      items.forEach((it,ri)=>{
        const row=inp.querySelectorAll('.banked-q')[ri];
        [...row.querySelectorAll('.bopt')].forEach(x=>{
          x.disabled=true;
          if(x.textContent===it.answer) x.classList.add('correct');
          else if(x.getAttribute('aria-checked')==='true') x.classList.add('wrong');
        });
      });
      const frac=items.length?nOk/items.length:0;
      resolve(frac>=0.999, frac>=0.999?null:(nOk+'/'+items.length+' correctas'), ev);
    };
    c.appendChild(b); inp.appendChild(c);

  } else {
    card.innerHTML=html+esc(ej.pregunta||ej.texto||'(tipo no soportado: '+ej.tipo+')');
  }

  function spellInput(respuesta){
    const i=document.createElement('input'); i.className='spell-input'; i.placeholder='Escribe tu hechizo aquí…'; i.autocomplete='off';
    const c=document.createElement('div'); c.className='center';
    const b=document.createElement('button'); b.className='btn'; b.textContent= ctx.mode==='boss'?'☠ Lanzar contra el Espectro':'✦ Lanzar hechizo';
    const grade=(ev)=>{ i.disabled=true; resolve(eq(i.value,respuesta), eq(i.value,respuesta)?null:respuesta, ev); };
    b.onclick=grade; i.onkeydown=e=>{ if(e.key==='Enter') grade(e); };
    c.appendChild(b); inp.appendChild(i); inp.appendChild(c); i.focus();
  }
}

function renderQuest(){
  const ej=EJERCICIOS[qi];
  renderExerciseInto(ej, qi+1, {
    card:$('q-card'), input:$('q-input'), feedback:$('q-feedback'), next:$('q-next'),
    auroraPrefix:'q', mode:'quest', _done:false,
    onResolve(ok){
      if(ok){ questHP--; auroraReact('q',true); $('hpbar-e').classList.add('hit'); }
      else { playerHP--; auroraReact('q',false); $('hpbar-p').classList.add('hit');
        if(playerHP<=0){ playerHP=1; auroraReact('q',false,'La magia de Aurora te levanta: +1 corazón. ¡No te rindas, aprendiz!'); } }
      setTimeout(()=>{ $('hpbar-e').classList.remove('hit'); $('hpbar-p').classList.remove('hit'); },500);
      $('hp-player').style.width=(playerHP/3*100)+'%';
      $('hp-enemy').style.width=Math.max(questHP/EJERCICIOS.length*100,0)+'%';
      $('dots').children[qi].classList.add(ok?'done':'fail');
    }
  });
}
$('q-next').onclick=()=>{ qi++; qi<EJERCICIOS.length?renderQuest():afterQuests(); };

function afterQuests(){
  if(F.listening && F.listening.guion && F.listening.guion.length){ buildListening(); go('s-listening'); }
  else if(F.reading && F.reading.texto){ buildReading(); go('s-reading'); }
  else startBoss();
}

/* ================= LISTENING ================= */
let listenGraded=false;
function buildListening(){
  const L=F.listening, box=$('transcript'); box.innerHTML='';
  const gaps=(L.gaps||[]).slice();
  const lines=L.guion.map(ln=>{
    const m=ln.match(/^([^:]+):\s*(.*)$/);
    return { who:m?m[1]:'', text:m?m[2]:ln };
  });
  /* ocultar gaps: primera aparición de cada palabra → input inline */
  const gapInputs=[];
  lines.forEach((ln,i)=>{
    const d=document.createElement('div'); d.className='tline'; d.id='tl-'+i;
    let html=esc(ln.text);
    gaps.forEach(g=>{
      const re=new RegExp('\\b'+g.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i');
      if(re.test(html)){
        html=html.replace(re,'§GAP§');
        gaps.splice(gaps.indexOf(g),1);
        gapInputs.push(g);
      }
    });
    const parts=html.split('§GAP§');
    let final='';
    parts.forEach((p,pi)=>{ final+=p; if(pi<parts.length-1) final+='<input type="text" data-ans="'+esc(gapInputs[gapInputs.length-1])+'" autocomplete="off">'; });
    d.innerHTML=(ln.who?'<b>'+esc(ln.who.toUpperCase())+':</b> ':'')+final;
    box.appendChild(d);
  });
  /* comprensión */
  const comp=$('listen-comp'); comp.innerHTML='';
  (L.comprension||[]).forEach((c,ci)=>{
    const h=document.createElement('p'); h.style.cssText='margin:16px 0 6px; font-size:1.1rem';
    h.textContent=(ci+1)+'. '+c.pregunta; comp.appendChild(h);
    const box2=document.createElement('div'); box2.className='options';
    c.opciones.forEach((o,i)=>{
      const b=document.createElement('button'); b.className='opt'; b.textContent=o;
      b.style.animationDelay=(i*0.08)+'s';
      b.onclick=()=>{ [...box2.children].forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); b.style.borderColor='var(--gold)'; };
      box2.appendChild(b);
    });
    comp.appendChild(box2);
    comp.children[comp.children.length-1].dataset.respuesta=c.respuesta;
  });

  /* audio: mp3 real con 'ended'; si falla → speechSynthesis con utterance.onend. NUNCA setTimeout. */
  let playing=false, cancelled=false;
  $('btn-play').onclick=()=>{
    if(playing){ cancelled=true; speechSynthesis.cancel(); playing=false; $('btn-play').textContent='▶ Invocar las voces';
      document.querySelectorAll('.tline').forEach(x=>x.classList.remove('speaking')); return; }
    playing=true; cancelled=false; $('btn-play').textContent='⏸ Silenciar las voces';
    playLine(0);
  };
  function playLine(i){
    if(cancelled || i>=lines.length){ playing=false; $('btn-play').textContent='▶ Invocar las voces';
      document.querySelectorAll('.tline').forEach(x=>x.classList.remove('speaking')); return; }
    document.querySelectorAll('.tline').forEach(x=>x.classList.remove('speaking'));
    const el=$('tl-'+i); if(el) el.classList.add('speaking');
    const plain=lines[i].who?lines[i].who+': '+lines[i].text:lines[i].text;
    const src='audio/'+seq.id+'/'+(i+1)+'.mp3';
    const au=new Audio(src);
    let fellBack=false;
    au.onended=()=>playLine(i+1);
    au.onerror=()=>{ if(!fellBack){ fellBack=true; speak(plain,()=>playLine(i+1)); } };
    const pr=au.play();
    if(pr && pr.catch) pr.catch(()=>{ if(!fellBack){ fellBack=true; speak(plain,()=>playLine(i+1)); } });
  }
  function speak(text,next){
    if(!('speechSynthesis' in window)){ next(); return; }
    const u=new SpeechSynthesisUtterance(text.replace(/§GAP§/g,'…'));
    u.lang='en-US'; u.rate=0.95;
    u.onend=next; u.onerror=next;
    speechSynthesis.speak(u);
  }
}
$('btn-listen-check').onclick=()=>{
  if(listenGraded) return; listenGraded=true;
  let ok=0, total=0;
  document.querySelectorAll('#transcript input').forEach(inp=>{
    total++;
    const good=eq(inp.value,inp.dataset.ans);
    inp.classList.add(good?'ok':'ko'); inp.disabled=true;
    if(good){ ok++; xp+=XP_ITEM; } else inp.value=inp.dataset.ans;
  });
  document.querySelectorAll('#listen-comp .options').forEach(box=>{
    total++;
    const sel=[...box.children].find(b=>b.classList.contains('sel'));
    const good=sel && eq(sel.textContent, box.dataset.respuesta);
    [...box.children].forEach(b=>{ b.disabled=true;
      if(eq(b.textContent,box.dataset.respuesta)) b.classList.add('correct');
      else if(b===sel) b.classList.add('wrong'); });
    if(good){ ok++; xp+=XP_ITEM; }
  });
  const fb=$('l-feedback');
  fb.className='feedback show '+(ok===total?'good':'bad');
  fb.textContent='Oído sellado: '+ok+' de '+total+' aciertos'+(ok===total?' — audición legendaria.':' — las palabras marcadas eran las correctas.');
  auroraReact('l', ok>=Math.ceil(total*0.6));
  $('btn-listen-check').style.display='none';
  $('l-next').style.display='inline-block';
};
$('l-next').onclick=()=>{
  if(F.reading && F.reading.texto){ buildReading(); go('s-reading'); } else startBoss();
};

/* ================= READING ================= */
let readGraded=false;
function buildReading(){
  const R=F.reading;
  $('reading-text').textContent=R.texto;
  const box=$('reading-qs'); box.innerHTML='';
  (R.preguntas||[]).forEach((p,i)=>{
    const row=document.createElement('div'); row.className='tf-row'; row.dataset.respuesta=String(p.respuesta);
    const t=document.createElement('span'); t.textContent=(i+1)+'. '+p.afirmacion; row.appendChild(t);
    const btns=document.createElement('div'); btns.className='tf-btns';
    [['V','true'],['F','false']].forEach(([label,v])=>{
      const b=document.createElement('button'); b.className='tf-btn'; b.textContent=label==='V'?'✦ Verdadero':'✦ Falso';
      b.dataset.v=v;
      b.onclick=()=>{ [...btns.children].forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); };
      btns.appendChild(b);
    });
    row.appendChild(btns); box.appendChild(row);
  });
}
$('btn-read-check').onclick=()=>{
  if(readGraded) return; readGraded=true;
  let ok=0, total=0;
  document.querySelectorAll('#reading-qs .tf-row').forEach(row=>{
    total++;
    const sel=row.querySelector('.tf-btn.sel');
    const good=sel && sel.dataset.v===row.dataset.respuesta;
    [...row.querySelectorAll('.tf-btn')].forEach(b=>{
      b.disabled=true;
      if(b.dataset.v===row.dataset.respuesta) b.classList.add('correct');
      else if(b===sel) b.classList.add('wrong');
    });
    if(good){ ok++; xp+=XP_ITEM; }
  });
  const fb=$('r-feedback');
  fb.className='feedback show '+(ok===total?'good':'bad');
  fb.textContent='Lectura sellada: '+ok+' de '+total+' aciertos.';
  $('btn-read-check').style.display='none';
  $('r-next').style.display='inline-block';
};
$('r-next').onclick=()=>startBoss();

/* ================= BOSS (Duelo Final) ================= */
let BOSS_SET=[];
function startBoss(){
  const hard=['transformation','write_opposite','correct_mistake','gap_fill','short_answer_production'];
  BOSS_SET=EJERCICIOS.filter(e=>hard.includes(e.tipo)).slice(0,5);
  if(BOSS_SET.length<5){
    const extra=EJERCICIOS.filter(e=>!BOSS_SET.includes(e)).slice(0,5-BOSS_SET.length);
    BOSS_SET=BOSS_SET.concat(extra);
  }
  bossHP=BOSS_SET.length; bi=0;
  $('boss-name').textContent=BOSS;
  $('boss-sub').textContent=BOSS.charAt(0)+BOSS.slice(1).toLowerCase()+' bloquea el portal. Un solo intento por hechizo — sin pistas.';
  go('s-boss'); renderBoss();
}
function renderBoss(){
  const ej=BOSS_SET[bi];
  renderExerciseInto(ej, bi+1, {
    card:$('b-card'), input:$('b-input'), feedback:$('b-feedback'), next:$('b-next'),
    auroraPrefix:null, mode:'boss', _done:false,
    onResolve(ok){
      if(ok) bossHP--; else playerHP=Math.max(1,playerHP-1);
      $('hp-player-b').style.width=(playerHP/3*100)+'%';
      $('hp-enemy-b').style.width=Math.max(bossHP/BOSS_SET.length*100,0)+'%';
    }
  });
}
$('b-next').onclick=()=>{ bi++; bi<BOSS_SET.length?renderBoss():showResult(); };

/* ================= RESULTADO ================= */
function showResult(){
  go('s-result');
  const listenItems=(F.listening&&F.listening.guion)?((F.listening.gaps||[]).length+(F.listening.comprension||[]).length):0;
  const readItems=(F.reading&&F.reading.preguntas)?F.reading.preguntas.length:0;
  const max=EJERCICIOS.length*XP_QUEST + listenItems*XP_ITEM + readItems*XP_ITEM + BOSS_SET.length*XP_BOSS;
  const prev=esenciaTotal();
  localStorage.setItem('esenciaAurora', prev+xp);
  const bestKey='ea_best_'+seq.id;
  const best=Math.max(parseInt(localStorage.getItem(bestKey)||'0',10), xp);
  localStorage.setItem(bestKey, best);
  pintarEsencia();
  /* contador animado */
  const el=$('xp-earned'); let shown=0;
  const step=Math.max(1,Math.round(xp/40));
  const iv=setInterval(()=>{ shown=Math.min(shown+step,xp);
    el.textContent='+'+shown+' ✦ (de '+max+' posibles)';
    if(shown>=xp) clearInterval(iv); },30);
  $('xp-total').textContent=prev+xp;
  const pct=max?xp/max:0;
  $('rank').textContent = pct>=0.9?'🌟 MAGO DE LAS RUNAS':pct>=0.7?'✦ HECHICERO AVENTURERO':pct>=0.5?'📜 APRENDIZ PROMETEDOR':'🕯 INICIADO — repite la senda';
  $('result-msg').textContent =
    pct>=0.7?'El Espectro se disipa en polvo de estrellas. La senda «'+areaName+'» es tuya, aprendiz. La próxima estrella te espera bajo la aurora.':
    'La senda no se ha sellado del todo. No es una derrota: es el ensayo antes del gran hechizo. Repite la senda y las runas te obedecerán.';
  /* olas disponibles para seguir */
  const rw=$('result-waves'); rw.innerHTML='';
  ['a','b','c'].forEach(w=>{
    if(!availableWaves.includes(w)) return;
    const a=document.createElement('a');
    a.className='wave-pill'+(w===wave?' on':'');
    a.textContent=(w==='a'?'Ola A':w==='b'?'Ola B':'Ola C')+(w===wave?' · sellada':'');
    a.href='senda.html?id='+encodeURIComponent(idxEntry.base)+'&wave='+w;
    rw.appendChild(a);
  });
  const rect=$('xp-earned').getBoundingClientRect();
  sparks(rect.left+rect.width/2, rect.top, '#e8c26a');
}
$('btn-retry').onclick=()=>location.reload();

})();
