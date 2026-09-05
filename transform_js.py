import os
import re

src = r"c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\ui-lab\aurora-landing.js"
dst = r"c:\Users\moral\Documents\EnglishAngel\Dummy_alfa\js\aurora-landing.js"

with open(src, 'r', encoding='utf-8') as f:
    content = f.read()

# SKILLS desc
content = content.replace("Hablar: la habilidad de producir el idioma en voz alta — fluidez, pronunciación y conversación real.", 
                          "Speaking: the ability to produce the language out loud — fluency, pronunciation, and real conversation.")
content = content.replace("Escuchar: entender el inglés tal como suena — acentos, velocidad y matices de nativos.", 
                          "Listening: understanding English as it sounds — accents, speed, and native nuances.")
content = content.replace("Leer: comprender textos reales, del anuncio simple al artículo complejo.", 
                          "Reading: understanding real texts, from a simple ad to a complex article.")
content = content.replace("Escribir: construir oraciones y textos que otros entienden — precisión y estilo.", 
                          "Writing: building sentences and texts others understand — precision and style.")
content = content.replace("Gramática: la arquitectura invisible del idioma — las estructuras que sostienen todo.", 
                          "Grammar: the invisible architecture of the language — the structures holding everything together.")
content = content.replace("Vocabulario: las palabras como herramientas — cuantas más tienes, más mundos describes.", 
                          "Vocabulary: words as tools — the more you have, the more worlds you describe.")

# Level select
content = content.replace("Nivel ${lv}: ${n} temas encendidos en el cielo. Los demás esperan su turno.", 
                          "Level ${lv}: ${n} topics lit in the sky. The rest are waiting for their turn.")
content = content.replace("<b>Nivel ${lv}</b>: ${n} estrellas agrupadas. Combínalo con una habilidad del carrusel y encuentra tu tema exacto.", 
                          "<b>Level ${lv}</b>: ${n} clustered stars. Combine it with a skill from the carousel to find your exact topic.")
content = content.replace("Seis habilidades. Un cielo. Elige una constelación o toca una estrella.", 
                          "Six skills. One sky. Choose a constellation or touch a star.")

# Skill select
content = content.replace("<b>${sk.label}</b>: ${sk.count} estrellas en esta constelación. Toca una para ver su secuencia.", 
                          "<b>${sk.label}</b>: ${sk.count} stars in this constellation. Touch one to see its sequence.")

# openStar
old_openStar = """  $('p-title').textContent = s.data.title;
  $('p-meta').textContent = s.data.meta;
  setAurora('explicando');
  say('Buena elección. <b>Cada estrella es una mini-lección completa</b> — y cuando la terminas, se queda encendida para siempre.');"""

new_openStar = """  $('p-title').textContent = s.data.title;
  $('p-meta').textContent = s.data.meta;
  
  const id = s.data.id;
  if($('btn-start')) $('btn-start').href = `leccion/${id}.html`;
  if($('btn-test')) $('btn-test').href = `evaluacion/${id}.html`;
  if($('btn-games')) $('btn-games').href = `preview/${id}.html`;

  setAurora('explicando');
  say('Good choice. <b>Every star is a complete mini-lesson</b> — and when you finish it, it stays lit forever.');"""
content = content.replace(old_openStar, new_openStar)

# Look button
content = content.replace("Sin problema. El cielo es tuyo para mirarlo — <b>yo estaré aquí cuando quieras encenderlo</b>.", 
                          "No problem. The sky is yours to look at — <b>I\\'ll be here when you want to light it up</b>.")

# Canvas text
content = content.replace(" + ' ESTRELLAS'", " + ' STARS'")

# Boot text
content = content.replace("Hola, soy <b>Aurora</b> ✨ Este cielo está dormido… <b>acércate a una estrella</b> y mira cómo despierta.", 
                          "Hello, I\\'m <b>Aurora</b> ✨ This sky is asleep... <b>approach a star</b> and watch it wake up.")

os.makedirs(os.path.dirname(dst), exist_ok=True)
with open(dst, 'w', encoding='utf-8') as f:
    f.write(content)

print("JS processed and saved to", dst)
