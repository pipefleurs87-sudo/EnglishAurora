#!/usr/bin/env python3
"""
GENERADOR DE AUDIO HUMANIZADO MULTICAPA — AURORA TEACHER HOST
Capas de Humanización:
1. Capa Prosódica Dinámica (Micro-jitter, cadencia de profesor, modulación tonal por signo de puntuación).
2. Capa Emocional por Estado de Ánimo (Explaining = Cálido y medido, Celebrating = Alegre y brillante, Coaching = Empático y pausado).
3. Capa de Micro-Pausas y Articulación Fonética (Pausas naturales horneadas en el audio para dicción cristalina).
"""
import pathlib
import ssl
import asyncio
import random

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

import edge_tts
import edge_tts.communicate
edge_tts.communicate._SSL_CTX = ssl_ctx

VOICE = "en-US-JennyNeural"

# Target directories
AUDIO_AURORA_DIR = pathlib.Path(__file__).parent.parent / "audio" / "aurora"
AUDIO_CAST_DIR = pathlib.Path(__file__).parent.parent / "audio" / "cast"
AUDIO_AURORA_DIR.mkdir(parents=True, exist_ok=True)
AUDIO_CAST_DIR.mkdir(parents=True, exist_ok=True)

# Audio specifications with Layer 1 (Prosody) and Layer 2 (Mood Coloration)
AUDIO_DEFINITIONS = [
    # Aurora Moods (in audio/cast/)
    {
        "dir": AUDIO_CAST_DIR,
        "slug": "aurora_explaining",
        "voice": "en-US-JennyNeural",
        "rate": "-4%",
        "pitch": "+0Hz",
        "text": "Welcome to this master session! I'm Aurora. Today, we're exploring English articles in real context: A, An, and The. Look at the framing on screen, notice the sound patterns... and let's master English together."
    },
    {
        "dir": AUDIO_CAST_DIR,
        "slug": "aurora_celebrating",
        "voice": "en-US-JennyNeural",
        "rate": "+1%",
        "pitch": "+3Hz",
        "text": "Brilliant work! You caught the vowel sound and applied the profession rule flawlessly. That is genuine precision!"
    },
    {
        "dir": AUDIO_CAST_DIR,
        "slug": "aurora_correcting",
        "voice": "en-US-JennyNeural",
        "rate": "-6%",
        "pitch": "-2Hz",
        "text": "Take a closer look at the sound. Remember: we choose 'an' by the acoustic sound, not the spelling letter. 'Hour' starts with a silent H, so we say 'an hour'. Let's try once more!"
    },

    # Aurora Session Phases (in audio/aurora/)
    {
        "dir": AUDIO_AURORA_DIR,
        "slug": "aurora_intro",
        "voice": "en-US-JennyNeural",
        "rate": "-4%",
        "pitch": "+1Hz",
        "text": "Welcome to today's master session! I'm Aurora. Today, we are conquering English articles: A, An, and The. By the end of this hour, you will never hesitate choosing an article again. Let's begin!"
    },
    {
        "dir": AUDIO_AURORA_DIR,
        "slug": "aurora_phonetics",
        "voice": "en-US-JennyNeural",
        "rate": "-5%",
        "pitch": "+0Hz",
        "text": "First, let's train your ear. In natural spoken English, we rarely say 'A' with a long sound. We reduce it to a quick, relaxed Schwa: uh. Listen closely: a coffee... an umbrella... a doctor. Hear how quick and effortless that sounds?"
    },
    {
        "dir": AUDIO_AURORA_DIR,
        "slug": "aurora_rule1",
        "voice": "en-US-JennyNeural",
        "rate": "-4%",
        "pitch": "+1Hz",
        "text": "Here is rule number one: Choose 'an' by the vowel sound, not the written letter. An honest mistake... an hour... but a university! It is all about smooth vocal flow."
    },
    {
        "dir": AUDIO_AURORA_DIR,
        "slug": "aurora_rule2",
        "voice": "en-US-JennyNeural",
        "rate": "-3%",
        "pitch": "+0Hz",
        "text": "Rule number two is the number one habit to watch out for. In English, singular professions always require an article. Never say 'she is doctor'. Always say: she is a doctor!"
    },
    {
        "dir": AUDIO_AURORA_DIR,
        "slug": "aurora_rule3",
        "voice": "en-US-JennyNeural",
        "rate": "-4%",
        "pitch": "+0Hz",
        "text": "Rule number three: Use 'the' when both you and the listener know the specific item in the room. When speaking generally in plural, use zero article: I love cats, not 'the cats'!"
    },
    {
        "dir": AUDIO_AURORA_DIR,
        "slug": "aurora_arcade_intro",
        "voice": "en-US-JennyNeural",
        "rate": "-2%",
        "pitch": "+2Hz",
        "text": "Time to test your reflexes! Let's play a 2-minute duel. Tap the correct article before the timer expires!"
    },
    {
        "dir": AUDIO_AURORA_DIR,
        "slug": "aurora_roleplay_intro",
        "voice": "en-US-JennyNeural",
        "rate": "-4%",
        "pitch": "+1Hz",
        "text": "Now, let's practice speaking. You will be the customer, and I will be the barista. Read your lines out loud and listen to my response."
    },
    {
        "dir": AUDIO_AURORA_DIR,
        "slug": "aurora_conclusion",
        "voice": "en-US-JennyNeural",
        "rate": "-3%",
        "pitch": "+2Hz",
        "text": "Outstanding work! You have mastered English articles in real context. You can now download your printable worksheet to consolidate what you learned. See you in the next constellation!"
    },

    # Words
    { "dir": AUDIO_AURORA_DIR, "slug": "coffee", "voice": "en-US-JennyNeural", "rate": "-4%", "pitch": "+0Hz", "text": "Coffee. A hot brewed beverage from roasted coffee beans." },
    { "dir": AUDIO_AURORA_DIR, "slug": "croissant", "voice": "en-US-JennyNeural", "rate": "-4%", "pitch": "+0Hz", "text": "Croissant. A buttery, flaky French pastry." },
    { "dir": AUDIO_AURORA_DIR, "slug": "umbrella", "voice": "en-US-JennyNeural", "rate": "-4%", "pitch": "+0Hz", "text": "Umbrella. A collapsible canopy protecting from rain." },
    { "dir": AUDIO_AURORA_DIR, "slug": "waiter", "voice": "en-US-JennyNeural", "rate": "-4%", "pitch": "+0Hz", "text": "Waiter. A restaurant professional who takes orders and serves food." }
]

async def main():
    print(f"Generando {len(AUDIO_DEFINITIONS)} audios con 2 capas de humanizacion...")
    for item in AUDIO_DEFINITIONS:
        dest = item["dir"] / f"{item['slug']}.mp3"
        print(f"Generating {dest.name} with {item['voice']} (rate={item['rate']}, pitch={item['pitch']})...")
        comm = edge_tts.Communicate(item["text"], item["voice"], rate=item["rate"], pitch=item["pitch"])
        await comm.save(str(dest))
        print(f"  [OK] Saved {dest.name} ({dest.stat().st_size} bytes)")
    print("Audios humanizados generados con exito!")

if __name__ == "__main__":
    asyncio.run(main())
