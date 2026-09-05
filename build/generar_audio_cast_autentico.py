#!/usr/bin/env python3
"""
RESTAURADOR DE ACCENTOS ORIGINALES DEL CAST CANÓNICO
- Abuela Carmen: en-GB-SoniaNeural (Acento británico maduro, distinguido, sabio: rate=-10%, pitch=-4Hz)
- Ben: en-GB-RyanNeural (Acento británico de Londres: rate=-6%, pitch=-2Hz)
- Kenji: en-US-GuyNeural (Acento estadounidense juvenil/claro: rate=+1%, pitch=+1Hz)
- Sofía: en-US-AvaNeural (Acento cosmopolita fresco: rate=-2%, pitch=+0Hz)
- Aurora: en-US-AriaNeural (Acento y dirección oficial de Aurora: rate=-3%, pitch=+4Hz)
"""
import pathlib
import ssl
import asyncio

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

import edge_tts
import edge_tts.communicate
edge_tts.communicate._SSL_CTX = ssl_ctx

ROOT = pathlib.Path(__file__).parent.parent
AUDIO_CAST = ROOT / "audio" / "cast"
AUDIO_ROUTINES = ROOT / "audio" / "routines"

CAST_LINES = [
    # --- CAST IN /audio/cast/ ---
    {
        "dest": AUDIO_CAST / "char_carmen.mp3",
        "voice": "en-GB-SoniaNeural",
        "rate": "-10%",
        "pitch": "-4Hz",
        "text": "In a café, the golden rule is simple: never rush the coffee, and always greet the waiter."
    },
    {
        "dest": AUDIO_CAST / "char_ben.mp3",
        "voice": "en-GB-RyanNeural",
        "rate": "-6%",
        "pitch": "-2Hz",
        "text": "I need a coffee. A big coffee. Today I am an exhausted photographer."
    },
    {
        "dest": AUDIO_CAST / "char_kenji.mp3",
        "voice": "en-US-GuyNeural",
        "rate": "+1%",
        "pitch": "+1Hz",
        "text": "Look! There is an old piano in the corner, and a cat under the table!"
    },
    {
        "dest": AUDIO_CAST / "char_sofia.mp3",
        "voice": "en-US-AvaNeural",
        "rate": "-2%",
        "pitch": "+0Hz",
        "text": "The menu is on the wall. They have an excellent croissant and a fresh orange juice."
    },

    # --- CAST IN /audio/routines/ ---
    {
        "dest": AUDIO_ROUTINES / "char_carmen.mp3",
        "voice": "en-GB-SoniaNeural",
        "rate": "-10%",
        "pitch": "-4Hz",
        "text": "Every morning brings a new routine. We rest, we learn, and we enjoy good food."
    },
    {
        "dest": AUDIO_ROUTINES / "char_ben.mp3",
        "voice": "en-GB-RyanNeural",
        "rate": "-6%",
        "pitch": "-2Hz",
        "text": "I start taking photos at eight, but I don't work on Sundays."
    },
    {
        "dest": AUDIO_ROUTINES / "char_kenji.mp3",
        "voice": "en-US-GuyNeural",
        "rate": "+1%",
        "pitch": "+1Hz",
        "text": "Does Carmen cook dinner every evening? Yes, she does!"
    },
    {
        "dest": AUDIO_ROUTINES / "char_sofia.mp3",
        "voice": "en-US-AvaNeural",
        "rate": "-2%",
        "pitch": "+0Hz",
        "text": "I wake up at six, have coffee, and work as a designer in Medellín."
    }
]

async def main():
    print("Regenerating authentic character voice lines with original canon accents...")
    for item in CAST_LINES:
        print(f"Generating {item['dest'].name} with {item['voice']} (rate={item['rate']}, pitch={item['pitch']})...")
        comm = edge_tts.Communicate(item["text"], item["voice"], rate=item["rate"], pitch=item["pitch"])
        await comm.save(str(item["dest"]))
        print(f"  [OK] Saved {item['dest'].name} ({item['dest'].stat().st_size} bytes)")
    print("All authentic character accents restored successfully!")

if __name__ == "__main__":
    asyncio.run(main())
