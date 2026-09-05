#!/usr/bin/env python3
"""
COMPILADOR DE VOCABULARIO Y BANCO DE ORACIONES DESDE LAS 85 LECCIONES
Lee todos los JSON en contenido/ (A1, A2, B1, B2, C1) y genera:
1. data/curriculum_vocab_bank.json
2. js/aurora-curriculum.js (exponiendo window.AuroraCurriculum para todos los juegos de la Ludoteca)
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENIDO_DIR = ROOT / "contenido"
DATA_DIR = ROOT / "data"
JS_DIR = ROOT / "js"

DATA_DIR.mkdir(parents=True, exist_ok=True)
JS_DIR.mkdir(parents=True, exist_ok=True)

def compile_curriculum():
    files = sorted(CONTENIDO_DIR.rglob("*.json"))
    print(f"Compilando banco curricular desde {len(files)} lecciones...")

    db = {
        "meta": {
            "version": "2.0.0",
            "total_lessons": len(files),
            "generated_at": "2026-08-27"
        },
        "by_level": {
            "A1": {"topics": [], "vocab": [], "sentences": []},
            "A2": {"topics": [], "vocab": [], "sentences": []},
            "B1": {"topics": [], "vocab": [], "sentences": []},
            "B2": {"topics": [], "vocab": [], "sentences": []},
            "C1": {"topics": [], "vocab": [], "sentences": []}
        },
        "topics": {},
        "all_vocab": [],
        "all_sentences": []
    }

    seen_words = set()
    total_vocab_count = 0
    total_sentence_count = 0

    for f in files:
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
            topic_id = data.get("id", f.stem)
            level = data.get("nivel", "A1").upper()
            title = data.get("tema", "")
            archetype = data.get("arquetipo", "gramatica")
            vocab_list = data.get("vocabulario", [])
            sentence_list = data.get("banco_oraciones", [])

            if level not in db["by_level"]:
                db["by_level"][level] = {"topics": [], "vocab": [], "sentences": []}

            topic_entry = {
                "id": topic_id,
                "level": level,
                "title": title,
                "archetype": archetype,
                "vocab_count": len(vocab_list),
                "sentence_count": len(sentence_list)
            }

            db["topics"][topic_id] = {
                **topic_entry,
                "vocab": vocab_list,
                "sentences": sentence_list
            }
            db["by_level"][level]["topics"].append(topic_entry)

            # Aggregate Vocab
            for item in vocab_list:
                word = item.get("palabra", "").strip()
                if not word:
                    continue
                v_entry = {
                    "word": word,
                    "es": item.get("traduccion", ""),
                    "icon": item.get("bandera", "✨"),
                    "level": level,
                    "topic_id": topic_id,
                    "topic_title": title
                }
                db["all_vocab"].append(v_entry)
                db["by_level"][level]["vocab"].append(v_entry)
                total_vocab_count += 1

            # Aggregate Sentences
            for s in sentence_list:
                sentence_text = s.get("oracion", "").strip()
                if not sentence_text:
                    continue
                s_entry = {
                    "sentence": sentence_text,
                    "form": s.get("forma", "afirmativo"),
                    "level": level,
                    "topic_id": topic_id,
                    "topic_title": title
                }
                db["all_sentences"].append(s_entry)
                db["by_level"][level]["sentences"].append(s_entry)
                total_sentence_count += 1

        except Exception as e:
            print(f"Error procesando {f.name}: {e}")

    # Write JSON
    json_path = DATA_DIR / "curriculum_vocab_bank.json"
    json_path.write_text(json.dumps(db, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"  [OK] Guardado {json_path.name} ({total_vocab_count} palabras, {total_sentence_count} oraciones)")

    # Generate Browser JS Engine
    js_code = f"""/**
 * AURORA CURRICULUM VOCABULARY & SENTENCE ENGINE v2.0
 * Base de datos oficial conectada a las 85 lecciones del programa English Aurora.
 * Exponiendo window.AuroraCurriculum para alimentar todos los juegos de la Ludoteca.
 */
(function(window) {{
  'use strict';

  const CURRICULUM_DATA = {json.dumps(db, ensure_ascii=False)};

  const AuroraCurriculum = {{
    data: CURRICULUM_DATA,

    getTopicsByLevel: function(level) {{
      const lvl = (level || 'A1').toUpperCase();
      return (CURRICULUM_DATA.by_level[lvl] && CURRICULUM_DATA.by_level[lvl].topics) || [];
    }},

    getTopic: function(topicId) {{
      return CURRICULUM_DATA.topics[topicId] || null;
    }},

    getVocabByLevel: function(level) {{
      const lvl = (level || 'A1').toUpperCase();
      return (CURRICULUM_DATA.by_level[lvl] && CURRICULUM_DATA.by_level[lvl].vocab) || [];
    }},

    getVocabByTopic: function(topicId) {{
      const t = CURRICULUM_DATA.topics[topicId];
      return t ? t.vocab : [];
    }},

    getSentencesByLevel: function(level) {{
      const lvl = (level || 'A1').toUpperCase();
      return (CURRICULUM_DATA.by_level[lvl] && CURRICULUM_DATA.by_level[lvl].sentences) || [];
    }},

    getSentencesByTopic: function(topicId) {{
      const t = CURRICULUM_DATA.topics[topicId];
      return t ? t.sentences : [];
    }},

    getWordsOfLength: function(length, level) {{
      let pool = level ? this.getVocabByLevel(level) : CURRICULUM_DATA.all_vocab;
      return pool.filter(item => {{
        const clean = item.word.replace(/[^a-zA-Z]/g, '');
        return clean.length === length;
      }});
    }},

    getRandomVocabBatch: function(count, level, topicId) {{
      let pool = [];
      if (topicId) {{
        pool = this.getVocabByTopic(topicId);
      }} else if (level) {{
        pool = this.getVocabByLevel(level);
      }} else {{
        pool = CURRICULUM_DATA.all_vocab;
      }}
      if (!pool.length) pool = CURRICULUM_DATA.all_vocab;
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count || 10);
    }},

    getRandomSentenceBatch: function(count, level, topicId) {{
      let pool = [];
      if (topicId) {{
        pool = this.getSentencesByTopic(topicId);
      }} else if (level) {{
        pool = this.getSentencesByLevel(level);
      }} else {{
        pool = CURRICULUM_DATA.all_sentences;
      }}
      if (!pool.length) pool = CURRICULUM_DATA.all_sentences;
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count || 5);
    }}
  }};

  window.AuroraCurriculum = AuroraCurriculum;
}})(typeof window !== 'undefined' ? window : global);
"""

    js_path = JS_DIR / "aurora-curriculum.js"
    js_path.write_text(js_code, encoding="utf-8")
    print(f"  [OK] Generado {js_path.name} con API curricular universal.")

if __name__ == "__main__":
    compile_curriculum()
