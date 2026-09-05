/**
 * =========================================================================
 * ENGLISH AURORA COMPANION ENGINE (v2.0)
 * =========================================================================
 * Modular Avatar, Reactive Emotional Character, Sound & State Manager.
 * Visual Persona: Aurora (Illustrated Guide with 4 Dynamic Expressions)
 */
(function(window) {
  'use strict';

  const STORAGE_KEY = 'EA_GALAXY_V2';

  // --- 1. STATE & PERSISTENCE ---
  let STATE = {
    xp: 0,
    level: 'SPARK',
    starsIgnited: 0,
    shadowWords: [],
    streak: 0,
    maxStreak: 0,
    isRegistered: false,
    userEmail: null
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      STATE = Object.assign(STATE, JSON.parse(raw));
    }
  } catch(e) {}

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
      // Gateway Link with the Master RPG Sky / Final Galaxy
      localStorage.setItem('aurora_xp', STATE.xp.toString());
      localStorage.setItem('aurora_stars', STATE.starsIgnited.toString());
    } catch(e) {}
    updateHUD();
  }

  // --- 2. WEBAUDIO SOUND ENGINE ---
  let actx = null;
  function getAudioContext() {
    if (actx) return actx;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) actx = new AudioCtx();
    } catch(e) {}
    return actx;
  }

  function playTone(freq, durMs, type, vol, slideTo) {
    type = type || 'sine';
    vol = vol == null ? 0.15 : vol;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      if (ctx.state === 'suspended') ctx.resume();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const t = ctx.currentTime;
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + durMs / 1000);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + durMs / 1000);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + durMs / 1000 + 0.02);
    } catch(e) {}
  }

  const SFX = {
    select() { playTone(440, 60, 'sine', 0.08, 550); },
    cleanHit() {
      playTone(523, 100, 'sine', 0.15, 659);
      setTimeout(() => playTone(784, 180, 'sine', 0.18, 1046), 70);
    },
    mistake() { playTone(220, 240, 'triangle', 0.18, 165); },
    shadowRedemption() {
      [0, 80, 160, 240, 320].forEach((d, i) => {
        setTimeout(() => playTone([440, 554, 659, 880, 1108][i], 220, 'sine', 0.18), d);
      });
    },
    streak() {
      [0, 60, 120, 180].forEach((d, i) => {
        setTimeout(() => playTone([440, 554, 659, 880][i], 140, 'sine', 0.12), d);
      });
    },
    waveComplete() {
      [0, 100, 200, 320, 440].forEach((d, i) => {
        setTimeout(() => playTone([523, 659, 784, 1046, 1318][i], 280, 'sine', 0.18), d);
      });
    }
  };

  // --- 3. SPOKEN AUDIO GUARDIAN ---
  let currentAudio = null;
  function speakWord(item, onEnd) {
    setWaveActive(true);
    if (currentAudio) {
      try { currentAudio.pause(); currentAudio.currentTime = 0; } catch(e) {}
    }
    const audioPath = '../audio/vocab/' + item.slug + '.mp3';
    const audio = new Audio(audioPath);
    currentAudio = audio;

    audio.onended = () => {
      setWaveActive(false);
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      console.warn('[AuroraCompanion] Neural MP3 not found at', audioPath, '— fallback to SpeechSynthesis');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(item.word);
        u.lang = 'en-US';
        u.rate = 0.88;
        u.onend = () => { setWaveActive(false); if (onEnd) onEnd(); };
        u.onerror = () => { setWaveActive(false); if (onEnd) onEnd(); };
        window.speechSynthesis.speak(u);
      } else {
        setWaveActive(false);
        if (onEnd) onEnd();
      }
    };

    audio.play().catch(() => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(item.word);
        u.lang = 'en-US';
        u.rate = 0.88;
        u.onend = () => { setWaveActive(false); if (onEnd) onEnd(); };
        window.speechSynthesis.speak(u);
      } else {
        setWaveActive(false);
      }
    });
  }

  function setWaveActive(active) {
    const wb = document.getElementById('aurora-wave-bars');
    if (wb) {
      if (active) wb.classList.add('active');
      else wb.classList.remove('active');
    }
  }

  // --- 4. AURORA MICRO-DIALOGUES & ASSETS ---
  const ASSETS = {
    default: '../assets/aurora.png',
    celebrando: '../assets/aurora-celebrando.png',
    corrigiendo: '../assets/aurora-corrigiendo.png',
    explicando: '../assets/aurora-explicando.png'
  };

  const QUOTES = {
    clean: [
      '"Clean light! That star is shining bright." ✨',
      '"Instant brilliance! The galaxy grows warmer."',
      '"Pure starlight! Your intuition is razor sharp."',
      '"Harmonic frequency locked in place."'
    ],
    mistake: [
      '"Beautiful mistake. That is how stars are born." ⭐',
      '"Ooh, so close. That one wanted to be a star."',
      '"A shadow word! Those become the brightest ones." ✨',
      '"Every dim star will shine in time. +15 XP earned!"',
      '"Mistakes are just stars waiting for light."'
    ],
    reignited: [
      '"You turned a shadow into light! +25 XP" ✨',
      '"A dim star is now a blazing supernova! Brilliant redemption."',
      '"Magnificent! You conquered that shadow forever."'
    ],
    general: [
      '"We can light up the galaxy together." ✨',
      '"Every mistake lights a star."',
      '"Listen to the cosmic echo and strike with confidence."',
      '"Step into the light of the constellation."'
    ]
  };

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  let expressionTimeout = null;
  function setAuroraExpression(type, durationMs = 2000) {
    const img = document.getElementById('aurora-avatar-img');
    if (!img) return;
    if (expressionTimeout) clearTimeout(expressionTimeout);

    img.src = ASSETS[type] || ASSETS.default;
    img.classList.add('glow-' + type);

    if (type !== 'default') {
      expressionTimeout = setTimeout(() => {
        img.src = ASSETS.default;
        img.className = 'aurora-character-img';
      }, durationMs);
    }
  }

  // --- 5. DOM ELEMENTS & HUD MANAGER ---
  function injectStyles() {
    if (document.getElementById('aurora-companion-styles')) return;
    const style = document.createElement('style');
    style.id = 'aurora-companion-styles';
    style.textContent = `
      .aurora-hud-bar {
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 16px;
        background: rgba(13, 22, 38, 0.88);
        backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(45, 212, 191, 0.25);
        border-radius: 14px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        margin-bottom: 8px; z-index: 50; position: relative;
      }
      .aurora-brand-group { display: flex; align-items: center; gap: 10px; }
      .aurora-brand-title {
        font-family: 'Cinzel', Georgia, serif; font-size: 14px; font-weight: 700;
        letter-spacing: 0.15em; color: #F2C14E;
        text-shadow: 0 0 12px rgba(242, 193, 78, 0.65);
      }
      .aurora-level-pill {
        font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600;
        letter-spacing: 0.1em; text-transform: uppercase;
        color: #2DD4BF; background: rgba(45, 212, 191, 0.12);
        border: 1px solid rgba(45, 212, 191, 0.35); border-radius: 20px;
        padding: 3px 10px;
      }
      .aurora-stats-group { display: flex; align-items: center; gap: 14px; }
      .aurora-stat-box { display: flex; flex-direction: column; align-items: flex-end; }
      .aurora-stat-label {
        font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: 0.12em;
        text-transform: uppercase; color: #8B99AE;
      }
      .aurora-stat-val {
        font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 700;
        color: #F2F5F7; font-variant-numeric: tabular-nums;
        display: flex; align-items: center; gap: 4px;
      }
      .aurora-stat-val.gold { color: #F2C14E; text-shadow: 0 0 10px rgba(242, 193, 78, 0.65); }
      .aurora-stat-val.teal { color: #2DD4BF; text-shadow: 0 0 10px rgba(45, 212, 191, 0.6); }

      .aurora-streak-pill {
        display: inline-flex; align-items: center; gap: 4px;
        font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700;
        color: #F2C14E; background: rgba(242, 193, 78, 0.12);
        border: 1px solid rgba(242, 193, 78, 0.3); border-radius: 8px;
        padding: 4px 8px; transition: all 0.3s ease;
      }
      .aurora-streak-pill.lit {
        background: rgba(242, 193, 78, 0.28);
        border-color: #F2C14E;
        box-shadow: 0 0 16px rgba(242, 193, 78, 0.65);
        transform: scale(1.05);
      }
      .aurora-stat-box.clickable {
        cursor: pointer; padding: 2px 6px; border-radius: 6px; transition: background 0.2s;
      }
      .aurora-stat-box.clickable:hover { background: rgba(45, 212, 191, 0.12); }

      .aurora-btn-save {
        font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600;
        letter-spacing: 0.08em; text-transform: uppercase;
        color: #F2C14E; background: rgba(242, 193, 78, 0.12);
        border: 1px solid #F2C14E; border-radius: 8px;
        padding: 6px 12px; cursor: pointer;
        transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        display: flex; align-items: center; gap: 5px;
      }
      .aurora-btn-save:hover {
        background: #F2C14E; color: #070B18;
        box-shadow: 0 0 20px rgba(242, 193, 78, 0.65); transform: translateY(-1px);
      }

      /* Shadow Drawer Popover */
      .aurora-shadow-drawer {
        position: absolute; top: 58px; right: 140px; z-index: 120;
        width: 290px; background: rgba(13, 22, 38, 0.94);
        backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        border: 1px solid #815CD8; border-radius: 14px;
        padding: 14px 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.8), 0 0 20px rgba(129, 92, 216, 0.3);
        display: none; animation: auroraPop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .aurora-shadow-drawer.active { display: block; }
      @keyframes auroraPop {
        0% { transform: scale(0.85); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      .aurora-drawer-title {
        font-family: 'Cinzel', Georgia, serif; font-size: 13px; font-weight: 700;
        color: #C4B5FD; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;
      }
      .aurora-drawer-item {
        display: flex; align-items: center; justify-content: space-between;
        background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(129, 92, 216, 0.2);
        border-radius: 8px; padding: 7px 10px; margin-bottom: 6px; font-size: 12.5px;
      }

      /* Guidance Footer with Illustrated Avatar */
      .aurora-guidance-panel {
        padding: 6px 20px 8px;
        background: rgba(13, 22, 38, 0.92);
        backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        border-top: 1px solid rgba(45, 212, 191, 0.3);
        display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
        z-index: 30; border-radius: 0 0 16px 16px; min-height: 104px;
      }
      .aurora-character-wrap {
        display: flex; align-items: flex-end; gap: 14px; position: relative;
      }
      .aurora-character-img {
        height: 125px; width: auto; object-fit: contain;
        filter: drop-shadow(0 0 18px rgba(45, 212, 191, 0.35));
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
        animation: auroraFloaty 5.5s ease-in-out infinite;
        margin-bottom: -6px;
      }
      @keyframes auroraFloaty {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-7px); }
      }
      .aurora-character-img.glow-celebrando {
        filter: drop-shadow(0 0 28px #F2C14E) brightness(1.12);
        transform: translateY(-10px) scale(1.06);
      }
      .aurora-character-img.glow-corrigiendo {
        filter: drop-shadow(0 0 24px #815CD8) brightness(1.06);
      }
      .aurora-character-img.glow-explicando {
        filter: drop-shadow(0 0 24px #2DD4BF) brightness(1.08);
      }

      /* Dialogue Bubble */
      .aurora-dialogue-bubble {
        display: flex; flex-direction: column;
        background: rgba(18, 28, 44, 0.88);
        border: 1px solid rgba(45, 212, 191, 0.35); border-radius: 14px;
        padding: 9px 16px; max-width: 500px; position: relative; margin-bottom: 12px;
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      }
      .aurora-dialogue-bubble::before {
        content: ''; position: absolute; left: -7px; bottom: 16px; width: 12px; height: 12px;
        background: inherit; border-left: 1px solid rgba(45, 212, 191, 0.35); border-bottom: 1px solid rgba(45, 212, 191, 0.35);
        transform: rotate(45deg);
      }
      .aurora-name {
        font-family: 'Cinzel', Georgia, serif; font-size: 10px; font-weight: 700;
        letter-spacing: 0.16em; color: #F2C14E; text-transform: uppercase; margin-bottom: 2px;
      }
      .aurora-quote {
        font-family: 'Caveat', cursive; font-size: 19px; font-weight: 700;
        color: #F2F5F7; line-height: 1.2; min-height: 22px;
        text-shadow: 0 2px 8px rgba(0,0,0,0.5);
      }

      /* Audio Speaker Target Card */
      .aurora-audio-widget {
        display: flex; align-items: center; gap: 12px;
        background: rgba(45, 212, 191, 0.08);
        border: 1px solid rgba(45, 212, 191, 0.35); border-radius: 12px;
        padding: 8px 16px; margin-bottom: 8px;
      }
      .aurora-btn-speaker {
        width: 40px; height: 40px; border-radius: 10px;
        background: rgba(45, 212, 191, 0.18); border: 1px solid #2DD4BF;
        color: #2DD4BF; font-size: 18px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.2s ease;
      }
      .aurora-btn-speaker:hover {
        background: #2DD4BF; color: #070B18;
        box-shadow: 0 0 18px rgba(45, 212, 191, 0.6); transform: scale(1.06);
      }
      .aurora-wave-bars { display: flex; align-items: center; gap: 3px; height: 18px; }
      .aurora-wave-bar {
        width: 3px; background: #2DD4BF; border-radius: 2px;
        height: 4px; transition: height 0.15s ease;
      }
      .aurora-wave-bars.active .aurora-wave-bar:nth-child(1) { animation: wave 0.8s infinite 0.1s; }
      .aurora-wave-bars.active .aurora-wave-bar:nth-child(2) { animation: wave 0.8s infinite 0.3s; }
      .aurora-wave-bars.active .aurora-wave-bar:nth-child(3) { animation: wave 0.8s infinite 0.2s; }
      .aurora-wave-bars.active .aurora-wave-bar:nth-child(4) { animation: wave 0.8s infinite 0.4s; }
      @keyframes wave {
        0%, 100% { height: 4px; }
        50% { height: 18px; }
      }

      /* Toasts & Modals */
      .aurora-xp-toast {
        position: absolute; z-index: 200;
        font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 700;
        pointer-events: none; animation: auroraFloatUp 1.2s ease-out forwards;
      }
      @keyframes auroraFloatUp {
        0% { opacity: 0; transform: translateY(0) scale(0.6); }
        30% { opacity: 1; transform: translateY(-20px) scale(1.15); }
        100% { opacity: 0; transform: translateY(-60px) scale(1); }
      }
      .aurora-xp-toast.gold { color: #F2C14E; text-shadow: 0 0 16px rgba(242, 193, 78, 0.65); }
      .aurora-xp-toast.teal { color: #2DD4BF; text-shadow: 0 0 16px rgba(45, 212, 191, 0.6); }

      /* Sensory Bridge */
      .aurora-sensory-bridge {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(13, 22, 38, 0.96); border: 2px solid #F2C14E;
        border-radius: 18px; padding: 22px 30px; text-align: center;
        box-shadow: 0 16px 50px rgba(0,0,0,0.8), 0 0 30px rgba(242, 193, 78, 0.65);
        z-index: 100; pointer-events: none; animation: auroraPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
    `;
    document.head.appendChild(style);
  }

  function updateHUD() {
    const xpEl = document.getElementById('aurora-xp-val');
    const streakEl = document.getElementById('aurora-streak-pill');
    const shadowEl = document.getElementById('aurora-shadow-val');
    const levelEl = document.getElementById('aurora-level-tag');
    const saveBtnText = document.getElementById('aurora-save-text');

    if (xpEl) xpEl.textContent = '⭐ ' + STATE.xp;
    if (streakEl) {
      streakEl.textContent = '🔥 ×' + (STATE.streak > 0 ? STATE.streak : 1);
      streakEl.classList.toggle('lit', STATE.streak >= 3);
    }
    if (shadowEl) shadowEl.textContent = '🌘 ' + STATE.shadowWords.length;

    if (STATE.xp >= 500) STATE.level = 'AURORA';
    else if (STATE.xp >= 300) STATE.level = 'SUPERNOVA';
    else if (STATE.xp >= 180) STATE.level = 'RADIANCE';
    else if (STATE.xp >= 80) STATE.level = 'GLOW';
    else if (STATE.xp >= 30) STATE.level = 'FLICKER';
    else STATE.level = 'SPARK';

    if (levelEl) {
      levelEl.textContent = STATE.level + ' · LV ' + (STATE.level === 'SPARK' ? 1 : STATE.level === 'FLICKER' ? 2 : 3);
    }
    if (saveBtnText) {
      saveBtnText.textContent = STATE.isRegistered ? 'Galaxy Saved' : 'Save Galaxy';
    }

    renderShadowDrawer();
    document.body.classList.toggle('streak-active', STATE.streak >= 5);
  }

  function renderShadowDrawer() {
    const list = document.getElementById('aurora-shadow-list');
    const count = document.getElementById('aurora-shadow-count');
    if (!list || !count) return;
    count.textContent = STATE.shadowWords.length + ' waiting';
    if (STATE.shadowWords.length === 0) {
      list.innerHTML = '<div style="color:#8B99AE; font-size:12px; font-style:italic;">No shadow stars yet. Missed words will be gathered here for redemption.</div>';
    } else {
      list.innerHTML = STATE.shadowWords.map(sw => `
        <div class="aurora-drawer-item">
          <div style="display:flex; align-items:center; gap:8px;">
            <span>${sw.icon}</span>
            <strong style="color:#F2F5F7;">${sw.word}</strong>
          </div>
          <span style="font-family:'IBM Plex Mono', monospace; font-size:10.5px; color:#F2C14E; font-weight:700;">+25 XP</span>
        </div>
      `).join('');
    }
  }

  function showToast(amount, text, x, y, isGold) {
    const toast = document.createElement('div');
    toast.className = 'aurora-xp-toast ' + (isGold ? 'gold' : 'teal');
    toast.innerHTML = (amount > 0 ? '+' + amount + ' XP' : '') + (text ? ' ' + text : '');
    toast.style.left = (x ? x - 40 : window.innerWidth / 2 - 40) + 'px';
    toast.style.top = (y ? y - 30 : window.innerHeight / 2 - 30) + 'px';
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 1200);
  }

  // --- 6. PUBLIC API ---
  const Aurora = {
    init(options) {
      injectStyles();
      updateHUD();

      // Shadow drawer click handler
      const sBox = document.getElementById('aurora-shadow-box');
      const drawer = document.getElementById('aurora-shadow-drawer');
      if (sBox && drawer) {
        sBox.onclick = (e) => {
          e.stopPropagation();
          drawer.classList.toggle('active');
        };
        document.addEventListener('click', (e) => {
          if (!drawer.contains(e.target) && !sBox.contains(e.target)) {
            drawer.classList.remove('active');
          }
        });
      }

      // Save modal click handler
      const btnSave = document.getElementById('aurora-btn-save');
      const saveModal = document.getElementById('save-modal');
      if (btnSave && saveModal) {
        btnSave.onclick = () => {
          saveModal.classList.add('active');
          if (options && options.onOpenSave) options.onOpenSave();
        };
      }
    },

    celebrate({ xp = 10, x, y, message }) {
      SFX.cleanHit();
      STATE.xp += xp;
      STATE.streak += 1;
      STATE.starsIgnited += 1;
      if (STATE.streak > STATE.maxStreak) STATE.maxStreak = STATE.streak;
      saveState();

      showToast(xp, message || 'Clean light! ⭐', x, y, false);

      const quoteEl = document.getElementById('aurora-quote');
      if (quoteEl) quoteEl.textContent = pickRandom(QUOTES.clean);

      setAuroraExpression('celebrando', 2000);

      if (STATE.streak % 5 === 0) SFX.streak();
    },

    comfortMistake({ word, icon, slug, clue, x, y, mountSelector = 'body' }) {
      SFX.mistake();
      STATE.streak = 0;

      if (!STATE.shadowWords.some(w => w.word === word)) {
        STATE.shadowWords.push({ word, icon, slug, clue, dimLevel: 1 });
      }
      STATE.xp += 15; // Learning bonus
      saveState();

      showToast(15, 'Beautiful Mistake! ⭐', x, y, true);

      const quoteEl = document.getElementById('aurora-quote');
      if (quoteEl) quoteEl.textContent = pickRandom(QUOTES.mistake);

      setAuroraExpression('corrigiendo', 2500);

      // Render sensory bridge
      const mount = document.querySelector(mountSelector) || document.body;
      const bridge = document.createElement('div');
      bridge.className = 'aurora-sensory-bridge';
      bridge.innerHTML = `
        <div style="font-size: 46px; margin-bottom: 8px;">${icon}</div>
        <div style="font-family:'Cinzel', Georgia, serif; font-size: 22px; font-weight: 700; color: #F2C14E;">${word.toUpperCase()}</div>
        <div style="font-size: 13.5px; color: #2DD4BF; margin-top: 4px;">"${clue}"</div>
        <div style="font-family:'IBM Plex Mono', monospace; font-size: 13.5px; color: #F2C14E; font-weight: 700; margin-top: 10px;">+15 XP ⭐ Shadow Word Discovered!</div>
      `;
      mount.appendChild(bridge);

      setTimeout(() => speakWord({ word, slug }), 350);

      setTimeout(() => {
        if (bridge.parentNode) bridge.parentNode.removeChild(bridge);
      }, 2600);
    },

    reigniteShadow({ word, x, y, message }) {
      SFX.shadowRedemption();
      STATE.xp += 25;
      STATE.starsIgnited += 1;
      STATE.streak += 1;
      if (STATE.streak > STATE.maxStreak) STATE.maxStreak = STATE.streak;
      STATE.shadowWords = STATE.shadowWords.filter(w => w.word !== word);
      saveState();

      showToast(25, message || 'Shadow Mastered! 🌟', x, y, true);

      const quoteEl = document.getElementById('aurora-quote');
      if (quoteEl) quoteEl.textContent = pickRandom(QUOTES.reignited);

      setAuroraExpression('celebrando', 2500);
    },

    explain(text) {
      setAuroraExpression('explicando', 3000);
      const quoteEl = document.getElementById('aurora-quote');
      if (quoteEl) quoteEl.textContent = text;
    },

    speakWord(item, onEnd) {
      speakWord(item, onEnd);
    },

    setQuote(text) {
      const quoteEl = document.getElementById('aurora-quote');
      if (quoteEl) quoteEl.textContent = text;
    },

    getState() { return STATE; },
    getShadowWords() { return STATE.shadowWords; },
    sfx: SFX,
    
    // Canonical Galactic Color Palette for CEFR Levels & Skill Portals
    CEFR_PALETTE: {
      A1: { label: 'Spark · A1', color: '#F2C14E', bg: 'rgba(242, 193, 78, 0.14)', border: 'rgba(242, 193, 78, 0.4)' },
      A2: { label: 'Verdant · A2', color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.14)', border: 'rgba(45, 212, 191, 0.4)' },
      B1: { label: 'Sapphire · B1', color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.14)', border: 'rgba(56, 189, 248, 0.4)' },
      B2: { label: 'Violet · B2', color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.14)', border: 'rgba(167, 139, 250, 0.4)' },
      C1: { label: 'Ruby · C1', color: '#F43F5E', bg: 'rgba(244, 63, 94, 0.16)', border: 'rgba(244, 63, 94, 0.45)' }
    },
    SKILL_PALETTE: {
      vocab: { name: 'Vocabulary', color: '#F2C14E', icon: '🦒' },
      listening: { name: 'Listening & Sound', color: '#815CD8', icon: '🎧' },
      grammar: { name: 'Grammar & Syntax', color: '#38BDF8', icon: '⚡' }
    }
  };

  window.Aurora = Aurora;

})(window);
