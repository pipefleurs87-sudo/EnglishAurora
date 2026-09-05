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
        clean_topic = re.sub(r'\s*[·|]\s*Wave B Master Session.*', '', raw_title).strip()
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

if __name__ == '__main__':
    process_wave_b_lessons()
    update_sitemap()
