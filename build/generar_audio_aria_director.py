#!/usr/bin/env python3
"""
MASTER AUDIO GENERATOR — AURORA VOCAL DIRECTION: ARIA NEURAL
Voice: en-US-AriaNeural
Director Layers:
- Layer 1: Pacing & Breath Pauses (rate: -3% to -5%, breath ellipses, punctuation jitter)
- Layer 2: Harmonic Brightness & Thinness (pitch: +4Hz baseline for radiant, youthful timbre)
- Layer 3: Emotional Dynamic Moods (Explaining = Warm & Inviting, Celebrating = Radiant & Uplifting, Coaching = Gentle & Supportive)
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

VOICE = "en-US-AriaNeural"

ROOT = pathlib.Path(__file__).parent.parent
AUDIO_ROUTINES = ROOT / "audio" / "routines"
AUDIO_CAST = ROOT / "audio" / "cast"
AUDIO_AURORA = ROOT / "audio" / "aurora"

for d in [AUDIO_ROUTINES, AUDIO_CAST, AUDIO_AURORA]:
    d.mkdir(parents=True, exist_ok=True)

ARIA_DIRECTED_TRACKS = [
    # --- 1. CAST MOOD REACTIONS (audio/cast/) ---
    {
        "dir": AUDIO_CAST,
        "slug": "aurora_explaining",
        "rate": "-3%",
        "pitch": "+4Hz",
        "text": "Welcome to this master session! I'm Aurora. Today, we're exploring English in real context. Look closely at the framing on screen, notice the natural sound patterns... and let's master English together."
    },
    {
        "dir": AUDIO_CAST,
        "slug": "aurora_celebrating",
        "rate": "+1%",
        "pitch": "+7Hz",
        "text": "Brilliant work! You caught that subtle pattern and applied the rule flawlessly. That is genuine precision!"
    },
    {
        "dir": AUDIO_CAST,
        "slug": "aurora_correcting",
        "rate": "-5%",
        "pitch": "+2Hz",
        "text": "Take a closer look at the sound flow. Remember... we choose our forms by natural acoustic clarity. Let's try that one more time together!"
    },

    # --- 2. PRESENT SIMPLE & ROUTINES SESSION (audio/routines/) ---
    {
        "dir": AUDIO_ROUTINES,
        "slug": "aurora_intro",
        "rate": "-3%",
        "pitch": "+4Hz",
        "text": "Welcome to today's masterclass on the Present Simple and daily habits! I'm Aurora. Today we'll explore how Sofia, Ben, Kenji, and Carmen describe their routines in natural English. Let's begin!"
    },
    {
        "dir": AUDIO_ROUTINES,
        "slug": "aurora_rule",
        "rate": "-4%",
        "pitch": "+4Hz",
        "text": "Here is the golden rule of the Present Simple: With he, she, or it... the verb always takes an '-s' or '-es' at the end. Sofia works... Ben travels... Carmen cooks. Simple and elegant!"
    },
    {
        "dir": AUDIO_ROUTINES,
        "slug": "aurora_forms",
        "rate": "-3%",
        "pitch": "+5Hz",
        "text": "Notice how the four forms work together: Affirmative with '-s', Negative with 'doesn't', Questions with 'Does', and Short Answers: Yes, she does!"
    },
    {
        "dir": AUDIO_ROUTINES,
        "slug": "aurora_reading",
        "rate": "-4%",
        "pitch": "+3Hz",
        "text": "Listen to Sofia's daily story: Sofia is a designer in Medellín. Every day she wakes up at six, starts work at eight, and cooks dinner in the evening."
    },
    {
        "dir": AUDIO_ROUTINES,
        "slug": "aurora_conclusion",
        "rate": "-2%",
        "pitch": "+6Hz",
        "text": "Brilliant work today! You have conquered the Present Simple across all four forms and cognitive stages. Download your 10-exercise worksheet below to consolidate what you learned!"
    },

    # --- 3. ARTICLES MASTER SESSION (audio/aurora/) ---
    {
        "dir": AUDIO_AURORA,
        "slug": "aurora_intro",
        "rate": "-3%",
        "pitch": "+4Hz",
        "text": "Welcome to today's master session! I'm Aurora. Today, we are conquering English articles: A, An, and The. By the end of this hour, you will never hesitate choosing an article again. Let's begin!"
    },
    {
        "dir": AUDIO_AURORA,
        "slug": "aurora_phonetics",
        "rate": "-4%",
        "pitch": "+4Hz",
        "text": "First, let's train your ear! In natural spoken English, we rarely say 'A' with a long sound. We reduce it to a quick, relaxed Schwa: uh. Listen closely: a coffee... an umbrella... a doctor. Hear how effortless that sounds?"
    },
    {
        "dir": AUDIO_AURORA,
        "slug": "aurora_rule1",
        "rate": "-3%",
        "pitch": "+5Hz",
        "text": "Here is rule number one: Choose 'an' by the vowel sound, not the written letter! An honest mistake... an hour... but a university! It is all about smooth vocal flow."
    },
    {
        "dir": AUDIO_AURORA,
        "slug": "aurora_rule2",
        "rate": "-3%",
        "pitch": "+4Hz",
        "text": "Rule number two is the number one habit to watch out for! In English, singular professions always require an article. Never say 'she is doctor'. Always say: she is a doctor!"
    },
    {
        "dir": AUDIO_AURORA,
        "slug": "aurora_rule3",
        "rate": "-4%",
        "pitch": "+4Hz",
        "text": "Rule number three: Use 'the' when both you and the listener know the specific item in the room. When speaking generally in plural, use zero article: I love cats, not 'the cats'!"
    },
    {
        "dir": AUDIO_AURORA,
        "slug": "aurora_arcade_intro",
        "rate": "-1%",
        "pitch": "+6Hz",
        "text": "Time to test your reflexes! Let's play a 2-minute duel. Tap the correct article before the timer expires!"
    },
    {
        "dir": AUDIO_AURORA,
        "slug": "aurora_roleplay_intro",
        "rate": "-3%",
        "pitch": "+4Hz",
        "text": "Now, let's practice speaking. You will be the customer, and I will be the barista. Read your lines out loud and listen to my response!"
    },
    {
        "dir": AUDIO_AURORA,
        "slug": "aurora_conclusion",
        "rate": "-2%",
        "pitch": "+6Hz",
        "text": "Outstanding work! You have mastered English articles in real context. You can now download your printable worksheet to consolidate what you learned. See you in the next constellation!"
    },
    { "dir": AUDIO_AURORA, "slug": "coffee", "rate": "-3%", "pitch": "+4Hz", "text": "Coffee. A hot brewed beverage from roasted coffee beans." },
    { "dir": AUDIO_AURORA, "slug": "croissant", "rate": "-3%", "pitch": "+4Hz", "text": "Croissant. A buttery, flaky French pastry." },
    { "dir": AUDIO_AURORA, "slug": "umbrella", "rate": "-3%", "pitch": "+4Hz", "text": "Umbrella. A collapsible canopy protecting from rain." },
    { "dir": AUDIO_AURORA, "slug": "waiter", "rate": "-3%", "pitch": "+4Hz", "text": "Waiter. A restaurant professional who takes orders and serves food." }
]

async def main():
    print(f"Directing & generating {len(ARIA_DIRECTED_TRACKS)} tracks with Aria Neural (Humanized Direction)...")
    for t in ARIA_DIRECTED_TRACKS:
        dest = t["dir"] / f"{t['slug']}.mp3"
        print(f"Generating {dest.name} (rate={t['rate']}, pitch={t['pitch']})...")
        comm = edge_tts.Communicate(t["text"], VOICE, rate=t["rate"], pitch=t["pitch"])
        await comm.save(str(dest))
        print(f"  [OK] Saved {dest.name} ({dest.stat().st_size} bytes)")
    print("All directed Aria tracks generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
