import asyncio, edge_tts, pathlib

async def test():
    # edge-tts Communicate natively takes text, but if text contains SSML it might or might not parse.
    # Let's test standard text with rich prosodic punctuation vs SSML.
    text_human = "¡Hola a los dos! Yo soy Mateo... Soy colombiano, de Medellín."
    comm = edge_tts.Communicate(text_human, "es-CO-GonzaloNeural", rate="-4%", pitch="-1Hz")
    dest = pathlib.Path("audio/test_human.mp3")
    await comm.save(str(dest))
    print(f"Generated {dest} size={dest.stat().st_size}")

if __name__ == "__main__":
    asyncio.run(test())
