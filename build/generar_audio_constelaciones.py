#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GENERADOR DE AUDIO — Constelaciones Semánticas (Ludoteca)
Genera MP3s neurales humanizados en audio/vocab/{word_slug}.mp3
"""
import asyncio
import pathlib
import random
import re
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
DESTINO_DIR = ROOT / "audio" / "vocab"
DESTINO_DIR.mkdir(parents=True, exist_ok=True)

VOZ_AURORA = "en-US-JennyNeural"
BASE_RATE = -4
BASE_PITCH = 0

CONSTELLATIONS_DATA = {
    "adjectives": {
        "id": "a1-adjectives-people-things-01",
        "name": "Adjective Spectrum",
        "icon": "🦒",
        "level": "A1",
        "theme": "Describing People & Things",
        "items": [
            {"word": "tall", "slug": "tall", "icon": "🦒", "clue": "High in height, reaching upward"},
            {"word": "short", "slug": "short", "icon": "📏", "clue": "Small in height or length"},
            {"word": "friendly", "slug": "friendly", "icon": "🤝", "clue": "Kind, warm and welcoming to others"},
            {"word": "funny", "slug": "funny", "icon": "😄", "clue": "Makes you smile and laugh"},
            {"word": "smart", "slug": "smart", "icon": "🧠", "clue": "Quick to learn and understand"},
            {"word": "beautiful", "slug": "beautiful", "icon": "🌸", "clue": "Very pleasing to see"},
            {"word": "old", "slug": "old", "icon": "👴", "clue": "Having lived or existed for a long time"},
            {"word": "young", "slug": "young", "icon": "👶", "clue": "In the early stage of life"},
            {"word": "big", "slug": "big", "icon": "🐘", "clue": "Large in size and weight"},
            {"word": "small", "slug": "small", "icon": "🐜", "clue": "Little in size and volume"},
            {"word": "fast", "slug": "fast", "icon": "⚡", "clue": "Moving with great speed"},
            {"word": "strong", "slug": "strong", "icon": "💪", "clue": "Having great physical power"}
        ]
    },
    "professions": {
        "id": "a1-relative-clauses-professions-01",
        "name": "Professions & Roles",
        "icon": "🧑‍🍳",
        "level": "A1",
        "theme": "Defining People",
        "items": [
            {"word": "doctor", "slug": "doctor", "icon": "👨‍⚕️", "clue": "A person who heals sick people"},
            {"word": "chef", "slug": "chef", "icon": "👨‍🍳", "clue": "A person who cooks delicious food"},
            {"word": "pilot", "slug": "pilot", "icon": "🧑‍✈️", "clue": "A person who flies airplanes"},
            {"word": "architect", "slug": "architect", "icon": "📐", "clue": "A person who designs buildings"},
            {"word": "nurse", "slug": "nurse", "icon": "👩‍⚕️", "clue": "A person who cares for patients in a hospital"},
            {"word": "teacher", "slug": "teacher", "icon": "👩‍🏫", "clue": "A person who teaches students"},
            {"word": "journalist", "slug": "journalist", "icon": "📰", "clue": "A person who writes news stories"},
            {"word": "engineer", "slug": "engineer", "icon": "⚙️", "clue": "A person who builds machines and systems"},
            {"word": "photographer", "slug": "photographer", "icon": "📷", "clue": "A person who takes photos"},
            {"word": "singer", "slug": "singer", "icon": "🎤", "clue": "A person who sings songs"},
            {"word": "actor", "slug": "actor", "icon": "🎭", "clue": "A person who performs in movies or plays"},
            {"word": "police officer", "slug": "police_officer", "icon": "👮", "clue": "A person who protects the community"}
        ]
    },
    "places": {
        "id": "a1-relative-clauses-places-01",
        "name": "City & Places",
        "icon": "🏙️",
        "level": "A1",
        "theme": "Places in the City",
        "items": [
            {"word": "bakery", "slug": "bakery", "icon": "🥖", "clue": "A place where fresh bread is baked"},
            {"word": "library", "slug": "library", "icon": "📚", "clue": "A quiet place where you read books"},
            {"word": "museum", "slug": "museum", "icon": "🏛️", "clue": "A place where art and history are shown"},
            {"word": "hospital", "slug": "hospital", "icon": "🏥", "clue": "A place where doctors care for the sick"},
            {"word": "airport", "slug": "airport", "icon": "✈️", "clue": "A place where airplanes land and take off"},
            {"word": "pharmacy", "slug": "pharmacy", "icon": "💊", "clue": "A place where you buy medicine"},
            {"word": "supermarket", "slug": "supermarket", "icon": "🛒", "clue": "A large shop selling food and goods"},
            {"word": "cinema", "slug": "cinema", "icon": "🍿", "clue": "A place where you watch movies"},
            {"word": "gym", "slug": "gym", "icon": "🏋️", "clue": "A place where people exercise and train"},
            {"word": "restaurant", "slug": "restaurant", "icon": "🍽️", "clue": "A place where you order and eat meals"},
            {"word": "bank", "slug": "bank", "icon": "🏦", "clue": "A place where you keep your money safe"},
            {"word": "park", "slug": "park", "icon": "🌳", "clue": "A green public space with trees and grass"}
        ]
    },
    "objects": {
        "id": "a1-relative-clauses-objects-01",
        "name": "Objects & Tools",
        "icon": "🔧",
        "level": "A1",
        "theme": "Objects to Work & Study",
        "items": [
            {"word": "keyboard", "slug": "keyboard", "icon": "⌨️", "clue": "A set of keys for typing on a computer"},
            {"word": "backpack", "slug": "backpack", "icon": "🎒", "clue": "A bag carried on your back for books"},
            {"word": "hammer", "slug": "hammer", "icon": "🔨", "clue": "A tool used for hitting nails into wood"},
            {"word": "scissors", "slug": "scissors", "icon": "✂️", "clue": "A tool with two blades for cutting paper"},
            {"word": "umbrella", "slug": "umbrella", "icon": "☂️", "clue": "Protects you from falling rain"},
            {"word": "microscope", "slug": "microscope", "icon": "🔬", "clue": "An instrument to look at tiny cells"},
            {"word": "camera", "slug": "camera", "icon": "📷", "clue": "A device for capturing photos"},
            {"word": "guitar", "slug": "guitar", "icon": "🎸", "clue": "A musical instrument with six strings"},
            {"word": "key", "slug": "key", "icon": "🔑", "clue": "A metal object that unlocks doors"},
            {"word": "mirror", "slug": "mirror", "icon": "🪞", "clue": "A glass surface reflecting your face"}
        ]
    },
    "food": {
        "id": "a2-countables-some-any-01",
        "name": "Food & Sustenance",
        "icon": "🍳",
        "level": "A2",
        "theme": "Food & Countables",
        "items": [
            {"word": "cheese", "slug": "cheese", "icon": "🧀", "clue": "A dairy food made from milk"},
            {"word": "rice", "slug": "rice", "icon": "🍚", "clue": "Small white grains cooked in water"},
            {"word": "coffee", "slug": "coffee", "icon": "☕", "clue": "A hot dark morning drink"},
            {"word": "water", "slug": "water", "icon": "💧", "clue": "Clear liquid essential for all life"},
            {"word": "apple", "slug": "apple", "icon": "🍎", "clue": "A round red or green fruit"},
            {"word": "egg", "slug": "egg", "icon": "🥚", "clue": "An oval food laid by chickens"},
            {"word": "bread", "slug": "bread", "icon": "🍞", "clue": "Baked flour food eaten daily"},
            {"word": "potato", "slug": "potato", "icon": "🥔", "clue": "A root vegetable cooked in many ways"},
            {"word": "milk", "slug": "milk", "icon": "🥛", "clue": "A white liquid food produced by cows"},
            {"word": "tea", "slug": "tea", "icon": "🍵", "clue": "A hot beverage made with dried leaves"},
            {"word": "banana", "slug": "banana", "icon": "🍌", "clue": "A sweet curved yellow tropical fruit"},
            {"word": "meat", "slug": "meat", "icon": "🥩", "clue": "Animal tissue used as nutritious food"}
        ]
    },
    "routines": {
        "id": "a1-present-simple-routines-01",
        "name": "Daily Routines",
        "icon": "⏰",
        "level": "A1",
        "theme": "Daily Life & Routines",
        "items": [
            {"word": "wake up", "slug": "wake_up", "icon": "⏰", "clue": "To stop sleeping in the morning"},
            {"word": "brush teeth", "slug": "brush_teeth", "icon": "🪥", "clue": "To clean your teeth with a toothbrush"},
            {"word": "have breakfast", "slug": "have_breakfast", "icon": "🥞", "clue": "To eat your first morning meal"},
            {"word": "take shower", "slug": "take_shower", "icon": "🚿", "clue": "To wash your body with warm water"},
            {"word": "go to work", "slug": "go_to_work", "icon": "💼", "clue": "To travel to your workplace"},
            {"word": "cook dinner", "slug": "cook_dinner", "icon": "🍲", "clue": "To prepare evening food"},
            {"word": "read book", "slug": "read_book", "icon": "📖", "clue": "To read pages of literature"},
            {"word": "go to bed", "slug": "go_to_bed", "icon": "🛏️", "clue": "To lie down and sleep at night"}
        ]
    }
}

def prosodia_humanizada():
    rate = BASE_RATE + random.randint(-3, 3)
    pitch = BASE_PITCH + random.randint(-2, 2)
    return f"{rate:+d}%", f"{pitch:+d}Hz"

async def sintetizar_palabra(word, slug):
    destino = DESTINO_DIR / f"{slug}.mp3"
    if destino.exists() and destino.stat().st_size > 1000:
        return
    rate, pitch = prosodia_humanizada()
    com = edge_tts.Communicate(word, VOZ_AURORA, rate=rate, pitch=pitch)
    await com.save(str(destino))
    print(f"  OK {slug}.mp3 -> '{word}' [{VOZ_AURORA} {rate} {pitch}]")

async def main():
    print("Generando audio humanizado para todas las Constelaciones...")
    total = 0
    for group_key, group in CONSTELLATIONS_DATA.items():
        print(f"\n--- {group['name']} ({group['level']}) ---")
        for item in group["items"]:
            await sintetizar_palabra(item["word"], item["slug"])
            total += 1
    print(f"\n¡Total de {total} audios listos en audio/vocab/!")

if __name__ == "__main__":
    asyncio.run(main())
