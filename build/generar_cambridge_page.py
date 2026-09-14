# -*- coding: utf-8 -*-
"""
generar_cambridge_page.py
Generates the high-ranking SEO landing page: cambridge-preparation.html
Cambridge English Exam Grammar Syllabus: A2 Key (KET), B1 Preliminary (PET),
B2 First (FCE), C1 Advanced (CAE) with interactive checklists, lesson bridges,
and FAQPage Schema.
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

# Load topics from temas-completos.json
topics = json.loads((ROOT / "datos" / "temas-completos.json").read_text(encoding="utf-8"))

CAMBRIDGE_LEVELS = {
    "A2": {
        "title": "A2 Key (KET)",
        "cefr": "A2 Elementary",
        "desc": "Foundational grammar for everyday basic communication, routines, and simple narratives.",
        "trap": "Examiners heavily penalize omitted auxiliary verbs in questions ('Where you live?' instead of 'Where DO you live?') and irregular past verb errors.",
        "topics": [
            ("a1-to-be-identities-01", "Verb To Be — Present"),
            ("a1-present-simple-routines-01", "Present Simple — Daily Routines (-s)"),
            ("a1-present-continuous-01", "Present Continuous — Actions Now"),
            ("a1-have-got-01", "Have got — Possessions"),
            ("a1-modal-can-ability-01", "Can / Can't — Ability & Permission"),
            ("a2-verb-to-be-past-01", "Was / Were — Past Simple of To Be"),
            ("a2-past-simple-regular-01", "Past Simple — Regular Verbs (-ed)"),
            ("a2-past-simple-irregular-01", "Past Simple — Irregular Verbs"),
            ("a2-comparatives-superlatives-01", "Comparatives & Superlatives"),
            ("a2-countables-some-any-01", "Countable & Uncountable (some/any/much/many)"),
            ("a2-going-to-future-01", "Going to — Future Plans & Intentions"),
            ("a2-past-continuous-vs-simple-01", "Past Continuous vs Past Simple (when/while)")
        ]
    },
    "B1": {
        "title": "B1 Preliminary (PET)",
        "cefr": "B1 Intermediate",
        "desc": "Grammar for independent communication, past narrative nuance, predictions, and conditional logic.",
        "trap": "The #1 trap on Cambridge PET is confusing Past Simple with Present Perfect in Reading Part 5 and Writing Part 1.",
        "topics": [
            ("b1-present-perfect-vs-past-simple-01", "Present Perfect vs Past Simple"),
            ("b1-present-perfect-continuous-01", "Present Perfect Continuous (for/since)"),
            ("b1-present-perfect-ever-experiences-01", "Experiences — Have you ever...?"),
            ("b1-past-perfect-01", "Past Perfect — The Timeline Detective"),
            ("b1-will-vs-going-to-01", "Will vs Going to — Decisions & Intentions"),
            ("b1-conditionals-0-1-2-01", "Zero, First & Second Conditionals"),
            ("b1-passive-voice-01", "Passive Voice — Present & Past"),
            ("b1-used-to-01", "Used to — Past Habits"),
            ("b1-gerund-vs-infinitive-01", "Gerund vs Infinitive (enjoy -ing, hope to)"),
            ("b1-indefinite-pronouns-01", "Indefinite Pronouns (someone/anyone/no one)"),
            ("b1-adverbs-01", "Adverbs of Manner & Degree")
        ]
    },
    "B2": {
        "title": "B2 First (FCE)",
        "cefr": "B2 Upper-Intermediate",
        "desc": "Advanced grammar tested rigorously in Use of English Part 4 (Key Word Transformations).",
        "trap": "Use of English Part 4 requires changing active to passive, conditionals, causatives, and reported speech using 2 to 5 words without altering the given word.",
        "topics": [
            ("b2-third-conditional-01", "Third Conditional — Regrets & Hypotheses"),
            ("b2-mixed-conditionals-01", "Mixed Conditionals — Past Causes, Present Results"),
            ("b2-wish-if-only-01", "Wish / If Only — Regrets & Desires"),
            ("b2-causative-01", "Causative — Have / Get Something Done"),
            ("b2-relative-clauses-01", "Relative Clauses — Defining & Non-Defining"),
            ("b2-reported-speech-01", "Reported Speech — Statements & Questions"),
            ("b2-modals-deduction-past-01", "Modals of Deduction — Past (must have, can't have)"),
            ("b2-modals-deduction-present-01", "Modals of Deduction — Present (must, might, could)"),
            ("b2-linkers-01", "Linking Words — Contrast, Addition, Result"),
            ("b2-collocations-work-study-01", "High-Scoring Collocations"),
            ("b2-phrasal-verbs-get-01", "Phrasal Verbs — GET Masterclass"),
            ("b2-phrasal-verbs-up-01", "Phrasal Verbs with UP"),
            ("b2-phrasal-verbs-out-01", "Phrasal Verbs with OUT")
        ]
    },
    "C1": {
        "title": "C1 Advanced (CAE)",
        "cefr": "C1 Advanced",
        "desc": "Elite stylistic structures, dramatic rhetorical emphasis, and native-level syntactic agility.",
        "trap": "CAE examiners award maximum marks for natural use of inversion, cleft sentences, and participle clauses in both Speaking Part 3 and Writing Paper.",
        "topics": [
            ("c1-inversion-01", "Inversion for Emphasis (Rarely have I seen...)"),
            ("c1-cleft-sentences-01", "Cleft Sentences (It was X that... / What I need is...)"),
            ("c1-advanced-passive-01", "Advanced Passive & Reporting Verbs"),
            ("c1-emphatic-structures-01", "Emphatic Structures (do/does/did & so/such)"),
            ("c1-participle-clauses-01", "Participle Clauses — Advanced Reduction"),
            ("c1-gerund-clauses-subject-01", "Gerund Clauses as Subject"),
            ("c1-ellipsis-substitution-01", "Ellipsis & Substitution"),
            ("c1-future-in-the-past-01", "Future in the Past (was going to, would)"),
            ("c1-subjunctive-01", "The Subjunctive Mood in Formal English"),
            ("c1-would-rather-prefer-01", "Would Rather / Would Prefer"),
            ("c1-register-style-01", "Register & Style — Formal vs Informal")
        ]
    }
}

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cambridge English Exam Grammar Preparation (A2 Key, B1 PET, B2 First, C1 CAE) | English Aurora</title>
<meta name="description" content="Master the exact grammar syllabus for Cambridge English exams: A2 Key (KET), B1 Preliminary (PET), B2 First (FCE), and C1 Advanced (CAE). Free interactive sequences, checklists, and printable worksheets.">
<meta name="keywords" content="Cambridge English exams, B2 First grammar exercises, B1 Preliminary grammar checklist, A2 Key grammar, C1 Advanced Use of English, Cambridge exam preparation, English Aurora">
<meta property="og:title" content="Cambridge English Exam Grammar Guides | English Aurora">
<meta property="og:description" content="Complete grammar syllabus by CEFR level for Cambridge exams. Checklists, lessons, and tests.">
<meta property="og:type" content="website">
<meta property="og:image" content="https://pipefleurs87-sudo.github.io/EnglishAurora/og-image.png">
<meta property="og:url" content="https://pipefleurs87-sudo.github.io/EnglishAurora/cambridge-preparation.html">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://pipefleurs87-sudo.github.io/EnglishAurora/cambridge-preparation.html">

<!-- JSON-LD: EducationalOccupationalProgram & FAQPage -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOccupationalProgram",
      "name": "Cambridge English Exam Grammar Curriculum",
      "description": "Comprehensive grammar preparation for Cambridge English examinations: A2 Key, B1 Preliminary, B2 First, and C1 Advanced.",
      "educationalProgramMode": "online",
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
          "name": "What grammar is required for Cambridge B2 First (FCE)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2 First requires mastery of mixed and third conditionals, passive and causative structures (have something done), relative clauses, reported speech, modals of deduction in the past (must have, can't have), and wish/if only."
          }
        },
        {
          "@type": "Question",
          "name": "How is grammar tested in Cambridge Use of English Part 4?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Part 4 consists of Key Word Transformations. You are given a sentence and a key word, and must rewrite the sentence using 2 to 5 words (B2) or 3 to 6 words (C1) without altering the given word."
          }
        },
        {
          "@type": "Question",
          "name": "What is the key difference between B1 Preliminary and B2 First grammar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B1 focuses on standard tenses (Present Perfect, Past Continuous, First and Second Conditionals). B2 introduces advanced nuances: third conditionals, mixed conditionals, passive reporting verbs, and subtle modal deductions."
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

.wrap{max-width:1040px;margin:0 auto;padding:40px 20px 80px}

/* Hero */
.hero{text-align:center;padding:30px 0 35px;border-bottom:2px solid var(--line)}
.hero-badge{display:inline-block;font-family:var(--mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--dark-teal);background:rgba(15,76,92,0.08);border:1px solid rgba(15,76,92,0.2);padding:5px 14px;border-radius:999px;margin-bottom:14px}
.hero h1{font-family:var(--title);font-size:clamp(30px,4.5vw,46px);font-weight:800;line-height:1.2;color:var(--ink);margin-bottom:12px}
.hero h1 em{font-style:normal;color:var(--dark-teal)}
.hero p{font-family:var(--serif);font-size:20px;color:#475569;max-width:760px;margin:0 auto}

/* Level Tabs */
.tabs-bar{display:flex;justify-content:center;gap:10px;margin:35px 0 25px;flex-wrap:wrap}
.tab-btn{font-family:var(--mono);font-size:13px;letter-spacing:.12em;text-transform:uppercase;padding:10px 22px;border:1px solid var(--line);border-radius:8px;background:#fff;color:#475569;cursor:pointer;transition:all .2s ease;font-weight:600}
.tab-btn:hover{border-color:var(--dark-teal);color:var(--dark-teal)}
.tab-btn.active{background:var(--dark-teal);color:#fff;border-color:var(--dark-teal);box-shadow:0 4px 14px rgba(15,76,92,0.25)}

/* Exam Level Panel */
.level-panel{display:none}
.level-panel.active{display:block}

.exam-overview{background:linear-gradient(135deg, #0A101C, #17223B);color:#fff;border-radius:12px;padding:26px 30px;margin-bottom:30px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px}
.exam-title{font-family:var(--title);font-size:28px;color:var(--gold);margin-bottom:4px}
.exam-desc{font-size:15px;color:#CBD5E1;max-width:620px;line-height:1.55}

/* Trap Banner */
.exam-trap{background:#FFFBEB;border:1px solid #FDE68A;border-left:5px solid var(--gold);border-radius:8px;padding:16px 20px;margin-bottom:28px}
.exam-trap-title{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#92400E;font-weight:700;margin-bottom:4px}
.exam-trap-text{font-size:14.5px;color:#78350F;line-height:1.5}

/* Topics Grid */
.topics-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(310px, 1fr));gap:16px}
.topic-card{background:#fff;border:1px solid var(--line);border-radius:10px;padding:18px 20px;display:flex;flex-direction:column;transition:all .2s ease}
.topic-card:hover{border-color:var(--dark-teal);box-shadow:0 6px 18px rgba(0,0,0,0.04);transform:translateY(-2px)}
.topic-card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.topic-chk{display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none}
.topic-chk input{accent-color:var(--dark-teal);width:16px;height:16px}
.topic-card-title{font-family:var(--serif);font-size:18px;font-weight:700;color:var(--ink);line-height:1.3;margin-bottom:14px}
.topic-card-actions{display:flex;gap:8px;margin-top:auto}
.act-btn{font-family:var(--sans);font-size:12.5px;font-weight:600;text-decoration:none;padding:6px 12px;border-radius:6px;transition:all .15s ease}
.act-btn.primary{background:var(--dark-teal);color:#fff}
.act-btn.primary:hover{background:var(--ink)}
.act-btn.ghost{background:transparent;border:1px solid #CBD5E1;color:#475569}
.act-btn.ghost:hover{border-color:var(--dark-teal);color:var(--dark-teal)}
</style>
</head>
<body>

<header class="hud">
  <a href="index.html" class="brand">ENGLISH <em>AURORA</em></a>
  <nav class="hud-nav">
    <a href="index.html" class="hud-link">🌌 Galaxy Sky</a>
    <a href="curriculum.html" class="hud-link">📜 Catálogo</a>
    <a href="contrastes-gramaticales.html" class="hud-link">⚔️ Contrastes</a>
    <a href="cambridge-preparation.html" class="hud-link gold">🎓 Cambridge</a>
    <a href="verbos-irregulares.html" class="hud-link">⚡ Verbos</a>
    <a href="herramientas/fichas-imprimibles.html" class="hud-link gold">📄 Fichas PDF</a>
  </nav>
</header>

<main class="wrap">
  <section class="hero">
    <div class="hero-badge">OFFICIAL CEFR CURRICULUM · CAMBRIDGE ESOL GUIDES</div>
    <h1>Cambridge English <em>Exam Grammar Master Guides</em></h1>
    <p>Target the exact grammar structures tested in Cambridge A2 Key (KET), B1 Preliminary (PET), B2 First (FCE), and C1 Advanced (CAE) with interactive checklists and complete master sequences.</p>
  </section>

  <!-- Level Tabs -->
  <div class="tabs-bar">
    <button class="tab-btn" onclick="showTab('A2')">A2 Key (KET)</button>
    <button class="tab-btn" onclick="showTab('B1')">B1 Preliminary (PET)</button>
    <button class="tab-btn active" onclick="showTab('B2')">B2 First (FCE)</button>
    <button class="tab-btn" onclick="showTab('C1')">C1 Advanced (CAE)</button>
  </div>

  __LEVELS_PANELS__

</main>

<script>
function showTab(lvl) {
  document.querySelectorAll('.tab-btn').forEach(function(b) {
    b.classList.toggle('active', b.textContent.indexOf(lvl) !== -1);
  });
  document.querySelectorAll('.level-panel').forEach(function(p) {
    p.classList.toggle('active', p.id === 'panel-' + lvl);
  });
}

// Checklist Persistence
document.querySelectorAll('.topic-chk input').forEach(function(chk) {
  var id = chk.getAttribute('data-id');
  if (localStorage.getItem('cambridge_chk_' + id) === '1') {
    chk.checked = true;
    chk.closest('.topic-card').style.borderColor = '#10B981';
  }
  chk.addEventListener('change', function() {
    localStorage.setItem('cambridge_chk_' + id, chk.checked ? '1' : '0');
    chk.closest('.topic-card').style.borderColor = chk.checked ? '#10B981' : 'var(--line)';
  });
});
</script>
</body>
</html>
"""

def generate_panels():
    panels_html = []
    for lvl, info in CAMBRIDGE_LEVELS.items():
        is_active = "active" if lvl == "B2" else ""
        cards = []
        for tid, tname in info["topics"]:
            cards.append(f"""
        <div class="topic-card">
          <div class="topic-card-header">
            <label class="topic-chk">
              <input type="checkbox" data-id="{tid}">
              <span style="font-family:var(--mono);font-size:11px;color:var(--muted)">Mastered</span>
            </label>
            <span style="font-family:var(--mono);font-size:11px;color:var(--dark-teal);font-weight:600">{lvl} Core</span>
          </div>
          <h3 class="topic-card-title">{tname}</h3>
          <div class="topic-card-actions">
            <a href="leccion/{tid}.html" class="act-btn primary">▶ Lesson</a>
            <a href="preview/{tid}.html" class="act-btn ghost">✎ Practice</a>
            <a href="evaluacion/{tid}.html" class="act-btn ghost">✓ Test</a>
          </div>
        </div>
            """)
            
        panel = f"""
  <div class="level-panel {is_active}" id="panel-{lvl}">
    <div class="exam-overview">
      <div>
        <h2 class="exam-title">{info['title']}</h2>
        <p class="exam-desc">{info['desc']}</p>
      </div>
      <div style="text-align:right">
        <span style="font-family:var(--mono);font-size:12px;color:var(--teal)">CEFR Level</span>
        <div style="font-family:var(--title);font-size:22px;color:#fff;font-weight:700">{info['cefr']}</div>
      </div>
    </div>

    <div class="exam-trap">
      <div class="exam-trap-title">⚠️ Examiner Trap Warning ({lvl})</div>
      <div class="exam-trap-text">{info['trap']}</div>
    </div>

    <div class="topics-grid">
      {''.join(cards)}
    </div>
  </div>
        """
        panels_html.append(panel)
        
    return '\n'.join(panels_html)

def main():
    panels = generate_panels()
    final_html = HTML_TEMPLATE.replace("__LEVELS_PANELS__", panels)
    target = ROOT / "cambridge-preparation.html"
    target.write_text(final_html, encoding="utf-8")
    print(f"Generado {target.name} con éxito ({len(final_html)} bytes).")

if __name__ == "__main__":
    main()
