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

AUDIO_DIR = pathlib.Path(__file__).parent.parent / "audio" / "cast"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

CAST_SCRIPTS = [
    # Aurora 3 Moods
    ("aurora_explaining", "en-US-JennyNeural", "Welcome to this master session! I'm Aurora. Today we are exploring English articles in real context: A, An, and The. Observe the sound patterns, trust your ear, and let's master this step by step."),
    ("aurora_celebrating", "en-US-JennyNeural", "Brilliant! You caught the vowel sound and applied the profession rule flawlessly. You are speaking with genuine precision!"),
    ("aurora_correcting", "en-US-JennyNeural", "Notice the subtle acoustic detail! Remember: we choose 'an' by the sound, not the letter. 'Hour' starts with a silent H, so we say 'an hour'. Let's try once more!"),
    
    # Recurrent Characters
    ("char_ben", "en-GB-RyanNeural", "I need a coffee. A big coffee. Today I am an exhausted photographer."),
    ("char_kenji", "en-US-BrianNeural", "Look! There is an old piano in the corner, and a cat under the table!"),
    ("char_sofia", "en-US-AriaNeural", "The menu is on the wall. They have an excellent croissant and a fresh orange juice."),
    ("char_carmen", "en-US-JennyNeural", "In a café, the golden rule is simple: never rush the coffee, and always greet the waiter.")
]

async def main():
    print(f"Generating {len(CAST_SCRIPTS)} cast audios...")
    for slug, voice, text in CAST_SCRIPTS:
        dest = AUDIO_DIR / f"{slug}.mp3"
        print(f"Generating {slug}.mp3 with {voice}...")
        comm = edge_tts.Communicate(text, voice, rate="-2%", pitch="+0Hz")
        await comm.save(str(dest))
        print(f"  [OK] Saved {dest.name} ({dest.stat().st_size} bytes)")
    print("All cast audios generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
