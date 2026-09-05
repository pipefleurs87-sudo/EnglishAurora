#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de audios para lección piloto de Spanish Aurora: es-a1-ser-identidad-01
Voces:
- Lucas: es-US-AlonsoNeural (rate=-2%, pitch=+1Hz) - joven aprendiz norteamericano
- Chloe: es-MX-DaliaNeural (rate=-2%, pitch=+2Hz) - voz femenina joven y expresiva
- Mateo: es-CO-GonzaloNeural (rate=-3%, pitch=-1Hz) - acento colombiano auténtico de Medellín
"""
import pathlib
import ssl
import asyncio
import edge_tts
import edge_tts.communicate

import sys
sys.stdout.reconfigure(encoding="utf-8")
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE
edge_tts.communicate._SSL_CTX = ssl_ctx

ROOT = pathlib.Path(__file__).parent.parent
OUTPUT_DIR = ROOT / "audio" / "es-a1-ser-identidad-01"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

LINES = [
    {
        "file": "1.mp3",
        "voice": "es-US-AlonsoNeural",
        "rate": "-2%",
        "pitch": "+1Hz",
        "text": "¡Hola! Me llamo Lucas. Soy de Canadá y soy fotógrafo."
    },
    {
        "file": "2.mp3",
        "voice": "es-MX-DaliaNeural",
        "rate": "-2%",
        "pitch": "+2Hz",
        "text": "¡Mucho gusto, Lucas! Yo soy Chloe. Soy francesa, de Lyon."
    },
    {
        "file": "3.mp3",
        "voice": "es-US-AlonsoNeural",
        "rate": "-1%",
        "pitch": "+1Hz",
        "text": "¿Eres estudiante o trabajas aquí?"
    },
    {
        "file": "4.mp3",
        "voice": "es-MX-DaliaNeural",
        "rate": "-2%",
        "pitch": "+2Hz",
        "text": "Soy chef y estudiante de español. ¿Y Mateo?"
    },
    {
        "file": "5.mp3",
        "voice": "es-CO-GonzaloNeural",
        "rate": "-3%",
        "pitch": "-1Hz",
        "text": "¡Hola a los dos! Yo soy Mateo. Soy colombiano, de Medellín."
    },
    {
        "file": "6.mp3",
        "voice": "es-US-AlonsoNeural",
        "rate": "-2%",
        "pitch": "+1Hz",
        "text": "¡Excelente! Nosotros somos de tres países diferentes."
    }
]

async def generate():
    for item in LINES:
        dest = OUTPUT_DIR / item["file"]
        print(f"Generando {item['file']} ({item['voice']})...")
        communicate = edge_tts.Communicate(
            text=item["text"],
            voice=item["voice"],
            rate=item["rate"],
            pitch=item["pitch"]
        )
        await communicate.save(str(dest))
        print(f"  ✓ {item['file']} ({dest.stat().st_size} bytes)")

if __name__ == "__main__":
    asyncio.run(generate())
