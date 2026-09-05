import json
import re

with open(r"c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\leccion\b1-adverbs-01.html", 'r', encoding='utf-8') as f:
    content = f.read()

json_str = re.search(r'window\.SEQUENCE_DATA\s*=\s*(\{.*?\});</script>', content, re.DOTALL).group(1)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>English Aurora — Lesson RPG Prototype</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@600&display=swap" rel="stylesheet">
<style>
  :root{{
    --ink:#0A101C;
    --dawn:#22384A;
    --teal:#2DD4BF;
    --teal-dim:rgba(45,212,191,.55);
    --gold:#F2C14E;
    --paper:#F2F5F7;
    --muted:#8B99AE;
    --serif:'Source Serif 4',Georgia,serif;
    --sans:'IBM Plex Sans',system-ui,sans-serif;
    --mono:'IBM Plex Mono',monospace;
    --hand:'Caveat',cursive;
    --e-fluid:cubic-bezier(.22,1,.36,1);
    
    --danger:#e05d5d; --ok:#57d98a;
  }}
  *{{box-sizing:border-box; margin:0; padding:0}}
  body{{
    font-family:var(--sans); color:var(--paper);
    background:var(--ink); min-height:100vh; overflow-x:hidden;
  }}
  .sky{{position:fixed; inset:0; z-index:-2; background:linear-gradient(180deg,#070b18 0%, #0A101C 40%, #0d2233 100%);}}
  .aurora-bg{{position:fixed; inset:-20% -10% auto -10%; height:70%; z-index:-1; opacity:.55;
    background: radial-gradient(ellipse 60% 40% at 20% 30%, rgba(45,212,191,.35), transparent 60%), radial-gradient(ellipse 50% 35% at 70% 20%, rgba(129,92,216,.28), transparent 60%), radial-gradient(ellipse 55% 45% at 45% 45%, rgba(87,217,138,.22), transparent 65%);
    filter:blur(30px); animation:auroraMove 14s ease-in-out infinite alternate;}}
  @keyframes auroraMove{{from{{transform:translateX(-3%) skewX(-4deg)}} to{{transform:translateX(3%) skewX(4deg)}}}}
  .stars{{position:fixed; inset:0; z-index:-1; pointer-events:none}}
  .star{{position:absolute; width:2px; height:2px; background:#fff; border-radius:50%; animation:twinkle 3s ease-in-out infinite}}
  @keyframes twinkle{{0%,100%{{opacity:.2}} 50%{{opacity:.9}}}}

  .wrap{{max-width:820px; margin:0 auto; padding:80px 16px 80px; position:relative; z-index:10;}}
  .screen{{display:none; animation:fadeIn .5s ease}}
  .screen.active{{display:block}}
  @keyframes fadeIn{{from{{opacity:0; transform:translateY(12px)}} to{{opacity:1; transform:none}}}}

  .brand{{font-family:var(--hand); font-size:36px; color:var(--gold); text-shadow:0 0 26px rgba(242,193,78,.45); text-align:center; margin-bottom:24px;}}
  
  .top-bar {{position:fixed; top:20px; right:28px; display:flex; gap:12px; z-index:100;}}
  .top-bar a {{font-family:var(--mono); font-size:11.5px; letter-spacing:.16em; text-transform:uppercase; text-decoration:none; color:var(--teal); border:1px solid var(--teal-dim); border-radius:4px; padding:10px 20px; background:rgba(45,212,191,.05); transition:all .35s var(--e-fluid);}}
  .top-bar a:hover {{border-color:var(--teal); box-shadow:0 0 22px rgba(45,212,191,.35), inset 0 0 14px rgba(45,212,191,.1); text-shadow:0 0 8px rgba(45,212,191,.6); transform:translateY(-1px);}}
  .top-bar a.on {{color:var(--gold); border-color:rgba(242,193,78,.55); background:rgba(242,193,78,.05);}}
  .top-bar a.on:hover {{border-color:var(--gold); box-shadow:0 0 22px rgba(242,193,78,.35); text-shadow:0 0 8px rgba(242,193,78,.6);}}

  /* Usando el estilo "card" del landing */
  .rpg-frame{{
    background:rgba(13,22,34,.85); border:1px solid rgba(242,193,78,.35); border-radius:18px;
    padding:40px 32px; backdrop-filter:blur(14px); box-shadow:0 30px 90px rgba(0,0,0,.6); position:relative;
  }}

  /* Botones principales tipo .btn-hud gold pero sólidos */
  .btn{{font-family:var(--mono); font-size:13px; letter-spacing:.16em; text-transform:uppercase; cursor:pointer; background:rgba(242,193,78,.15); color:var(--gold); border:1px solid rgba(242,193,78,.6); border-radius:6px; padding:12px 30px; transition:all .3s var(--e-fluid); box-shadow:0 4px 14px rgba(0,0,0,.3);}}
  .btn:hover{{background:rgba(242,193,78,.25); border-color:var(--gold); box-shadow:0 0 22px rgba(242,193,78,.4); text-shadow:0 0 8px rgba(242,193,78,.6); transform:translateY(-2px);}}
  .btn:active{{transform:translateY(1px);}}
  .btn:disabled{{opacity:.45; cursor:not-allowed; transform:none}}
  .center{{text-align:center; margin-top:26px}}

  h2{{font-family:var(--serif); font-weight:600; font-size:32px; line-height:1.2; color:var(--gold);}}
  p.main-desc{{font-family:var(--serif); font-size:18px; color:var(--muted); line-height:1.6;}}

  table.rune{{width:100%; border-collapse:collapse; margin-top:24px; font-family:var(--serif); font-size:16px; line-height:1.5;}}
  table.rune th{{font-family:var(--mono); color:var(--gold); background:rgba(242,193,78,.08); padding:12px; border:1px solid rgba(242,193,78,.3); font-size:11px; letter-spacing:.15em; text-transform:uppercase;}}
  table.rune td{{padding:14px; border:1px solid rgba(242,193,78,.2); color:var(--paper)}}
  table.rune td:first-child{{font-family:var(--mono); color:var(--teal); font-weight:500; text-align:center; font-size:14px;}}

  .dialogue-line{{padding:16px 20px; border-left:3px solid var(--teal); margin:16px 0; background:rgba(45,212,191,.06); border-radius:0 8px 8px 0; font-family:var(--serif); font-size:18px; line-height:1.6;}}
  .dialogue-line b{{color:var(--teal); font-family:var(--mono); font-size:11.5px; letter-spacing:.12em; text-transform:uppercase; display:block; margin-bottom:6px;}}
  .dialogue-line strong{{color:var(--gold); font-weight:600;}}

  .duel-hud{{display:flex; justify-content:space-between; align-items:center; gap:14px; margin-bottom:20px; padding:0 20px;}}
  .combatant{{flex:1; text-align:center}}
  .combatant .name{{font-family:var(--mono); font-size:11px; letter-spacing:.16em; color:var(--gold); text-transform:uppercase; margin-bottom:8px;}}
  .hpbar{{height:14px; border:1px solid rgba(242,193,78,.5); border-radius:7px; overflow:hidden; background:rgba(10,16,28,.8);}}
  .hpbar .fill{{height:100%; transition:width .5s ease}}
  .hpbar.player .fill{{background:linear-gradient(90deg,var(--teal-dim),var(--teal))}}
  .hpbar.enemy .fill{{background:linear-gradient(90deg,#7a1d1d,var(--danger))}}
  .vs{{font-family:var(--hand); color:var(--teal); font-size:24px; text-shadow:0 0 12px var(--teal); opacity:0.8;}}

  .quest-card{{font-family:var(--serif); font-size:22px; line-height:1.5; text-align:center; padding:10px 0 16px}}
  .quest-card .qtype{{font-family:var(--mono); font-size:11px; letter-spacing:.2em; color:var(--teal); text-transform:uppercase; display:block; margin-bottom:14px}}
  .options{{display:flex; flex-direction:column; gap:12px; margin-top:20px}}
  .opt{{font-family:var(--serif); font-size:18px; cursor:pointer; color:var(--paper); background:rgba(45,212,191,.05); border:1px solid var(--teal-dim); border-radius:8px; padding:14px 20px; transition:all .25s var(--e-fluid); text-align:left; position:relative;}}
  .opt:hover{{background:rgba(45,212,191,.15); border-color:var(--teal); box-shadow:0 0 15px rgba(45,212,191,.2); transform:translateY(-2px);}}
  .opt.correct{{background:rgba(87,217,138,.15); border-color:var(--ok); color:#c9f5dd; box-shadow:0 0 20px rgba(87,217,138,.3);}}
  .opt.wrong{{background:rgba(224,93,93,.15); border-color:var(--danger); color:#f5c9c9}}
  .opt .check-icon{{position:absolute; right:16px; top:50%; transform:translateY(-50%); font-family:var(--sans); font-size:20px; font-weight:bold; display:none;}}
  .opt.correct .check-icon{{display:block; color:var(--ok);}}
  .opt.wrong .check-icon{{display:block; color:var(--danger);}}

  .spell-input{{width:100%; font-family:var(--serif); font-size:20px; color:var(--paper); background:rgba(10,16,28,.8); border:1px solid var(--teal-dim); border-radius:8px; padding:16px 20px; margin-top:18px; transition:all .3s;}}
  .spell-input:focus{{outline:none; border-color:var(--teal); box-shadow:0 0 18px rgba(45,212,191,.3)}}
  
  .chips{{display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:20px}}
  .chip-word{{font-family:var(--sans); font-size:16px; cursor:pointer; color:var(--ink); background:var(--paper); border:1px solid rgba(255,255,255,.5); border-radius:6px; padding:10px 18px; transition:all .2s;}}
  .chip-word:hover{{transform:translateY(-2px); box-shadow:0 4px 12px rgba(255,255,255,.2);}}
  .chip-word.used{{opacity:.3; pointer-events:none; transform:none;}}
  .answer-line{{min-height:54px; border-bottom:2px dashed rgba(242,193,78,.5); margin-top:16px; font-family:var(--serif); font-size:22px; color:var(--gold); text-align:center; padding:8px}}
  
  .feedback{{margin-top:24px; padding:16px 20px; border-radius:8px; font-size:16px; display:none; font-family:var(--sans); text-align:center; position:relative;}}
  .feedback.show{{display:block; animation:fadeIn .3s}}
  .feedback.good{{background:rgba(87,217,138,.1); border:1px solid var(--ok); color:#c9f5dd; box-shadow:0 0 20px rgba(87,217,138,.2);}}
  .feedback.bad{{background:rgba(224,93,93,.1); border:1px solid var(--danger); color:#f5c9c9; box-shadow:0 0 20px rgba(224,93,93,.2);}}
  
  .xp-tag{{font-family:var(--mono); color:var(--ink); background:var(--gold); border-radius:20px; padding:6px 18px; display:inline-block; font-size:12px; letter-spacing:.1em}}
  .progress-dots{{display:flex; gap:8px; justify-content:center; margin:18px 0}}
  .dot{{width:10px; height:10px; border-radius:50%; border:1px solid rgba(242,193,78,.5); background:transparent; transition:all .3s;}}
  .dot.done{{background:var(--teal); border-color:var(--teal); box-shadow:0 0 12px var(--teal)}}
  .boss-title{{color:var(--danger); text-shadow:0 0 22px rgba(224,93,93,.6); font-size:36px; text-align:center; margin-bottom:16px;}}
  .rank{{font-family:var(--serif); font-weight:600; font-size:42px; color:var(--gold); text-shadow:0 0 30px rgba(242,193,78,.4); margin-bottom:24px;}}

  /* ---------- Aurora: Avatar Guide ---------- */
  .aurora{{position:fixed; left:26px; bottom:0; z-index:90; display:flex; align-items:flex-end; gap:0; transition:all .8s var(--e-fluid);}}
  .aurora.hidden{{transform:translateX(-150%) scale(0.8); opacity:0; pointer-events:none;}}
  .aurora img{{height:min(38vh, 340px); filter:drop-shadow(0 0 34px rgba(45,212,191,.28)); animation:floaty 5.5s ease-in-out infinite; transition:opacity .38s ease;}}
  @keyframes floaty{{0%,100%{{transform:translateY(0)}} 50%{{transform:translateY(-9px)}}}}
  
  .bubble{{position:relative; margin:0 0 190px -34px; max-width:290px; background:rgba(13,22,34,.95); border:1px solid rgba(45,212,191,.3); border-radius:14px; padding:16px 20px; font-family:var(--serif); font-size:16px; line-height:1.5; color:var(--paper); backdrop-filter:blur(10px); box-shadow:0 14px 44px rgba(0,0,0,.6);}}
  .bubble::before{{content:''; position:absolute; left:-8px; bottom:26px; width:16px; height:16px; background:inherit; border-left:1px solid rgba(45,212,191,.3); border-bottom:1px solid rgba(45,212,191,.3); transform:rotate(45deg);}}
  .bubble b{{color:var(--teal)}}
  .bubble em{{color:var(--gold); font-style:normal;}}
  .bubble .who{{display:flex; justify-content:space-between; align-items:center; font-family:var(--mono); font-size:9.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:8px;}}
  
  .toggle-aurora{{position:fixed; bottom:24px; left:26px; z-index:99; background:rgba(45,212,191,.05); border:1px solid var(--teal-dim); color:var(--teal); font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; padding:10px 16px; border-radius:6px; cursor:pointer; opacity:0; pointer-events:none; transition:all 0.4s var(--e-fluid); backdrop-filter:blur(6px);}}
  .toggle-aurora.show{{opacity:1; pointer-events:auto;}}
  .toggle-aurora:hover{{background:rgba(45,212,191,.15); border-color:var(--teal); box-shadow:0 0 22px rgba(45,212,191,.35);}}
  
</style>
</head>
<body>
<div class="sky"></div><div class="aurora-bg"></div><div class="stars" id="stars"></div>

<div class="top-bar">
  <a href="#" id="tab-a" class="on" onclick="switchWave('A')">Lesson A</a>
  <a href="#" id="tab-b" onclick="switchWave('B')">Lesson B</a>
  <a href="#" id="tab-c" onclick="switchWave('C')">Lesson C</a>
</div>

<!-- Aurora Avatar Guide -->
<div class="aurora" id="aurora-guide">
  <img id="aurora-img" src="assets/aurora-explicando.png" alt="Aurora, tu guía">
  <div class="bubble">
    <div class="who">
      <span>Aurora · tu guía</span>
      <span style="cursor:pointer; color:var(--muted); font-size:14px; line-height:1; font-family:var(--sans);" onclick="toggleAurora()" title="Hide Aurora">✕</span>
    </div>
    <span id="bubble-txt">Welcome to EnglishAngel. Follow my lead to master this path!</span>
  </div>
</div>
<button class="toggle-aurora" id="btn-toggle-aurora" onclick="toggleAurora()">👁 SHOW AURORA</button>

<div class="wrap">
  <div class="brand">EnglishAngel</div>
  <div id="app"></div>
</div>

<script>
  try {{
    window.SEQUENCE_DATA = {json_str};
    const BASE_D = window.SEQUENCE_DATA;
    let currentWave = 'A';
    
    // Generador de variaciones para simular B y C con diferentes contextos y vocabulario
    function getWaveData(wave) {{
      let D = JSON.parse(JSON.stringify(BASE_D));
      if (wave === 'A') return D;
      
      if (wave === 'B') {{
        D.tema = "Adverbs of Manner — beautifully, silently, nervously";
        D.fases.inicio.definicion_pragmatica = "In Wave B, we explore adverbs used in emotional and careful situations. Notice how they change the feeling of the action.";
        D.fases.inicio.interaccion = [
          "Sofía: I speak **softly** during the presentation, but I listen **intently**. Two adverbs, one focused designer.",
          "Ben: I waited **nervously**. The clients looked at me **suspiciously**. It was a nightmare.",
          "Kenji: You handled it **beautifully**, Ben. They eventually smiled **warmly**.",
          "Abuela Carmen: And I always cook **patiently**. The best arepas are made **slowly**."
        ];
        // Custom quests for B
        D.fases.practica.ejercicios = [
          {{tipo: "multiple_choice", pregunta: "She speaks ___.", opciones: ["softly", "soft", "softness"], respuesta: "softly"}},
          {{tipo: "multiple_choice", pregunta: "Ben waited ___.", opciones: ["nervous", "nervously", "nerve"], respuesta: "nervously"}},
          {{tipo: "multiple_choice", pregunta: "They looked at him ___.", opciones: ["suspicious", "suspicion", "suspiciously"], respuesta: "suspiciously"}},
          {{tipo: "true_false", afirmacion: "Adverbs tell us HOW an action is done.", respuesta: "true"}},
          {{tipo: "gap_fill", texto: "You handled it ___ (beautiful).", respuesta: "beautifully"}},
          {{tipo: "unscramble", palabras: ["I", "listened", "intently", "to", "her"], respuesta: "I listened intently to her"}},
          {{tipo: "correct_mistake", texto_con_error: "She sings beautiful.", respuesta: "She sings beautifully."}},
          {{tipo: "transformation", oracion_base: "He waited nervously.", instruccion: "Write the negative form.", respuesta: "He didn't wait nervously."}},
          {{tipo: "write_opposite", oracion_base: "He works carefully.", instruccion: "Write the opposite (use 'carelessly').", respuesta: "He works carelessly."}},
          {{tipo: "short_answer_production", pregunta: "Did they smile warmly? (short answer)", respuesta: "Yes, they did."}},
          // BOSS (Last 3)
          {{tipo: "gap_fill", texto: "Abuela Carmen cooks ___ (patient).", respuesta: "patiently"}},
          {{tipo: "correct_mistake", texto_con_error: "They smiled warm.", respuesta: "They smiled warmly."}},
          {{tipo: "unscramble", palabras: ["the", "best", "arepas", "are", "made", "slowly"], respuesta: "The best arepas are made slowly"}}
        ];
      }}
      
      if (wave === 'C') {{
        D.tema = "Adverbs of Manner — seriously, honestly & Advanced Contexts";
        D.fases.inicio.definicion_pragmatica = "Wave C pushes your boundaries. We use adverbs to express attitude, honesty, and extreme situations.";
        D.fases.inicio.interaccion = [
          "Sofía: I **honestly** didn't know about the deadline. I am working **frantically**.",
          "Ben: I take deadlines **seriously**. I missed it **completely**.",
          "Kenji: We must proceed **cautiously**. The boss is looking at us **angrily**.",
          "Abuela Carmen: Just apologize **sincerely**. And bring him an arepa **quickly**."
        ];
        D.fases.practica.ejercicios = [
          {{tipo: "multiple_choice", pregunta: "I ___ didn't know.", opciones: ["honest", "honestly", "honesty"], respuesta: "honestly"}},
          {{tipo: "multiple_choice", pregunta: "She is working ___.", opciones: ["frantic", "frantically", "frantical"], respuesta: "frantically"}},
          {{tipo: "multiple_choice", pregunta: "I take deadlines ___.", opciones: ["serious", "seriously", "seriousness"], respuesta: "seriously"}},
          {{tipo: "true_false", afirmacion: "Adverbs can modify verbs, adjectives, or other adverbs.", respuesta: "true"}},
          {{tipo: "gap_fill", texto: "I missed it ___ (complete).", respuesta: "completely"}},
          {{tipo: "unscramble", palabras: ["we", "must", "proceed", "cautiously"], respuesta: "We must proceed cautiously"}},
          {{tipo: "correct_mistake", texto_con_error: "He looked at us angry.", respuesta: "He looked at us angrily."}},
          {{tipo: "transformation", oracion_base: "She apologized sincerely.", instruccion: "Write the negative form.", respuesta: "She didn't apologize sincerely."}},
          {{tipo: "write_opposite", oracion_base: "He spoke loudly.", instruccion: "Write the opposite (use 'quietly').", respuesta: "He spoke quietly."}},
          {{tipo: "short_answer_production", pregunta: "Did you finish completely? (short answer, No)", respuesta: "No, I didn't."}},
          // BOSS
          {{tipo: "gap_fill", texto: "Bring him an arepa ___ (quick).", respuesta: "quickly"}},
          {{tipo: "correct_mistake", texto_con_error: "I honest didn't know.", respuesta: "I honestly didn't know."}},
          {{tipo: "unscramble", palabras: ["she", "apologized", "sincerely", "to", "him"], respuesta: "She apologized sincerely to him"}}
        ];
      }}
      return D;
    }}

    let QUESTS = [];
    let BOSS = [];
    let CURRENT_D = null;

    // Avatar Logic
    let auroraVisible = true;
    window.toggleAurora = function() {{
      auroraVisible = !auroraVisible;
      if (auroraVisible) {{
        document.getElementById('aurora-guide').classList.remove('hidden');
        document.getElementById('btn-toggle-aurora').classList.remove('show');
      }} else {{
        document.getElementById('aurora-guide').classList.add('hidden');
        document.getElementById('btn-toggle-aurora').classList.add('show');
      }}
    }}
    
    window.say = function(txt, emotion) {{
      document.getElementById('bubble-txt').innerHTML = txt;
      let img = 'assets/aurora.png';
      if (emotion === 'explain') img = 'assets/aurora-explicando.png';
      else if (emotion === 'correct') img = 'assets/aurora-corrigiendo.png';
      else if (emotion === 'celebrate') img = 'assets/aurora-celebrando.png';
      document.getElementById('aurora-img').src = img;
    }}

    window.switchWave = function(wave) {{
      document.getElementById('tab-a').className = wave === 'A' ? 'on' : '';
      document.getElementById('tab-b').className = wave === 'B' ? 'on' : '';
      document.getElementById('tab-c').className = wave === 'C' ? 'on' : '';
      currentWave = wave;
      
      CURRENT_D = getWaveData(wave);
      const all_ex = CURRENT_D.fases.practica.ejercicios;
      
      if(wave === 'A') {{
        QUESTS = all_ex.slice(0, 10);
        BOSS = all_ex.slice(10);
      }} else {{
        QUESTS = all_ex.slice(0, 10);
        BOSS = all_ex.slice(10);
      }}
      
      // Reset progress
      qi=0; bi=0; xp=0; playerHP=3; enemyHP=QUESTS.length; bossHP=BOSS.length;
      
      renderIntro();
      go('s-intro');
      say(`Welcome to Wave ${{currentWave}}. Let's master: <em>${{CURRENT_D.tema}}</em>`, 'explain');
    }}
    
    const esc = s => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    
    function renderIntro() {{
      let interaccionHTML = (CURRENT_D.fases.inicio.interaccion || []).map(l => {{
        let p = l.split(': ');
        return `<div class="dialogue-line"><b>${{esc(p[0])}}</b> ${{esc(p[1])}}</div>`;
      }}).join('');

      let tabla = CURRENT_D.fases.inicio.tabla;
      let tableHTML = '';
      if (tabla) {{
        tableHTML = `<h3 style="color:var(--gold); margin-top:36px; margin-bottom:12px; font-size:20px;">Runic Table: ${{esc(tabla.titulo)}}</h3><table class="rune"><tr>` +
          tabla.encabezados.map(h => `<th>${{esc(h)}}</th>`).join('') + `</tr>` +
          tabla.filas.map(row => `<tr>` + row.map(cell => `<td>${{esc(cell)}}</td>`).join('') + `</tr>`).join('') +
          `</table>`;
      }}

      const html_intro = `
        <section class="screen active" id="s-intro">
          <div class="rpg-frame" style="text-align:center; padding-top:60px; padding-bottom:60px;">
            <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
            <p style="font-family:var(--mono); color:var(--teal); font-size:12px; letter-spacing:.2em; text-transform:uppercase; margin-bottom:10px;">Path ${{CURRENT_D.nivel}} · Wave ${{currentWave}}</p>
            <h2 style="margin-bottom:24px;">${{esc(CURRENT_D.tema)}}</h2>
            <p class="main-desc" style="max-width:640px; margin:0 auto 36px;">${{esc(CURRENT_D.fases.inicio.definicion_pragmatica)}}</p>
            <p style="font-family:var(--mono); text-transform:uppercase; font-size:11px; letter-spacing:.1em; color:var(--muted); margin-bottom:24px;">Council → Exercises → <span style="color:var(--danger)">Test</span></p>
            <button class="btn" onclick="startLesson()">Enter the Academy</button>
          </div>
        </section>
      `;

      const html_lesson = `
        <section class="screen" id="s-lesson">
          <div class="rpg-frame">
            <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
            <h2 style="margin-bottom:8px;">Chapter I — The Council of Travelers</h2>
            <p class="main-desc" style="margin-bottom:24px;">Listen carefully to the conversation before moving forward.</p>
            ${{interaccionHTML}}
            ${{tableHTML}}
            <div class="center" style="margin-top:40px;"><button class="btn" onclick="startQuests()">Begin Exercises</button></div>
          </div>
        </section>
      `;

      const html_quests = `
        <section class="screen" id="s-quest">
          <div class="duel-hud">
            <div class="combatant"><div class="name">You</div><div class="hpbar player"><div class="fill" id="hp-player" style="width:100%"></div></div></div>
            <div class="vs">VS</div>
            <div class="combatant"><div class="name">Goblin</div><div class="hpbar enemy"><div class="fill" id="hp-enemy" style="width:100%"></div></div></div>
          </div>
          <div class="progress-dots" id="dots"></div>
          <div class="rpg-frame">
            <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
            <div class="quest-card" id="q-card"></div>
            <div id="q-input"></div>
            <div class="feedback" id="q-feedback"></div>
            <div class="center"><button class="btn" id="q-next" style="display:none" onclick="nextQuest()">Next</button></div>
          </div>
        </section>
      `;

      const html_boss = `
        <section class="screen" id="s-boss">
          <h2 class="boss-title">FINAL TEST</h2>
          <div class="duel-hud">
            <div class="combatant"><div class="name">You</div><div class="hpbar player"><div class="fill" id="hp-player-b" style="width:100%"></div></div></div>
            <div class="vs">VS</div>
            <div class="combatant"><div class="name">Specter</div><div class="hpbar enemy"><div class="fill" id="hp-enemy-b" style="width:100%"></div></div></div>
          </div>
          <div class="rpg-frame">
            <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
            <div class="quest-card" id="b-card"></div>
            <div id="b-input"></div>
            <div class="feedback" id="b-feedback"></div>
            <div class="center"><button class="btn" id="b-next" style="display:none" onclick="nextBoss()">Finish Test</button></div>
          </div>
        </section>
      `;

      const html_res = `
        <section class="screen" id="s-result">
          <div class="rpg-frame" style="text-align:center; padding:70px 30px;">
            <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
            <h2 style="font-size:38px; margin-bottom:24px;">WAVE COMPLETED</h2>
            <p class="rank" id="xp-earned"></p>
            <div class="center"><button class="btn" onclick="switchWave(currentWave === 'A' ? 'B' : (currentWave === 'B' ? 'C' : 'A'))">Proceed to Next Wave</button></div>
          </div>
        </section>
      `;

      document.getElementById('app').innerHTML = html_intro + html_lesson + html_quests + html_boss + html_res;
    }}

    /* Stars */
    const stars=document.getElementById('stars');
    for(let i=0;i<90;i++){{const s=document.createElement('div');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.animationDelay=(Math.random()*4)+'s';s.style.opacity=Math.random()*.7+.2;stars.appendChild(s);}}

    let qi=0, bi=0, xp=0, playerHP=3, enemyHP=0, bossHP=0;
    const norm=s=>s.toLowerCase().trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
    const AURORA_GOOD=['Perfect spell!', 'The goblin retreats!', 'Excellent!', 'You are a natural!'];
    const AURORA_BAD=['The spell failed... try again!', 'Not quite!', 'Remember the rules...', 'Careful with your grammar!'];

    window.go = function(id){{document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0);}}
    
    window.startLesson = function() {{
      go('s-lesson');
      say(`Read the council carefully. Notice how the adverbs are used!`, 'explain');
    }}

    window.startQuests = function(){{
      const dots=document.getElementById('dots');
      dots.innerHTML = '';
      QUESTS.forEach(()=>{{const d=document.createElement('div');d.className='dot';dots.appendChild(d);}});
      go('s-quest'); 
      say(`It's time to practice! Defeat the goblin by answering correctly.`, 'explain');
      renderQuest();
    }}

    function renderQuest(){{
      const q=QUESTS[qi];
      document.getElementById('q-feedback').className='feedback';
      document.getElementById('q-next').style.display='none';
      const card=document.getElementById('q-card'), inp=document.getElementById('q-input');
      
      let text = q.pregunta || q.afirmacion || q.texto || q.texto_con_error || q.oracion_base || '';
      card.innerHTML=`<span class="qtype">EXERCISE ${{qi+1}}</span>${{text.replace(/___/g, '_____')}}`;
      if(q.instruccion) card.innerHTML += `<br><small style="color:var(--muted); font-size:16px;">(${{q.instruccion}})</small>`;

      inp.innerHTML='';
      if(q.tipo==='multiple_choice'){{
        const box=document.createElement('div');box.className='options';
        q.opciones.forEach(o=>{{
          const b=document.createElement('button');b.className='opt';
          b.innerHTML=`${{o}} <span class="check-icon"></span>`;
          b.onclick=()=>{{
            [...box.children].forEach(c=>c.disabled=true);
            const ok=o===q.respuesta; b.classList.add(ok?'correct':'wrong');
            b.querySelector('.check-icon').textContent = ok ? '✔' : '✘';
            if(!ok) {{
              const correctBtn = [...box.children].find(c=>c.textContent.trim()===q.respuesta);
              if(correctBtn) {{
                correctBtn.classList.add('correct');
                correctBtn.querySelector('.check-icon').textContent = '✔';
              }}
            }}
            resolveQuest(ok, q.respuesta);
          }};
          box.appendChild(b);
        }});
        inp.appendChild(box);
      }} else if(q.tipo==='true_false'){{
        const box=document.createElement('div');box.className='options';
        [['True', 'true'],['False', 'false']].forEach(([t,v])=>{{
          const b=document.createElement('button');b.className='opt';
          b.innerHTML=`${{t}} <span class="check-icon"></span>`;
          b.onclick=()=>{{
            [...box.children].forEach(c=>c.disabled=true);
            const ok=v===q.respuesta; b.classList.add(ok?'correct':'wrong');
            b.querySelector('.check-icon').textContent = ok ? '✔' : '✘';
            if(!ok) {{
              const correctBtn = [...box.children].find(c=>c.textContent.trim()=== (q.respuesta==='true'?'True':'False'));
              if(correctBtn) {{
                correctBtn.classList.add('correct');
                correctBtn.querySelector('.check-icon').textContent = '✔';
              }}
            }}
            resolveQuest(ok, q.respuesta);
          }};
          box.appendChild(b);
        }});
        inp.appendChild(box);
      }} else if(q.tipo==='unscramble'){{
        const line=document.createElement('div');line.className='answer-line';line.textContent='...';
        const chips=document.createElement('div');chips.className='chips';let picked=[];
        q.palabras.forEach(w=>{{const c=document.createElement('button');c.className='chip-word';c.textContent=w;
          c.onclick=()=>{{c.classList.add('used');picked.push(w);line.textContent=picked.join(' ');
            if(picked.length===q.palabras.length)resolveQuest(norm(picked.join(' '))===norm(q.respuesta),q.respuesta);}};
          chips.appendChild(c);}});
        inp.appendChild(line);inp.appendChild(chips);
      }} else {{
        const i=document.createElement('input');i.className='spell-input';i.placeholder='Write your answer...';
        const c=document.createElement('div');c.className='center';
        const b=document.createElement('button');b.className='btn';b.textContent='Submit';
        b.onclick=()=>resolveQuest(norm(i.value)===norm(q.respuesta),q.respuesta);
        i.onkeydown=e=>{{if(e.key==='Enter')b.click();}};
        c.appendChild(b);inp.appendChild(i);inp.appendChild(c);i.focus();
      }}
    }}

    window.resolveQuest = function(ok,expected){{
      const fb=document.getElementById('q-feedback');
      if(ok){{xp+=10;enemyHP--;fb.className='feedback show good';fb.innerHTML='<b>✔ +10 Essence</b>';
        say(AURORA_GOOD[Math.floor(Math.random()*AURORA_GOOD.length)], 'celebrate');}}
      else{{playerHP--;fb.className='feedback show bad';
        fb.innerHTML=`<b>✘ Failed.</b> Correct: "${{expected}}".`;
        say(AURORA_BAD[Math.floor(Math.random()*AURORA_BAD.length)], 'correct');
        if(playerHP<=0){{playerHP=1;say('I will revive you, but be careful!', 'explain');}}}}
      document.getElementById('hp-player').style.width=(playerHP/3*100)+'%';
      document.getElementById('hp-enemy').style.width=(enemyHP/QUESTS.length*100)+'%';
      document.getElementById('dots').children[qi].classList.add('done');
      document.getElementById('q-next').style.display='inline-block';
    }}

    window.nextQuest = function(){{qi++; qi<QUESTS.length?renderQuest():(go('s-boss'),say('The final test is here! Prove your worth against the Specter.', 'explain'),renderBoss());}}

    function renderBoss(){{
      const q=BOSS[bi];
      document.getElementById('b-feedback').className='feedback';
      document.getElementById('b-next').style.display='none';
      let text = q.pregunta || q.afirmacion || q.texto || q.texto_con_error || q.oracion_base || '';
      document.getElementById('b-card').innerHTML=`<span class="qtype">TEST QUESTION ${{bi+1}}</span>${{text}}`;
      const inp=document.getElementById('b-input');inp.innerHTML='';
      const i=document.createElement('input');i.className='spell-input';i.placeholder='Final answer...';
      const c=document.createElement('div');c.className='center';
      const b=document.createElement('button');b.className='btn';b.textContent='Submit Test';
      b.onclick=()=>{{const ok=norm(i.value)===norm(q.respuesta);const fb=document.getElementById('b-feedback');
        if(ok){{xp+=20;bossHP--;fb.className='feedback show good';fb.innerHTML='<b>✔ +20 Essence</b>';say('Excellent work! Specter takes a hit.', 'celebrate');}}
        else{{playerHP=Math.max(1,playerHP-1);fb.className='feedback show bad';fb.innerHTML=`<b>✘ Failed.</b> Correct: "${{q.respuesta}}".`;say('Ouch, the Specter got you!', 'correct');}}
        document.getElementById('hp-player-b').style.width=(playerHP/3*100)+'%';
        document.getElementById('hp-enemy-b').style.width=(bossHP/BOSS.length*100)+'%';
        document.getElementById('b-next').style.display='inline-block';}};
      i.onkeydown=e=>{{if(e.key==='Enter')b.click();}};
      c.appendChild(b);inp.appendChild(i);inp.appendChild(c);i.focus();
    }}

    window.nextBoss = function(){{bi++; bi<BOSS.length?renderBoss():showResult();}}

    function showResult(){{
      go('s-result');
      const max=QUESTS.length*10+BOSS.length*20;
      document.getElementById('xp-earned').textContent=`${{xp}} XP (out of ${{max}})`;
      say(`Congratulations! You have completed Wave ${{currentWave}}.`, 'celebrate');
    }}

    // Initialize
    switchWave('A');

  }} catch(e) {{
    document.getElementById('app').innerHTML = '<h1 style="color:red">Error rendering UI</h1><pre style="color:red">'+e.stack+'</pre>';
  }}
</script>
</body>
</html>
"""

with open(r"c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\prototipo-b1-adverbs-rpg.html", 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Prototipo estilizado con checkmarks y olas dinamicas generado!")
