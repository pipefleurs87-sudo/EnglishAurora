#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GENERADOR DE AUDIO HUMANIZADO — Listening Practice
Hermano de generar_audio_fluency.py.

Genera un MP3 por linea del guion de listening en:
    audio/{tema_id}/{n}.mp3

Orden de numeracion:
    1..N -> fases.listening.guion (1-indexed)

Voces canónicas del Cast:
- Sofía:        en-US-AvaNeural   (rate=-2%, pitch=+0Hz)
- Ben:          en-GB-RyanNeural  (rate=-6%, pitch=-2Hz)
- Kenji:        en-US-GuyNeural   (rate=+1%, pitch=+1Hz)
- Abuela Carmen:en-GB-SoniaNeural (rate=-10%, pitch=-4Hz)
- Aurora:       en-US-AriaNeural  (rate=-3%, pitch=+4Hz)

Uso:
    python build/generar_audio_listening.py --tema b1-indefinite-pronouns-01
    python build/generar_audio_listening.py --faltantes
"""

import argparse
import asyncio
import json
import pathlib
import random
import re
import shutil
import ssl
import sys

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

import edge_tts
import edge_tts.communicate
edge_tts.communicate._SSL_CTX = ssl_ctx

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENIDO = ROOT / "contenido"
AUDIO = ROOT / "audio"

VOZ_PERSONAJE = {
    "sofia": "en-US-AvaNeural",
    "sofía": "en-US-AvaNeural",
    "ben": "en-GB-RyanNeural",
    "kenji": "en-US-GuyNeural",
    "carmen": "en-GB-SoniaNeural",
    "abuela carmen": "en-GB-SoniaNeural",
    "abuela": "en-GB-SoniaNeural",
    "aurora": "en-US-AriaNeural",
}
VOZ_DEFAULT = "en-US-AvaNeural"

BASE_PROSODIA = {
    "en-US-AvaNeural": (-2, 0),
    "en-GB-RyanNeural": (-6, -2),
    "en-US-GuyNeural": (1, 1),
    "en-GB-SoniaNeural": (-10, -4),
    "en-US-AriaNeural": (-3, 4),
}

def resolver_voz(nombre_personaje):
    n = nombre_personaje.lower().strip()
    for k, v in VOZ_PERSONAJE.items():
        if k in n:
            return v
    return VOZ_DEFAULT

def calcular_prosodia(texto, voz, humanizar=True):
    base_rate, base_pitch = BASE_PROSODIA.get(voz, (0, 0))
    rate = base_rate
    pitch = base_pitch
    if humanizar:
        rate += random.randint(-2, 2)
        pitch += random.randint(-1, 1)
        t_strip = texto.rstrip()
        if t_strip.endswith("?"):
            pitch += 2
        elif t_strip.endswith("!"):
            rate += 2
        if len(texto.split()) > 20:
            rate -= 2
    return f"{rate:+d}%", f"{pitch:+d}Hz"

def limpiar_texto(linea):
    """Separa interlocutor y texto hablado, removiendo markdown **."""
    idx = linea.find(":")
    if idx > 0:
        who = linea[:idx].strip()
        spoken = linea[idx+1:].strip()
    else:
        who = ""
        spoken = linea.strip()
    # Limpiar markdown bold / italics
    spoken_clean = re.sub(r"\*\*([^*]+)\*\*", r"\1", spoken)
    spoken_clean = re.sub(r"\*([^*]+)\*", r"\1", spoken_clean)
    spoken_clean = spoken_clean.strip()
    return who, spoken_clean

async def sintetizar_clip(texto, voz, rate, pitch, destino):
    comm = edge_tts.Communicate(texto, voz, rate=rate, pitch=pitch)
    await comm.save(str(destino))

async def procesar_tema(data, humanizar=True, forzar=False):
    tid = data.get("id", "")
    listening = data.get("fases", {}).get("listening", {})
    guion = listening.get("guion", [])
    if not guion:
        print(f"[{tid}] Sin fases.listening.guion — omitido.")
        return 0, 0

    dest_dir = AUDIO / tid
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    # Directorio alternativo sin '-01' (utilizado por algunas lecciones wave-b)
    alt_id = re.sub(r"-\d+$", "", tid)
    alt_dir = AUDIO / alt_id if alt_id != tid else None
    if alt_dir and alt_dir.exists():
        alt_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n=== {tid} ({len(guion)} lineas) ===")
    hechos = 0
    saltados = 0

    for idx, linea in enumerate(guion):
        num = idx + 1
        final_mp3 = dest_dir / f"{num}.mp3"
        if final_mp3.exists() and not forzar and final_mp3.stat().st_size > 1000:
            print(f"  · {num}.mp3 ya existe ({final_mp3.stat().st_size} B) — saltado")
            saltados += 1
            continue

        who, spoken = limpiar_texto(linea)
        voz = resolver_voz(who)
        rate, pitch = calcular_prosodia(spoken, voz, humanizar)

        print(f"  [{num}/{len(guion)}] {who or 'Narrador'} -> {voz} (rate={rate}, pitch={pitch})")
        print(f"       \"{spoken}\"")
        await sintetizar_clip(spoken, voz, rate, pitch, final_mp3)
        print(f"       [OK] Guardado {final_mp3.name} ({final_mp3.stat().st_size} bytes)")
        hechos += 1

        if alt_dir and alt_dir.exists():
            alt_mp3 = alt_dir / f"{num}.mp3"
            shutil.copy2(final_mp3, alt_mp3)

    return hechos, saltados

def cargar_todos():
    temas = []
    for f in sorted(CONTENIDO.rglob("*.json")):
        try:
            d = json.loads(f.read_text(encoding="utf-8"))
            temas.append(d)
        except Exception as e:
            print(f"Error cargando {f}: {e}")
    return temas

async def main():
    parser = argparse.ArgumentParser(description="Generador de audio humanizado para listening.")
    parser.add_argument("--tema", help="ID del tema (ej. b1-indefinite-pronouns-01)")
    parser.add_argument("--nivel", help="Nivel (A1, A2, B1, B2, C1)")
    parser.add_argument("--faltantes", action="store_true", help="Solo temas que no tengan sus MP3s de listening")
    parser.add_argument("--forzar", action="store_true", help="Regenerar archivos existentes")
    parser.add_argument("--sin-humanizar", action="store_true", help="Desactivar prosodia dinamica")
    args = parser.parse_args()

    todos = cargar_todos()
    a_procesar = []

    for d in todos:
        tid = d.get("id", "")
        nivel = d.get("nivel", "")
        if args.tema and tid != args.tema:
            continue
        if args.nivel and nivel.upper() != args.nivel.upper():
            continue
        if args.faltantes:
            # Comprobar si falta el directorio o algun MP3 del guion
            guion = d.get("fases", {}).get("listening", {}).get("guion", [])
            if not guion:
                continue
            d_dir = AUDIO / tid
            if not d_dir.exists():
                a_procesar.append(d)
                continue
            falta_alguno = False
            for i in range(1, len(guion) + 1):
                f_check = d_dir / f"{i}.mp3"
                if not f_check.exists() or f_check.stat().st_size < 1000:
                    falta_alguno = True
                    break
            if falta_alguno:
                a_procesar.append(d)
            continue
        
        a_procesar.append(d)

    if not a_procesar:
        print("No se encontraron temas con los criterios indicados.")
        return

    print(f"Procesando {len(a_procesar)} tema(s)...")
    total_h = 0
    total_s = 0
    for d in a_procesar:
        h, s = await procesar_tema(d, humanizar=not args.sin_humanizar, forzar=args.forzar)
        total_h += h
        total_s += s

    print(f"\n==========================================")
    print(f"Completado: {total_h} generados, {total_s} saltados.")

if __name__ == "__main__":
    asyncio.run(main())
