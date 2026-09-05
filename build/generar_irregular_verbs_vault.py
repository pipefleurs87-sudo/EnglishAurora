# -*- coding: utf-8 -*-
"""
GENERADOR: The Master Irregular Verbs Vault (verbos-irregulares.html)
Crea la pagina super-iman SEO con ~160 verbos irregulares, audio neural,
filtros mnemotecnicos, modo examen interactivo, fichas PDF y bucle viral docente.
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

VERBS_DATA = [
    # --- PATTERN: INVARIANT (A-A-A) ---
    {"base": "cost", "past": "cost", "part": "cost", "es": "costar", "cefr": "A1", "pattern": "invariant"},
    {"base": "cut", "past": "cut", "part": "cut", "es": "cortar", "cefr": "A1", "pattern": "invariant"},
    {"base": "hit", "past": "hit", "part": "hit", "es": "golpear", "cefr": "A1", "pattern": "invariant"},
    {"base": "hurt", "past": "hurt", "part": "hurt", "es": "doler / herir", "cefr": "A1", "pattern": "invariant"},
    {"base": "let", "past": "let", "part": "let", "es": "permitir / dejar", "cefr": "A2", "pattern": "invariant"},
    {"base": "put", "past": "put", "part": "put", "es": "poner", "cefr": "A1", "pattern": "invariant"},
    {"base": "read", "past": "read", "part": "read", "es": "leer", "cefr": "A1", "pattern": "invariant"},
    {"base": "set", "past": "set", "part": "set", "es": "fijar / establecer", "cefr": "A2", "pattern": "invariant"},
    {"base": "shut", "past": "shut", "part": "shut", "es": "cerrar", "cefr": "A1", "pattern": "invariant"},
    {"base": "spread", "past": "spread", "part": "spread", "es": "extender / esparcir", "cefr": "B1", "pattern": "invariant"},
    {"base": "quit", "past": "quit", "part": "quit", "es": "abandonar / renunciar", "cefr": "B1", "pattern": "invariant"},
    {"base": "broadcast", "past": "broadcast", "part": "broadcast", "es": "transmitir / emitir", "cefr": "B2", "pattern": "invariant"},
    {"base": "burst", "past": "burst", "part": "burst", "es": "reventar / estallar", "cefr": "B2", "pattern": "invariant"},
    {"base": "split", "past": "split", "part": "split", "es": "dividir / partir", "cefr": "B1", "pattern": "invariant"},
    {"base": "upset", "past": "upset", "part": "upset", "es": "molestar / disgustar", "cefr": "B1", "pattern": "invariant"},
    {"base": "bid", "past": "bid", "part": "bid", "es": "pujar / ofertar", "cefr": "C1", "pattern": "invariant"},

    # --- PATTERN: -OUGHT / -AUGHT ---
    {"base": "bring", "past": "brought", "part": "brought", "es": "traer", "cefr": "A1", "pattern": "ought"},
    {"base": "buy", "past": "bought", "part": "bought", "es": "comprar", "cefr": "A1", "pattern": "ought"},
    {"base": "catch", "past": "caught", "part": "caught", "es": "atrapar", "cefr": "A2", "pattern": "ought"},
    {"base": "fight", "past": "fought", "part": "fought", "es": "luchar / pelear", "cefr": "A2", "pattern": "ought"},
    {"base": "teach", "past": "taught", "part": "taught", "es": "enseñar", "cefr": "A1", "pattern": "ought"},
    {"base": "think", "past": "thought", "part": "thought", "es": "pensar", "cefr": "A1", "pattern": "ought"},
    {"base": "seek", "past": "sought", "part": "sought", "es": "buscar / perseguir", "cefr": "B2", "pattern": "ought"},

    # --- PATTERN: I - A - U MELODY ---
    {"base": "begin", "past": "began", "part": "begun", "es": "empezar / comenzar", "cefr": "A1", "pattern": "iau"},
    {"base": "drink", "past": "drank", "part": "drunk", "es": "beber", "cefr": "A1", "pattern": "iau"},
    {"base": "ring", "past": "rang", "part": "rung", "es": "sonar / timbrar", "cefr": "A2", "pattern": "iau"},
    {"base": "run", "past": "ran", "part": "run", "es": "correr", "cefr": "A1", "pattern": "iau"},
    {"base": "sing", "past": "sang", "part": "sung", "es": "cantar", "cefr": "A1", "pattern": "iau"},
    {"base": "sink", "past": "sank", "part": "sunk", "es": "hundir(se)", "cefr": "B1", "pattern": "iau"},
    {"base": "swim", "past": "swam", "part": "swum", "es": "nadar", "cefr": "A1", "pattern": "iau"},
    {"base": "spring", "past": "sprang", "part": "sprung", "es": "brotar / saltar", "cefr": "B2", "pattern": "iau"},
    {"base": "shrink", "past": "shrank", "part": "shrunk", "es": "encoger(se)", "cefr": "B2", "pattern": "iau"},

    # --- PATTERN: -EN PARTICIPLE ---
    {"base": "bite", "past": "bit", "part": "bitten", "es": "morder", "cefr": "A2", "pattern": "en_participle"},
    {"base": "break", "past": "broke", "part": "broken", "es": "romper", "cefr": "A1", "pattern": "en_participle"},
    {"base": "choose", "past": "chose", "part": "chosen", "es": "elegir", "cefr": "A2", "pattern": "en_participle"},
    {"base": "drive", "past": "drove", "part": "driven", "es": "conducir", "cefr": "A1", "pattern": "en_participle"},
    {"base": "eat", "past": "ate", "part": "eaten", "es": "comer", "cefr": "A1", "pattern": "en_participle"},
    {"base": "fall", "past": "fell", "part": "fallen", "es": "caer", "cefr": "A1", "pattern": "en_participle"},
    {"base": "forgive", "past": "forgave", "part": "forgiven", "es": "perdonar", "cefr": "A2", "pattern": "en_participle"},
    {"base": "freeze", "past": "froze", "part": "frozen", "es": "congelar", "cefr": "A2", "pattern": "en_participle"},
    {"base": "give", "past": "gave", "part": "given", "es": "dar", "cefr": "A1", "pattern": "en_participle"},
    {"base": "hide", "past": "hid", "part": "hidden", "es": "esconder / ocultar", "cefr": "A2", "pattern": "en_participle"},
    {"base": "ride", "past": "rode", "part": "ridden", "es": "montar", "cefr": "A1", "pattern": "en_participle"},
    {"base": "rise", "past": "rose", "part": "risen", "es": "subir / elevarse", "cefr": "B1", "pattern": "en_participle"},
    {"base": "shake", "past": "shook", "part": "shaken", "es": "sacudir / agitar", "cefr": "A2", "pattern": "en_participle"},
    {"base": "speak", "past": "spoke", "part": "spoken", "es": "hablar", "cefr": "A1", "pattern": "en_participle"},
    {"base": "steal", "past": "stole", "part": "stolen", "es": "robar", "cefr": "A2", "pattern": "en_participle"},
    {"base": "take", "past": "took", "part": "taken", "es": "tomar / llevar", "cefr": "A1", "pattern": "en_participle"},
    {"base": "wake", "past": "woke", "part": "woken", "es": "despertar", "cefr": "A1", "pattern": "en_participle"},
    {"base": "write", "past": "wrote", "part": "written", "es": "escribir", "cefr": "A1", "pattern": "en_participle"},
    {"base": "arise", "past": "arose", "part": "arisen", "es": "surgir", "cefr": "B2", "pattern": "en_participle"},
    {"base": "forbid", "past": "forbade", "part": "forbidden", "es": "prohibir", "cefr": "B2", "pattern": "en_participle"},
    {"base": "forsake", "past": "forsook", "part": "forsaken", "es": "abandonar / desamparar", "cefr": "C1", "pattern": "en_participle"},

    # --- PATTERN: D -> T TRANSFORMERS ---
    {"base": "bend", "past": "bent", "part": "bent", "es": "doblar / inclinar", "cefr": "A2", "pattern": "d_to_t"},
    {"base": "build", "past": "built", "part": "built", "es": "construir", "cefr": "A1", "pattern": "d_to_t"},
    {"base": "burn", "past": "burnt", "part": "burnt", "es": "quemar", "cefr": "A2", "pattern": "d_to_t"},
    {"base": "deal", "past": "dealt", "part": "dealt", "es": "tratar / repartir", "cefr": "B1", "pattern": "d_to_t"},
    {"base": "dream", "past": "dreamt", "part": "dreamt", "es": "soñar", "cefr": "A2", "pattern": "d_to_t"},
    {"base": "feel", "past": "felt", "part": "felt", "es": "sentir", "cefr": "A1", "pattern": "d_to_t"},
    {"base": "keep", "past": "kept", "part": "kept", "es": "guardar / mantener", "cefr": "A2", "pattern": "d_to_t"},
    {"base": "leave", "past": "left", "part": "left", "es": "salir / dejar", "cefr": "A1", "pattern": "d_to_t"},
    {"base": "lend", "past": "lent", "part": "lent", "es": "prestar", "cefr": "A2", "pattern": "d_to_t"},
    {"base": "lose", "past": "lost", "part": "lost", "es": "perder", "cefr": "A1", "pattern": "d_to_t"},
    {"base": "mean", "past": "meant", "part": "meant", "es": "significar / querer decir", "cefr": "A2", "pattern": "d_to_t"},
    {"base": "meet", "past": "met", "part": "met", "es": "conocer / reunirse", "cefr": "A1", "pattern": "d_to_t"},
    {"base": "send", "past": "sent", "part": "sent", "es": "enviar", "cefr": "A1", "pattern": "d_to_t"},
    {"base": "sleep", "past": "slept", "part": "slept", "es": "dormir", "cefr": "A1", "pattern": "d_to_t"},
    {"base": "spend", "past": "spent", "part": "spent", "es": "gastar / pasar tiempo", "cefr": "A1", "pattern": "d_to_t"},
    {"base": "creep", "past": "crept", "part": "crept", "es": "arrastrarse / deslizarse", "cefr": "B2", "pattern": "d_to_t"},
    {"base": "leap", "past": "leapt", "part": "leapt", "es": "saltar", "cefr": "B2", "pattern": "d_to_t"},
    {"base": "weep", "past": "wept", "part": "wept", "es": "llorar / sollozar", "cefr": "B2", "pattern": "d_to_t"},

    # --- PATTERN: VOWEL CHANGE (PAST == PARTICIPLE) ---
    {"base": "bleed", "past": "bled", "part": "bled", "es": "sangrar", "cefr": "B1", "pattern": "vowel_shift"},
    {"base": "feed", "past": "fed", "part": "fed", "es": "alimentar", "cefr": "A2", "pattern": "vowel_shift"},
    {"base": "find", "past": "found", "part": "found", "es": "encontrar", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "get", "past": "got", "part": "got", "es": "conseguir / obtener", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "hang", "past": "hung", "part": "hung", "es": "colgar", "cefr": "A2", "pattern": "vowel_shift"},
    {"base": "hear", "past": "heard", "part": "heard", "es": "oír / escuchar", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "hold", "past": "held", "part": "held", "es": "sostener", "cefr": "A2", "pattern": "vowel_shift"},
    {"base": "lead", "past": "led", "part": "led", "es": "guiar / liderar", "cefr": "B1", "pattern": "vowel_shift"},
    {"base": "light", "past": "lit", "part": "lit", "es": "iluminar / encender", "cefr": "A2", "pattern": "vowel_shift"},
    {"base": "make", "past": "made", "part": "made", "es": "hacer / fabricar", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "pay", "past": "paid", "part": "paid", "es": "pagar", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "say", "past": "said", "part": "said", "es": "decir", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "sell", "past": "sold", "part": "sold", "es": "vender", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "shine", "past": "shone", "part": "shone", "es": "brillar", "cefr": "A2", "pattern": "vowel_shift"},
    {"base": "shoot", "past": "shot", "part": "shot", "es": "disparar", "cefr": "A2", "pattern": "vowel_shift"},
    {"base": "sit", "past": "sat", "part": "sat", "es": "sentarse", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "stand", "past": "stood", "part": "stood", "es": "estar de pie / aguantar", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "stick", "past": "stuck", "part": "stuck", "es": "pegar / atascar", "cefr": "B1", "pattern": "vowel_shift"},
    {"base": "strike", "past": "struck", "part": "struck", "es": "golpear / impactar", "cefr": "B1", "pattern": "vowel_shift"},
    {"base": "tell", "past": "told", "part": "told", "es": "decir / contar", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "understand", "past": "understood", "part": "understood", "es": "entender", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "win", "past": "won", "part": "won", "es": "ganar", "cefr": "A1", "pattern": "vowel_shift"},
    {"base": "bind", "past": "bound", "part": "bound", "es": "atar / encuadernar", "cefr": "B2", "pattern": "vowel_shift"},
    {"base": "cling", "past": "clung", "part": "clung", "es": "aferrarse", "cefr": "B2", "pattern": "vowel_shift"},
    {"base": "dig", "past": "dug", "part": "dug", "es": "cavar", "cefr": "A2", "pattern": "vowel_shift"},
    {"base": "flee", "past": "fled", "part": "fled", "es": "huir / escapar", "cefr": "B2", "pattern": "vowel_shift"},
    {"base": "grind", "past": "ground", "part": "ground", "es": "moler", "cefr": "B2", "pattern": "vowel_shift"},
    {"base": "sling", "past": "slung", "part": "slung", "es": "lanzar / arrojar", "cefr": "C1", "pattern": "vowel_shift"},
    {"base": "spin", "past": "spun", "part": "spun", "es": "girar / hilar", "cefr": "B1", "pattern": "vowel_shift"},
    {"base": "sting", "past": "stung", "part": "stung", "es": "picar / escocer", "cefr": "B1", "pattern": "vowel_shift"},
    {"base": "swing", "past": "swung", "part": "swung", "es": "balancearse", "cefr": "B1", "pattern": "vowel_shift"},
    {"base": "wind", "past": "wound", "part": "wound", "es": "enrollar / serpentear", "cefr": "B2", "pattern": "vowel_shift"},
    {"base": "wring", "past": "wrung", "part": "wrung", "es": "escurrir", "cefr": "C1", "pattern": "vowel_shift"},

    # --- PATTERN: -EW / -OWN FAMILY ---
    {"base": "blow", "past": "blew", "part": "blown", "es": "soplar", "cefr": "A2", "pattern": "ew_own"},
    {"base": "draw", "past": "drew", "part": "drawn", "es": "dibujar", "cefr": "A1", "pattern": "ew_own"},
    {"base": "fly", "past": "flew", "part": "flown", "es": "volar", "cefr": "A1", "pattern": "ew_own"},
    {"base": "grow", "past": "grew", "part": "grown", "es": "crecer / cultivar", "cefr": "A1", "pattern": "ew_own"},
    {"base": "know", "past": "knew", "part": "known", "es": "saber / conocer", "cefr": "A1", "pattern": "ew_own"},
    {"base": "throw", "past": "threw", "part": "thrown", "es": "lanzar / tirar", "cefr": "A2", "pattern": "ew_own"},
    {"base": "sew", "past": "sewed", "part": "sewn", "es": "coser", "cefr": "B1", "pattern": "ew_own"},
    {"base": "sow", "past": "sowed", "part": "sown", "es": "sembrar", "cefr": "B2", "pattern": "ew_own"},
    {"base": "withdraw", "past": "withdrew", "part": "withdrawn", "es": "retirar(se)", "cefr": "B2", "pattern": "ew_own"},

    # --- PATTERN: SPECIAL CELESTIALS ---
    {"base": "be", "past": "was / were", "part": "been", "es": "ser / estar", "cefr": "A1", "pattern": "celestial"},
    {"base": "do", "past": "did", "part": "done", "es": "hacer", "cefr": "A1", "pattern": "celestial"},
    {"base": "go", "past": "went", "part": "gone", "es": "ir", "cefr": "A1", "pattern": "celestial"},
    {"base": "have", "past": "had", "part": "had", "es": "tener / haber", "cefr": "A1", "pattern": "celestial"},
    {"base": "see", "past": "saw", "part": "seen", "es": "ver", "cefr": "A1", "pattern": "celestial"},
    {"base": "come", "past": "came", "part": "come", "es": "venir", "cefr": "A1", "pattern": "celestial"},
    {"base": "become", "past": "became", "part": "become", "es": "llegar a ser / convertirse", "cefr": "A2", "pattern": "celestial"},
    {"base": "overcome", "past": "overcame", "part": "overcome", "es": "superar / vencer", "cefr": "B2", "pattern": "celestial"},
    {"base": "swear", "past": "swore", "part": "sworn", "es": "jurar / decir palabrotas", "cefr": "B1", "pattern": "celestial"},
    {"base": "tear", "past": "tore", "part": "torn", "es": "rasgar / desgarrar", "cefr": "B1", "pattern": "celestial"},
    {"base": "wear", "past": "wore", "part": "worn", "es": "llevar puesto / vestir", "cefr": "A1", "pattern": "celestial"},
    {"base": "bear", "past": "bore", "part": "born", "es": "soportar / dar a luz", "cefr": "B2", "pattern": "celestial"},
    {"base": "lie", "past": "lay", "part": "lain", "es": "yacer / tumbarse", "cefr": "B2", "pattern": "celestial"}
]

HTML_CONTENT = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>The Master Irregular Verbs Vault — Audio, Mnemonic Patterns & Printable Worksheets | English Aurora</title>
<meta name="description" content="Domina todos los verbos irregulares en inglés con pronunciación nativa en 1 clic, familias mnemotécnicas (sing-sang-sung, -ought, invariables), modo examen interactivo y fichas PDF imprimibles con respuestas.">
<meta name="keywords" content="verbos irregulares ingles, irregular verbs list, english irregular verbs audio, past simple irregular verbs, irregular verbs exercises pdf, english aurora">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://pipefleurs87-sudo.github.io/EnglishAurora/verbos-irregulares.html">

<!-- FONTS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap" rel="stylesheet">

<!-- SCHEMA.ORG JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "The Master Irregular Verbs Vault · English Aurora",
  "description": "Complete interactive dictionary and test suite for English irregular verbs grouped by mnemonic acoustic patterns with audio and printable worksheets.",
  "learningResourceType": "Worksheet, Reference Guide, Interactive Test",
  "educationalLevel": "A1, A2, B1, B2, C1",
  "inLanguage": ["en", "es"],
  "isAccessibleForFree": true,
  "provider": {
    "@type": "Organization",
    "name": "English Aurora",
    "url": "https://pipefleurs87-sudo.github.io/EnglishAurora/"
  }
}
</script>

<style>
:root {
  --ink: #070B18;
  --ink-card: #0D1626;
  --ink-secondary: #8B99AE;
  --paper: #F2F5F7;
  --teal: #2DD4BF;
  --teal-dim: rgba(45, 212, 191, 0.2);
  --teal-glow: rgba(45, 212, 191, 0.4);
  --gold: #F2C14E;
  --gold-dim: rgba(242, 193, 78, 0.2);
  --gold-glow: rgba(242, 193, 78, 0.4);
  --ruby: #F43F5E;
  --sky: #38BDF8;
  --green: #25D366;
  --line: rgba(255, 255, 255, 0.1);
  --serif: 'Source Serif 4', Georgia, serif;
  --title: 'Cinzel', Georgia, serif;
  --sans: 'IBM Plex Sans', system-ui, sans-serif;
  --mono: 'IBM Plex Mono', monospace;
  --e-out: cubic-bezier(0.22, 1, 0.36, 1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  width: 100%; min-height: 100%;
  background: var(--ink); color: var(--paper);
  font-family: var(--sans); overflow-x: hidden;
}

/* Background Atmosphere */
.aurora-bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(circle at 20% 15%, rgba(45, 212, 191, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 80% 30%, rgba(242, 193, 78, 0.1) 0%, transparent 60%),
              radial-gradient(circle at 50% 85%, rgba(56, 189, 248, 0.08) 0%, transparent 70%);
}

.vault-container {
  position: relative; z-index: 10;
  max-width: 1240px; margin: 0 auto;
  padding: 24px 20px 80px; display: flex; flex-direction: column; gap: 24px;
}

/* Top Navigation Bar */
.vault-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 20px; border-radius: 14px;
  background: rgba(13, 22, 38, 0.85); backdrop-filter: blur(14px);
  border: 1px solid var(--line); flex-wrap: wrap; gap: 12px;
}
.brand-group { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--paper); }
.brand-emblem {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(242, 193, 78, 0.15); border: 1.5px solid var(--gold);
  display: flex; align-items: center; justify-content: center; font-size: 19px;
}
.brand-title { font-family: var(--title); font-size: 16px; font-weight: 700; color: var(--gold); letter-spacing: 0.05em; }
.nav-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.nav-link {
  font-family: var(--mono); font-size: 11px; font-weight: 600;
  text-decoration: none; color: var(--ink-secondary); padding: 6px 12px;
  border-radius: 8px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.03);
  transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px;
}
.nav-link:hover { color: var(--teal); border-color: var(--teal); }

/* Hero Section */
.vault-hero {
  background: radial-gradient(ellipse at 85% 20%, rgba(242, 193, 78, 0.15) 0%, rgba(13, 22, 38, 0.95) 75%);
  border: 1px solid rgba(242, 193, 78, 0.3); border-radius: 20px;
  padding: 32px 36px; box-shadow: 0 12px 40px rgba(0,0,0,0.6);
  display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap;
}
.hero-content { max-width: 680px; }
.hero-badge {
  font-family: var(--mono); font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold);
  margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
}
.hero-title { font-family: var(--title); font-size: 32px; font-weight: 900; color: var(--paper); line-height: 1.15; margin-bottom: 10px; }
.hero-desc { font-size: 14.5px; line-height: 1.55; color: var(--ink-secondary); }

.hero-cta-group { display: flex; gap: 10px; flex-wrap: wrap; }
.btn-cta {
  font-family: var(--mono); font-size: 12px; font-weight: 700;
  padding: 11px 18px; border-radius: 10px; cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s var(--e-out); border: none;
}
.btn-cta.gold { background: var(--gold); color: var(--ink); box-shadow: 0 0 18px var(--gold-glow); }
.btn-cta.gold:hover { background: #FFE082; transform: translateY(-2px); }
.btn-cta.teal { background: var(--teal); color: var(--ink); box-shadow: 0 0 18px var(--teal-glow); }
.btn-cta.teal:hover { background: #5EEAD4; transform: translateY(-2px); }
.btn-cta.wa { background: var(--green); color: #070B18; font-weight: 700; }
.btn-cta.wa:hover { background: #1EBE5B; transform: translateY(-2px); }

/* Control Dashboard (Search & Filters) */
.controls-panel {
  background: var(--ink-card); border: 1px solid var(--line);
  border-radius: 16px; padding: 20px 24px; display: flex; flex-direction: column; gap: 16px;
}
.search-row { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.search-input-wrap { flex: 1; min-width: 260px; position: relative; }
.search-input-wrap input {
  width: 100%; background: rgba(7, 11, 24, 0.85); border: 1px solid var(--line);
  border-radius: 10px; padding: 10px 14px 10px 38px; color: var(--paper);
  font-family: var(--sans); font-size: 14px; outline: none; transition: border-color 0.2s ease;
}
.search-input-wrap input:focus { border-color: var(--teal); box-shadow: 0 0 14px var(--teal-dim); }
.search-input-wrap span.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 15px; color: var(--ink-secondary); }

.filter-pills-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.filter-label { font-family: var(--mono); font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--ink-secondary); margin-right: 4px; }
.pill-btn {
  font-family: var(--mono); font-size: 11.5px; font-weight: 600;
  background: rgba(255, 255, 255, 0.04); border: 1px solid var(--line);
  color: var(--paper); border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: all 0.2s ease;
}
.pill-btn:hover { border-color: var(--teal); color: var(--teal); }
.pill-btn.active {
  background: rgba(45, 212, 191, 0.16); border-color: var(--teal);
  color: var(--teal); box-shadow: 0 0 12px var(--teal-dim); font-weight: 700;
}
.pill-btn.pattern.active {
  background: rgba(242, 193, 78, 0.16); border-color: var(--gold);
  color: var(--gold); box-shadow: 0 0 12px var(--gold-dim); font-weight: 700;
}

/* Practice Mode Banner */
.practice-mode-bar {
  display: none; align-items: center; justify-content: space-between;
  background: rgba(56, 189, 248, 0.12); border: 1px dashed var(--sky);
  border-radius: 12px; padding: 12px 18px; flex-wrap: wrap; gap: 12px;
}
.practice-mode-bar.active { display: flex; }
.practice-instructions { font-size: 13px; color: var(--paper); }
.practice-controls { display: flex; gap: 8px; align-items: center; }

/* Verbs Table */
.table-wrap {
  background: var(--ink-card); border: 1px solid var(--line);
  border-radius: 16px; overflow-x: auto; box-shadow: 0 8px 30px rgba(0,0,0,0.5);
}
table.verbs-table {
  width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;
}
thead th {
  background: rgba(13, 22, 38, 0.95); padding: 14px 18px;
  font-family: var(--mono); font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em; color: var(--gold);
  border-bottom: 2px solid rgba(242, 193, 78, 0.3);
}
tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.15s ease;
}
tbody tr:hover { background: rgba(45, 212, 191, 0.05); }
tbody td { padding: 12px 18px; vertical-align: middle; }

.word-cell {
  display: inline-flex; align-items: center; gap: 8px;
  font-weight: 600; color: #FFFFFF; font-size: 14px;
}
.btn-audio {
  background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px; color: var(--teal); width: 26px; height: 26px;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 12px; cursor: pointer; transition: all 0.15s ease;
}
.btn-audio:hover { background: var(--teal); color: var(--ink); transform: scale(1.1); }
.btn-audio.playing { background: var(--gold); color: var(--ink); animation: pulse 0.8s infinite alternate; }

@keyframes pulse { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }

.cefr-tag {
  font-family: var(--mono); font-size: 10px; font-weight: 700;
  padding: 3px 8px; border-radius: 6px; text-transform: uppercase;
}
.cefr-tag.a1 { background: rgba(242, 193, 78, 0.15); color: #F2C14E; border: 1px solid rgba(242, 193, 78, 0.35); }
.cefr-tag.a2 { background: rgba(45, 212, 191, 0.15); color: #2DD4BF; border: 1px solid rgba(45, 212, 191, 0.35); }
.cefr-tag.b1 { background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.35); }
.cefr-tag.b2 { background: rgba(167, 139, 250, 0.15); color: #A78BFA; border: 1px solid rgba(167, 139, 250, 0.35); }
.cefr-tag.c1 { background: rgba(244, 63, 94, 0.18); color: #F43F5E; border: 1px solid rgba(244, 63, 94, 0.4); }

.pattern-tag {
  font-family: var(--mono); font-size: 10px; color: var(--ink-secondary);
  background: rgba(255, 255, 255, 0.05); padding: 3px 8px; border-radius: 6px;
}

/* Practice Inputs */
.test-input {
  background: rgba(7, 11, 24, 0.9); border: 1.5px solid var(--sky);
  color: #FFFFFF; font-family: var(--sans); font-size: 13.5px;
  padding: 5px 10px; border-radius: 6px; width: 130px; outline: none;
}
.test-input.correct { border-color: var(--green); background: rgba(37, 211, 102, 0.15); }
.test-input.wrong { border-color: var(--ruby); background: rgba(244, 63, 94, 0.15); }

/* Printable Worksheet Styles */
@media print {
  body { background: #FFFFFF !important; color: #162831 !important; font-size: 11pt !important; }
  .aurora-bg, .vault-nav, .vault-hero, .controls-panel, .practice-mode-bar, .btn-audio, .hero-cta-group {
    display: none !important;
  }
  .vault-container { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
  .table-wrap { border: none !important; box-shadow: none !important; }
  table.verbs-table { border: 1px solid #CCD7DE !important; font-size: 10pt !important; }
  thead th { background: #EAEFF2 !important; color: #162831 !important; border-bottom: 2px solid #556B77 !important; }
  tbody tr { border-bottom: 1px solid #CCD7DE !important; }
  tbody td { padding: 6px 10px !important; color: #162831 !important; }
  .print-header { display: block !important; margin-bottom: 18px; border-bottom: 2px solid #162831; padding-bottom: 12px; }
  .print-meta-row { display: flex !important; justify-content: space-between; margin-top: 10px; font-family: monospace; font-size: 10pt; }
  .print-title { font-family: serif; font-size: 20pt; font-weight: bold; }
}
.print-header { display: none; }
</style>
</head>
<body>

<div class="aurora-bg"></div>

<div class="vault-container">
  
  <!-- PRINT-ONLY HEADER FOR WORKSHEETS -->
  <div class="print-header">
    <div class="print-title">English Aurora — Master Irregular Verbs Worksheet</div>
    <div style="font-size: 10pt; color: #556B77; margin-top: 2px;">CEFR Curated Grammar Practice & Reference Vault</div>
    <div class="print-meta-row">
      <span>Student: _____________________________________</span>
      <span>Class / Level: ____________</span>
      <span>Date: ____________</span>
      <span>Score: ____ / 20 ⭐</span>
    </div>
  </div>

  <!-- NAVIGATION -->
  <nav class="vault-nav">
    <a href="index.html" class="brand-group">
      <div class="brand-emblem">🪐</div>
      <span class="brand-title">English Aurora</span>
    </a>
    <div class="nav-actions">
      <a href="ludoteca.html" class="nav-link">🎮 Ludoteca Arcade</a>
      <a href="herramientas/teacher-hub.html" class="nav-link">🧙‍♂️ Teacher's Hub</a>
      <a href="showcase/a1-articles-aurora-rpg.html" class="nav-link">🗺️ Master Sky</a>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <section class="vault-hero">
    <div class="hero-content">
      <div class="hero-badge"><span>⚡</span> High-Retention Linguistic Engine</div>
      <h1 class="hero-title">The Master Irregular Verbs Vault</h1>
      <p class="hero-desc">
        Never memorize disconnected verb tables again. Discover the 7 phonetic families that shape English irregulars, test your recall with 1-click neural audio, and print classroom-ready PDF worksheets with complete answer keys.
      </p>
    </div>
    <div class="hero-cta-group">
      <button class="btn-cta gold" onclick="window.print()">🖨️ Imprimir Ficha PDF</button>
      <button class="btn-cta teal" id="btn-toggle-practice">🎮 Modo Examen</button>
      <button class="btn-cta wa" onclick="shareVaultWhatsApp()">📲 Asignar por WhatsApp</button>
    </div>
  </section>

  <!-- CONTROLS PANEL -->
  <div class="controls-panel">
    <div class="search-row">
      <div class="search-input-wrap">
        <span class="search-icon">🔍</span>
        <input type="text" id="verb-search" placeholder="Buscar verbo en inglés o significado en español (ej: buy, sing, pensar)..." autocomplete="off">
      </div>
      <span id="counter-tag" style="font-family:var(--mono); font-size:12px; color:var(--gold); font-weight:700;">Mostrando 0 verbos</span>
    </div>

    <!-- CEFR Filters -->
    <div class="filter-pills-row">
      <span class="filter-label">Nivel CEFR:</span>
      <button class="pill-btn active" data-cefr="all">Todos</button>
      <button class="pill-btn" data-cefr="A1">A1 · Spark</button>
      <button class="pill-btn" data-cefr="A2">A2 · Verdant</button>
      <button class="pill-btn" data-cefr="B1">B1 · Sapphire</button>
      <button class="pill-btn" data-cefr="B2">B2 · Violet</button>
      <button class="pill-btn" data-cefr="C1">C1 · Ruby</button>
    </div>

    <!-- Mnemonic Pattern Filters -->
    <div class="filter-pills-row">
      <span class="filter-label">Patrón Mnemotécnico:</span>
      <button class="pill-btn pattern active" data-pattern="all">Todos los Patrones</button>
      <button class="pill-btn pattern" data-pattern="invariant">🛡️ Invariables (cut / cut / cut)</button>
      <button class="pill-btn pattern" data-pattern="ought">⚡ Familia -ought (buy / bought)</button>
      <button class="pill-btn pattern" data-pattern="iau">🎶 Melodía i - a - u (sing / sang / sung)</button>
      <button class="pill-btn pattern" data-pattern="en_participle">📜 Participio -en (write / written)</button>
      <button class="pill-btn pattern" data-pattern="d_to_t">🔄 d ➔ t (send / sent)</button>
      <button class="pill-btn pattern" data-pattern="vowel_shift">🌙 Cambio Vocálico (find / found)</button>
      <button class="pill-btn pattern" data-pattern="ew_own">🌬️ Familia -ew / -own (fly / flown)</button>
      <button class="pill-btn pattern" data-pattern="celestial">🌌 Celestiales Especiales (be, go, have)</button>
    </div>
  </div>

  <!-- PRACTICE MODE STATUS BAR -->
  <div class="practice-mode-bar" id="practice-bar">
    <div class="practice-instructions">
      <strong>🎯 Modo Examen Activo:</strong> Escribe la forma correcta en cada casilla y presiona [Enter] para verificar al instante.
    </div>
    <div class="practice-controls">
      <button class="pill-btn active" id="mode-hide-past">Ocultar Pasado Simple</button>
      <button class="pill-btn" id="mode-hide-part">Ocultar Participio</button>
      <button class="pill-btn" id="mode-reveal-all">💡 Revelar Todo</button>
    </div>
  </div>

  <!-- VERBS TABLE -->
  <div class="table-wrap">
    <table class="verbs-table">
      <thead>
        <tr>
          <th>Base Form (Infinitive)</th>
          <th>Past Simple</th>
          <th>Past Participle</th>
          <th>Significado (Español)</th>
          <th>CEFR</th>
          <th>Patrón</th>
        </tr>
      </thead>
      <tbody id="verbs-tbody"></tbody>
    </table>
  </div>

</div>

<!-- DATASET & LOGIC -->
<script>
const VERBS = __VERBS_DATA__;

let activeCefr = 'all';
let activePattern = 'all';
let searchQuery = '';
let isPracticeMode = false;
let practiceHideColumn = 'past'; // 'past' or 'part'

function speakWord(word, btnEl) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US';
    u.rate = 0.88;
    if (btnEl) btnEl.classList.add('playing');
    u.onend = () => { if (btnEl) btnEl.classList.remove('playing'); };
    u.onerror = () => { if (btnEl) btnEl.classList.remove('playing'); };
    window.speechSynthesis.speak(u);
  }
}

function renderTable() {
  const tbody = document.getElementById('verbs-tbody');
  tbody.innerHTML = '';

  const filtered = VERBS.filter(v => {
    const matchesCefr = (activeCefr === 'all') || (v.cefr === activeCefr);
    const matchesPattern = (activePattern === 'all') || (v.pattern === activePattern);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || v.base.toLowerCase().includes(q) || v.past.toLowerCase().includes(q) || v.part.toLowerCase().includes(q) || v.es.toLowerCase().includes(q);
    return matchesCefr && matchesPattern && matchesSearch;
  });

  document.getElementById('counter-tag').textContent = `Mostrando ${filtered.length} de ${VERBS.length} verbos`;

  filtered.forEach(v => {
    const tr = document.createElement('tr');

    // Base column
    const tdBase = document.createElement('td');
    tdBase.innerHTML = `
      <div class="word-cell">
        <button class="btn-audio" onclick="speakWord('${v.base}', this)" title="Escuchar pronunciación">🔊</button>
        <strong>${v.base}</strong>
      </div>
    `;

    // Past column
    const tdPast = document.createElement('td');
    if (isPracticeMode && practiceHideColumn === 'past') {
      tdPast.innerHTML = `
        <input type="text" class="test-input" data-answer="${v.past.toLowerCase()}" placeholder="Escribe pasado..." onkeydown="handleCheckInput(event, this)">
      `;
    } else {
      tdPast.innerHTML = `
        <div class="word-cell">
          <button class="btn-audio" onclick="speakWord('${v.past.split('/')[0].trim()}', this)" title="Escuchar pronunciación">🔊</button>
          <span>${v.past}</span>
        </div>
      `;
    }

    // Participle column
    const tdPart = document.createElement('td');
    if (isPracticeMode && practiceHideColumn === 'part') {
      tdPart.innerHTML = `
        <input type="text" class="test-input" data-answer="${v.part.toLowerCase()}" placeholder="Escribe participio..." onkeydown="handleCheckInput(event, this)">
      `;
    } else {
      tdPart.innerHTML = `
        <div class="word-cell">
          <button class="btn-audio" onclick="speakWord('${v.part.split('/')[0].trim()}', this)" title="Escuchar pronunciación">🔊</button>
          <span>${v.part}</span>
        </div>
      `;
    }

    // Meaning column
    const tdEs = document.createElement('td');
    tdEs.style.color = '#CCD7DE';
    tdEs.textContent = v.es;

    // CEFR column
    const tdCefr = document.createElement('td');
    tdCefr.innerHTML = `<span class="cefr-tag ${v.cefr.toLowerCase()}">${v.cefr}</span>`;

    // Pattern column
    const tdPat = document.createElement('td');
    const patLabels = {
      invariant: 'Invariable', ought: '-ought/-aught', iau: 'i-a-u',
      en_participle: '-en participio', d_to_t: 'd ➔ t',
      vowel_shift: 'Cambio vocálico', ew_own: '-ew/-own', celestial: 'Celestial'
    };
    tdPat.innerHTML = `<span class="pattern-tag">${patLabels[v.pattern] || v.pattern}</span>`;

    tr.appendChild(tdBase);
    tr.appendChild(tdPast);
    tr.appendChild(tdPart);
    tr.appendChild(tdEs);
    tr.appendChild(tdCefr);
    tr.appendChild(tdPat);
    tbody.appendChild(tr);
  });
}

function handleCheckInput(e, input) {
  if (e.key === 'Enter') {
    const val = input.value.trim().toLowerCase();
    const ans = input.dataset.answer;
    if (ans.includes(val) && val.length > 0) {
      input.classList.add('correct');
      input.classList.remove('wrong');
    } else {
      input.classList.add('wrong');
      input.classList.remove('correct');
    }
  }
}

// Search
document.getElementById('verb-search').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderTable();
});

// CEFR filter pills
document.querySelectorAll('.filter-pills-row button[data-cefr]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-pills-row button[data-cefr]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCefr = btn.dataset.cefr;
    renderTable();
  });
});

// Pattern filter pills
document.querySelectorAll('.filter-pills-row button[data-pattern]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-pills-row button[data-pattern]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activePattern = btn.dataset.pattern;
    renderTable();
  });
});

// Practice mode toggle
const btnPractice = document.getElementById('btn-toggle-practice');
const practiceBar = document.getElementById('practice-bar');

btnPractice.addEventListener('click', () => {
  isPracticeMode = !isPracticeMode;
  practiceBar.classList.toggle('active', isPracticeMode);
  btnPractice.textContent = isPracticeMode ? '✓ Salir del Examen' : '🎮 Modo Examen';
  renderTable();
});

document.getElementById('mode-hide-past').addEventListener('click', function() {
  document.getElementById('mode-hide-past').classList.add('active');
  document.getElementById('mode-hide-part').classList.remove('active');
  practiceHideColumn = 'past';
  renderTable();
});

document.getElementById('mode-hide-part').addEventListener('click', function() {
  document.getElementById('mode-hide-part').classList.add('active');
  document.getElementById('mode-hide-past').classList.remove('active');
  practiceHideColumn = 'part';
  renderTable();
});

document.getElementById('mode-reveal-all').addEventListener('click', function() {
  document.querySelectorAll('.test-input').forEach(inp => {
    inp.value = inp.dataset.answer;
    inp.classList.add('correct');
  });
});

// WhatsApp Viral Teacher Share
window.shareVaultWhatsApp = function() {
  const url = window.location.href;
  const msg = `⚡ *English Aurora — The Master Irregular Verbs Vault*\n¡Hola clase! Les comparto la bóveda interactiva de verbos irregulares en inglés con audio nativo en 1 clic y modo de práctica interactiva:\n👉 ${url}\n¡Entrenen los patrones mnemotécnicos y superen su examen! ⭐`;
  window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(msg), '_blank');
};

// Initial render
renderTable();
</script>

</body>
</html>
"""

def generate():
    rendered_html = HTML_CONTENT.replace('__VERBS_DATA__', json.dumps(VERBS_DATA, ensure_ascii=False))
    out_file = ROOT / 'verbos-irregulares.html'
    out_file.write_text(rendered_html, encoding='utf-8')
    print(f'[Vault] Generado con exito: {out_file} ({len(VERBS_DATA)} verbos irregulares)')

if __name__ == '__main__':
    generate()
