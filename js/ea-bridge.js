/* English Aurora — Connected Topic Bridges & FAQ Engine
   Autonomous client module: renders interactive next-quest bridges and FAQ accordions.
   Loaded dynamically on preview/, leccion/, and evaluacion/ pages. */

(function() {
  'use strict';
  
  window.EA_BRIDGES_DATA = {
  "a1-to-be-nationalities-01": {
    "nextId": "a1-to-be-identities-01",
    "nextTitle": "Verb To Be — Identities & Professions",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Now that you can state where people are from, learn how to describe who they are and what they do.",
    "challenge": {
      "q": "Sofía ___ from Colombia and she ___ a brilliant graphic designer.",
      "options": [
        "is / is",
        "is / are",
        "am / is"
      ],
      "answer": "is / is",
      "hint": "Sofía is singular (she), so use 'is' in both slots."
    }
  },
  "a1-to-be-identities-01": {
    "nextId": "a1-have-got-01",
    "nextTitle": "Have got — Possessions & Family",
    "nextLevel": "A1",
    "relation": "Direct Contrast",
    "note": "Careful Spanish transfer trap: In English we use 'to be' for age and emotions, but 'have got' for possessions.",
    "challenge": {
      "q": "Sofía ___ twenty-five years old, and she ___ two cats.",
      "options": [
        "is / has got",
        "has / has got",
        "is / have got"
      ],
      "answer": "is / has got",
      "hint": "Age takes 'to be' ('is 25'), while pets take 'has got'!"
    }
  },
  "a1-have-got-01": {
    "nextId": "a1-family-possessive-s-01",
    "nextTitle": "Family & Possessive 's",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "From what you have to who belongs to who: master the English apostrophe -'s.",
    "challenge": {
      "q": "This is ___ iguana. She has got twenty mangos.",
      "options": [
        "Abuela Carmen's",
        "Abuela Carmens",
        "the iguana of Carmen"
      ],
      "answer": "Abuela Carmen's",
      "hint": "Add 's to the owner: Abuela Carmen's iguana."
    }
  },
  "a1-family-possessive-s-01": {
    "nextId": "a1-pronouns-possessives-01",
    "nextTitle": "Subject Pronouns & Possessive Adjectives",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Learn to replace names with my, your, his, her, their without hesitation.",
    "challenge": {
      "q": "Ben loves Cartagena. ___ favorite place is the old clock tower.",
      "options": [
        "His",
        "Her",
        "He"
      ],
      "answer": "His",
      "hint": "Ben is a man, so his possessive adjective is 'His'."
    }
  },
  "a1-pronouns-possessives-01": {
    "nextId": "a1-object-pronouns-01",
    "nextTitle": "Object Pronouns (me, him, her, us, them)",
    "nextLevel": "A1",
    "relation": "Direct Contrast",
    "note": "When the person receives the action instead of doing it: I -> me, he -> him, they -> them.",
    "challenge": {
      "q": "Kenji loves arepas. Abuela Carmen makes ___ for ___ every morning.",
      "options": [
        "them / him",
        "they / he",
        "them / he"
      ],
      "answer": "them / him",
      "hint": "Arepas are the object ('them'), and Kenji receives them ('him')."
    }
  },
  "a1-articles-01": {
    "nextId": "a1-plural-nouns-01",
    "nextTitle": "Plural Nouns — Regular & Irregular",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Articles 'a/an' only work with singular nouns. Now discover what happens when nouns become plural.",
    "challenge": {
      "q": "Ben saw one ___ and three ___ in the city park.",
      "options": [
        "child / children",
        "children / childs",
        "child / childs"
      ],
      "answer": "child / children",
      "hint": "'Child' is an irregular plural: one child, three children!"
    }
  },
  "a1-plural-nouns-01": {
    "nextId": "a1-demonstratives-01",
    "nextTitle": "This / That / These / Those",
    "nextLevel": "A1",
    "relation": "Pragmatic Expansion",
    "note": "Point at things near and far in singular and plural: This, That, These, Those.",
    "challenge": {
      "q": "___ mangos here in my basket are fresh, but ___ over there look old.",
      "options": [
        "These / those",
        "This / that",
        "Those / these"
      ],
      "answer": "These / those",
      "hint": "'These' for nearby plural, 'those' for distant plural."
    }
  },
  "a1-demonstratives-01": {
    "nextId": "a1-adjectives-people-things-01",
    "nextTitle": "Adjectives — Describing People & Things",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "English adjectives never change for gender or plural, and always go BEFORE the noun!",
    "challenge": {
      "q": "Sofía lives in a ___ and designs ___ posters.",
      "options": [
        "beautiful house / colorful",
        "house beautiful / colorfuls",
        "beautiful house / colorfuls"
      ],
      "answer": "beautiful house / colorful",
      "hint": "Adjective goes before the noun and never takes an -s: 'beautiful house', 'colorful posters'."
    }
  },
  "a1-present-simple-routines-01": {
    "nextId": "a1-present-simple-frequency-01",
    "nextTitle": "Present Simple — Adverbs of Frequency",
    "nextLevel": "A1",
    "relation": "Pragmatic Expansion",
    "note": "Take your daily routines to the next level: specify how often with always, usually, sometimes, and never.",
    "challenge": {
      "q": "Abuela Carmen ___ at five in the morning.",
      "options": [
        "always wakes up",
        "wakes always up",
        "wakes up always"
      ],
      "answer": "always wakes up",
      "hint": "Adverbs of frequency go BEFORE the main verb: 'always wakes up'."
    }
  },
  "a1-present-simple-frequency-01": {
    "nextId": "a1-present-simple-likes-01",
    "nextTitle": "Present Simple — Likes, Hobbies & Free Time",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Learn how to talk about what you enjoy: verbs of liking + -ing (like, love, enjoy, hate).",
    "challenge": {
      "q": "Kenji ___ photos of the colonial balconies.",
      "options": [
        "loves taking",
        "love takes",
        "loves take"
      ],
      "answer": "loves taking",
      "hint": "Third person takes -s ('loves') and 'love' is followed by the gerund ('taking')."
    }
  },
  "a1-present-simple-likes-01": {
    "nextId": "a1-present-simple-neg-questions-01",
    "nextTitle": "Present Simple — Negatives & Questions",
    "nextLevel": "A1",
    "relation": "Mastery Step",
    "note": "Master the secret weapon of English: the auxiliaries DO and DOES for negatives and questions.",
    "challenge": {
      "q": "___ Ben ___ coffee in the morning? No, he drinks tea.",
      "options": [
        "Does / drink",
        "Do / drinks",
        "Does / drinks"
      ],
      "answer": "Does / drink",
      "hint": "'Does' already marks third person, so the main verb stays base: 'Does he drink?'"
    }
  },
  "a1-present-simple-neg-questions-01": {
    "nextId": "a1-present-continuous-01",
    "nextTitle": "Present Continuous — Actions Happening Now",
    "nextLevel": "A1",
    "relation": "Direct Contrast",
    "note": "The ultimate A1 contrast: What you do habitually (routines) vs what you are doing right now.",
    "challenge": {
      "q": "Kenji usually ___ breakfast at eight, but today he ___ at nine.",
      "options": [
        "eats / is eating",
        "is eating / eats",
        "eat / is eating"
      ],
      "answer": "eats / is eating",
      "hint": "'Usually' calls for Present Simple, while 'today / right now' calls for Present Continuous!"
    }
  },
  "a1-present-continuous-01": {
    "nextId": "a2-going-to-future-01",
    "nextTitle": "Going to — Future Plans & Intentions",
    "nextLevel": "A2",
    "relation": "Next Milestone",
    "note": "Bridge from present continuous to the future: use 'be going to' to announce your next goals.",
    "challenge": {
      "q": "Sofía bought her plane tickets. She ___ visit London in June.",
      "options": [
        "is going to",
        "goes to",
        "will to"
      ],
      "answer": "is going to",
      "hint": "A pre-arranged intention with tickets already bought uses 'is going to'!"
    }
  },
  "a2-verb-to-be-past-01": {
    "nextId": "a2-past-simple-regular-01",
    "nextTitle": "Past Simple — Regular Verbs (-ed)",
    "nextLevel": "A2",
    "relation": "Next Milestone",
    "note": "You can say where you were (was/were). Now learn how to describe any action in the past.",
    "challenge": {
      "q": "Yesterday, Ben ___ around the walled city and ___ at a cafe.",
      "options": [
        "walked / stopped",
        "walk / stoped",
        "walkt / stopped"
      ],
      "answer": "walked / stopped",
      "hint": "Add -ed for regular past: 'walked', and double consonant for 'stopped'."
    }
  },
  "a2-past-simple-regular-01": {
    "nextId": "a2-past-simple-irregular-01",
    "nextTitle": "Past Simple — Irregular Verbs Vault",
    "nextLevel": "A2",
    "relation": "Essential Continuation",
    "note": "Not all verbs take -ed! Meet the 126 verbs that change their vowel or form in the past.",
    "challenge": {
      "q": "Kenji ___ an email to his mother and ___ a souvenir.",
      "options": [
        "wrote / bought",
        "writed / buyed",
        "written / bought"
      ],
      "answer": "wrote / bought",
      "hint": "'Write' becomes 'wrote' and 'buy' becomes 'bought'."
    }
  },
  "a2-past-simple-irregular-01": {
    "nextId": "a2-past-continuous-vs-simple-01",
    "nextTitle": "Past Continuous vs Past Simple (when / while)",
    "nextLevel": "A2",
    "relation": "Direct Contrast",
    "note": "Combine an action in progress in the past with a sudden interrupting event.",
    "challenge": {
      "q": "While Ben ___ his tea, the doorbell ___.",
      "options": [
        "was drinking / rang",
        "drank / was ringing",
        "was drinking / was ringing"
      ],
      "answer": "was drinking / rang",
      "hint": "The background ongoing action takes was/were + -ing; the interruption takes Past Simple!"
    }
  },
  "a2-past-continuous-vs-simple-01": {
    "nextId": "b1-present-perfect-vs-past-simple-01",
    "nextTitle": "Present Perfect vs Past Simple — Which One?",
    "nextLevel": "B1",
    "relation": "Mastery Leap",
    "note": "The #1 grammar dilemma in English: finished past time vs open, living experience.",
    "challenge": {
      "q": "I ___ to Cartagena in 2022, but Kenji ___ there three times.",
      "options": [
        "went / has been",
        "have gone / went",
        "went / was"
      ],
      "answer": "went / has been",
      "hint": "'In 2022' is a closed past time (went), but total life experiences take Present Perfect (has been)!"
    }
  },
  "b1-present-perfect-vs-past-simple-01": {
    "nextId": "b1-present-perfect-continuous-01",
    "nextTitle": "Present Perfect Continuous — for / since / just",
    "nextLevel": "B1",
    "relation": "Pragmatic Expansion",
    "note": "Emphasize how long an action has been happening non-stop: 'I have been studying for 2 hours'.",
    "challenge": {
      "q": "Sofía is exhausted because she ___ posters all afternoon.",
      "options": [
        "has been designing",
        "has designed",
        "is designing"
      ],
      "answer": "has been designing",
      "hint": "Focus on the duration and immediate physical effect: Present Perfect Continuous!"
    }
  },
  "b1-present-perfect-continuous-01": {
    "nextId": "b1-past-perfect-01",
    "nextTitle": "Past Perfect — The Timeline Detective",
    "nextLevel": "B1",
    "relation": "Timeline Mastery",
    "note": "Travel further back in time: describe an action that happened BEFORE another past action.",
    "challenge": {
      "q": "When Ben arrived at the station, the train ___ already ___.",
      "options": [
        "had / left",
        "has / left",
        "was / leaving"
      ],
      "answer": "had / left",
      "hint": "The train left before Ben arrived: Past Perfect (had + participle)!"
    }
  },
  "b1-will-vs-going-to-01": {
    "nextId": "b1-conditionals-0-1-2-01",
    "nextTitle": "Conditionals 0, 1 & 2 — Three Realities",
    "nextLevel": "B1",
    "relation": "Next Milestone",
    "note": "Take future predictions into hypothetical worlds: If it rains, I will stay. If I were you, I would go.",
    "challenge": {
      "q": "If I ___ more free time, I ___ travel across South America.",
      "options": [
        "had / would",
        "have / will",
        "had / will"
      ],
      "answer": "had / would",
      "hint": "Second conditional for an imaginary present situation: If + past simple, would + verb."
    }
  },
  "b1-conditionals-0-1-2-01": {
    "nextId": "b2-third-conditional-01",
    "nextTitle": "Third Conditional — Regrets & What Ifs",
    "nextLevel": "B2",
    "relation": "Advanced Leap",
    "note": "Step into the past impossible: talk about what could have happened, but didn't.",
    "challenge": {
      "q": "If Ben ___ his alarm, he ___ the flight.",
      "options": [
        "had set / wouldn't have missed",
        "set / wouldn't miss",
        "would have set / missed"
      ],
      "answer": "had set / wouldn't have missed",
      "hint": "Third conditional: If + had + participle, would have + participle."
    }
  },
  "b1-passive-voice-01": {
    "nextId": "b2-causative-01",
    "nextTitle": "Causative — Have / Get Something Done",
    "nextLevel": "B2",
    "relation": "Direct Contrast",
    "note": "From 'The car was washed' (passive) to 'I had my car washed' (you arranged for someone else to do it).",
    "challenge": {
      "q": "Sofía didn't paint her office herself. She ___ it ___ by professionals.",
      "options": [
        "had / painted",
        "was / painted",
        "got / paint"
      ],
      "answer": "had / painted",
      "hint": "Causative structure: have + object + past participle."
    }
  },
  "b2-third-conditional-01": {
    "nextId": "b2-mixed-conditionals-01",
    "nextTitle": "Mixed Conditionals — Past Causes, Present Results",
    "nextLevel": "B2",
    "relation": "Elite Grammar",
    "note": "Blend the rules: a past decision that creates an ongoing reality right now.",
    "challenge": {
      "q": "If I ___ German at school, I ___ able to read this contract now.",
      "options": [
        "had studied / would be",
        "studied / would have been",
        "had studied / would have been"
      ],
      "answer": "had studied / would be",
      "hint": "Past action (had studied) with a present result right now (would be)!"
    }
  },
  "b2-relative-clauses-01": {
    "nextId": "c1-participle-clauses-01",
    "nextTitle": "Participle Clauses — Advanced Sentence Reduction",
    "nextLevel": "C1",
    "relation": "Stylistic Transformation",
    "note": "Transform relative clauses into high-scoring C1 prose: 'The man who was sitting' -> 'Sitting by the window'.",
    "challenge": {
      "q": "___ by the breathtaking sunset, Ben took dozens of photos.",
      "options": [
        "Fascinated",
        "Fascinating",
        "Having fascinated"
      ],
      "answer": "Fascinated",
      "hint": "Passive past participle clause describing how Ben felt."
    }
  },
  "b2-reported-speech-01": {
    "nextId": "c1-emphatic-structures-01",
    "nextTitle": "Emphatic Structures — do/does/did & so/such",
    "nextLevel": "C1",
    "relation": "Expressive Power",
    "note": "Add dramatic weight to your statements: 'I do want to help you' and 'So compelling was her argument'.",
    "challenge": {
      "q": "Believe me, I ___ apologize to Kenji yesterday!",
      "options": [
        "did",
        "do",
        "done"
      ],
      "answer": "did",
      "hint": "Use emphatic 'did' + base verb in affirmative past statements."
    }
  },
  "c1-emphatic-structures-01": {
    "nextId": "c1-inversion-01",
    "nextTitle": "Inversion for Emphasis & Drama",
    "nextLevel": "C1",
    "relation": "Cambridge C1 Core",
    "note": "The crown jewel of Cambridge C1 exam transformations: Rarely have I seen, Never before did he speak.",
    "challenge": {
      "q": "Rarely ___ such dedication in a language learner.",
      "options": [
        "have I witnessed",
        "I have witnessed",
        "did I witnessed"
      ],
      "answer": "have I witnessed",
      "hint": "After negative adverbs like 'Rarely', invert the auxiliary and subject: 'have I witnessed'."
    }
  },
  "c1-inversion-01": {
    "nextId": "c1-cleft-sentences-01",
    "nextTitle": "Cleft Sentences — It-Clefts & What-Clefts",
    "nextLevel": "C1",
    "relation": "C1 Stylistic Mastery",
    "note": "Re-frame any sentence to spotlight the exact piece of information you want to emphasize.",
    "challenge": {
      "q": "___ surprised everyone was Ben's flawless Spanish.",
      "options": [
        "What",
        "It",
        "That"
      ],
      "answer": "What",
      "hint": "What-cleft: 'What surprised everyone was...' focuses on the noun clause."
    }
  },
  "a1-adjectives-people-things-01": {
    "nextId": "a1-articles-01",
    "nextTitle": "Articles — a / an / the",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Articles — a / an / the.",
    "challenge": {
      "q": "Ready to master Articles — a / an / the? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-imperatives-01": {
    "nextId": "a1-modal-can-ability-01",
    "nextTitle": "Modal Verb 'Can' — Ability & the Body",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Modal Verb 'Can' — Ability & the Body.",
    "challenge": {
      "q": "Ready to master Modal Verb 'Can' — Ability & the Body? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-modal-can-ability-01": {
    "nextId": "a1-modal-have-to-01",
    "nextTitle": "Modal 'Have to' — Obligations at Work & School",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Modal 'Have to' — Obligations at Work & School.",
    "challenge": {
      "q": "Ready to master Modal 'Have to' — Obligations at Work & School? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-modal-have-to-01": {
    "nextId": "a1-modal-must-duties-01",
    "nextTitle": "Modal Verb 'Must' — Duties at Home",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Modal Verb 'Must' — Duties at Home.",
    "challenge": {
      "q": "Ready to master Modal Verb 'Must' — Duties at Home? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-modal-must-duties-01": {
    "nextId": "a1-modal-should-advice-01",
    "nextTitle": "Modal Verb 'Should' — Advice & Suggestions",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Modal Verb 'Should' — Advice & Suggestions.",
    "challenge": {
      "q": "Ready to master Modal Verb 'Should' — Advice & Suggestions? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-modal-should-advice-01": {
    "nextId": "a1-modal-would-like-01",
    "nextTitle": "Would like — Wishes & Polite Offers",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Would like — Wishes & Polite Offers.",
    "challenge": {
      "q": "Ready to master Would like — Wishes & Polite Offers? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-modal-would-like-01": {
    "nextId": "a1-object-pronouns-01",
    "nextTitle": "Object Pronouns (me, him, her, us, them)",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Object Pronouns (me, him, her, us, them).",
    "challenge": {
      "q": "Ready to master Object Pronouns (me, him, her, us, them)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-object-pronouns-01": {
    "nextId": "a1-plural-nouns-01",
    "nextTitle": "Plural Nouns — regular & irregular",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Plural Nouns — regular & irregular.",
    "challenge": {
      "q": "Ready to master Plural Nouns — regular & irregular? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-prepositions-place-01": {
    "nextId": "a1-prepositions-time-01",
    "nextTitle": "Prepositions of Time (at, on, in)",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Prepositions of Time (at, on, in).",
    "challenge": {
      "q": "Ready to master Prepositions of Time (at, on, in)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-prepositions-time-01": {
    "nextId": "a1-present-continuous-01",
    "nextTitle": "Present Continuous — Now (vs Present Simple)",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Present Continuous — Now (vs Present Simple).",
    "challenge": {
      "q": "Ready to master Present Continuous — Now (vs Present Simple)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-present-simple-wh-questions-01": {
    "nextId": "a1-pronouns-possessives-01",
    "nextTitle": "Subject Pronouns & Possessive Adjectives",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Subject Pronouns & Possessive Adjectives.",
    "challenge": {
      "q": "Ready to master Subject Pronouns & Possessive Adjectives? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-relative-clauses-objects-01": {
    "nextId": "a1-relative-clauses-places-01",
    "nextTitle": "Relative Clauses — Places in the City (a place where...)",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Relative Clauses — Places in the City (a place where...).",
    "challenge": {
      "q": "Ready to master Relative Clauses — Places in the City (a place where...)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-relative-clauses-places-01": {
    "nextId": "a1-relative-clauses-professions-01",
    "nextTitle": "Relative Clauses — Defining People (a person who...)",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Relative Clauses — Defining People (a person who...).",
    "challenge": {
      "q": "Ready to master Relative Clauses — Defining People (a person who...)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-relative-clauses-professions-01": {
    "nextId": "a1-review-grand-01",
    "nextTitle": "A1 Grand Review — All Topics Together",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with A1 Grand Review — All Topics Together.",
    "challenge": {
      "q": "Ready to master A1 Grand Review — All Topics Together? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-review-grand-01": {
    "nextId": "a1-review-identity-01",
    "nextTitle": "A1 Review — Identity: To Be, Pronouns & Demonstratives",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with A1 Review — Identity: To Be, Pronouns & Demonstratives.",
    "challenge": {
      "q": "Ready to master A1 Review — Identity: To Be, Pronouns & Demonstratives? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-review-identity-01": {
    "nextId": "a1-review-modals-preps-01",
    "nextTitle": "A1 Review — Modals & Prepositions: Advice, Duties, Time & Place",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with A1 Review — Modals & Prepositions: Advice, Duties, Time & Place.",
    "challenge": {
      "q": "Ready to master A1 Review — Modals & Prepositions: Advice, Duties, Time & Place? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-review-modals-preps-01": {
    "nextId": "a1-review-present-simple-01",
    "nextTitle": "A1 Review — Present Simple: Routines, Frequency, Questions & Likes",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with A1 Review — Present Simple: Routines, Frequency, Questions & Likes.",
    "challenge": {
      "q": "Ready to master A1 Review — Present Simple: Routines, Frequency, Questions & Likes? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-review-present-simple-01": {
    "nextId": "a1-to-be-nationalities-01",
    "nextTitle": "Verb To Be — Nationalities",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Verb To Be — Nationalities.",
    "challenge": {
      "q": "Ready to master Verb To Be — Nationalities? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-to-be-neg-questions-01": {
    "nextId": "a1-wh-questions-bank-01",
    "nextTitle": "Wh- Questions — Question Bank (you / he-she)",
    "nextLevel": "A1",
    "relation": "Next Milestone",
    "note": "Continue your journey in A1: deepen your fluency with Wh- Questions — Question Bank (you / he-she).",
    "challenge": {
      "q": "Ready to master Wh- Questions — Question Bank (you / he-she)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a1-wh-questions-bank-01": {
    "nextId": "curriculum.html",
    "nextTitle": "Curriculum Catalog & Galaxy Sky",
    "nextLevel": "A1",
    "relation": "Level Milestone Reached",
    "note": "Outstanding! You've traversed this sector of A1. Review all constellations in the catalog.",
    "challenge": {
      "q": "Which step comes next after completing a constellation?",
      "options": [
        "Review & Test",
        "Rest forever"
      ],
      "answer": "Review & Test",
      "hint": "Keep your Aurora essence shining with regular tests!"
    }
  },
  "a2-comparatives-superlatives-01": {
    "nextId": "a2-countables-some-any-01",
    "nextTitle": "Countable & Uncountable — a / some / any / much / many (Food)",
    "nextLevel": "A2",
    "relation": "Next Milestone",
    "note": "Continue your journey in A2: deepen your fluency with Countable & Uncountable — a / some / any / much / many (Food).",
    "challenge": {
      "q": "Ready to master Countable & Uncountable — a / some / any / much / many (Food)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a2-countables-some-any-01": {
    "nextId": "a2-going-to-future-01",
    "nextTitle": "Going to — Plans, Decisions & Predictions",
    "nextLevel": "A2",
    "relation": "Next Milestone",
    "note": "Continue your journey in A2: deepen your fluency with Going to — Plans, Decisions & Predictions.",
    "challenge": {
      "q": "Ready to master Going to — Plans, Decisions & Predictions? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a2-going-to-future-01": {
    "nextId": "a2-past-continuous-vs-simple-01",
    "nextTitle": "Past Continuous vs Past Simple — when / while",
    "nextLevel": "A2",
    "relation": "Next Milestone",
    "note": "Continue your journey in A2: deepen your fluency with Past Continuous vs Past Simple — when / while.",
    "challenge": {
      "q": "Ready to master Past Continuous vs Past Simple — when / while? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a2-past-simple-narrative-01": {
    "nextId": "a2-past-simple-regular-01",
    "nextTitle": "Past Simple — Regular Verbs (-ed) & Time Expressions",
    "nextLevel": "A2",
    "relation": "Next Milestone",
    "note": "Continue your journey in A2: deepen your fluency with Past Simple — Regular Verbs (-ed) & Time Expressions.",
    "challenge": {
      "q": "Ready to master Past Simple — Regular Verbs (-ed) & Time Expressions? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a2-review-grand-01": {
    "nextId": "a2-there-is-there-are-01",
    "nextTitle": "There is / There are — Describing the House",
    "nextLevel": "A2",
    "relation": "Next Milestone",
    "note": "Continue your journey in A2: deepen your fluency with There is / There are — Describing the House.",
    "challenge": {
      "q": "Ready to master There is / There are — Describing the House? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "a2-there-is-there-are-01": {
    "nextId": "a2-verb-to-be-past-01",
    "nextTitle": "Verb To Be — Past (was / were)",
    "nextLevel": "A2",
    "relation": "Next Milestone",
    "note": "Continue your journey in A2: deepen your fluency with Verb To Be — Past (was / were).",
    "challenge": {
      "q": "Ready to master Verb To Be — Past (was / were)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b1-adverbs-01": {
    "nextId": "b1-conditionals-0-1-2-01",
    "nextTitle": "Conditionals 0, 1 & 2 — One Ice Cream, Three Realities",
    "nextLevel": "B1",
    "relation": "Next Milestone",
    "note": "Continue your journey in B1: deepen your fluency with Conditionals 0, 1 & 2 — One Ice Cream, Three Realities.",
    "challenge": {
      "q": "Ready to master Conditionals 0, 1 & 2 — One Ice Cream, Three Realities? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b1-gerund-vs-infinitive-01": {
    "nextId": "b1-indefinite-pronouns-01",
    "nextTitle": "Indefinite Pronouns — Someone, Anyone, No One, Everyone",
    "nextLevel": "B1",
    "relation": "Next Milestone",
    "note": "Continue your journey in B1: deepen your fluency with Indefinite Pronouns — Someone, Anyone, No One, Everyone.",
    "challenge": {
      "q": "Ready to master Indefinite Pronouns — Someone, Anyone, No One, Everyone? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b1-indefinite-pronouns-01": {
    "nextId": "b1-passive-voice-01",
    "nextTitle": "Passive Voice — Present, Past & Perfect",
    "nextLevel": "B1",
    "relation": "Next Milestone",
    "note": "Continue your journey in B1: deepen your fluency with Passive Voice — Present, Past & Perfect.",
    "challenge": {
      "q": "Ready to master Passive Voice — Present, Past & Perfect? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b1-past-perfect-01": {
    "nextId": "b1-present-perfect-bucket-list-01",
    "nextTitle": "Present Perfect — The Bucket List (already / yet)",
    "nextLevel": "B1",
    "relation": "Next Milestone",
    "note": "Continue your journey in B1: deepen your fluency with Present Perfect — The Bucket List (already / yet).",
    "challenge": {
      "q": "Ready to master Present Perfect — The Bucket List (already / yet)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b1-present-perfect-bucket-list-01": {
    "nextId": "b1-present-perfect-continuous-01",
    "nextTitle": "Present Perfect Continuous — for / since / just",
    "nextLevel": "B1",
    "relation": "Next Milestone",
    "note": "Continue your journey in B1: deepen your fluency with Present Perfect Continuous — for / since / just.",
    "challenge": {
      "q": "Ready to master Present Perfect Continuous — for / since / just? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b1-present-perfect-ever-experiences-01": {
    "nextId": "b1-present-perfect-vs-past-simple-01",
    "nextTitle": "Present Perfect vs Past Simple — Which One?",
    "nextLevel": "B1",
    "relation": "Next Milestone",
    "note": "Continue your journey in B1: deepen your fluency with Present Perfect vs Past Simple — Which One?.",
    "challenge": {
      "q": "Ready to master Present Perfect vs Past Simple — Which One?? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b1-review-grand-01": {
    "nextId": "b1-used-to-01",
    "nextTitle": "Used to — Past Habits That Are Gone",
    "nextLevel": "B1",
    "relation": "Next Milestone",
    "note": "Continue your journey in B1: deepen your fluency with Used to — Past Habits That Are Gone.",
    "challenge": {
      "q": "Ready to master Used to — Past Habits That Are Gone? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b1-used-to-01": {
    "nextId": "b1-will-vs-going-to-01",
    "nextTitle": "Will vs Going to — Plans, Decisions & Promises",
    "nextLevel": "B1",
    "relation": "Next Milestone",
    "note": "Continue your journey in B1: deepen your fluency with Will vs Going to — Plans, Decisions & Promises.",
    "challenge": {
      "q": "Ready to master Will vs Going to — Plans, Decisions & Promises? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-causative-01": {
    "nextId": "b2-collocations-work-study-01",
    "nextTitle": "Collocations — Work & Study Power Combos",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Collocations — Work & Study Power Combos.",
    "challenge": {
      "q": "Ready to master Collocations — Work & Study Power Combos? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-collocations-work-study-01": {
    "nextId": "b2-idioms-money-01",
    "nextTitle": "Idioms — Money & Business (Abuela Carmen's Wisdom)",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Idioms — Money & Business (Abuela Carmen's Wisdom).",
    "challenge": {
      "q": "Ready to master Idioms — Money & Business (Abuela Carmen's Wisdom)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-idioms-money-01": {
    "nextId": "b2-idioms-time-effort-01",
    "nextTitle": "Idioms — Time & Effort (Abuela Carmen's Wisdom)",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Idioms — Time & Effort (Abuela Carmen's Wisdom).",
    "challenge": {
      "q": "Ready to master Idioms — Time & Effort (Abuela Carmen's Wisdom)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-idioms-time-effort-01": {
    "nextId": "b2-linkers-01",
    "nextTitle": "Linking Words — Contrast, Addition, Cause, Result & More",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Linking Words — Contrast, Addition, Cause, Result & More.",
    "challenge": {
      "q": "Ready to master Linking Words — Contrast, Addition, Cause, Result & More? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-linkers-01": {
    "nextId": "b2-mixed-conditionals-01",
    "nextTitle": "Mixed Conditionals",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Mixed Conditionals.",
    "challenge": {
      "q": "Ready to master Mixed Conditionals? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-mixed-conditionals-01": {
    "nextId": "b2-modals-deduction-past-01",
    "nextTitle": "Modals of Deduction — Past (must have / might have / can't have)",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Modals of Deduction — Past (must have / might have / can't have).",
    "challenge": {
      "q": "Ready to master Modals of Deduction — Past (must have / might have / can't have)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-modals-deduction-past-01": {
    "nextId": "b2-modals-deduction-present-01",
    "nextTitle": "Modals of Deduction — Present (must / might / could / can't)",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Modals of Deduction — Present (must / might / could / can't).",
    "challenge": {
      "q": "Ready to master Modals of Deduction — Present (must / might / could / can't)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-modals-deduction-present-01": {
    "nextId": "b2-modals-obligation-past-01",
    "nextTitle": "Modals of Obligation — Past (had to / didn't have to / needn't have)",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Modals of Obligation — Past (had to / didn't have to / needn't have).",
    "challenge": {
      "q": "Ready to master Modals of Obligation — Past (had to / didn't have to / needn't have)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-modals-obligation-past-01": {
    "nextId": "b2-phrasal-verbs-down-01",
    "nextTitle": "Phrasal Verbs with DOWN",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Phrasal Verbs with DOWN.",
    "challenge": {
      "q": "Ready to master Phrasal Verbs with DOWN? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-phrasal-verbs-down-01": {
    "nextId": "b2-phrasal-verbs-get-01",
    "nextTitle": "Phrasal Verbs — GET: One Verb, Many Meanings",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Phrasal Verbs — GET: One Verb, Many Meanings.",
    "challenge": {
      "q": "Ready to master Phrasal Verbs — GET: One Verb, Many Meanings? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-phrasal-verbs-get-01": {
    "nextId": "b2-phrasal-verbs-on-off-01",
    "nextTitle": "Phrasal Verbs with ON vs OFF",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Phrasal Verbs with ON vs OFF.",
    "challenge": {
      "q": "Ready to master Phrasal Verbs with ON vs OFF? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-phrasal-verbs-on-off-01": {
    "nextId": "b2-phrasal-verbs-out-01",
    "nextTitle": "Phrasal Verbs with OUT",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Phrasal Verbs with OUT.",
    "challenge": {
      "q": "Ready to master Phrasal Verbs with OUT? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-phrasal-verbs-out-01": {
    "nextId": "b2-phrasal-verbs-up-01",
    "nextTitle": "Phrasal Verbs with UP",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Phrasal Verbs with UP.",
    "challenge": {
      "q": "Ready to master Phrasal Verbs with UP? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-phrasal-verbs-up-01": {
    "nextId": "b2-relative-clauses-01",
    "nextTitle": "Relative Clauses — Non-Defining & Advanced Structures",
    "nextLevel": "B2",
    "relation": "Next Milestone",
    "note": "Continue your journey in B2: deepen your fluency with Relative Clauses — Non-Defining & Advanced Structures.",
    "challenge": {
      "q": "Ready to master Relative Clauses — Non-Defining & Advanced Structures? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "b2-wish-if-only-01": {
    "nextId": "curriculum.html",
    "nextTitle": "Curriculum Catalog & Galaxy Sky",
    "nextLevel": "B2",
    "relation": "Level Milestone Reached",
    "note": "Outstanding! You've traversed this sector of B2. Review all constellations in the catalog.",
    "challenge": {
      "q": "Which step comes next after completing a constellation?",
      "options": [
        "Review & Test",
        "Rest forever"
      ],
      "answer": "Review & Test",
      "hint": "Keep your Aurora essence shining with regular tests!"
    }
  },
  "c1-advanced-passive-01": {
    "nextId": "c1-advanced-verbs-nuance-01",
    "nextTitle": "Advanced Verbs — Precision & Nuance (The Scholar's Arsenal)",
    "nextLevel": "C1",
    "relation": "Next Milestone",
    "note": "Continue your journey in C1: deepen your fluency with Advanced Verbs — Precision & Nuance (The Scholar's Arsenal).",
    "challenge": {
      "q": "Ready to master Advanced Verbs — Precision & Nuance (The Scholar's Arsenal)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "c1-advanced-verbs-nuance-01": {
    "nextId": "c1-cleft-sentences-01",
    "nextTitle": "Cleft Sentences — It-Clefts & What-Clefts",
    "nextLevel": "C1",
    "relation": "Next Milestone",
    "note": "Continue your journey in C1: deepen your fluency with Cleft Sentences — It-Clefts & What-Clefts.",
    "challenge": {
      "q": "Ready to master Cleft Sentences — It-Clefts & What-Clefts? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "c1-cleft-sentences-01": {
    "nextId": "c1-ellipsis-substitution-01",
    "nextTitle": "Ellipsis & Substitution",
    "nextLevel": "C1",
    "relation": "Next Milestone",
    "note": "Continue your journey in C1: deepen your fluency with Ellipsis & Substitution.",
    "challenge": {
      "q": "Ready to master Ellipsis & Substitution? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "c1-ellipsis-substitution-01": {
    "nextId": "c1-emphatic-structures-01",
    "nextTitle": "Emphatic Structures — do/does/did & so/such",
    "nextLevel": "C1",
    "relation": "Next Milestone",
    "note": "Continue your journey in C1: deepen your fluency with Emphatic Structures — do/does/did & so/such.",
    "challenge": {
      "q": "Ready to master Emphatic Structures — do/does/did & so/such? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "c1-future-in-the-past-01": {
    "nextId": "c1-gerund-clauses-subject-01",
    "nextTitle": "Gerund Clauses as Subject",
    "nextLevel": "C1",
    "relation": "Next Milestone",
    "note": "Continue your journey in C1: deepen your fluency with Gerund Clauses as Subject.",
    "challenge": {
      "q": "Ready to master Gerund Clauses as Subject? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "c1-gerund-clauses-subject-01": {
    "nextId": "c1-inversion-01",
    "nextTitle": "Inversion for Emphasis",
    "nextLevel": "C1",
    "relation": "Next Milestone",
    "note": "Continue your journey in C1: deepen your fluency with Inversion for Emphasis.",
    "challenge": {
      "q": "Ready to master Inversion for Emphasis? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "c1-participle-clauses-01": {
    "nextId": "c1-register-style-01",
    "nextTitle": "Register & Style — Formal vs Informal Rewriting (C1–C2, capstone)",
    "nextLevel": "C1",
    "relation": "Next Milestone",
    "note": "Continue your journey in C1: deepen your fluency with Register & Style — Formal vs Informal Rewriting (C1–C2, capstone).",
    "challenge": {
      "q": "Ready to master Register & Style — Formal vs Informal Rewriting (C1–C2, capstone)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "c1-register-style-01": {
    "nextId": "c1-subjunctive-01",
    "nextTitle": "Subjunctive — Formal & Literary Register (C1–C2)",
    "nextLevel": "C1",
    "relation": "Next Milestone",
    "note": "Continue your journey in C1: deepen your fluency with Subjunctive — Formal & Literary Register (C1–C2).",
    "challenge": {
      "q": "Ready to master Subjunctive — Formal & Literary Register (C1–C2)? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "c1-subjunctive-01": {
    "nextId": "c1-would-rather-prefer-01",
    "nextTitle": "Would Rather / Would Prefer",
    "nextLevel": "C1",
    "relation": "Next Milestone",
    "note": "Continue your journey in C1: deepen your fluency with Would Rather / Would Prefer.",
    "challenge": {
      "q": "Ready to master Would Rather / Would Prefer? Click below to explore its rule and practice.",
      "options": [
        "Let's go!",
        "Explore Star"
      ],
      "answer": "Let's go!",
      "hint": "Press forward to claim more Aurora essence!"
    }
  },
  "c1-would-rather-prefer-01": {
    "nextId": "curriculum.html",
    "nextTitle": "Curriculum Catalog & Galaxy Sky",
    "nextLevel": "C1",
    "relation": "Level Milestone Reached",
    "note": "Outstanding! You've traversed this sector of C1. Review all constellations in the catalog.",
    "challenge": {
      "q": "Which step comes next after completing a constellation?",
      "options": [
        "Review & Test",
        "Rest forever"
      ],
      "answer": "Review & Test",
      "hint": "Keep your Aurora essence shining with regular tests!"
    }
  }
};
  window.EA_FAQS_DATA = {
  "b1-present-perfect-vs-past-simple-01": [
    {
      "q": "What is the main difference between Past Simple and Present Perfect?",
      "a": "Use the Past Simple when the time period is finished (yesterday, last year, in 2020) and the action is completed. Use the Present Perfect when the time is unfinished (today, this week, in my life) or when a past action has a direct result in the present moment."
    },
    {
      "q": "Which time expressions signal the Past Simple vs Present Perfect?",
      "a": "Past Simple uses definite past time markers: yesterday, ago, last night, in 1999, when I was a child. Present Perfect uses indefinite or open time markers: already, yet, just, ever, never, since, for, so far, recently."
    },
    {
      "q": "Why is 'I have lived here for 3 years' correct, but 'I lived here for 3 years' means something else?",
      "a": "'I have lived here for 3 years' (Present Perfect) means you moved here 3 years ago and you STILL live here today. 'I lived here for 3 years' (Past Simple) means the period is finished and you no longer live there."
    },
    {
      "q": "What is the #1 mistake Spanish speakers make with Present Perfect?",
      "a": "Spanish speakers often translate directly from 'He visto a María ayer' and say 'I have seen Maria yesterday' (*incorrect). In English, as soon as you say 'yesterday', the rule forces Past Simple: 'I saw Maria yesterday'."
    }
  ],
  "a1-present-simple-routines-01": [
    {
      "q": "When do we add -s or -es in the Present Simple?",
      "a": "Only in the affirmative form with third-person singular subjects (He, She, It). For example: 'She works', 'He watches', 'It rains'. For I, You, We, They, the verb stays in its base form ('I work', 'They watch')."
    },
    {
      "q": "Do we add -s to the verb in negative sentences or questions?",
      "a": "No! The auxiliary 'does' already carries the third-person marker: 'Does she work here?' (not 'does she works') and 'He doesn't like coffee' (not 'doesn't likes')."
    },
    {
      "q": "How do you know whether to use Present Simple or Present Continuous?",
      "a": "Present Simple is for habits, routines, and permanent truths ('I drink coffee every morning'). Present Continuous is for actions happening right now at this exact moment ('I am drinking coffee right now')."
    }
  ],
  "a1-present-continuous-01": [
    {
      "q": "How is the Present Continuous formed in English?",
      "a": "It always requires two elements: the auxiliary verb 'to be' (am/is/are) + the main verb with '-ing' (e.g., 'Sofía is typing an email'). Never omit the verb to be!"
    },
    {
      "q": "What verbs cannot be used in the Present Continuous?",
      "a": "Stative verbs (verbs of thinking, feeling, and possession) are usually not used in continuous forms: like, love, hate, know, understand, believe, want, need. Say 'I understand now', not 'I am understanding now'."
    },
    {
      "q": "Can Present Continuous be used to talk about the future?",
      "a": "Yes! When you have a confirmed personal arrangement or appointment in the diary: 'I am meeting Kenji tomorrow at 5 PM'."
    }
  ],
  "b1-will-vs-going-to-01": [
    {
      "q": "What is the difference between 'will' and 'be going to'?",
      "a": "Use 'will' for spontaneous decisions made at the moment of speaking ('Wait, I will help you with those bags!') and promises. Use 'be going to' for pre-planned decisions or intentions decided before speaking ('I am going to study medicine next year')."
    },
    {
      "q": "How do predictions differ with 'will' vs 'going to'?",
      "a": "Use 'going to' when there is clear physical evidence right now in front of you ('Look at those black clouds! It is going to rain'). Use 'will' for general beliefs, opinions, or intuition ('I think humanity will colonize Mars one day')."
    }
  ],
  "b1-conditionals-0-1-2-01": [
    {
      "q": "What is the difference between the First and Second Conditional?",
      "a": "The First Conditional (If + Present Simple, will + verb) talks about real, possible future situations: 'If it rains, I will take an umbrella'. The Second Conditional (If + Past Simple, would + verb) talks about imaginary, hypothetical, or improbable present/future situations: 'If I won the lottery, I would buy an island'."
    },
    {
      "q": "Why do we say 'If I were you' instead of 'If I was you'?",
      "a": "'Were' is the traditional subjunctive mood used for hypothetical conditions with all subjects (I, he, she, it). While 'If I was you' is heard in informal conversation, 'If I were you' is the standard, grammatically formal English tested on Cambridge and IELTS exams."
    }
  ],
  "b1-passive-voice-01": [
    {
      "q": "How do you form the passive voice in English?",
      "a": "Subject + appropriate tense of the verb 'to be' + Past Participle (3rd column). For example: 'The letter was sent yesterday' (Past Simple passive), 'English is spoken worldwide' (Present Simple passive)."
    },
    {
      "q": "When should you use the passive voice instead of the active voice?",
      "a": "Use passive voice when the action or the object is more important than who did it, or when the agent is unknown, obvious, or unimportant: 'The thief was arrested' (the police obviously arrested him; the focus is on the capture)."
    }
  ],
  "a2-past-simple-regular-01": [
    {
      "q": "How do you pronounce the -ed ending in regular past simple verbs?",
      "a": "-ed has 3 distinct pronunciations: 1) /ɪd/ after /t/ and /d/ sounds ('started', 'decided'); 2) /t/ after voiceless sounds /p, k, f, s, ʃ, tʃ/ ('worked', 'laughed', 'watched'); 3) /d/ after all voiced vowel and consonant sounds ('played', 'lived', 'cleaned')."
    },
    {
      "q": "What is the rule for spelling regular verbs with -ed?",
      "a": "Most verbs simply add -ed ('walk' -> 'walked'). Verbs ending in -e just add -d ('live' -> 'lived'). Consonant + y changes to -ied ('study' -> 'studied'). Single vowel + single consonant doubles the consonant ('stop' -> 'stopped')."
    }
  ],
  "a2-past-simple-irregular-01": [
    {
      "q": "How many irregular verbs are there in English?",
      "a": "There are roughly 200 commonly used irregular verbs in modern English. Instead of memorizing alphabetical lists, the most effective method is learning them in 7 mnemonic patterns (e.g. no-change verbs like cut/cut/cut, vowel melody verbs like sing/sang/sung, -ought/-aught verbs like buy/bought/bought)."
    },
    {
      "q": "Do irregular verbs change in negative sentences or questions?",
      "a": "No! In negatives and questions, the auxiliary 'did / didn't' takes the past tense, so the main verb stays in the base infinitive: 'Did you see Ben?' (not 'did you saw') and 'I didn't go' (not 'I didn't went')."
    }
  ],
  "b1-used-to-01": [
    {
      "q": "What is the difference between 'used to + verb' and 'be used to + -ing'?",
      "a": "'Used to + base verb' describes past habits or states that no longer exist ('I used to play tennis when I was young'). 'Be used to + noun/-ing' means being accustomed to something familiar ('I am used to waking up early, it is normal for me')."
    },
    {
      "q": "How do you form negative and question sentences with 'used to'?",
      "a": "Drop the 'd' because 'did' takes the past: 'I didn't use to like olives' and 'Did you use to live in London?'"
    }
  ],
  "b2-third-conditional-01": [
    {
      "q": "How is the Third Conditional formed and what does it express?",
      "a": "Form: If + Past Perfect (had + past participle), would have + past participle. It expresses regrets, criticism, or imaginary hypotheses about past events that cannot be changed: 'If I had studied harder, I would have passed the exam'."
    }
  ],
  "b2-reported-speech-01": [
    {
      "q": "What is 'backshift' in Reported Speech?",
      "a": "When the reporting verb is in the past (e.g., 'She said that...'), the tenses shift one step back into the past: Present Simple becomes Past Simple, Present Continuous becomes Past Continuous, Present Perfect becomes Past Perfect, and 'will' becomes 'would'."
    }
  ],
  "c1-inversion-01": [
    {
      "q": "What is grammatical inversion and when is it used?",
      "a": "Inversion puts the auxiliary verb before the subject for formal emphasis or dramatic effect, usually following negative or restrictive adverbs: 'Rarely have I seen such beauty' or 'Not only did he apologize, but he also refunded the money'."
    }
  ]
};

  function getTopicId() {
    if (window.SEQUENCE_DATA && window.SEQUENCE_DATA.id) {
      return window.SEQUENCE_DATA.id;
    }
    var m = window.location.pathname.match(/([a-c][1-2]-[a-z0-9-]+(?:-01|-wave-b))/);
    return m ? m[1] : null;
  }

  function renderConnectedBridge() {
    var tid = getTopicId();
    if (!tid) return;
    
    var bridge = window.EA_BRIDGES_DATA[tid];
    if (!bridge) return;

    if (document.getElementById('ea-bridge-widget')) return;

    var deck = document.getElementById('deck');
    var waveBWrap = document.querySelector('.lesson-layout-wrap');
    var app = document.getElementById('app') || document.querySelector('.wrap');

    var targetContainer = null;
    var insertBeforeNode = null;

    if (deck) {
      // Inside a slide presentation: attach to the LAST slide so it only appears at the end of the lesson!
      var lastSlide = deck.querySelector('.slide:last-child');
      if (lastSlide) {
        targetContainer = lastSlide;
        insertBeforeNode = lastSlide.querySelector('.url');
      } else {
        setTimeout(renderConnectedBridge, 100);
        return;
      }
    } else if (waveBWrap) {
      // Wave B Masterclass: attach inside the layout wrap after Scene 7
      var s7 = document.getElementById('scene-7');
      if (s7 && s7.parentNode) {
        targetContainer = s7.parentNode;
        insertBeforeNode = s7.nextSibling;
      } else {
        targetContainer = waveBWrap;
      }
    } else if (app) {
      targetContainer = app;
      insertBeforeNode = app.querySelector('footer');
    }

    if (!targetContainer) return; // Do NOT attach to body to prevent flickers!

    var w = document.createElement('section');
    w.id = 'ea-bridge-widget';
    w.className = 'ea-bridge-card';
    
    // Prevent ANY clicks inside the bridge card from bubbling to slide deck navigation
    w.addEventListener('click', function(e) { e.stopPropagation(); });
    w.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
    w.addEventListener('mousedown', function(e) { e.stopPropagation(); });

    var destPractice = '../preview/' + bridge.nextId + '.html';
    var destLesson = '../leccion/' + bridge.nextId + '.html';
    if (bridge.nextId.indexOf('.html') !== -1) {
      destPractice = '../' + bridge.nextId;
      destLesson = '../' + bridge.nextId;
    }

    var ch = bridge.challenge || {};
    var optionsHtml = '';
    if (ch.options && ch.options.length) {
      optionsHtml = '<div class="bridge-ch-opts">' +
        ch.options.map(function(opt) {
          return '<button class="bridge-opt-btn" data-opt="' + opt.replace(/"/g, '&quot;') + '">' + opt + '</button>';
        }).join('') +
        '</div>' +
        '<div class="bridge-fb" style="display:none;"></div>';
    }

    w.innerHTML = '' +
      '<div class="bridge-badge-row">' +
        '<span class="bridge-badge-kicker">🌌 NEXT STAR IN YOUR SKY</span>' +
        '<span class="bridge-level-pill">' + (bridge.nextLevel || 'NEXT') + '</span>' +
        '<span class="bridge-rel-pill">' + (bridge.relation || 'Connected Topic') + '</span>' +
      '</div>' +
      '<h3 class="bridge-title">' + (bridge.nextTitle || 'Next Topic') + '</h3>' +
      '<p class="bridge-note">' + (bridge.note || '') + '</p>' +
      (ch.q ? (
        '<div class="bridge-challenge-box">' +
          '<div class="bridge-ch-prompt"><b>⚡ Integrated Transition Challenge:</b> ' + ch.q + '</div>' +
          optionsHtml +
        '</div>'
      ) : '') +
      '<div class="bridge-actions">' +
        '<a href="' + destLesson + '" class="btn-bridge primary">▶&nbsp;&nbsp;Launch Lesson</a>' +
        '<a href="' + destPractice + '" class="btn-bridge ghost">✎&nbsp;&nbsp;Practice Topic</a>' +
        '<a href="../curriculum.html" class="btn-bridge text">📜 Explore Catalog</a>' +
      '</div>';

    // Interactive checking for challenge options
    var optBtns = w.querySelectorAll('.bridge-opt-btn');
    var fb = w.querySelector('.bridge-fb');
    optBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var sel = btn.getAttribute('data-opt');
        optBtns.forEach(function(b) { b.disabled = true; });
        fb.style.display = 'block';
        if (sel === ch.answer) {
          btn.classList.add('correct');
          fb.className = 'bridge-fb good';
          fb.innerHTML = '✨ <b>Aurora:</b> "Brilliant! You grasped the transition immediately. Onward to your next star!"';
        } else {
          btn.classList.add('wrong');
          // Highlight correct one
          optBtns.forEach(function(b) {
            if (b.getAttribute('data-opt') === ch.answer) b.classList.add('correct');
          });
          fb.className = 'bridge-fb note';
          fb.innerHTML = '🛡️ <b>Aurora:</b> "Careful! ' + (ch.hint || 'Review the clue') + '. Keep exploring below!"';
        }
      });
    });

    if (insertBeforeNode) {
      targetContainer.insertBefore(w, insertBeforeNode);
    } else {
      targetContainer.appendChild(w);
    }
  }

  function renderFaqAccordion() {
    var tid = getTopicId();
    if (!tid) return;

    // Do NOT render FAQ on slide presentation decks (only on practice, test, and wave-b masterclasses)
    if (document.getElementById('deck')) return;

    var faqs = window.EA_FAQS_DATA[tid];
    if (!faqs || !faqs.length) return;

    if (document.getElementById('ea-faq-widget')) return;

    var waveBWrap = document.querySelector('.lesson-layout-wrap');
    var app = document.getElementById('app') || document.querySelector('.wrap');
    var targetContainer = waveBWrap || app;
    if (!targetContainer) return;

    var sec = document.createElement('section');
    sec.id = 'ea-faq-widget';
    sec.className = 'ea-faq-section';

    var itemsHtml = faqs.map(function(item, idx) {
      return '' +
        '<details class="ea-faq-item" ' + (idx === 0 ? 'open' : '') + '>' +
          '<summary class="ea-faq-q">' +
            '<span>' + item.q + '</span>' +
            '<span class="ea-faq-icon">▾</span>' +
          '</summary>' +
          '<div class="ea-faq-a">' +
            '<p>' + item.a + '</p>' +
          '</div>' +
        '</details>';
    }).join('');

    sec.innerHTML = '' +
      '<div class="ea-faq-header">' +
        '<div class="ea-faq-kicker">💡 PEOPLE ALSO ASK · FREQUENTLY ASKED QUESTIONS</div>' +
        '<h3>Common Doubts & Spanish Speaker Traps</h3>' +
      '</div>' +
      '<div class="ea-faq-list">' + itemsHtml + '</div>';

    // Inject right after bridge or before footer
    var bridge = document.getElementById('ea-bridge-widget');
    var footer = targetContainer.querySelector('footer');
    if (bridge && bridge.nextSibling) {
      targetContainer.insertBefore(sec, bridge.nextSibling);
    } else if (footer) {
      targetContainer.insertBefore(sec, footer);
    } else {
      targetContainer.appendChild(sec);
    }
  }

  function injectBridgeStyles() {
    if (document.getElementById('ea-bridge-styles')) return;
    var style = document.createElement('style');
    style.id = 'ea-bridge-styles';
    style.textContent = `
      .ea-bridge-card {
        margin: 45px 0 25px;
        padding: 24px 26px;
        background: linear-gradient(135deg, rgba(23,34,59,0.03) 0%, rgba(15,76,92,0.07) 100%);
        border: 1px solid rgba(15,76,92,0.22);
        border-left: 5px solid #0F4C5C;
        border-radius: 12px;
        font-family: var(--sans, system-ui, sans-serif);
        color: var(--ink, #17223B);
      }
      .bridge-badge-row {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 10px;
      }
      .bridge-badge-kicker {
        font-family: var(--mono, monospace);
        font-size: 11px;
        letter-spacing: .16em;
        text-transform: uppercase;
        color: #0F4C5C;
        font-weight: 600;
      }
      .bridge-level-pill {
        font-family: var(--mono, monospace);
        font-size: 10.5px;
        padding: 2px 8px;
        background: #0F4C5C;
        color: #fff;
        border-radius: 12px;
        font-weight: 600;
      }
      .bridge-rel-pill {
        font-family: var(--mono, monospace);
        font-size: 10.5px;
        padding: 2px 8px;
        background: rgba(212,175,55,0.18);
        border: 1px solid #D4AF37;
        color: #7A5B0B;
        border-radius: 12px;
        font-weight: 600;
      }
      .bridge-title {
        font-family: var(--serif, Georgia, serif);
        font-size: 24px;
        font-weight: 700;
        margin: 4px 0 8px;
        color: var(--ink, #17223B);
      }
      .bridge-note {
        font-size: 15.5px;
        line-height: 1.55;
        color: #4A5568;
        margin-bottom: 16px;
      }
      .bridge-challenge-box {
        background: #ffffff;
        border: 1px solid #DCE0D9;
        border-radius: 9px;
        padding: 14px 18px;
        margin-bottom: 18px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
      }
      .bridge-ch-prompt {
        font-size: 14.5px;
        color: var(--ink, #17223B);
        margin-bottom: 10px;
      }
      .bridge-ch-opts {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .bridge-opt-btn {
        font-family: var(--sans, sans-serif);
        font-size: 13.5px;
        font-weight: 500;
        padding: 6px 14px;
        border: 1px solid #CBD5E0;
        border-radius: 6px;
        background: #F7FAFC;
        color: #2D3748;
        cursor: pointer;
        transition: all .2s ease;
      }
      .bridge-opt-btn:hover:not(:disabled) {
        border-color: #0F4C5C;
        background: #EDF2F7;
      }
      .bridge-opt-btn.correct {
        background: #10B981 !important;
        border-color: #059669 !important;
        color: #fff !important;
        font-weight: 600;
      }
      .bridge-opt-btn.wrong {
        background: #EF4444 !important;
        border-color: #DC2626 !important;
        color: #fff !important;
      }
      .bridge-fb {
        margin-top: 10px;
        font-size: 13.5px;
        padding: 8px 12px;
        border-radius: 6px;
        line-height: 1.4;
      }
      .bridge-fb.good {
        background: #ECFDF5;
        border: 1px solid #A7F3D0;
        color: #065F46;
      }
      .bridge-fb.note {
        background: #FFFBEB;
        border: 1px solid #FDE68A;
        color: #92400E;
      }
      .bridge-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        align-items: center;
      }
      .btn-bridge {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        padding: 9px 18px;
        border-radius: 7px;
        font-size: 13.5px;
        font-weight: 600;
        transition: all .2s ease;
      }
      .btn-bridge.primary {
        background: #0F4C5C;
        color: #fff;
        border: 1px solid #0F4C5C;
      }
      .btn-bridge.primary:hover {
        background: #17223B;
        border-color: #17223B;
        transform: translateY(-1px);
      }
      .btn-bridge.ghost {
        background: transparent;
        color: #0F4C5C;
        border: 1px solid #0F4C5C;
      }
      .btn-bridge.ghost:hover {
        background: rgba(15,76,92,0.06);
      }
      .btn-bridge.text {
        color: #718096;
        font-size: 13px;
        margin-left: auto;
      }
      .btn-bridge.text:hover {
        color: var(--ink, #17223B);
      }

      /* Slide presentation adaptations */
      #deck .slide:last-child {
        overflow-y: auto !important;
        justify-content: flex-start !important;
        padding-top: 5vh !important;
        padding-bottom: 8vh !important;
      }
      #deck .slide:last-child::-webkit-scrollbar {
        width: 8px;
      }
      #deck .slide:last-child::-webkit-scrollbar-thumb {
        background: rgba(212, 175, 55, 0.3);
        border-radius: 4px;
      }
      .slide.dark .ea-bridge-card {
        background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(15,76,92,0.22) 100%);
        border: 1px solid rgba(212,175,55,0.35);
        border-left: 5px solid #D4AF37;
        color: #F7F8F5;
        margin: 24px 0 16px;
      }
      .slide.dark .bridge-badge-kicker {
        color: #D4AF37;
      }
      .slide.dark .bridge-title {
        color: #F7F8F5;
      }
      .slide.dark .bridge-note {
        color: #CBD5E0;
      }
      .slide.dark .bridge-challenge-box {
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid rgba(212, 175, 55, 0.25);
      }
      .slide.dark .bridge-ch-prompt {
        color: #F7F8F5;
      }
      .slide.dark .bridge-opt-btn {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
        color: #F7F8F5;
      }
      .slide.dark .bridge-opt-btn:hover:not(:disabled) {
        border-color: #D4AF37;
        background: rgba(212, 175, 55, 0.15);
      }
      .slide.dark .btn-bridge.primary {
        background: #D4AF37;
        color: #17223B;
        border-color: #D4AF37;
      }
      .slide.dark .btn-bridge.primary:hover {
        background: #F7F8F5;
        border-color: #F7F8F5;
      }
      .slide.dark .btn-bridge.ghost {
        border-color: #D4AF37;
        color: #D4AF37;
      }
      .slide.dark .btn-bridge.ghost:hover {
        background: rgba(212, 175, 55, 0.15);
      }
      .slide.dark .btn-bridge.text {
        color: #A0AEC0;
      }
      .slide.dark .btn-bridge.text:hover {
        color: #F7F8F5;
      }

      /* FAQ Accordion */
      .ea-faq-section {
        margin: 35px 0 45px;
        border-top: 1px solid #DCE0D9;
        padding-top: 24px;
        font-family: var(--sans, sans-serif);
      }
      .ea-faq-header {
        margin-bottom: 16px;
      }
      .ea-faq-kicker {
        font-family: var(--mono, monospace);
        font-size: 11px;
        letter-spacing: .16em;
        text-transform: uppercase;
        color: #B23A2E;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .ea-faq-header h3 {
        font-family: var(--serif, Georgia, serif);
        font-size: 22px;
        font-weight: 700;
        color: var(--ink, #17223B);
        margin: 0;
      }
      .ea-faq-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .ea-faq-item {
        background: #fff;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        overflow: hidden;
        transition: border-color .2s ease;
      }
      .ea-faq-item[open] {
        border-color: #0F4C5C;
        box-shadow: 0 3px 10px rgba(15,76,92,0.05);
      }
      .ea-faq-q {
        padding: 14px 18px;
        font-weight: 600;
        font-size: 15px;
        color: var(--ink, #17223B);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        list-style: none;
      }
      .ea-faq-q::-webkit-details-marker { display: none; }
      .ea-faq-icon {
        font-size: 16px;
        color: #718096;
        transition: transform .2s ease;
      }
      .ea-faq-item[open] .ea-faq-icon {
        transform: rotate(180deg);
        color: #0F4C5C;
      }
      .ea-faq-a {
        padding: 0 18px 16px;
        font-size: 14.5px;
        line-height: 1.6;
        color: #4A5568;
        border-top: 1px solid #F1F5F9;
        margin-top: 4px;
        padding-top: 12px;
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    injectBridgeStyles();
    renderConnectedBridge();
    renderFaqAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
