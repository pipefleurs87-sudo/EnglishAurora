#!/usr/bin/env python3
"""
CONECTOR CURRICULAR — LUDOTECA V2
Integra js/aurora-curriculum.js en todos los juegos de la Ludoteca
para que el vocabulario y las oraciones se alimenten directamente de las 85 lecciones.
"""

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
JUEGOS_DIR = ROOT / "juegos"

def update_game_script_tags():
    games = sorted(JUEGOS_DIR.glob("*.html"))
    print(f"Conectando {len(games)} juegos al motor curricular...")

    for g in games:
        content = g.read_text(encoding="utf-8")

        # Check if aurora-curriculum.js is present
        if "aurora-curriculum.js" not in content:
            # Place it right before aurora-companion.js
            if '<script src="../js/aurora-companion.js"></script>' in content:
                content = content.replace(
                    '<script src="../js/aurora-companion.js"></script>',
                    '<script src="../js/aurora-curriculum.js"></script>\n<script src="../js/aurora-companion.js"></script>'
                )
                g.write_text(content, encoding="utf-8")
                print(f"  [OK CONECTADO] {g.name} -> aurora-curriculum.js inyectado.")
            else:
                print(f"  [AVISO] {g.name} no tiene aurora-companion.js.")
        else:
            print(f"  [OK] {g.name} ya incluye aurora-curriculum.js.")

if __name__ == "__main__":
    update_game_script_tags()
