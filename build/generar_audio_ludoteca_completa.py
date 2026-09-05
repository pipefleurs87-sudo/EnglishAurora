#!/usr/bin/env python3
"""
Generador de Audio Neural para la Suite Completa de la Ludoteca de English Aurora.
Utiliza edge-tts (voz en-US-JennyNeural) con jitter prosódico humanizado (Capa 1).
"""
import os
import sys
import ssl
import asyncio
import pathlib
import random

# Bypass SSL verify on Windows environment
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

try:
    import edge_tts
    import edge_tts.communicate
    edge_tts.communicate._SSL_CTX = ssl_ctx
except ImportError:
    print("Instalando edge-tts...")
    os.system(f"{sys.executable} -m pip install edge-tts")
    import edge_tts
    import edge_tts.communicate
    edge_tts.communicate._SSL_CTX = ssl_ctx

VOICE = "en-US-JennyNeural"
BASE_RATE = -4
BASE_PITCH = 0

AUDIO_DIR = pathlib.Path(__file__).parent.parent / "audio" / "ludoteca"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

ITEMS = [
    # --- CELESTIAL RIDDLES (B1) ---
    ("riddle-tall", "I am high in height, reaching upward into the sky."),
    ("riddle-short", "I have little height or length."),
    ("riddle-fast", "I move with incredible velocity like lightning."),
    ("riddle-strong", "I have great physical power to lift heavy weights."),
    ("riddle-beautiful", "I am lovely and pleasing to look upon."),
    ("riddle-doctor", "I heal sick people and work in a hospital."),
    ("riddle-chef", "I prepare and cook delicious food in a kitchen."),
    ("riddle-pilot", "I fly airplanes through clouds and across continents."),
    ("riddle-architect", "I design buildings, bridges and magnificent towers."),
    ("riddle-bakery", "I am a place where fresh bread and pastries are baked."),
    ("riddle-library", "I am a quiet sanctuary where thousands of books are kept."),
    ("riddle-museum", "I am a hall where ancient artifacts and artworks are displayed."),
    ("riddle-camera", "I capture light and preserve memories in photographs."),
    ("riddle-hammer", "I am a heavy tool used to drive nails into wood."),
    ("riddle-umbrella", "I protect you from rain and shield you from the storm."),

    # --- SIGNAL HUNTER (A2) ---
    ("sig-hospital", "Target the emergency hospital beacon."),
    ("sig-airport", "Navigate towards the airport runway."),
    ("sig-museum", "Lock onto the ancient museum station."),
    ("sig-library", "Follow the signal to the grand library."),
    ("sig-bakery", "Locate the fresh bakery supply outpost."),
    ("sig-pilot", "Establish contact with the chief pilot."),
    ("sig-chef", "Transmit coordinates to the station chef."),
    ("sig-camera", "Activate the long range optical camera."),
    ("sig-keyboard", "Interface with the terminal keyboard."),
    ("sig-microscope", "Calibrate the scientific microscope scanner."),

    # --- SOUND CATCH (B1) MINIMAL PAIRS ---
    ("sound-ship", "Ship."),
    ("sound-sheep", "Sheep."),
    ("sound-tree", "Tree."),
    ("sound-three", "Three."),
    ("sound-pin", "Pin."),
    ("sound-pen", "Pen."),
    ("sound-hat", "Hat."),
    ("sound-hut", "Hut."),
    ("sound-bad", "Bad."),
    ("sound-bed", "Bed."),
    ("sound-cut", "Cut."),
    ("sound-cat", "Cat."),
    ("sound-live", "Live."),
    ("sound-leave", "Leave."),

    # --- ECHO CHAMBER (B2) ---
    ("echo-q1", "Are you coming with us tomorrow?"),
    ("echo-q2", "Where did you leave the keys?"),
    ("echo-s1", "I would love a cup of warm tea."),
    ("echo-alt1", "Do you prefer coffee or tea?"),

    # --- PILOT'S CABIN (C1 ADVANCED COMPREHENSION) ---
    ("pilot-nav1", "Set heading zero nine zero East, decelerate to sub-warp velocity, and enter standard orbit around Sector 7."),
    ("pilot-nav2", "Veer one eight zero degrees South to avoid incoming solar debris, then dock at the tertiary hangar."),
    ("pilot-nav3", "Ascend vertically toward the North nebula, calibrate shield frequency to forty megahertz, and transmit the quantum beacon."),
    ("pilot-nav4", "Engage reverse thrusters toward the West quadrant, scan for gravitational anomalies, and initiate atmospheric descent."),

    # --- UNSCRAMBLE THE SENTENCE (A2) ---
    ("unscramble-1", "She reads a book every night."),
    ("unscramble-2", "They are flying to London tomorrow."),
    ("unscramble-3", "The doctor helped the patient yesterday."),
    ("unscramble-4", "We have already visited the museum."),
    ("unscramble-5", "He is a very smart architect.")
]

def prosodia_humanizada():
    rate = BASE_RATE + random.randint(-2, 2)
    pitch = BASE_PITCH + random.randint(-2, 2)
    return f"{rate:+d}%", f"{pitch:+d}Hz"

async def generate_audio():
    print(f"Generando {len(ITEMS)} audios de estudio para la Ludoteca con voz {VOICE}...")
    for slug, text in ITEMS:
        out_path = AUDIO_DIR / f"{slug}.mp3"
        if out_path.exists() and out_path.stat().st_size > 500:
            print(f"  [OK / Existe] {slug}.mp3")
            continue
        rate, pitch = prosodia_humanizada()
        print(f"  [Generando] {slug}: '{text}' [{rate} {pitch}]...")
        communicate = edge_tts.Communicate(text, VOICE, rate=rate, pitch=pitch)
        await communicate.save(str(out_path))
    print("\n¡Todos los audios de la Ludoteca generados con exito!")

if __name__ == "__main__":
    asyncio.run(generate_audio())
