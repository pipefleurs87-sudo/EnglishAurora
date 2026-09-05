#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GENERADOR DE AUDIO — Ludoteca (Hermano de generar_audio_fluency.py y generar_audio_listening.py)

Genera MP3s humanizados para los juegos de Ludoteca en: audio/vocab/{word}.mp3
Utiliza la MISMA función y parámetros aprobados por la plataforma:
- Voz Aurora / Narradora: en-US-JennyNeural
- Prosodia Base: (-4% rate, 0Hz pitch)
- Humanizador Capa 1: Jitter aleatorio de rate y pitch
- edge-tts para síntesis neural de alta fidelidad
"""
import asyncio
import pathlib
import random
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
DESTINO_DIR = ROOT / "audio" / "vocab"

VOZ_AURORA = "en-US-JennyNeural"
BASE_RATE = -4
BASE_PITCH = 0

VOCAB_LIST = [
    "apple", "car", "dog", "house", "airplane",
    "cat", "coffee", "moon", "sun", "book",
    "bicycle", "tree", "water", "key", "shoe"
]

def prosodia_humanizada(humanizar=True):
    rate = BASE_RATE
    pitch = BASE_PITCH
    if humanizar:
        rate += random.randint(-3, 3)
        pitch += random.randint(-2, 2)
    return f"{rate:+d}%", f"{pitch:+d}Hz"

async def sintetizar_palabra(palabra, destino):
    rate, pitch = prosodia_humanizada(humanizar=True)
    com = edge_tts.Communicate(palabra, VOZ_AURORA, rate=rate, pitch=pitch)
    await com.save(str(destino))
    print(f"  OK {palabra}.mp3 -> {destino.name} [{VOZ_AURORA} {rate} {pitch}]")

async def main():
    DESTINO_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Generando audio humanizado para Ludoteca en: {DESTINO_DIR}")
    for palabra in VOCAB_LIST:
        archivo = DESTINO_DIR / f"{palabra}.mp3"
        await sintetizar_palabra(palabra, archivo)
    print("\n¡Generación completada con éxito!")

if __name__ == "__main__":
    asyncio.run(main())
