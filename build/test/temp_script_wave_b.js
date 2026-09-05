
(function() {
  'use strict';

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const RPG_SFX = {
    chime: function() {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      [528, 660, 792, 1056].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.0001, audioCtx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + i * 0.06 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.06 + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.06);
        osc.stop(audioCtx.currentTime + i * 0.06 + 0.7);
      });
    },
    crystal: function() {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.45);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.48);
    },
    coach: function() {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.52);
    },
    click: function() {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.06);
    }
  };

  const cvs = document.getElementById('ambient-canvas');
  const ctx = cvs.getContext('2d');
  let stars = [];
  function resize() {
    cvs.width = window.innerWidth; cvs.height = window.innerHeight; stars = [];
    for (let i = 0; i < 60; i++) {
      stars.push({ x: Math.random() * cvs.width, y: Math.random() * cvs.height, r: Math.random() * 1.5 + 0.4, alpha: Math.random() * 0.45 + 0.15, speed: Math.random() * 0.02 + 0.005, twinkle: Math.random() * Math.PI });
    }
  }
  window.addEventListener('resize', resize);
  resize();
  function animate() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    stars.forEach(s => {
      s.twinkle += s.speed;
      ctx.fillStyle = 'rgba(13, 124, 116, ' + ((Math.sin(s.twinkle) + 1) / 2 * s.alpha) + ')';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();

  const SCENES = [
    {
      kicker: 'SCENE 1 · CAST DIALOGUE',
      title: 'Articles — A, An, The: Cast Dialogue',
      audioFile: '../audio/a1-articles/aurora_intro.mp3',
      auroraMood: 'explicando',
      auroraDialogue: '"Welcome! Listen to how our cast members use Articles — A, An, The in everyday conversation."',
      render: () => `<div class="characters-dialogue-grid">
          <div class="character-speech-bubble">
            <div class="character-header-row">
              <span class="character-badge-name">🎭 Aurora</span>
              <button class="btn-char-audio" onclick="playRoutineAudio('char_0_aurora')">🔊 Listen</button>
            </div>
            <div class="character-quote-line">"Three tiny words guard every noun: a, an, and the. Learn their magic and your English shines."</div>
          </div>
        
          <div class="character-speech-bubble">
            <div class="character-header-row">
              <span class="character-badge-name">🎭 Ben</span>
              <button class="btn-char-audio" onclick="playRoutineAudio('char_1_ben')">🔊 Listen</button>
            </div>
            <div class="character-quote-line">"I have an idea! Let's watch a movie tonight."</div>
          </div>
        
          <div class="character-speech-bubble">
            <div class="character-header-row">
              <span class="character-badge-name">🎭 Kenji</span>
              <button class="btn-char-audio" onclick="playRoutineAudio('char_2_kenji')">🔊 Listen</button>
            </div>
            <div class="character-quote-line">"Good plan. Is there a cinema near the university?"</div>
          </div>
        
          <div class="character-speech-bubble">
            <div class="character-header-row">
              <span class="character-badge-name">🎭 Sofía</span>
              <button class="btn-char-audio" onclick="playRoutineAudio('char_3_sofía')">🔊 Listen</button>
            </div>
            <div class="character-quote-line">"Yes! And there is an ice-cream shop next to the cinema."</div>
          </div>
        
          <div class="character-speech-bubble">
            <div class="character-header-row">
              <span class="character-badge-name">🎭 Abuela Carmen</span>
              <button class="btn-char-audio" onclick="playRoutineAudio('char_4_abuela_carmen')">🔊 Listen</button>
            </div>
            <div class="character-quote-line">"Perfect. The movie, the ice cream... and an umbrella, because the rain is coming!"</div>
          </div>
        </div>`
    },
    {
      kicker: 'SCENE 2 · THE 4 ESSENTIAL FORMS',
      title: 'Affirmative, Negative, Question & Short Answer',
      audioFile: '../audio/a1-articles/aurora_forms.mp3',
      auroraMood: 'explicando',
      auroraDialogue: '"Observe how the four grammatical forms function together seamlessly."',
      render: () => `<div class="forms-card-grid">
          <div class="form-quad-card">
            <span class="form-quad-badge">1. Affirmative Form</span>
            <div class="form-quad-sentence">"I have an apple and a banana."</div>
          </div>
        
          <div class="form-quad-card">
            <span class="form-quad-badge">1. Affirmative Form</span>
            <div class="form-quad-sentence">"She is an engineer."</div>
          </div>
        
          <div class="form-quad-card">
            <span class="form-quad-badge">1. Affirmative Form</span>
            <div class="form-quad-sentence">"The sun is hot today."</div>
          </div>
        
          <div class="form-quad-card">
            <span class="form-quad-badge">1. Affirmative Form</span>
            <div class="form-quad-sentence">"There is a hotel near the sea."</div>
          </div>
        </div>`
    },
    {
      kicker: 'SCENE 3 · COGNITIVE STAGE 1: RECOGNIZE',
      title: 'Multiple Choice & Rule Verification',
      audioFile: '../audio/a1-articles/aurora_rule.mp3',
      auroraMood: 'explicando',
      auroraDialogue: '"Stage 1: Recognize the target pattern. Choose the correct form below!"',
      render: () => `
        <div class="exercise-clean-card">
          <span class="exercise-kicker-tag">Exercise 1 · Pattern Discrimination</span>
          <div class="exercise-prompt-heading">"I eat ___ apple every morning."</div>
          <div class="exercise-options-deck"><button class="choice-pill-btn" onclick="checkStage1('a', this, false)">a</button> <button class="choice-pill-btn" onclick="checkStage1('an', this, true)">an</button> <button class="choice-pill-btn" onclick="checkStage1('the', this, false)">the</button> </div>
          <div class="exercise-feedback-text" id="stage1-feedback"></div>
        </div>
      `
    },
    {
      kicker: 'SCENE 4 · COGNITIVE STAGE 2: MANIPULATE',
      title: 'Gap Fill & Syntactic Assembly',
      audioFile: '../audio/a1-articles/aurora_rule.mp3',
      auroraMood: 'explicando',
      auroraDialogue: '"Stage 2: Manipulate the sentence structure with precision."',
      render: () => `
        <div class="exercise-clean-card">
          <span class="exercise-kicker-tag">Exercise 2 · Structural Assembly</span>
          <div class="exercise-prompt-heading">"There is ___ umbrella by the door. (a/an)"</div>
          <div class="exercise-options-deck">
            <button class="choice-pill-btn" onclick="checkStage2('an', this, true)">A) an</button>
            <button class="choice-pill-btn" onclick="checkStage2('wrong_opt', this, false)">B) Other form</button>
          </div>
          <div class="exercise-feedback-text" id="stage2-feedback"></div>
        </div>
      `
    },
    {
      kicker: 'SCENE 5 · COGNITIVE STAGE 3: TRANSFORM',
      title: 'Sentence Inversion & Production',
      audioFile: '../audio/a1-articles/aurora_forms.mp3',
      auroraMood: 'explicando',
      auroraDialogue: '"Stage 3: Transform statements into questions and production short answers!"',
      render: () => `
        <div class="exercise-clean-card">
          <span class="exercise-kicker-tag">Exercise 3 · Syntactic Transformation</span>
          <div class="exercise-prompt-heading">"There is a cinema here. (Make it negative.)"</div>
          <div class="exercise-options-deck">
            <button class="choice-pill-btn" onclick="checkStage3('There isn't a cinema here.', this, true)">A) "There isn't a cinema here."</button>
            <button class="choice-pill-btn" onclick="checkStage3('wrong_tr', this, false)">B) Inverted error</button>
          </div>
          <div class="exercise-feedback-text" id="stage3-feedback"></div>
        </div>
      `
    },
    {
      kicker: 'SCENE 6 · READING COMPREHENSION PASSAGE',
      title: "Contextual Story & Verification",
      audioFile: '../audio/a1-articles/aurora_reading.mp3',
      auroraMood: 'explicando',
      auroraDialogue: '"Listen and read the contextual passage. Then verify the comprehension statement below!"',
      render: () => `
        <div class="reading-passage-box">"Sofía is an artist. She works in a small studio near the sea. Every morning she walks to the studio with an umbrella, because the weather changes fast. There is a café next to her studio, and the coffee there is excellent. In the evening, she watches the moon from her window. It is a beautiful life."</div>
        <div class="exercise-clean-card" style="margin-top:12px;">
          <span class="exercise-kicker-tag">Reading True / False Check</span>
          <div class="exercise-prompt-heading">"Sofía is an artist."</div>
          <div class="exercise-options-deck">
            <button class="choice-pill-btn" onclick="checkReading(true, this, true)">True</button>
            <button class="choice-pill-btn" onclick="checkReading(false, this, false)">False</button>
          </div>
          <div class="exercise-feedback-text" id="reading-feedback"></div>
        </div>
      `
    },
    {
      kicker: 'SCENE 7 · MASTERY CONSOLIDATION & PDF SUITE',
      title: 'Mastery Complete & Printable Worksheet',
      audioFile: '../audio/a1-articles/aurora_conclusion.mp3',
      auroraMood: 'celebrando',
      auroraDialogue: '"Masterclass complete! You conquered Articles — A, An, The. Download your 10-exercise worksheet below!"',
      render: () => `
        <div class="printable-sheet-view">
          <div class="sheet-top-header">
            <div>
              <div class="sheet-title-txt">Articles — A, An, The · Master Worksheet (10 Exercises)</div>
              <div style="font-family:var(--mono); font-size:11px; color:#6B7079;">English Aurora · Wave B Masterclass Collection</div>
            </div>
            <button class="btn-hud-control" style="background:var(--teal); color:#fff;" onclick="window.print()">🖨️ Print to PDF</button>
          </div>
          <div class="sheet-meta-fields">
            <span>Student Name: _________________________________</span>
            <span>Date: __________________</span>
            <span>Final Score: ____ / 10 ⭐</span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; font-size:12.5px; line-height:1.55; color:#162831;">
            <div>
              <p style="font-family:var(--mono); font-weight:700; color:var(--teal-dark); text-transform:uppercase; margin-bottom:4px; font-size:11px;">Part 1 · Structural Completion:</p>
              <p>1. ___ orange</p><p>2. ___ university</p><p>3. ___ hour</p><p>4. ___ hospital</p>
              <p style="font-family:var(--mono); font-weight:700; color:var(--teal-dark); text-transform:uppercase; margin-top:8px; margin-bottom:4px; font-size:11px;">Part 2 · Auxiliary Selection:</p>
              <p>5. ___ sun is shining.</p><p>6. I have ___ idea!</p><p>7. She is ___ engineer I told you about.</p>
            </div>
            <div>
              <p style="font-family:var(--mono); font-weight:700; color:var(--teal-dark); text-transform:uppercase; margin-bottom:4px; font-size:11px;">Part 3 · Transformation & Production:</p>
              <p>8. Corrige: 'He is a artist.'</p><p>9. Corrige: 'I need an pencil.'</p><p>10. Escribe 3 oraciones: una con 'a', una con 'an' y una con 'the'.</p>
              <div style="margin-top:10px; padding:8px 10px; background:#F4F8FA; border:1px dashed var(--line-strong); border-radius:8px; font-family:var(--mono); font-size:10px; color:#556B77;">
                <strong>Quick Answer Key:</strong> 1. an · 2. a · 3. an · 4. a · 5. The · 6. an · 7. the · 8. He is an artist. · 9. I need a pencil. · 10. Respuesta libre (ej. 'I have a dog. / She eats an apple. / The moon is full.')
              </div>
            </div>
          </div>
        </div>
      `
    }
  ];

  let currentSceneIndex = 0;
  const auroraHeroImg = document.getElementById('aurora-hero-img');
  const auroraSpeechBox = document.getElementById('aurora-speech-box');
  const stageKickerTag = document.getElementById('stage-kicker-tag');
  const stageHeadingTitle = document.getElementById('stage-heading-title');
  const stageContentArea = document.getElementById('stage-content-area');
  const stageProgressTag = document.getElementById('stage-progress-tag');
  const phaseTabs = document.querySelectorAll('.phase-tab-btn');

  const mainAudio = document.getElementById('main-audio-player');
  const btnAuroraVoice = document.getElementById('btn-aurora-voice');
  const voiceBtnLabel = document.getElementById('aurora-voice-btn-label');
  const audioEqBars = document.getElementById('audio-eq-bars');

  // --- AURORA 3 SKINS & WARDROBE SYSTEM ---
  const AURORA_SKINS = {
    ethereal: {
      name: 'Ethereal Pastel',
      themeClass: 'theme-ethereal',
      role: '🌿 Lead YouTube Instructor',
      poses: {
        explicando: '../assets/aurora-explicando.png',
        celebrando: '../assets/aurora-celebrando.png',
        corrigiendo: '../assets/aurora-corrigiendo.png'
      },
      idle: '../assets/aurora.png'
    },
    solar: {
      name: 'High-Tech Pure White',
      themeClass: 'theme-solar',
      role: '🔮 Quantum AI Instructor',
      poses: {
        explicando: '../assets/skins/aurora-tech-redhead.png',
        celebrando: '../assets/skins/aurora-tech-redhead.png',
        corrigiendo: '../assets/skins/aurora-tech-redhead.png'
      },
      idle: '../assets/skins/aurora-tech-redhead.png'
    },
    glacial: {
      name: 'Gothic Arcane Noir',
      themeClass: 'theme-glacial',
      role: '❄️ Gothic Arcane Mentor',
      poses: {
        explicando: '../assets/skins/aurora-goth-noir.png',
        celebrando: '../assets/skins/aurora-goth-noir.png',
        corrigiendo: '../assets/skins/aurora-goth-noir.png'
      },
      idle: '../assets/skins/aurora-goth-noir.png'
    }
  };

  let currentSkinKey = localStorage.getItem('ea_teacher_skin') || 'ethereal';
  let currentMoodKey = 'explicando';

  window.setAuroraSkin = function(skinKey, btnEl) {
    if (!AURORA_SKINS[skinKey]) return;
    currentSkinKey = skinKey;
    const skin = AURORA_SKINS[skinKey];

    // Morph whole page theme & accents
    document.body.classList.remove('theme-ethereal', 'theme-solar', 'theme-glacial');
    if (skin.themeClass) document.body.classList.add(skin.themeClass);

    // Update dynamic role pill
    const rolePill = document.querySelector('.aurora-role-pill');
    if (rolePill && skin.role) rolePill.textContent = skin.role;

    // Update portrait
    auroraHeroImg.src = skin.poses[currentMoodKey] || skin.idle;

    document.querySelectorAll('.skin-dock-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.skin === skinKey);
    });

    try {
      localStorage.setItem('ea_teacher_skin', skinKey);
    } catch(e) {}

    showToast(`✨ Skin: ${skin.name}`);
  };

  window.setAuroraMood = function(moodKey, btnEl) {
    currentMoodKey = moodKey;
    const skin = AURORA_SKINS[currentSkinKey] || AURORA_SKINS['ethereal'];
    auroraHeroImg.src = skin.poses[moodKey] || skin.idle;
    document.querySelectorAll('.mood-chip-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  };

  // Inicializar skin persistida
  setTimeout(() => {
    window.setAuroraSkin(currentSkinKey);
  }, 50);

  function renderScene(idx) {
    currentSceneIndex = idx;
    const scene = SCENES[idx];

    stageKickerTag.textContent = scene.kicker;
    stageHeadingTitle.textContent = scene.title;
    stageContentArea.innerHTML = scene.render();
    auroraSpeechBox.innerHTML = scene.auroraDialogue;
    stageProgressTag.textContent = `Scene ${idx + 1} of ${SCENES.length} · Use [Space] or [Arrow Keys] to advance`;

    phaseTabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));

    setAuroraMood(scene.auroraMood);
    const activeMoodBtn = document.querySelector(`.mood-chip-btn[onclick*="${scene.auroraMood}"]`);
    if (activeMoodBtn) {
      document.querySelectorAll('.mood-chip-btn').forEach(b => b.classList.remove('active'));
      activeMoodBtn.classList.add('active');
    }

    mainAudio.pause();
    mainAudio.src = scene.audioFile;
    setPlayingState(false);
    RPG_SFX.chime();
  }

  let ccEnabled = true;
  const subtitleOverlay = document.getElementById('cinema-subtitle-overlay');
  const subtitleSpeakerTag = document.getElementById('subtitle-speaker-tag');
  const subtitleTextContent = document.getElementById('subtitle-text-content');
  const ccStatusLabel = document.getElementById('cc-status-label');
  const btnToggleCc = document.getElementById('btn-toggle-cc');

  function toggleCC() {
    ccEnabled = !ccEnabled;
    ccStatusLabel.textContent = ccEnabled ? 'CC: ON' : 'CC: OFF';
    btnToggleCc.style.borderColor = ccEnabled ? 'var(--teal-border)' : 'var(--line)';
    if (!ccEnabled) subtitleOverlay.classList.remove('visible');
    showToast(`Closed Captions: ${ccEnabled ? 'ON' : 'OFF'}`);
  }
  btnToggleCc.onclick = () => { RPG_SFX.click(); toggleCC(); };

  function showSubtitle(speaker, text) {
    if (!ccEnabled) return;
    subtitleSpeakerTag.textContent = speaker.toUpperCase();
    subtitleTextContent.textContent = text;
    subtitleOverlay.classList.add('visible');
  }

  function hideSubtitle() { subtitleOverlay.classList.remove('visible'); }

  function setPlayingState(isPlaying) {
    if (isPlaying) {
      voiceBtnLabel.textContent = 'Pause Voice';
      audioEqBars.classList.add('active');
      auroraHeroImg.classList.add('speaking');
      const curScene = SCENES[currentSceneIndex];
      showSubtitle('AURORA', curScene.auroraDialogue.replace(/^"|"$/g, ''));
    } else {
      voiceBtnLabel.textContent = 'Listen to Aurora';
      audioEqBars.classList.remove('active');
      auroraHeroImg.classList.remove('speaking');
      hideSubtitle();
    }
  }

  btnAuroraVoice.onclick = () => {
    RPG_SFX.click();
    if (mainAudio.paused) {
      mainAudio.play().then(() => setPlayingState(true)).catch(() => {
        // Fallback to neural synthesis for Aurora
        const curScene = SCENES[currentSceneIndex];
        const cleanText = curScene.auroraDialogue.replace(/^"|"$/g, '');
        speakCastNeural('aurora', cleanText, CAST_VOICE_PROFILES['aurora']);
      });
    } else {
      mainAudio.pause();
      setPlayingState(false);
    }
  };
  mainAudio.onended = () => setPlayingState(false);

  document.getElementById('btn-next-scene').onclick = () => {
    if (currentSceneIndex < SCENES.length - 1) renderScene(currentSceneIndex + 1);
    else { RPG_SFX.crystal(); showToast('Master session completed!'); }
  };

  document.getElementById('btn-prev-scene').onclick = () => {
    if (currentSceneIndex > 0) renderScene(currentSceneIndex - 1);
  };

  phaseTabs.forEach(tab => {
    tab.onclick = () => { RPG_SFX.click(); renderScene(parseInt(tab.dataset.scene, 10)); };
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); document.getElementById('btn-next-scene').click(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); document.getElementById('btn-prev-scene').click(); }
    else if (e.key.toLowerCase() === 'p') btnAuroraVoice.click();
    else if (e.key.toLowerCase() === 'c') toggleCC();
    else if (e.key.toLowerCase() === 'f') document.getElementById('btn-fullscreen').click();
  });

  // FULLSCREEN ON MASTER STAGE FRAME (AURORA + LESSON CENTERED)
  document.getElementById('btn-fullscreen').onclick = () => {
    RPG_SFX.click();
    const stage = document.querySelector('.master-stage-frame');
    if (!document.fullscreenElement) {
      if (stage.requestFullscreen) stage.requestFullscreen().catch(() => {});
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
  };

  // --- AUTHENTIC CAST VOICES CONSISTENCY ENGINE ---
  const CAST_VOICE_PROFILES = {
    aurora: {
      rate: 0.92, pitch: 1.06,
      keywords: ['Aria Online (Natural)', 'Aria', 'Jenny', 'Google US English', 'Samantha']
    },
    ben: {
      rate: 0.94, pitch: 0.94,
      keywords: ['Ryan Online (Natural)', 'Guy', 'George', 'Google UK English Male', 'David']
    },
    kenji: {
      rate: 0.98, pitch: 1.10,
      keywords: ['Brian Online (Natural)', 'Davis', 'Guy', 'Keita', 'Google US English Male', 'Mark']
    },
    sofia: {
      rate: 0.94, pitch: 1.02,
      keywords: ['Ava Online (Natural)', 'Sara', 'Jenny', 'Google US English Female', 'Samantha']
    },
    carmen: {
      rate: 0.86, pitch: 0.88,
      keywords: ['Sonia Online (Natural)', 'Nancy', 'Zira', 'Google UK English Female', 'Hazel']
    }
  };

  window.playRoutineAudio = function(clipSlug) {
    RPG_SFX.click();
    let charKey = 'aurora';
    if (clipSlug.includes('ben')) charKey = 'ben';
    else if (clipSlug.includes('kenji')) charKey = 'kenji';
    else if (clipSlug.includes('sofía') || clipSlug.includes('sofia')) charKey = 'sofia';
    else if (clipSlug.includes('carmen')) charKey = 'carmen';

    const profile = CAST_VOICE_PROFILES[charKey] || CAST_VOICE_PROFILES['aurora'];

    // Extract quote text from matching dialogue bubble
    let textToSpeak = '';
    const charButtons = document.querySelectorAll('.btn-char-audio');
    charButtons.forEach(btn => {
      if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(clipSlug)) {
        const bubble = btn.closest('.character-speech-bubble');
        if (bubble) {
          const quoteEl = bubble.querySelector('.character-quote-line');
          if (quoteEl) textToSpeak = quoteEl.textContent.replace(/^"|"$/g, '').trim();
        }
      }
    });

    const audioPath = `../audio/a1-articles/${clipSlug}.mp3`;
    const charAudio = new Audio(audioPath);

    charAudio.oncanplaythrough = () => {
      charAudio.play().then(() => {
        showSubtitle(charKey.toUpperCase(), textToSpeak || clipSlug);
        charAudio.onended = hideSubtitle;
      }).catch(() => {
        speakCastNeural(charKey, textToSpeak, profile);
      });
    };

    charAudio.onerror = () => {
      speakCastNeural(charKey, textToSpeak, profile);
    };
  };

  function speakCastNeural(charKey, text, profile) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = profile.rate;
    u.pitch = profile.pitch;

    const voices = window.speechSynthesis.getVoices();
    for (const kw of profile.keywords) {
      const match = voices.find(v => v.name.includes(kw) && (v.lang.startsWith('en') || v.lang === 'en-US'));
      if (match) {
        u.voice = match;
        break;
      }
    }

    u.onstart = () => showSubtitle(charKey.toUpperCase(), text);
    u.onend = hideSubtitle;
    u.onerror = hideSubtitle;

    setTimeout(() => {
      window.speechSynthesis.speak(u);
    }, 60);
  }



  window.checkStage1 = function(choice, btnEl, isCorrect) {
    const fb = document.getElementById('stage1-feedback');
    btnEl.parentElement.querySelectorAll('.choice-pill-btn').forEach(b => b.className = 'choice-pill-btn');
    if (isCorrect) {
      RPG_SFX.crystal(); btnEl.classList.add('correct');
      fb.style.color = 'var(--green)'; fb.textContent = '✓ Correct! Perfectly applied.';
      setAuroraMood('celebrando');
      auroraSpeechBox.innerHTML = '"✨ Brilliant deduction! You caught the target form correctly!"';
      showToast('Stage 1 Cleared! +25 XP');
    } else {
      RPG_SFX.coach(); btnEl.classList.add('wrong');
      fb.style.color = 'var(--ruby)'; fb.textContent = '✗ Notice the grammatical subject and agreement.';
      setAuroraMood('corrigiendo');
      auroraSpeechBox.innerHTML = '"🎯 Look closely at the subject agreement rule! Try once more."';
    }
  };

  window.checkStage2 = function(choice, btnEl, isCorrect) {
    const fb = document.getElementById('stage2-feedback');
    btnEl.parentElement.querySelectorAll('.choice-pill-btn').forEach(b => b.className = 'choice-pill-btn');
    if (isCorrect) {
      RPG_SFX.crystal(); btnEl.classList.add('correct');
      fb.style.color = 'var(--green)'; fb.textContent = '✓ Correct! Structural assembly complete.';
      setAuroraMood('celebrando');
      auroraSpeechBox.innerHTML = '"✨ Spot on! That is clean syntactic precision!"';
      showToast('Stage 2 Cleared! +25 XP');
    } else {
      RPG_SFX.coach(); btnEl.classList.add('wrong');
      fb.style.color = 'var(--ruby)'; fb.textContent = '✗ Check the auxiliary form required.';
      setAuroraMood('corrigiendo');
      auroraSpeechBox.innerHTML = '"🎯 Remember the auxiliary pattern in this structure!"';
    }
  };

  window.checkStage3 = function(choice, btnEl, isCorrect) {
    const fb = document.getElementById('stage3-feedback');
    btnEl.parentElement.querySelectorAll('.choice-pill-btn').forEach(b => b.className = 'choice-pill-btn');
    if (isCorrect) {
      RPG_SFX.crystal(); btnEl.classList.add('correct');
      fb.style.color = 'var(--green)'; fb.textContent = '✓ Correct! Transformation verified.';
      setAuroraMood('celebrando');
      auroraSpeechBox.innerHTML = '"✨ Flawless transformation! You have mastered this pattern."';
      showToast('Stage 3 Cleared! +25 XP');
    } else {
      RPG_SFX.coach(); btnEl.classList.add('wrong');
      fb.style.color = 'var(--ruby)'; fb.textContent = '✗ In English, echo the auxiliary without repeating the main verb.';
      setAuroraMood('corrigiendo');
      auroraSpeechBox.innerHTML = '"🎯 Echo the auxiliary pattern cleanly!"';
    }
  };

  window.checkReading = function(userAns, btnEl, isCorrect) {
    const fb = document.getElementById('reading-feedback');
    btnEl.parentElement.querySelectorAll('.choice-pill-btn').forEach(b => b.className = 'choice-pill-btn');
    if (isCorrect) {
      RPG_SFX.crystal(); btnEl.classList.add('correct');
      fb.style.color = 'var(--green)'; fb.textContent = '✓ Correct reading deduction!';
      setAuroraMood('celebrando');
      auroraSpeechBox.innerHTML = '"✨ Great reading precision! You caught the exact detail."';
      showToast('Reading Cleared! +50 XP');
    } else {
      RPG_SFX.coach(); btnEl.classList.add('wrong');
      fb.style.color = 'var(--ruby)'; fb.textContent = '✗ Look back at the passage details.';
      setAuroraMood('corrigiendo');
      auroraSpeechBox.innerHTML = '"🎯 Re-check the passage text carefully!"';
    }
  };

  function showToast(msg) {
    const t = document.getElementById('toast-bar');
    document.getElementById('toast-text').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  // ==========================================================================
  // WOW FACTOR: DIRECTOR RECORDING ENGINE (SPOTLIGHT, LASER, PROMPTER & SFX)
  // ==========================================================================
  let isSpotlightActive = false;
  let isLaserActive = false;
  let isPrompterActive = false;
  let prompterInterval = null;
  let prompterSeconds = 0;

  const spotCanvas = document.getElementById('spotlight-canvas');
  let spotCtx = spotCanvas ? spotCanvas.getContext('2d') : null;
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

  function resizeSpotlight() {
    if (!spotCanvas) return;
    spotCanvas.width = window.innerWidth;
    spotCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeSpotlight);
  resizeSpotlight();

  function drawSpotlight() {
    if (!isSpotlightActive || !spotCtx) return;
    spotCtx.clearRect(0, 0, spotCanvas.width, spotCanvas.height);

    // Dark backdrop
    spotCtx.fillStyle = 'rgba(9, 15, 20, 0.65)';
    spotCtx.fillRect(0, 0, spotCanvas.width, spotCanvas.height);

    // Radial cut-out
    spotCtx.globalCompositeOperation = 'destination-out';
    const radGrad = spotCtx.createRadialGradient(mouseX, mouseY, 30, mouseX, mouseY, 160);
    radGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    radGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.85)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    spotCtx.fillStyle = radGrad;
    spotCtx.beginPath();
    spotCtx.arc(mouseX, mouseY, 160, 0, Math.PI * 2);
    spotCtx.fill();
    spotCtx.globalCompositeOperation = 'source-over';

    // Golden / teal celestial halo
    spotCtx.strokeStyle = 'rgba(45, 212, 191, 0.6)';
    spotCtx.lineWidth = 2.5;
    spotCtx.beginPath();
    spotCtx.arc(mouseX, mouseY, 158, 0, Math.PI * 2);
    spotCtx.stroke();

    requestAnimationFrame(drawSpotlight);
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const laserEl = document.getElementById('laser-dot-cursor');
    if (laserEl && isLaserActive) {
      laserEl.style.left = `${mouseX}px`;
      laserEl.style.top = `${mouseY}px`;
    }
  });

  window.toggleDirectorSpotlight = function() {
    isSpotlightActive = !isSpotlightActive;
    if (spotCanvas) spotCanvas.classList.toggle('active', isSpotlightActive);
    const btn = document.getElementById('btn-director-spotlight');
    if (btn) btn.classList.toggle('active', isSpotlightActive);
    if (isSpotlightActive) {
      resizeSpotlight();
      drawSpotlight();
      showToast('🔦 Spotlight Focus: ON [S]');
    } else {
      showToast('Spotlight OFF');
    }
  };

  window.toggleDirectorLaser = function() {
    isLaserActive = !isLaserActive;
    const laserEl = document.getElementById('laser-dot-cursor');
    if (laserEl) laserEl.classList.toggle('active', isLaserActive);
    const btn = document.getElementById('btn-director-laser');
    if (btn) btn.classList.toggle('active', isLaserActive);
    showToast(`🔴 Laser Pointer: ${isLaserActive ? 'ON [L]' : 'OFF'}`);
  };

  window.toggleDirectorPrompter = function() {
    isPrompterActive = !isPrompterActive;
    const prompterEl = document.getElementById('teleprompter-hud');
    if (prompterEl) prompterEl.classList.toggle('active', isPrompterActive);
    const btn = document.getElementById('btn-director-prompter');
    if (btn) btn.classList.toggle('active', isPrompterActive);

    if (isPrompterActive) {
      if (!prompterInterval) {
        prompterInterval = setInterval(() => {
          prompterSeconds++;
          const mins = String(Math.floor(prompterSeconds / 60)).padStart(2, '0');
          const secs = String(prompterSeconds % 60).padStart(2, '0');
          const clock = document.getElementById('teleprompter-clock');
          if (clock) clock.textContent = `⏱️ ${mins}:${secs}`;
        }, 1000);
      }
      showToast('📜 Teleprompter: Visible [T]');
    } else {
      showToast('Teleprompter Hidden');
    }
  };

  // Keyboard shortcut listeners for director tools
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (e.key === '1') RPG_SFX.chime();
    else if (e.key === '2') RPG_SFX.crystal();
    else if (e.key === '3') RPG_SFX.coach();
    else if (e.key.toLowerCase() === 's') toggleDirectorSpotlight();
    else if (e.key.toLowerCase() === 'l') toggleDirectorLaser();
    else if (e.key.toLowerCase() === 't') toggleDirectorPrompter();
  });

  renderScene(0);
})();
