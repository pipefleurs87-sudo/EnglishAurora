import pathlib
import re
import json
import subprocess

files = [
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\ludoteca.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\meteor-words-pilot.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\constellation-match.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\gravity-sort.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\rapid-eclipse.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\riddles.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\signal-hunter.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\sound-catch.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\echo-chamber.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\pilots-cabin.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\unscramble-sentence.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\arcane-duel.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\rune-shifter.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\void-breaker.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\time-portal.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\astral-wordle.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\star-hangman.html',
    r'c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\juegos\cosmic-wordsearch.html'
]

errors = 0
for f in files:
    p = pathlib.Path(f)
    content = p.read_text(encoding='utf-8')
    
    # 1. Check title & meta description
    if '<title>' not in content or 'name="description"' not in content:
        print(f'SEO FAIL: {p.name} missing title or description')
        errors += 1
        
    # 2. Check JSON-LD
    json_ld_match = re.search(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
    if not json_ld_match:
        print(f'SEO FAIL: {p.name} missing JSON-LD')
        errors += 1
    else:
        try:
            parsed = json.loads(json_ld_match.group(1))
            if '@context' not in parsed:
                print(f'SEO FAIL: {p.name} invalid JSON-LD schema')
                errors += 1
        except Exception as e:
            print(f'SEO FAIL: {p.name} JSON-LD parse error: {e}')
            errors += 1
            
    # 3. Check Prerender on game files
    if p.parent.name == 'juegos':
        if 'seo-prerender-layer' not in content:
            print(f'SEO FAIL: {p.name} missing seo-prerender-layer')
            errors += 1
        if 'seo-triad-nav' not in content:
            print(f'SEO FAIL: {p.name} missing triad links in prerender')
            errors += 1
            
    # 4. Check JS Syntax
    scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
    for i, s in enumerate(scripts):
        js_path = pathlib.Path('temp_chk_seo.js')
        js_path.write_text(s, encoding='utf-8')
        res = subprocess.run(['node', '--check', str(js_path)], capture_output=True, text=True)
        js_path.unlink()
        if res.returncode != 0:
            print(f'JS FAIL: {p.name} Script {i}:', res.stderr)
            errors += 1

if errors == 0:
    print(f'ALL {len(files)} LUDOTECA AND GAME PAGES PASSED 100% OF THE 5 SEO RULES AUDIT!')
