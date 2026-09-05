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

VOICE = "en-US-JennyNeural"
AUDIO_DIR = pathlib.Path(__file__).parent.parent / "audio" / "aurora"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

SCRIPTS = [
    ("aurora_intro", "Welcome to today's master session! I'm Aurora. Today, we are conquering English articles: A, An, and The. By the end of this hour, you will never hesitate choosing an article again. Let's begin!"),
    ("aurora_phonetics", "First, let's train your ear. In natural spoken English, we rarely say 'A' with a long sound. We reduce it to a quick, soft Schwa: uh. Listen: a coffee... an umbrella... a doctor. Hear how quick and relaxed that is?"),
    ("aurora_rule1", "Here is rule number one: Choose 'an' by the sound, not the spelling letter. An honest mistake... an hour... but a university! It is all about smooth vocal flow."),
    ("aurora_rule2", "Rule number two is the number one Spanish speaker trap. In English, professions ALWAYS require an article. Never say 'she is doctor'. Always say: she is a doctor!"),
    ("aurora_rule3", "Rule number three: Use 'the' when both you and the listener know the specific item in the scene. When speaking generally in plural, use zero article: I love cats, not 'the cats'!"),
    ("aurora_arcade_intro", "Time to test your reflexes! Let's play a 2-minute duel. Tap the correct article before the timer expires!"),
    ("aurora_roleplay_intro", "Now, let's practice speaking. You will be the customer, and I will be the barista. Read your lines out loud and listen to my response."),
    ("aurora_conclusion", "Outstanding work! You have mastered English articles in real context. You can now download your printable worksheet to consolidate what you learned. See you in the next constellation!"),
    ("coffee", "Coffee. A hot brewed beverage from roasted coffee beans."),
    ("croissant", "Croissant. A buttery, flaky French pastry."),
    ("umbrella", "Umbrella. A collapsible canopy protecting from rain."),
    ("waiter", "Waiter. A restaurant employee who takes orders and serves food.")
]

async def main():
    print(f"Generando {len(SCRIPTS)} audios de Aurora Teacher Host...")
    for name, text in SCRIPTS:
        dest = AUDIO_DIR / f"{name}.mp3"
        print(f"Generating {dest.name}...")
        comm = edge_tts.Communicate(text, VOICE, rate="-3%", pitch="+0Hz")
        await comm.save(str(dest))
        print(f"Saved {dest.name} ({dest.stat().st_size} bytes)")
    print("Todos los audios de Aurora fueron generados con exito!")

if __name__ == "__main__":
    asyncio.run(main())
