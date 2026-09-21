#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GENERADOR DE AUDIO HUMANIZADO PARA:
B1 Indefinite Pronouns (b1-indefinite-pronouns-01)
Listening Dialogue (fases.listening.guion)

1. Sofía: Has anyone seen my blue sketchbook?
2. Ben: I searched everywhere, but I couldn't find anything.
3. Kenji: Look under the table! Somebody placed a stack of papers there.
4. Sofía: Ah, here it is! Nothing is lost after all.
5. Abuela Carmen: Remember, my dear: everyone finds what they seek when they look with calm eyes.

Voces canónicas del Cast:
- Sofía: en-US-AvaNeural (rate=-2%, pitch=+0Hz)
- Ben: en-GB-RyanNeural (rate=-6%, pitch=-2Hz)
- Kenji: en-US-GuyNeural (rate=+1%, pitch=+1Hz)
- Abuela Carmen: en-GB-SoniaNeural (rate=-10%, pitch=-4Hz)
"""
import asyncio
import pathlib
import ssl
import shutil
import re

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

import edge_tts
import edge_tts.communicate
edge_tts.communicate._SSL_CTX = ssl_ctx

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIR_WITH_01 = ROOT / "audio" / "b1-indefinite-pronouns-01"
DIR_WITHOUT_01 = ROOT / "audio" / "b1-indefinite-pronouns"

DIR_WITH_01.mkdir(parents=True, exist_ok=True)
DIR_WITHOUT_01.mkdir(parents=True, exist_ok=True)

TRACKS = [
    {
        "num": 1,
        "char": "Sofía",
        "voice": "en-US-AvaNeural",
        "rate": "-2%",
        "pitch": "+2Hz",  # question cadence
        "text": "Has anyone seen my blue sketchbook?"
    },
    {
        "num": 2,
        "char": "Ben",
        "voice": "en-GB-RyanNeural",
        "rate": "-6%",
        "pitch": "-2Hz",
        "text": "I searched everywhere, but I couldn't find anything."
    },
    {
        "num": 3,
        "char": "Kenji",
        "voice": "en-US-GuyNeural",
        "rate": "+2%",  # energetic exclamation
        "pitch": "+1Hz",
        "text": "Look under the table! Somebody placed a stack of papers there."
    },
    {
        "num": 4,
        "char": "Sofía",
        "voice": "en-US-AvaNeural",
        "rate": "-1%",
        "pitch": "+1Hz",
        "text": "Ah, here it is! Nothing is lost after all."
    },
    {
        "num": 5,
        "char": "Abuela Carmen",
        "voice": "en-GB-SoniaNeural",
        "rate": "-10%",
        "pitch": "-4Hz",
        "text": "Remember, my dear: everyone finds what they seek when they look with calm eyes."
    }
]

async def generate():
    print("Iniciando sintesis de audio humanizado para b1-indefinite-pronouns-01...")
    for t in TRACKS:
        dest_file = DIR_WITH_01 / f"{t['num']}.mp3"
        print(f"[{t['num']}/5] {t['char']} ({t['voice']}, rate={t['rate']}, pitch={t['pitch']})")
        print(f"      \"{t['text']}\"")
        comm = edge_tts.Communicate(t["text"], t["voice"], rate=t["rate"], pitch=t["pitch"])
        await comm.save(str(dest_file))
        size = dest_file.stat().st_size
        print(f"      [OK] Guardado en {dest_file.name} ({size} bytes)")
        
        # Mirror in DIR_WITHOUT_01
        mirror_file = DIR_WITHOUT_01 / f"{t['num']}.mp3"
        shutil.copy2(dest_file, mirror_file)
        print(f"      [OK] Copiado a {mirror_file}")

    # Also ensure char_0_sofia.mp3 exists if char_0_sofía.mp3 exists
    sofia_acc = None
    for f in DIR_WITHOUT_01.glob("char_0_sof*.mp3"):
        sofia_acc = f
        break
    if sofia_acc and sofia_acc.exists():
        sofia_clean = DIR_WITHOUT_01 / "char_0_sofia.mp3"
        if not sofia_clean.exists():
            shutil.copy2(sofia_acc, sofia_clean)
            print(f"  [OK] Creada copia ASCII limpia: {sofia_clean.name}")

    print("\nTodos los audios humanizados de b1-indefinite-pronouns-01 generados con exito!")

if __name__ == "__main__":
    asyncio.run(generate())
