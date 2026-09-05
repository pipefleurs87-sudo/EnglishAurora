#!/usr/bin/env python3
"""
APLICADOR DE SEO CANÓNICO — LUDOTECA V2 (English Aurora)
Implementa las 5 Reglas Obligatorias de SEO:
1. Títulos y Meta Descriptions híbridos ES/EN.
2. Prerender rastreable en HTML plano dentro del DOM con vocabulario, oraciones y enlaces.
3. JSON-LD completo (WebApplication + BreadcrumbList).
4. Enlazado interno bidireccional (Lección ↔ Juego ↔ Hub).
5. Canonical, Open Graph y actualización de sitemap.xml.
"""

import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
JUEGOS_DIR = ROOT / "juegos"
BASE_URL = "https://pipefleurs87-sudo.github.io/EnglishAurora"

SEO_REGISTRY = {
    "meteor-words-pilot.html": {
        "name": "Meteor Words ☄️",
        "topic": "Vocabulario A1 y Constelaciones Semánticas",
        "cefr": "A1",
        "topic_id": "a1-adjectives-people-things-01",
        "title": "Meteor Words — Vocabulario A1 | Juegos para aprender inglés · English Aurora",
        "description": "Juego interactivo gratis de vocabulario en inglés (CEFR A1). Escucha la pronunciación neural de Aurora y asocia palabras con conceptos antes del impacto de meteoros.",
        "content_items": [
            ("tall", "Alto/a", "/tɔːl/", "High in height, reaching upward into the sky"),
            ("short", "Bajo/a o Corto/a", "/ʃɔːrt/", "Small in height or length"),
            ("friendly", "Amigable", "/ˈfrɛndli/", "Kind, warm and welcoming to others"),
            ("smart", "Inteligente", "/smɑːrt/", "Quick to learn and understand new ideas"),
            ("fast", "Rápido/a", "/fæst/", "Moving with high velocity and speed"),
            ("strong", "Fuerte", "/strɔːŋ/", "Having great physical strength and power"),
            ("doctor", "Médico/a", "/ˈdɒktər/", "A professional who heals and treats patients"),
            ("chef", "Cocinero/a", "/ʃɛf/", "A person who prepares delicious culinary meals"),
            ("pilot", "Piloto", "/ˈpaɪlət/", "A person qualified to fly aircraft and airplanes"),
            ("library", "Biblioteca", "/ˈlaɪbrəri/", "A building containing collections of books and records"),
            ("hospital", "Hospital", "/ˈhɒspɪtəl/", "An institution providing medical treatment and nursing care"),
            ("museum", "Museo", "/mjuːˈziːəm/", "A place where cultural and historical artifacts are preserved")
        ]
    },
    "constellation-match.html": {
        "name": "Constellation Match ⭐",
        "topic": "Alineación de Vocabulario y Memoria Astral",
        "cefr": "A1",
        "topic_id": "a1-adjectives-people-things-01",
        "title": "Constellation Match — Vocabulario y Memoria A1 | Juegos para aprender inglés · English Aurora",
        "description": "Empareja cristales de audio y conceptos visuales en inglés (CEFR A1). Conecta constelaciones estelares y refuerza tu memoria léxica gratis.",
        "content_items": [
            ("beautiful", "Hermoso/a", "/ˈbjuːtɪfəl/", "Pleasing to the senses or to the mind"),
            ("funny", "Divertido/a", "/ˈfʌni/", "Causing laughter or amusement"),
            ("architect", "Arquitecto/a", "/ˈɑːrkɪtɛkt/", "Designs and supervises building construction"),
            ("bakery", "Panadería", "/ˈbeɪkəri/", "A workplace where bread and cakes are baked"),
            ("hammer", "Martillo", "/ˈhæmər/", "A hand tool used to deliver impact to objects"),
            ("umbrella", "Paraguas", "/ʌmˈbrɛlə/", "A folding canopy for protection against rain")
        ]
    },
    "gravity-sort.html": {
        "name": "Gravity Sort 🪐",
        "topic": "Categorización Semántica Planetaria",
        "cefr": "A2",
        "topic_id": "a1-relative-clauses-professions-01",
        "title": "Gravity Sort — Categorización Semántica A2 | Juegos para aprender inglés · English Aurora",
        "description": "Clasifica palabras en inglés por órbitas planetarias (adjetivos, profesiones, lugares). Juego educativo interactivo de nivel A2 gratis.",
        "content_items": [
            ("Adjectives Orbit", "Órbita de Adjetivos", "Grammar", "tall, smart, fast, friendly, strong, young"),
            ("Professions Orbit", "Órbita de Profesiones", "Grammar", "doctor, chef, pilot, nurse, engineer, teacher"),
            ("Places Orbit", "Órbita de Lugares", "Grammar", "hospital, library, museum, airport, bakery, clinic")
        ]
    },
    "rapid-eclipse.html": {
        "name": "Rapid Eclipse 🌒",
        "topic": "Velocidad de Vocabulario y Reflejos",
        "cefr": "A2",
        "topic_id": "a1-adjectives-people-things-01",
        "title": "Rapid Eclipse — Velocidad de Vocabulario A2 | Juegos para aprender inglés · English Aurora",
        "description": "Desafío de 60 segundos de vocabulario en inglés (CEFR A2). Identifica conceptos astronómicos y amplía tu léxico con velocidad antes del eclipse.",
        "content_items": [
            ("Speed Recognition", "Reconocimiento rápido", "A2", "60-second timer challenge matching visual cues to English words"),
            ("Active Recall", "Evocación activa", "A2", "Instantaneous vocabulary identification without Spanish translation")
        ]
    },
    "riddles.html": {
        "name": "Celestial Riddles 📜",
        "topic": "Acertijos y Comprensión Auditiva",
        "cefr": "B1",
        "topic_id": "b1-indefinite-pronouns-01",
        "title": "Celestial Riddles — Acertijos en Inglés B1 | Juegos para aprender inglés · English Aurora",
        "description": "Escucha a Aurora narrar enigmas en inglés (CEFR B1) con voz neural de estudio y desbloquea cofres cósmicos con llaves sensoriales sin spoilers. Gratis.",
        "content_items": [
            ("Riddle 1", "I am high in height, reaching upward into the sky.", "Answer", "tall (Giraffe)"),
            ("Riddle 2", "I heal sick people and work in a hospital.", "Answer", "doctor (Doctor)"),
            ("Riddle 3", "I fly airplanes through clouds and across continents.", "Answer", "pilot (Pilot)"),
            ("Riddle 4", "I protect you from rain and shield you from the storm.", "Answer", "umbrella (Umbrella)"),
            ("Riddle 5", "I am a quiet sanctuary where thousands of books are kept.", "Answer", "library (Library)")
        ]
    },
    "signal-hunter.html": {
        "name": "Signal Hunter 📡",
        "topic": "Listening y Coordenadas de Radar",
        "cefr": "A2",
        "topic_id": "a1-prepositions-place-01",
        "title": "Signal Hunter — Listening y Direcciones A2 | Juegos para aprender inglés · English Aurora",
        "description": "Intercepta transmisiones de audio en inglés y ubica balizas en el radar de navegación. Práctica de listening para nivel A2 gratis.",
        "content_items": [
            ("Signal 1", "Target the emergency hospital beacon.", "Listening Target", "hospital"),
            ("Signal 2", "Navigate towards the airport runway.", "Listening Target", "airport"),
            ("Signal 3", "Lock onto the ancient museum station.", "Listening Target", "museum"),
            ("Signal 4", "Follow the signal to the grand library.", "Listening Target", "library"),
            ("Signal 5", "Establish contact with the chief pilot.", "Listening Target", "pilot")
        ]
    },
    "sound-catch.html": {
        "name": "Sound Catch 👂",
        "topic": "Pares Mínimos y Fonética",
        "cefr": "B1",
        "topic_id": "a1-adjectives-people-things-01",
        "title": "Sound Catch — Pares Mínimos y Fonética B1 | Juegos para aprender inglés · English Aurora",
        "description": "Distingue sonidos similares en inglés (ship/sheep, tree/three, pin/pen) con osciloscopio visual y audio neural de estudio. Nivel B1 gratis.",
        "content_items": [
            ("Minimal Pair 1", "ship /ʃɪp/ vs sheep /ʃiːp/", "Vowel length contrast /ɪ/ vs /iː/"),
            ("Minimal Pair 2", "tree /triː/ vs three /θriː/", "Consonant contrast /t/ vs /θ/"),
            ("Minimal Pair 3", "pin /pɪn/ vs pen /pɛn/", "Vowel height contrast /ɪ/ vs /ɛ/"),
            ("Minimal Pair 4", "hat /hæt/ vs hut /hʌt/", "Open vowel contrast /æ/ vs /ʌ/"),
            ("Minimal Pair 5", "bad /bæd/ vs bed /bɛd/", "Front vowel contrast /æ/ vs /ɛ/"),
            ("Minimal Pair 6", "live /lɪv/ vs leave /liːv/", "Vowel duration contrast /ɪ/ vs /iː/")
        ]
    },
    "echo-chamber.html": {
        "name": "Echo Chamber 🌊",
        "topic": "Entonación y Ritmo Oracional",
        "cefr": "B2",
        "topic_id": "b2-collocations-work-study-01",
        "title": "Echo Chamber — Entonación y Ritmo B2 | Juegos para aprender inglés · English Aurora",
        "description": "Identifica curvas de entonación y patrones de habla conectada en inglés nativo (CEFR B2). Juego interactivo de ritmo y fonética.",
        "content_items": [
            ("Intonation 1", "Are you coming with us tomorrow?", "Rising Cadence", "Yes/No Question intonation curve (↗)"),
            ("Intonation 2", "Where did you leave the keys?", "Falling Cadence", "Wh- Question intonation curve (↘)"),
            ("Intonation 3", "I would love a cup of warm tea.", "Falling Cadence", "Affirmative Statement pitch fall (↘)"),
            ("Intonation 4", "Do you prefer coffee or tea?", "Rise-Fall Cadence", "Alternative Question pitch wave (↗↘)")
        ]
    },
    "pilots-cabin.html": {
        "name": "Pilot's Cabin 🧭",
        "topic": "Comprensión Espacial Avanzada",
        "cefr": "C1",
        "topic_id": "c1-advanced-verbs-nuance-01",
        "title": "Pilot's Cabin — Comprensión Auditiva Avanzada C1 | Juegos para aprender inglés · English Aurora",
        "description": "Decodifica instrucciones complejas de navegación espacial en inglés C1. Giroscopio 3D interactivo y audio neural de estudio.",
        "content_items": [
            ("Vector East", "Set heading 090 East, decelerate to sub-warp velocity, and enter standard orbit around Sector 7.", "Direction", "East (90°)"),
            ("Vector South", "Veer 180 degrees South to avoid incoming solar debris, then dock at the tertiary hangar.", "Direction", "South (180°)"),
            ("Vector North", "Ascend vertically toward the North nebula, calibrate shield frequency to forty megahertz, and transmit the quantum beacon.", "Direction", "North (0°)"),
            ("Vector West", "Engage reverse thrusters toward the West quadrant, scan for gravitational anomalies, and initiate atmospheric descent.", "Direction", "West (270°)")
        ]
    },
    "unscramble-sentence.html": {
        "name": "Unscramble the Sentence 🚀",
        "topic": "Orden Sintáctico de Oraciones",
        "cefr": "A2",
        "topic_id": "a1-present-simple-routines-01",
        "title": "Unscramble the Sentence — Orden Sintáctico A2 | Juegos para aprender inglés · English Aurora",
        "description": "Ordena asteroides de palabras en la estructura gramatical correcta en inglés (CEFR A2). Ensamblaje sintáctico interactivo gratis.",
        "content_items": [
            ("Sentence 1", "She reads a book every night.", "Structure", "Subject + Verb(s) + Object + Time Expression"),
            ("Sentence 2", "They are flying to London tomorrow.", "Structure", "Subject + Auxiliary (be) + Verb-ing + Prepositional Phrase"),
            ("Sentence 3", "The doctor helped the patient yesterday.", "Structure", "Subject + Past Simple Verb + Object + Time Marker"),
            ("Sentence 4", "We have already visited the museum.", "Structure", "Subject + have + Adverb + Past Participle + Object"),
            ("Sentence 5", "He is a very smart architect.", "Structure", "Subject + be + Indefinite Article + Adverb + Adjective + Noun")
        ]
    },
    "arcane-duel.html": {
        "name": "Arcane Duel 🛡️",
        "topic": "Duelo de Artículos Gramaticales",
        "cefr": "A1",
        "topic_id": "a1-articles-01",
        "title": "Arcane Duel — Artículos a/an/the A1 | Juegos para aprender inglés · English Aurora",
        "description": "Combate monstruos gramaticales lanzando hechizos de artículos en inglés (a, an, the, zero). Juego RPG educativo CEFR A1 gratis.",
        "content_items": [
            ("Spell 1", "I bought ___ umbrella yesterday.", "Correct Rune", "AN (vowel sound /ʌ/)"),
            ("Spell 2", "She is ___ doctor at the clinic.", "Correct Rune", "A (consonant sound /d/)"),
            ("Spell 3", "Look at ___ moon in the sky.", "Correct Rune", "THE (unique celestial body)"),
            ("Spell 4", "They enjoy drinking ___ fresh water.", "Correct Rune", "∅ ZERO (uncountable generic noun)")
        ]
    },
    "rune-shifter.html": {
        "name": "Rune Shifter 🔮",
        "topic": "Determinantes y Cuantificadores",
        "cefr": "B1",
        "topic_id": "b1-indefinite-pronouns-01",
        "title": "Rune Shifter — Determinantes y Cuantificadores B1 | Juegos para aprender inglés · English Aurora",
        "description": "Encaja artículos y determinantes en ranuras de runas antes de que se bloquee el portal. Práctica gramatical CEFR B1 interactiva.",
        "content_items": [
            ("Rune Slot 1", "She found ___ ancient artifact in the desert.", "Target", "AN (vowel initial)"),
            ("Rune Slot 2", "He solved ___ difficult math problem.", "Target", "A (consonant initial)"),
            ("Rune Slot 3", "We crossed ___ Atlantic Ocean on a ship.", "Target", "THE (oceans and seas)"),
            ("Rune Slot 4", "___ gold is a precious metal.", "Target", "∅ ZERO (uncountable generic)")
        ]
    },
    "void-breaker.html": {
        "name": "Void Breaker 🌌",
        "topic": "Verbos Auxiliares y Pasados",
        "cefr": "B2",
        "topic_id": "b1-past-perfect-01",
        "title": "Void Breaker — Tiempos Verbales y Auxiliares B2 | Juegos para aprender inglés · English Aurora",
        "description": "Completa oraciones en inglés bajo velocidad cósmica seleccionando el auxiliar o pasado correcto. Gramática CEFR B2 gratis.",
        "content_items": [
            ("Gap 1", "They ___ already finished their mission.", "Correct Verb", "have (Present Perfect)"),
            ("Gap 2", "She ___ to Paris last summer.", "Correct Verb", "went (Irregular Past Simple)"),
            ("Gap 3", "Where ___ you meet your best friend?", "Correct Verb", "did (Past Simple Question Auxiliary)"),
            ("Gap 4", "He ___ reading a book when the lights went out.", "Correct Verb", "was (Past Continuous Auxiliary)"),
            ("Gap 5", "We ___ travel across the star cluster soon.", "Correct Verb", "will (Future Modal Auxiliary)")
        ]
    },
    "time-portal.html": {
        "name": "Time Portal ⏳",
        "topic": "Transformación Cronológica de Tiempos",
        "cefr": "C1",
        "topic_id": "c1-advanced-verbs-nuance-01",
        "title": "Time Portal — Transformación de Tiempos C1 | Juegos para aprender inglés · English Aurora",
        "description": "Transforma oraciones entre presente, pasado, futuro y perfecto a través de portales temporales. Nivel CEFR C1 avanzado.",
        "content_items": [
            ("Shift 1", "I write a letter to my friend -> Past Simple", "Transform", "I wrote a letter to my friend."),
            ("Shift 2", "They fly to London every winter -> Future (Will)", "Transform", "They will fly to London next winter."),
            ("Shift 3", "She reads an ancient book -> Present Continuous", "Transform", "She is reading an ancient book right now."),
            ("Shift 4", "We visit the grand museum -> Present Perfect", "Transform", "We have visited the grand museum.")
        ]
    }
}

def generate_json_ld(meta, filename):
    url = f"{BASE_URL}/juegos/{filename}"
    cefr = meta["cefr"]
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "@id": f"{url}#app",
                "name": meta["title"],
                "url": url,
                "description": meta["description"],
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "All modern web browsers",
                "isAccessibleForFree": True,
                "inLanguage": ["en", "es"],
                "educationalLevel": f"CEFR {cefr}",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "publisher": {
                    "@type": "EducationalOrganization",
                    "name": "English Aurora",
                    "url": BASE_URL
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": f"{url}#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Inicio",
                        "item": f"{BASE_URL}/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Ludoteca",
                        "item": f"{BASE_URL}/ludoteca.html"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": f"Nivel {cefr}",
                        "item": f"{BASE_URL}/ludoteca.html?level={cefr.lower()}"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": meta["name"]
                    }
                ]
            }
        ]
    }

def generate_prerender_html(meta):
    topic_id = meta["topic_id"]
    cefr = meta["cefr"]
    items_html = ""
    for item in meta["content_items"]:
        if len(item) == 4:
            word, es, ipa, clue = item
            items_html += f"      <li class=\"seo-item\"><strong>{word}</strong> <span class=\"seo-ipa\">{ipa}</span> — <em>{es}</em>: <span class=\"seo-clue\">{clue}</span></li>\n"
        elif len(item) == 3:
            term, es, clue = item
            items_html += f"      <li class=\"seo-item\"><strong>{term}</strong> — <em>{es}</em>: <span class=\"seo-clue\">{clue}</span></li>\n"
        else:
            items_html += f"      <li class=\"seo-item\">{item[0]}: {item[1]}</li>\n"

    return f"""
  <!-- ========================================================================= -->
  <!-- REGLA 2 SEO: PRERENDER RASTREABLE ESTÁTICO (DOM PLANO PARA GOOGLE CRAWLER) -->
  <!-- ========================================================================= -->
  <section class="seo-prerender-layer" aria-label="Contenido pedagógico y vocabulario de la lección">
    <div class="seo-prerender-card">
      <header class="seo-header">
        <h1 class="seo-game-title">{meta['name']} — {meta['topic']}</h1>
        <p class="seo-lead">Juego educativo interactivo gratis para aprender inglés en nivel <strong>CEFR {cefr}</strong> con el método sensorial de <strong>English Aurora</strong>.</p>
      </header>

      <div class="seo-content-block">
        <h2 class="seo-section-title">Contenido pedagógico y banco léxico evaluado:</h2>
        <ul class="seo-items-list">
{items_html}        </ul>
      </div>

      <nav class="seo-triad-nav" aria-label="Tríada pedagógica del tema">
        <span class="seo-triad-label">Tríada Pedagógica Completa:</span>
        <a class="seo-nav-link" href="../leccion/{topic_id}.html">📖 Ver Lección Teórica</a>
        <a class="seo-nav-link" href="../preview/{topic_id}.html">✏️ Práctica Cognitiva</a>
        <a class="seo-nav-link" href="../evaluacion/{topic_id}.html">✓ Evaluación del Tema</a>
        <a class="seo-nav-link hub" href="../ludoteca.html">🌌 Hub Central de Juegos (Ludoteca)</a>
      </nav>
    </div>
  </section>
"""

SEO_STYLE = """
/* SEO Prerender Accessible Styling (Visible to Crawlers & Collapsible) */
.seo-prerender-layer {
  position: relative; z-index: 5; max-width: 860px; margin: 20px auto 40px;
  padding: 0 16px; color: var(--paper); font-family: var(--sans);
}
.seo-prerender-card {
  background: rgba(13, 22, 38, 0.92); border: 1px solid rgba(45, 212, 191, 0.25);
  border-radius: 14px; padding: 20px 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.6);
}
.seo-game-title { font-family: var(--serif); font-size: 18px; color: var(--gold); margin-bottom: 6px; }
.seo-lead { font-size: 13px; color: var(--muted); line-height: 1.5; margin-bottom: 14px; }
.seo-section-title { font-family: var(--serif); font-size: 14px; color: var(--teal); margin-bottom: 8px; }
.seo-items-list { list-style: square; padding-left: 20px; font-size: 12.5px; color: var(--paper); line-height: 1.6; margin-bottom: 16px; }
.seo-ipa { font-family: var(--mono); color: var(--gold); font-size: 11.5px; }
.seo-clue { color: var(--muted); }
.seo-triad-nav { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; }
.seo-triad-label { font-family: var(--mono); font-size: 11px; color: var(--muted); text-transform: uppercase; }
.seo-nav-link { font-family: var(--mono); font-size: 11.5px; color: var(--teal); text-decoration: none; padding: 4px 10px; background: rgba(45,212,191,0.08); border-radius: 6px; border: 1px solid var(--teal-dim); transition: all 0.2s ease; }
.seo-nav-link:hover { background: rgba(242,193,78,0.15); border-color: var(--gold); color: var(--gold); }
.seo-nav-link.hub { color: var(--gold); border-color: var(--gold-dim); background: rgba(242,193,78,0.1); }
"""

def update_game_file(filename, meta):
    path = JUEGOS_DIR / filename
    if not path.exists():
        print(f"Error: {filename} no existe.")
        return False

    content = path.read_text(encoding="utf-8")

    # 1. Update <html lang="es">
    content = re.sub(r'<html\s+lang=["\'][^"\']*["\']>', '<html lang="es">', content, count=1)

    # 2. Update <title>
    title_tag = f"<title>{meta['title']}</title>"
    content = re.sub(r'<title>.*?</title>', title_tag, content, count=1)

    # 3. Inject Meta Tags (Description, Canonical, OpenGraph) & JSON-LD
    json_ld_str = json.dumps(generate_json_ld(meta, filename), ensure_ascii=False, indent=2)
    canonical_url = f"{BASE_URL}/juegos/{filename}"

    seo_meta_block = f"""
<!-- REGLA 1 & 5 SEO: META DESCRIPTION, CANONICAL & OPEN GRAPH -->
<meta name="description" content="{meta['description']}">
<link rel="canonical" href="{canonical_url}">
<meta property="og:type" content="website">
<meta property="og:url" content="{canonical_url}">
<meta property="og:title" content="{meta['title']}">
<meta property="og:description" content="{meta['description']}">
<meta property="og:image" content="{BASE_URL}/assets/aurora.png">
<meta name="twitter:card" content="summary_large_image">

<!-- REGLA 3 SEO: DATOS ESTRUCTURADOS JSON-LD (WebApplication & Breadcrumbs) -->
<script type="application/ld+json">
{json_ld_str}
</script>
"""

    if "application/ld+json" in content:
        content = re.sub(r'<!-- REGLA 1 & 5.*?<\/script>', '', content, flags=re.DOTALL)
        content = re.sub(r'<script type="application/ld\+json">.*?<\/script>', '', content, flags=re.DOTALL)

    content = content.replace("</head>", f"{seo_meta_block}</head>")

    # 4. Inject SEO styles if not present
    if ".seo-prerender-layer" not in content:
        content = content.replace("</style>", f"{SEO_STYLE}\n</style>")

    # 5. Inject SEO Prerender Layer right before </body>
    prerender_html = generate_prerender_html(meta)
    if "seo-prerender-layer" in content:
        content = re.sub(r'<!-- ========================================================================= -->\s*<!-- REGLA 2 SEO: PRERENDER.*?<\/section>', '', content, flags=re.DOTALL)

    content = content.replace("</body>", f"{prerender_html}\n</body>")

    path.write_text(content, encoding="utf-8")
    print(f"  [OK SEO] {filename} -> Title, Meta, JSON-LD, Prerender & Enlaces inyectados.")
    return True

def update_ludoteca_hub():
    path = ROOT / "ludoteca.html"
    content = path.read_text(encoding="utf-8")

    title = "Juegos para Aprender Inglés Gratis — La Ludoteca Arcade · English Aurora"
    desc = "Juega y domina el inglés por niveles CEFR (A1 a C1). 14 juegos interactivos de vocabulario, listening y gramática con Aurora, tu mentora cósmica de voz neural."
    canonical = f"{BASE_URL}/ludoteca.html"

    json_ld = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": f"{canonical}#webpage",
                "name": title,
                "url": canonical,
                "description": desc,
                "inLanguage": ["es", "en"],
                "isPartOf": {
                    "@type": "WebSite",
                    "name": "English Aurora",
                    "url": BASE_URL
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": f"{canonical}#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Inicio",
                        "item": f"{BASE_URL}/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Ludoteca"
                    }
                ]
            }
        ]
    }
    json_ld_str = json.dumps(json_ld, ensure_ascii=False, indent=2)

    # 1. Update <html lang="es">
    content = re.sub(r'<html\s+lang=["\'][^"\']*["\']>', '<html lang="es">', content, count=1)

    # 2. Title
    content = re.sub(r'<title>.*?</title>', f"<title>{title}</title>", content, count=1)

    # 3. Meta & JSON-LD
    seo_meta = f"""
<!-- REGLA 1 & 5 SEO: META DESCRIPTION, CANONICAL & OPEN GRAPH -->
<meta name="description" content="{desc}">
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="website">
<meta property="og:url" content="{canonical}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{BASE_URL}/assets/aurora.png">
<meta name="twitter:card" content="summary_large_image">

<!-- REGLA 3 SEO: DATOS ESTRUCTURADOS JSON-LD (Hub) -->
<script type="application/ld+json">
{json_ld_str}
</script>
"""
    if "application/ld+json" in content:
        content = re.sub(r'<!-- REGLA 1 & 5.*?<\/script>', '', content, flags=re.DOTALL)
        content = re.sub(r'<script type="application/ld\+json">.*?<\/script>', '', content, flags=re.DOTALL)

    content = content.replace("</head>", f"{seo_meta}</head>")
    path.write_text(content, encoding="utf-8")
    print("  [OK SEO] ludoteca.html -> Hub actualizado.")

def update_sitemap():
    path = ROOT / "sitemap.xml"
    content = path.read_text(encoding="utf-8")

    # Add all game URLs with priority 0.8 and ludoteca with 0.9
    new_entries = []
    hub_url = f"{BASE_URL}/ludoteca.html"
    if f"<loc>{hub_url}</loc>" not in content:
        new_entries.append(f"  <url><loc>{hub_url}</loc><lastmod>2026-08-27</lastmod><priority>0.9</priority></url>")

    for filename in SEO_REGISTRY.keys():
        game_url = f"{BASE_URL}/juegos/{filename}"
        if f"<loc>{game_url}</loc>" not in content:
            new_entries.append(f"  <url><loc>{game_url}</loc><lastmod>2026-08-27</lastmod><priority>0.8</priority></url>")

    if new_entries:
        insert_str = "\n" + "\n".join(new_entries) + "\n</urlset>"
        content = content.replace("</urlset>", insert_str)
        path.write_text(content, encoding="utf-8")
        print(f"  [OK SEO] sitemap.xml -> {len(new_entries)} nuevas URLs de juegos añadidas.")
    else:
        print("  [OK SEO] sitemap.xml ya contenía todas las URLs.")

def main():
    print("=== APLICANDO LAS 5 REGLAS OBLIGATORIAS DE SEO A TODA LA LUDOTECA V2 ===")
    for filename, meta in SEO_REGISTRY.items():
        update_game_file(filename, meta)
    update_ludoteca_hub()
    update_sitemap()
    print("\n¡Todas las páginas de la Ludoteca v2 cumplen la Puerta de Salida SEO al 100%!")

if __name__ == "__main__":
    main()
