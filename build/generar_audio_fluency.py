#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GENERADOR DE AUDIO — Fluency Practice (hermano de generar_audio_listening.py)

Corre en la MAQUINA DE FELIPE (el sandbox de Claude no alcanza el endpoint de edge-tts).
Uso tipico en Windows:
    py -3.14 -m pip install edge-tts
    py -3.14 build\\generar_audio_fluency.py --nivel B1

Genera un MP3 por linea de fluidez en:   audio/{tema_id}/fluency/{n}.mp3
Orden de numeracion (== el que busca motor/fluency-generico.html):
    1..k  -> fases.fluency.shadowing  (o el banco_oraciones si no hay shadowing)
    k+1   -> fases.fluency.retelling.source  (el modelo a recontar)

NO toca audio/{tema}/1..6.mp3 (los del listening, ya en produccion). Solo escribe
dentro de la subcarpeta fluency/. Si un archivo ya existe, lo salta (usa --forzar
para regenerarlo).

Humanizador (misma decision del 17 jul 2026): Capa 1 unicamente — jitter aleatorio
de rate/pitch por linea + ajuste por puntuacion. La Capa 2 (aecho/loudnorm) sonaba
PEOR en clips cortos y quedo detras de --con-eco, no recomendada.
La pausa final se hornea DENTRO del mp3 con ffmpeg, para que el motor encadene solo
con el evento 'ended' y nunca con setTimeout (regla dura del CLAUDE.md).
"""
import argparse, asyncio, json, pathlib, random, re, shutil, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENIDO = ROOT / "contenido"
AUDIO = ROOT / "audio"

# Voces por personaje — mismo reparto que el generador de listening.
VOZ_PERSONAJE = {
    "sofia":  "en-US-JennyNeural",
    "sofía":  "en-US-JennyNeural",
    "ben":    "en-GB-RyanNeural",
    "kenji":  "en-US-GuyNeural",
    "carmen": "en-GB-SoniaNeural",
    "abuela": "en-GB-SoniaNeural",
}
VOZ_NARRADOR = "en-US-JennyNeural"   # shadowing / modelo de retelling sin personaje claro

# Base por voz: (rate%, pitch Hz)
BASE = {
    "en-US-JennyNeural": (-4, 0),
    "en-GB-RyanNeural":  (-8, -2),
    "en-US-GuyNeural":   (2, 1),
    "en-GB-SoniaNeural": (-12, -4),
}

def voz_para(texto, forzada=None):
    if forzada:
        return forzada
    t = texto.lower()
    # Si la linea habla DE un personaje, se locuta con su voz (da variedad natural
    # entre clips del mismo tema sin inventar atribuciones).
    for clave, voz in VOZ_PERSONAJE.items():
        if re.search(r"\b" + re.escape(clave) + r"\b", t):
            return voz
    return VOZ_NARRADOR

def prosodia(texto, voz, humanizar=True):
    """Capa 1 del humanizador: jitter por linea + ajuste por puntuacion."""
    rate, pitch = BASE.get(voz, (0, 0))
    if humanizar:
        rate += random.randint(-3, 3)
        pitch += random.randint(-2, 2)
        if texto.rstrip().endswith("?"):
            pitch += 2                      # las preguntas suben
        if texto.rstrip().endswith("!"):
            rate += 3                       # las exclamaciones aceleran
        if len(texto.split()) > 25:
            rate -= 2                       # frases largas, un pelo mas lentas
    return f"{rate:+d}%", f"{pitch:+d}Hz"

def pausa_final(texto):
    """Pausa horneada al final del clip (ms). Mas aire si cierra idea larga."""
    n = len(texto.split())
    if n > 25: return 500
    if n > 12: return 380
    return 260

def items_de(data):
    """Devuelve [(n, texto, rol)] en el MISMO orden que espera el motor."""
    fl = (data.get("fases") or {}).get("fluency")
    if not fl:
        return []
    shadow = fl.get("shadowing") or [o.get("oracion", "") for o in data.get("banco_oraciones", [])][:8]
    shadow = [s for s in shadow if s]
    out = [(i + 1, s, "shadowing") for i, s in enumerate(shadow)]
    src = (fl.get("retelling") or {}).get("source")
    if src:
        out.append((len(shadow) + 1, src, "retelling_model"))
    return out

async def sintetizar(texto, voz, rate, pitch, destino):
    import edge_tts
    com = edge_tts.Communicate(texto, voz, rate=rate, pitch=pitch)
    await com.save(str(destino))

def hornear_pausa(origen, destino, ms, con_eco=False):
    """ffmpeg: agrega silencio al final (y eco solo si se pide explicitamente)."""
    if not shutil.which("ffmpeg"):
        shutil.copy(origen, destino)
        return False
    filtros = ["apad=pad_dur=%.3f" % (ms / 1000.0)]
    if con_eco:   # NO recomendado: sonaba peor en clips cortos (17 jul 2026)
        filtros.insert(0, "aecho=0.8:0.85:12:0.15")
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-i", str(origen),
           "-af", ",".join(filtros), "-codec:a", "libmp3lame", "-q:a", "4", str(destino)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        shutil.copy(origen, destino)
        return False
    return True

def cargar(nivel=None, tema=None):
    seqs = []
    for jf in sorted(CONTENIDO.rglob("*.json")):
        data = json.loads(jf.read_text(encoding="utf-8"))
        if nivel and data.get("nivel", "").upper() != nivel.upper():
            continue
        if tema and data.get("id") != tema:
            continue
        if (data.get("fases") or {}).get("fluency"):
            seqs.append(data)
    return seqs

async def procesar(seqs, humanizar, forzar, con_eco):
    total = hechos = saltados = fallidos = 0
    for data in seqs:
        tid = data["id"]
        destino_dir = AUDIO / tid / "fluency"
        destino_dir.mkdir(parents=True, exist_ok=True)
        print(f"\n=== {tid} ({data.get('nivel','?')}) ===")
        for n, texto, rol in items_de(data):
            total += 1
            final = destino_dir / f"{n}.mp3"
            if final.exists() and not forzar:
                print(f"  · {n}.mp3 ya existe — saltado")
                saltados += 1
                continue
            voz = voz_para(texto)
            rate, pitch = prosodia(texto, voz, humanizar)
            try:
                with tempfile.TemporaryDirectory() as td:
                    crudo = pathlib.Path(td) / "crudo.mp3"
                    await sintetizar(texto, voz, rate, pitch, crudo)
                    hornear_pausa(crudo, final, pausa_final(texto), con_eco)
                kb = final.stat().st_size / 1024
                print(f"  OK {n}.mp3  [{rol}] {voz} {rate} {pitch}  {kb:.0f} KB")
                hechos += 1
            except Exception as e:
                print(f"  !! {n}.mp3 FALLO: {type(e).__name__}: {str(e)[:90]}")
                fallidos += 1
    print(f"\nResumen: {hechos} generados · {saltados} saltados · {fallidos} fallidos · {total} totales")
    return fallidos

def main():
    ap = argparse.ArgumentParser(description="Genera el audio humanizado de Fluency Practice.")
    ap.add_argument("--nivel", help="Solo este nivel (A1, B1, B2, C1...)")
    ap.add_argument("--tema", help="Solo este tema_id")
    ap.add_argument("--sin-humanizar", action="store_true", help="TTS crudo, sin jitter")
    ap.add_argument("--con-eco", action="store_true", help="Capa 2 (eco). NO recomendada en clips cortos.")
    ap.add_argument("--forzar", action="store_true", help="Regenerar aunque el mp3 ya exista")
    ap.add_argument("--listar", action="store_true", help="Solo mostrar que se generaria")
    ap.add_argument("--semilla", type=int, default=None, help="Semilla para el jitter (reproducible)")
    args = ap.parse_args()

    if args.semilla is not None:
        random.seed(args.semilla)

    seqs = cargar(args.nivel, args.tema)
    if not seqs:
        print("No hay temas con fases.fluency para ese filtro.")
        return 0

    if args.listar:
        n = 0
        for d in seqs:
            print(f"\n=== {d['id']} ===")
            for num, texto, rol in items_de(d):
                voz = voz_para(texto)
                print(f"  audio/{d['id']}/fluency/{num}.mp3  [{rol}] {voz}")
                print(f"     \"{texto[:100]}{'...' if len(texto) > 100 else ''}\"")
                n += 1
        print(f"\n{n} clips en {len(seqs)} temas.")
        return 0

    try:
        import edge_tts  # noqa: F401
    except ImportError:
        print("FALTA edge-tts. Instala con:  py -3.14 -m pip install edge-tts")
        return 1

    fallidos = asyncio.run(procesar(seqs, not args.sin_humanizar, args.forzar, args.con_eco))
    return 1 if fallidos else 0

if __name__ == "__main__":
    sys.exit(main())
