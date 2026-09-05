#!/usr/bin/env python3
import pathlib
import ssl
import asyncio

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

import edge_tts
import edge_tts.communicate
edge_tts.communicate._SSL_CTX = ssl_ctx

CASTING_DIR = pathlib.Path(__file__).parent.parent / "audio" / "voice_casting"
CASTING_DIR.mkdir(parents=True, exist_ok=True)

SAMPLE_TEXT = "Hi there! I'm Aurora. Welcome to our English masterclass. Let's look at the patterns together and master this step by step!"

VOICE_CANDIDATES = [
    {
        "id": "ava",
        "name": "Ava (en-US-AvaNeural)",
        "desc": "Airy, youthful, modern YouTube creator timbre. Very light and crisp.",
        "voice": "en-US-AvaNeural",
        "rate": "-2%",
        "pitch": "+4Hz"
    },
    {
        "id": "ana",
        "name": "Ana (en-US-AnaNeural)",
        "desc": "Young, sweet, bright and thin-timbred with friendly clarity.",
        "voice": "en-US-AnaNeural",
        "rate": "-3%",
        "pitch": "+6Hz"
    },
    {
        "id": "emma",
        "name": "Emma (en-US-EmmaNeural)",
        "desc": "Soft, delicate, modern conversational tone. Natural and approachable.",
        "voice": "en-US-EmmaNeural",
        "rate": "-3%",
        "pitch": "+2Hz"
    },
    {
        "id": "aria_bright",
        "name": "Aria Bright (en-US-AriaNeural)",
        "desc": "Expressive, clear, melodic and articulate.",
        "voice": "en-US-AriaNeural",
        "rate": "-3%",
        "pitch": "+5Hz"
    },
    {
        "id": "jenny_light",
        "name": "Jenny Tuned (en-US-JennyNeural)",
        "desc": "Current voice tuned higher and lighter (+12Hz) for a thinner profile.",
        "voice": "en-US-JennyNeural",
        "rate": "-1%",
        "pitch": "+12Hz"
    }
]

async def main():
    print(f"Generating {len(VOICE_CANDIDATES)} voice casting samples...")
    for c in VOICE_CANDIDATES:
        dest = CASTING_DIR / f"sample_{c['id']}.mp3"
        print(f"Generating {dest.name} with {c['voice']}...")
        comm = edge_tts.Communicate(SAMPLE_TEXT, c["voice"], rate=c["rate"], pitch=c["pitch"])
        await comm.save(str(dest))
        print(f"  [OK] Saved {dest.name} ({dest.stat().st_size} bytes)")
    print("Voice casting samples generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
