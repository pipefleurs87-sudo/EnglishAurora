#!/usr/bin/env python3
# English Aurora — pipeline de datos del prototipo.
# Lee ../contenido/{nivel}/*.json (ola A) + waves/*.json (olas B y C)
# y emite js/data.js con TODO embebido (window.EA_DATA).
# Motivo: fetch() de JSON local falla EN SILENCIO bajo file://
# (incidente documentado 2026-07-10 en ARQUITECTURA.md). Embebido = cero fetch.
import json, glob, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENIDO = os.path.join(ROOT, "..", "contenido")
WAVES = os.path.join(ROOT, "waves")
OUT = os.path.join(ROOT, "js", "data.js")

def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)  # json.load valida: si trunca, aquí explota (no en silencio)

def base_id(wid):
    return re.sub(r"-\d{2}$", "", wid)

def area_de(tema):
    return tema.split("—")[0].split(" - ")[0].strip()

topics, waves = [], {}
for path in sorted(glob.glob(os.path.join(CONTENIDO, "*", "*.json"))):
    d = load(path)
    d["_base"] = base_id(d["id"])
    d["_wave"] = "a"
    topics.append(d)

for path in sorted(glob.glob(os.path.join(WAVES, "*.json"))):
    d = load(path)
    m = re.search(r"-(\d{2})$", d["id"])
    wave = {"02": "b", "03": "c"}.get(m.group(1) if m else "")
    if not wave:
        print("  ! ola ignorada (sufijo no reconocido):", d["id"])
        continue
    d["_base"] = base_id(d["id"])
    d["_wave"] = wave
    waves.setdefault(d["_base"], {})[wave] = d

# índice ligero para la landing (una estrella por tema)
index = []
for d in topics:
    n_ex = len(d.get("fases", {}).get("practica", {}).get("ejercicios", []))
    index.append({
        "id": d["id"], "base": d["_base"], "level": d["nivel"],
        "area": area_de(d.get("tema", "")), "title": d.get("tema", d["id"]),
        "meta": f"{n_ex} quests · senda completa + duelo final",
        "chips": d.get("habilidades", []),
        "waves": ["a"] + sorted(waves.get(d["_base"], {}).keys()),
    })

payload = {"index": index, "topics": topics, "waves": waves}
js = "/* GENERADO por build_data.py — no editar a mano */\n"
js += "window.EA_DATA = " + json.dumps(payload, ensure_ascii=False) + ";\n"
with open(OUT, "w", encoding="utf-8") as f:
    f.write(js)

# verificación anti-truncado: el archivo debe re-parsear como JS válido de una línea de datos
with open(OUT, encoding="utf-8") as f:
    back = f.read()
assert back.endswith(";\n"), "data.js no termina en ';' — posible truncado"
json.loads(back.split("=", 1)[1].strip().rstrip(";"))
print(f"OK · {len(topics)} temas (ola A) · "
      f"{sum(len(v) for v in waves.values())} olas B/C · "
      f"{len(index)} estrellas · {os.path.getsize(OUT)//1024} KB")
for b, w in sorted(waves.items()):
    print("  olas extra:", b, "→", ",".join(sorted(w.keys())))
