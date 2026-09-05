#!/usr/bin/env python3
"""
Generador de Audio Neural para los 3 Juegos Más Buscados:
1. Astral Wordle
2. Star Saver (Hangman)
3. Cosmic Word Search
"""
import os
import sys
import ssl
import asyncio
import pathlib
import random

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

import edge_tts
import edge_tts.communicate
edge_tts.communicate._SSL_CTX = ssl_ctx

VOICE = "en-US-JennyNeural"
BASE_RATE = -4
BASE_PITCH = 0

AUDIO_DIR = pathlib.Path(__file__).parent.parent / "audio" / "ludoteca"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

WORDS = [
    ("light", "Light. The natural agent that stimulates sight and illuminates dark space."),
    ("stars", "Stars. Luminous spheres of plasma held together by self-gravity in galaxies."),
    ("earth", "Earth. Our home planet, rich with oceans, atmosphere and life."),
    ("night", "Night. The period of ambient darkness between sunset and sunrise."),
    ("brain", "Brain. The organ of memory, thought, language and perception."),
    ("pilot", "Pilot. A person qualified to steer cosmic vessels through space."),
    ("plant", "Plant. A living organism producing oxygen through green leaves."),
    ("space", "Space. The boundless three-dimensional expanse of the universe."),
    ("ocean", "Ocean. A vast body of saltwater covering most of the planet."),
    ("dream", "Dream. A sequence of images and thoughts occurring in sleep."),
    ("galaxy", "Galaxy. A gravitationally bound system of stars, gas and cosmic dust."),
    ("rocket", "Rocket. A cylindrical vehicle propelled by reaction engine thrust."),
    ("doctor", "Doctor. A skilled professional who restores health and heals patients."),
    ("planet", "Planet. A celestial body orbiting a central star."),
    ("shadow", "Shadow. A dark area where light from a luminous source is blocked."),
    ("meteor", "Meteor. A small body of matter entering the planetary atmosphere."),
    ("aurora", "Aurora. A natural luminous display in the sky, radiant with emerald light."),
    ("orbit", "Orbit. The curved path of a celestial object around a star or planet."),
    ("comet", "Comet. An icy small celestial body that produces a glowing tail near a sun."),
    ("moon", "Moon. The natural astronomical satellite orbiting planet Earth."),
    ("cloud", "Cloud. A visible mass of condensed water vapor floating in the atmosphere.")
]

async def main():
    print(f"Generando {len(WORDS)} audios para los 3 juegos mas buscados...")
    for slug, text in WORDS:
        dest = AUDIO_DIR / f"{slug}.mp3"
        if dest.exists() and dest.stat().st_size > 500:
            print(f"  [OK] {slug}.mp3 ya existe.")
            continue
        rate = f"{BASE_RATE + random.randint(-2, 2):+d}%"
        pitch = f"{BASE_PITCH + random.randint(-2, 2):+d}Hz"
        com = edge_tts.Communicate(text, VOICE, rate=rate, pitch=pitch)
        await com.save(str(dest))
        print(f"  [OK] {slug}.mp3 -> '{text[:30]}...'")
    print("¡Todos los audios generados exitosamente!")

if __name__ == "__main__":
    asyncio.run(main())
