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

AUDIO_DIR = pathlib.Path(__file__).parent.parent / "audio" / "routines"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

SCRIPTS = [
    ("aurora_intro", "en-US-JennyNeural", "-4%", "+0Hz", "Welcome to today's masterclass on the Present Simple and daily routines. We'll explore how Sofia, Ben, Kenji, and Carmen describe their habits and daily lives. Let's begin!"),
    ("aurora_rule", "en-US-JennyNeural", "-4%", "+0Hz", "Here is the golden rule of the Present Simple: with he, she, or it, the verb always takes an '-s' or '-es' at the end. Sofia works... Ben travels... Carmen cooks. Simple and elegant."),
    ("aurora_forms", "en-US-JennyNeural", "-4%", "+1Hz", "Notice how the four forms work together: Affirmative, Negative with doesn't, Questions with Does, and Short Answers: Yes, she does!"),
    ("char_sofia", "en-US-AriaNeural", "-2%", "+0Hz", "I wake up at six, have coffee, and work as a designer in Medellín."),
    ("char_ben", "en-GB-RyanNeural", "-3%", "-2Hz", "I start taking photos at eight, but I don't work on Sundays."),
    ("char_kenji", "en-US-BrianNeural", "-2%", "+0Hz", "Do you cook dinner every evening, Carmen? Yes, she does!"),
    ("char_carmen", "en-US-JennyNeural", "-5%", "-2Hz", "Every morning brings a new routine. We rest, we learn, and we enjoy good food."),
    ("aurora_reading", "en-US-JennyNeural", "-4%", "+0Hz", "Listen to Sofia's daily story: Sofia is a designer in Medellín. Every day she wakes up at six, starts work at eight, and cooks dinner in the evening."),
    ("aurora_conclusion", "en-US-JennyNeural", "-3%", "+2Hz", "Brilliant work today! You have mastered the Present Simple across all four forms and cognitive stages. Download your worksheet below to consolidate!")
]

async def main():
    print(f"Generating {len(SCRIPTS)} Present Simple audio files...")
    for slug, voice, rate, pitch, text in SCRIPTS:
        dest = AUDIO_DIR / f"{slug}.mp3"
        print(f"Generating {dest.name}...")
        comm = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
        await comm.save(str(dest))
        print(f"  [OK] Saved {dest.name} ({dest.stat().st_size} bytes)")
    print("All Present Simple audios generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
