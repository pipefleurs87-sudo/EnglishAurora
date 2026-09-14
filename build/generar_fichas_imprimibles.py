# -*- coding: utf-8 -*-
"""
generar_fichas_imprimibles.py
Generates herramientas/fichas-imprimibles.html:
The Free Printable ESL Worksheets Hub with 85 classroom-ready printable worksheets,
1-click PDF print, WhatsApp assignment, level filters, instant search, and Schema.org microdata.
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

topics = json.loads((ROOT / "datos" / "temas-completos.json").read_text(encoding="utf-8"))

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Free Printable English Worksheets (PDF with Answer Key) — A1 to C1 | English Aurora</title>
<meta name="description" content="Download free printable ESL grammar worksheets for classroom and homework: A1, A2, B1, B2, C1. Complete with diagnostic warm-up, cognitive exercises, and teacher answer keys.">
<meta name="keywords" content="free printable English worksheets, ESL grammar worksheets PDF, fichas de ingles para imprimir, A1 A2 B1 B2 worksheets, English worksheets with answer key, English Aurora">
<meta property="og:title" content="Free Printable English Grammar Worksheets (A1 to C1) | English Aurora">
<meta property="og:description" content="85 complete printable ESL worksheets with answer keys for teachers and self-learners.">
<meta property="og:type" content="website">
<meta property="og:image" content="https://pipefleurs87-sudo.github.io/EnglishAurora/og-image.png">
<meta property="og:url" content="https://pipefleurs87-sudo.github.io/EnglishAurora/herramientas/fichas-imprimibles.html">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://pipefleurs87-sudo.github.io/EnglishAurora/herramientas/fichas-imprimibles.html">

<!-- JSON-LD: CollectionPage & LearningResource -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Free Printable English Worksheets Collection",
      "description": "85 complete printable ESL worksheets covering CEFR levels A1 to C1 with answer keys.",
      "url": "https://pipefleurs87-sudo.github.io/EnglishAurora/herramientas/fichas-imprimibles.html",
      "inLanguage": "en",
      "isAccessibleForFree": true,
      "provider": {
        "@type": "Organization",
        "name": "English Aurora",
        "url": "https://pipefleurs87-sudo.github.io/EnglishAurora/"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are these English worksheets free for teachers to print and use in class?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 100% free. Teachers may freely print, photocopy, and distribute all 85 worksheets for classroom, academy, and homework use."
          }
        },
        {
          "@type": "Question",
          "name": "Do the worksheets include an answer key?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, each topic sequence provides an interactive answer key and teacher guide accessible directly from the master lesson page."
          }
        }
      ]
    }
  ]
}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=EB+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
:root{
  --ink:#0A101C;
  --dark-teal:#0F4C5C;
  --teal:#2DD4BF;
  --gold:#F2C14E;
  --paper:#F2F5F7;
  --line:#D8DAD1;
  --title:'Cinzel',serif;
  --serif:'EB Garamond',Georgia,serif;
  --sans:'IBM Plex Sans',system-ui,sans-serif;
  --mono:'IBM Plex Mono',monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);line-height:1.6}

/* Top HUD */
.hud{position:sticky;top:0;z-index:50;background:rgba(10,16,28,0.96);backdrop-filter:blur(8px);border-bottom:1px solid rgba(45,212,191,0.25);padding:14px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.brand{font-family:var(--title);font-size:20px;font-weight:700;color:var(--gold);text-decoration:none;letter-spacing:.14em}
.brand em{font-style:normal;color:var(--teal)}
.hud-nav{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.hud-link{font-family:var(--mono);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--paper);text-decoration:none;padding:6px 12px;border:1px solid rgba(242,245,247,0.2);border-radius:6px;transition:all .2s ease}
.hud-link:hover{border-color:var(--teal);color:var(--teal)}
.hud-link.gold{color:var(--gold);border-color:rgba(242,193,78,0.45);background:rgba(242,193,78,0.06)}
.hud-link.gold:hover{border-color:var(--gold);box-shadow:0 0 12px rgba(242,193,78,0.3)}

.wrap{max-width:1080px;margin:0 auto;padding:40px 20px 80px}

/* Hero */
.hero{text-align:center;padding:30px 0 35px;border-bottom:2px solid var(--line)}
.hero-badge{display:inline-block;font-family:var(--mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--dark-teal);background:rgba(15,76,92,0.08);border:1px solid rgba(15,76,92,0.2);padding:5px 14px;border-radius:999px;margin-bottom:14px}
.hero h1{font-family:var(--title);font-size:clamp(30px,4.5vw,46px);font-weight:800;line-height:1.2;color:var(--ink);margin-bottom:12px}
.hero h1 em{font-style:normal;color:var(--dark-teal)}
.hero p{font-family:var(--serif);font-size:20px;color:#475569;max-width:760px;margin:0 auto 24px}

/* Controls */
.controls-bar{display:flex;justify-content:space-between;align-items:center;margin:30px 0 20px;flex-wrap:wrap;gap:14px}
.search-input{font-family:var(--sans);font-size:15px;padding:10px 16px;border:1px solid var(--line);border-radius:8px;background:#fff;width:min(380px,100%)}
.search-input:focus{outline:none;border-color:var(--dark-teal);box-shadow:0 0 0 3px rgba(15,76,92,0.1)}
.filter-pills{display:flex;gap:6px;flex-wrap:wrap}
.pill-btn{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:7px 14px;border:1px solid var(--line);border-radius:20px;background:#fff;color:var(--ink);cursor:pointer;transition:all .15s ease}
.pill-btn:hover{border-color:var(--dark-teal)}
.pill-btn.active{background:var(--dark-teal);color:#fff;border-color:var(--dark-teal)}

/* Grid */
.cards-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:16px}
.ws-card{background:#fff;border:1px solid var(--line);border-radius:10px;padding:20px;display:flex;flex-direction:column;transition:all .2s ease}
.ws-card:hover{border-color:var(--dark-teal);box-shadow:0 6px 16px rgba(0,0,0,0.04);transform:translateY(-2px)}
.ws-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.ws-lvl{font-family:var(--mono);font-size:11px;font-weight:700;padding:2px 8px;border-radius:12px;background:rgba(15,76,92,0.1);color:var(--dark-teal)}
.ws-format{font-family:var(--mono);font-size:11px;color:#059669;font-weight:600}
.ws-title{font-family:var(--serif);font-size:19px;font-weight:700;line-height:1.25;margin-bottom:12px;color:var(--ink)}
.ws-desc{font-size:14px;color:#475569;margin-bottom:16px;line-height:1.5}
.ws-actions{display:flex;gap:8px;margin-top:auto;flex-wrap:wrap}
.btn-ws{font-family:var(--sans);font-size:13px;font-weight:600;text-decoration:none;padding:8px 14px;border-radius:6px;transition:all .15s ease;display:inline-flex;align-items:center;gap:5px;cursor:pointer}
.btn-ws.print{background:var(--gold);color:var(--ink);border:1px solid rgba(212,175,55,0.4)}
.btn-ws.print:hover{background:#E0AC2B}
.btn-ws.share{background:transparent;border:1px solid #CBD5E1;color:#475569}
.btn-ws.share:hover{border-color:#25D366;color:#25D366}
.btn-ws.view{background:transparent;color:var(--dark-teal);padding:8px 6px;margin-left:auto;font-size:12.5px}
.btn-ws.view:hover{text-decoration:underline}
</style>
</head>
<body>

<header class="hud">
  <a href="../index.html" class="brand">ENGLISH <em>AURORA</em></a>
  <nav class="hud-nav">
    <a href="../index.html" class="hud-link">🌌 Galaxy Sky</a>
    <a href="../curriculum.html" class="hud-link">📜 Catálogo</a>
    <a href="../contrastes-gramaticales.html" class="hud-link">⚔️ Contrastes</a>
    <a href="../cambridge-preparation.html" class="hud-link">🎓 Cambridge</a>
    <a href="../verbos-irregulares.html" class="hud-link">⚡ Verbos</a>
    <a href="fichas-imprimibles.html" class="hud-link gold">📄 Fichas PDF</a>
  </nav>
</header>

<main class="wrap">
  <section class="hero">
    <div class="hero-badge">TEACHER'S REPOSITORY · CLASSROOM & HOMEWORK PACKS</div>
    <h1>Free Printable <em>English Worksheets (PDF)</em></h1>
    <p>85 complete, ad-free printable worksheets covering CEFR levels A1 to C1. Each sheet includes diagnostic contrasts, guided cognitive exercises, and teacher answer keys.</p>
  </section>

  <div class="controls-bar">
    <input type="text" id="searchInput" class="search-input" placeholder="Search by topic, grammar rule, or level...">
    <div class="filter-pills">
      <button class="pill-btn active" onclick="filterLevel('ALL')">All Levels (85)</button>
      <button class="pill-btn" onclick="filterLevel('A1')">A1</button>
      <button class="pill-btn" onclick="filterLevel('A2')">A2</button>
      <button class="pill-btn" onclick="filterLevel('B1')">B1</button>
      <button class="pill-btn" onclick="filterLevel('B2')">B2</button>
      <button class="pill-btn" onclick="filterLevel('C1')">C1</button>
    </div>
  </div>

  <div class="cards-grid" id="cardsGrid">
    __CARDS_HTML__
  </div>
</main>

<script>
var currentLevel = 'ALL';

function filterLevel(lvl) {
  currentLevel = lvl;
  document.querySelectorAll('.pill-btn').forEach(function(b) {
    b.classList.toggle('active', b.textContent.indexOf(lvl) === 0 || (lvl === 'ALL' && b.textContent.indexOf('All') === 0));
  });
  applyFilters();
}

function applyFilters() {
  var q = document.getElementById('searchInput').value.toLowerCase().trim();
  document.querySelectorAll('.ws-card').forEach(function(card) {
    var lvl = card.getAttribute('data-level');
    var text = card.textContent.toLowerCase();
    var matchLvl = (currentLevel === 'ALL' || lvl === currentLevel);
    var matchQ = (!q || text.indexOf(q) !== -1);
    card.style.display = (matchLvl && matchQ) ? 'flex' : 'none';
  });
}

document.getElementById('searchInput').addEventListener('input', applyFilters);

function assignWhatsApp(title, url) {
  var fullUrl = window.location.origin + window.location.pathname.replace('herramientas/fichas-imprimibles.html', '') + url;
  var msg = '¡Hola! Aquí tienes la ficha imprimible y lección interactiva de *' + title + '* en English Aurora:\\n\\n' + fullUrl + '\\n\\n(Incluye diagnóstico, ejercicios con autocorrección y audio nativo).';
  window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(msg), '_blank');
}
</script>
</body>
</html>
"""

def generate_cards():
    cards = []
    for t in topics:
        tid = t["id"]
        lvl = t["nivel"]
        title = t["tema"]
        clean_title = title.replace("'", "").replace('"', '')
        desc = f"Complete CEFR {lvl} sequence with diagnostic contrast, vocabulary list, cognitive exercises, and answer key."
        
        cards.append(f"""
    <div class="ws-card" data-level="{lvl}">
      <div class="ws-card-header">
        <span class="ws-lvl">{lvl} CEFR</span>
        <span class="ws-format">🖨 Printable PDF</span>
      </div>
      <h3 class="ws-title">{title}</h3>
      <p class="ws-desc">{desc}</p>
      <div class="ws-actions">
        <a href="../leccion/{tid}.html" class="btn-ws print">🖨 Print Worksheet</a>
        <button class="btn-ws share" onclick="assignWhatsApp('{clean_title}', 'leccion/{tid}.html')">📲 WhatsApp</button>
        <a href="../preview/{tid}.html" class="btn-ws view">✎ Practice</a>
      </div>
    </div>
        """)
    return ''.join(cards)

def main():
    cards = generate_cards()
    final_html = HTML_TEMPLATE.replace("__CARDS_HTML__", cards)
    target = ROOT / "herramientas" / "fichas-imprimibles.html"
    target.write_text(final_html, encoding="utf-8")
    print(f"Generado {target.name} con éxito ({len(final_html)} bytes).")

if __name__ == "__main__":
    main()
