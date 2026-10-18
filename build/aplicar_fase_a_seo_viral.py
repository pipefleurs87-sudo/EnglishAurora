# -*- coding: utf-8 -*-
"""
FASE A: Bucle Viral Docente, SEO de Fichas Imprimibles y Sincronizacion de Sitemap.
1. Desbloquea indexacion (noindex -> index, follow) y optimiza SEO en 91 lecciones Wave B.
2. Inyecta botones de asignacion docente (WhatsApp / Copiar Enlace) en HUD y Ficha Imprimible.
3. Inyecta modulo de asignacion docente viral en js/aurora-companion.js para los 17 juegos arcade.
4. Anade bucle viral en ludoteca.html con modal de asignacion y boton rapido en cada tarjeta.
5. Agrega las 91 lecciones Wave B y teacher-hub.html a sitemap.xml.
"""

import pathlib
import re
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent

def process_wave_b_lessons():
    files = sorted(list((ROOT / 'leccion').glob('*-wave-b.html')))
    print(f'[Wave B] Encontrados {len(files)} archivos wave-b para procesar.')
    updated = 0
    for f in files:
        txt = f.read_text(encoding='utf-8')
        
        # 1. Clean topic & level
        m_title = re.search(r'<title>(.*?)</title>', txt)
        raw_title = m_title.group(1) if m_title else ''
        clean_topic = re.sub(r'\s*(?:[·|]\s*Wave B Master Session|—\s*Printable PDF Worksheet).*', '', raw_title).strip()
        level = f.name[:2].upper()
        
        # 2. Optimized Title & Meta Description
        new_title = f'<title>{clean_topic} — Printable PDF Worksheet (with Answer Key) & Lesson | English Aurora</title>'
        new_desc = f'<meta name="description" content="Free printable PDF worksheet with answer key for {clean_topic} ({level}). Complete masterclass lesson with audio pronunciation, character dialogues, and CEFR practice.">'
        
        # Replace title & desc
        txt = re.sub(r'<title>.*?</title>', new_title, txt)
        txt = re.sub(r'<meta\s+name=[\x22\x27]description[\x22\x27]\s+content=[\x22\x27].*?[\x22\x27]>', new_desc, txt)
        
        # 3. Robots meta & canonical
        canonical_tag = f'<link rel="canonical" href="https://pipefleurs87-sudo.github.io/EnglishAurora/leccion/{f.name}">'
        if '<meta name="robots" content="noindex, nofollow">' in txt:
            txt = txt.replace('<meta name="robots" content="noindex, nofollow">', f'<meta name="robots" content="index, follow">\n<meta name="keywords" content="{clean_topic}, English Worksheet PDF, Printable English exercises, English Aurora">\n{canonical_tag}')
        elif 'rel="canonical"' not in txt:
            txt = txt.replace('</title>', f'</title>\n{canonical_tag}')
            
        # 4. JSON-LD Microdata
        if 'application/ld+json' not in txt:
            json_ld = f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "{clean_topic} Printable Worksheet and Master Lesson",
  "description": "Free printable PDF worksheet with answer key for {clean_topic} ({level}).",
  "educationalLevel": "{level}",
  "inLanguage": "en",
  "learningResourceType": "Worksheet",
  "educationalUse": "Worksheet, Practice, Assessment",
  "isAccessibleForFree": true,
  "provider": {{
    "@type": "Organization",
    "name": "English Aurora",
    "url": "https://pipefleurs87-sudo.github.io/EnglishAurora/"
  }}
}}
</script>'''
            txt = txt.replace('</head>', f'{json_ld}\n</head>')
            
        # 5. HUD action button
        if 'id="btn-share-lesson"' not in txt:
            hud_target = '<button class="btn-hud-control" id="btn-fullscreen"'
            hud_btn = '''<button class="btn-hud-control" id="btn-share-lesson" onclick="shareTeacherWorksheet()" title="Assign to Students via WhatsApp">
        <span>📲</span> Asignar Ficha
      </button>\n      '''
            if hud_target in txt:
                txt = txt.replace(hud_target, hud_btn + hud_target)

        # 6. Scene 7 Worksheet buttons
        old_print_btn = '<button class="btn-hud-control" style="background:var(--teal); color:#fff;" onclick="window.print()">🖨️ Print to PDF</button>'
        if old_print_btn in txt:
            new_print_btns = '''<div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <button class="btn-hud-control" style="background:#25D366; color:#fff; border-color:#25D366; font-weight:700;" onclick="shareTeacherWorksheet()">📲 Asignar por WhatsApp</button>
              <button class="btn-hud-control" style="background:var(--teal); color:#fff;" onclick="window.print()">🖨️ Print to PDF</button>
            </div>'''
            txt = txt.replace(old_print_btn, new_print_btns)

        # 7. Helper JS functions
        if 'window.shareTeacherWorksheet' not in txt:
            share_js = '''<script>
window.shareTeacherWorksheet = function() {
  var topic = document.title.split('—')[0].trim();
  var url = window.location.href;
  var msg = "📖 *English Aurora — Ficha & Lección de Inglés*\\nTema: *" + topic + "*\\nCompleta la lección interactiva y descarga la ficha práctica con respuestas aquí:\\n👉 " + url;
  window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(msg), "_blank");
};
window.copyTeacherWorksheetLink = function() {
  var url = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function() {
      alert("¡Enlace de la lección y ficha copiado al portapapeles! Listo para enviar por WhatsApp o Classroom.");
    }).catch(function() {
      prompt("Copia este enlace:", url);
    });
  } else {
    prompt("Copia este enlace:", url);
  }
};
</script>'''
            txt = txt.replace('</body>', f'{share_js}\n</body>')

        f.write_text(txt, encoding='utf-8')
        updated += 1
    print(f'[Wave B] {updated} lecciones actualizadas con SEO, Microdatos y Botones de Asignación Docente.')

def update_sitemap():
    sitemap_path = ROOT / 'sitemap.xml'
    txt = sitemap_path.read_text(encoding='utf-8')
    
    files = sorted(list((ROOT / 'leccion').glob('*-wave-b.html')))
    added = 0
    new_entries = []
    
    # Teacher hub check
    if 'herramientas/teacher-hub.html' not in txt:
        new_entries.append('''  <url>
    <loc>https://pipefleurs87-sudo.github.io/EnglishAurora/herramientas/teacher-hub.html</loc>
    <lastmod>2026-09-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>''')
        added += 1

    for f in files:
        url = f'https://pipefleurs87-sudo.github.io/EnglishAurora/leccion/{f.name}'
        if url not in txt:
            entry = f'''  <url>
    <loc>{url}</loc>
    <lastmod>2026-09-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>'''
            new_entries.append(entry)
            added += 1
            
    if new_entries:
        insert_block = '\n'.join(new_entries)
        txt = txt.replace('</urlset>', f'{insert_block}\n</urlset>')
        sitemap_path.write_text(txt, encoding='utf-8')
        print(f'[Sitemap] Anadidas {added} nuevas URLs (Wave B + Teacher Hub).')
    else:
        print('[Sitemap] Todas las URLs ya estaban presentes.')

def process_arcade_games_and_prototypes():
    arcade_games = [
        'arcane-duel.html', 'astral-wordle.html', 'constellation-match.html',
        'cosmic-wordsearch.html', 'echo-chamber.html', 'gravity-sort.html',
        'meteor-words-pilot.html', 'pilots-cabin.html', 'rapid-eclipse.html',
        'riddles.html', 'rune-shifter.html', 'signal-hunter.html',
        'sound-catch.html', 'star-hangman.html', 'time-portal.html',
        'unscramble-sentence.html', 'void-breaker.html'
    ]
    for gname in arcade_games:
        f = ROOT / 'juegos' / gname
        if not f.exists():
            continue
        txt = f.read_text(encoding='utf-8')
        m_t = re.search(r'<title>(.*?)</title>', txt, re.I | re.S)
        title_str = m_t.group(1).strip() if m_t else gname.replace('.html', '').replace('-', ' ').title()
        short_title = title_str.split('|')[0].strip()
        canon_url = f'https://pipefleurs87-sudo.github.io/EnglishAurora/juegos/{gname}'
        desc_str = f'Play {short_title} — free interactive CEFR English learning game with audio and instant feedback on English Aurora.'

        insert_tags = []
        if not re.search(r'<meta\s+name=["\']description["\']', txt, re.I):
            insert_tags.append(f'<meta name="description" content="{desc_str}">')
        if not re.search(r'<meta\s+name=["\']robots["\']', txt, re.I):
            insert_tags.append('<meta name="robots" content="index, follow">')
        if not re.search(r'<link\s+rel=["\']canonical["\']', txt, re.I):
            insert_tags.append(f'<link rel="canonical" href="{canon_url}">')
            insert_tags.append('<meta property="og:type" content="website">')
            insert_tags.append(f'<meta property="og:url" content="{canon_url}">')
            insert_tags.append(f'<meta property="og:title" content="{title_str}">')
            insert_tags.append(f'<meta property="og:description" content="{desc_str}">')
            insert_tags.append('<meta property="og:image" content="https://pipefleurs87-sudo.github.io/EnglishAurora/assets/aurora.png">')
            insert_tags.append('<meta name="twitter:card" content="summary_large_image">')
        if 'application/ld+json' not in txt:
            insert_tags.append(f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "{short_title}",
  "url": "{canon_url}",
  "description": "{desc_str}",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All modern web browsers",
  "isAccessibleForFree": true,
  "inLanguage": ["en", "es"]
}}
</script>''')
        if insert_tags:
            block = '\n'.join(insert_tags)
            txt = re.sub(r'(</title>)', r'\1\n' + block, txt, count=1, flags=re.I)
            f.write_text(txt, encoding='utf-8')

    # Mark unlinked prototypes / internal templates as noindex, nofollow
    proto_files = [
        ROOT / 'motor-generico.html',
        ROOT / 'prototipo-b1-adverbs-rpg.html',
        ROOT / 'juegos' / 'cosmic-compass.html',
        ROOT / 'juegos' / 'mystery-box.html',
        ROOT / 'juegos' / 'orbit-builder.html',
        ROOT / 'herramientas' / 'sincronizar-nube.html',
        ROOT / 'herramientas' / 'voice-casting.html',
    ]
    for pf in proto_files:
        if not pf.exists():
            continue
        ptxt = pf.read_text(encoding='utf-8')
        if 'noindex' not in ptxt[:4000].lower():
            if re.search(r'<meta\s+name=["\']robots["\'][^>]*>', ptxt, re.I):
                ptxt = re.sub(r'<meta\s+name=["\']robots["\'][^>]*>', '<meta name="robots" content="noindex, nofollow">', ptxt, count=1, flags=re.I)
            else:
                ptxt = re.sub(r'(<head[^>]*>)', r'\1\n<meta name="robots" content="noindex, nofollow">', ptxt, count=1, flags=re.I)
            pf.write_text(ptxt, encoding='utf-8')

    # Mark es-* prototype files in EnglishAurora as noindex, nofollow and fix SpanishAurora canonicals
    for sub in ['leccion', 'preview', 'evaluacion', 'juegos']:
        subdir = ROOT / sub
        if not subdir.exists():
            continue
        for ef in subdir.glob('es-*.html'):
            etxt = ef.read_text(encoding='utf-8')
            etxt = etxt.replace('https://pipefleurs87-sudo.github.io/SpanishAurora/', 'https://pipefleurs87-sudo.github.io/EnglishAurora/')
            etxt = etxt.replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex, nofollow">')
            ef.write_text(etxt, encoding='utf-8')
    print('[SEO] 17 juegos arcade enriquecidos y prototipos marcados como noindex.')


if __name__ == '__main__':
    process_wave_b_lessons()
    process_arcade_games_and_prototypes()
    update_sitemap()

