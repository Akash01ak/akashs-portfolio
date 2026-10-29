/**
 * Akash S - Interactive Portfolio Experience Engine
 * Features:
 *  - Web Audio API Sound Synthesizer (Zero asset dependencies)
 *  - Interactive Interactive CLI / Terminal Emulator with History
 *  - Canvas Ambient Interactive Constellation Mesh
 *  - Interactive SVG Spice Wheel Physics & Modal
 *  - Interactive Fitness Telemetry Dashboard Simulator
 *  - Skills Filtering & Cross-Referencing
 *  - 1-Click Clipboard Copying with Toast
 *  - Full Screen Confetti Integration
 */

// -------------------------------------------------------------
// 1. Web Audio API Sound Synthesizer
// -------------------------------------------------------------
const SoundFX = {
  ctx: null,
  enabled: true,

  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  },

  play(type = "click") {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    switch (type) {
      case "click":
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.05);
        osc.start(t);
        osc.stop(t + 0.05);
        break;

      case "key":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(600 + Math.random() * 200, t);
        gain.gain.setValueAtTime(0.03, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.03);
        osc.start(t);
        osc.stop(t + 0.03);
        break;

      case "success":
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.setValueAtTime(659.25, t + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, t + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, t + 0.24); // C6
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.45);
        osc.start(t);
        osc.stop(t + 0.45);
        break;

      case "fanfare":
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.connect(g);
          g.connect(this.ctx.destination);
          o.type = "triangle";
          o.frequency.setValueAtTime(freq, t + idx * 0.09);
          g.gain.setValueAtTime(0.12, t + idx * 0.09);
          g.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.4);
          o.start(t + idx * 0.09);
          o.stop(t + idx * 0.09 + 0.4);
        });
        break;

      case "pop":
        osc.type = "sine";
        osc.frequency.setValueAtTime(350, t);
        osc.frequency.exponentialRampToValueAtTime(700, t + 0.04);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.04);
        osc.start(t);
        osc.stop(t + 0.04);
        break;
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    const btn = document.getElementById("soundToggleBtn");
    if (btn) {
      btn.innerHTML = this.enabled
        ? `<i data-lucide="volume-2" class="w-4 h-4 text-emerald-400"></i><span class="hidden sm:inline">SFX On</span>`
        : `<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i><span class="hidden sm:inline text-slate-500">Muted</span>`;
      if (window.lucide) lucide.createIcons();
    }
    this.play("pop");
    localStorage.setItem("sound_fx_enabled", this.enabled ? "true" : "false");
  }
};

// -------------------------------------------------------------
// 2. Interactive Interactive Terminal CLI
// -------------------------------------------------------------
const Terminal = {
  isOpen: false,
  history: [],
  historyIndex: -1,

  commands: {
    help: () => `
<div class="text-indigo-400 font-bold mb-1">Available System Commands:</div>
  <span class="text-emerald-400 font-semibold">about</span>          - Developer profile & mission
  <span class="text-emerald-400 font-semibold">skills</span>         - Technical expertise & stack
  <span class="text-emerald-400 font-semibold">projects</span>       - Shipped web & software solutions
  <span class="text-emerald-400 font-semibold">experience</span>     - Industry internship & background
  <span class="text-emerald-400 font-semibold">certifications</span> - 9+ verified technical credentials
  <span class="text-emerald-400 font-semibold">contact</span>        - Email, WhatsApp, and phone
  <span class="text-emerald-400 font-semibold">resume</span>         - Open print-ready PDF resume
  <span class="text-emerald-400 font-semibold">sudo hire akash</span>- 🚀 Recruiter Fast-Track offer!
  <span class="text-emerald-400 font-semibold">clear</span>          - Clear terminal buffer
  <span class="text-emerald-400 font-semibold">exit</span>           - Close terminal interface
`,
    about: () => `
<div class="space-y-1">
  <div class="text-cyan-400 font-bold">AKASH S — Software Developer & BCA Graduate ('26)</div>
  <div class="text-slate-300">Based in: <span class="text-white">Bangalore, Karnataka, India</span></div>
  <div class="text-slate-300">Degree: <span class="text-white">BCA @ REVA University (2023 - 2026)</span></div>
  <div class="text-slate-300">Languages: <span class="text-amber-300">English, Hindi, Kannada, Malayalam, Tamil</span></div>
  <div class="text-slate-400 mt-2">"Building clean-code applications that bridge user-centered design, robust algorithmic foundations, and AI automation."</div>
</div>
`,
    skills: () => `
<div class="space-y-2">
  <div><span class="text-indigo-400 font-bold">[LANGUAGES]</span> Python, Java, C++, C, JavaScript (ES6+), SQL</div>
  <div><span class="text-cyan-400 font-bold">[WEB & UX]</span> HTML5 Semantic Web, CSS3, Responsive Design, Custom SVG, ARIA Accessibility, Form Validation</div>
  <div><span class="text-emerald-400 font-bold">[DATA & SYSTEMS]</span> MySQL, RDBMS, Data Structures & Algorithms, Object-Oriented Programming (OOP), Linux</div>
  <div><span class="text-purple-400 font-bold">[AI & AUTOMATION]</span> Gemini AI API, Robotic Process Automation (RPA), Digital Innovation</div>
</div>
`,
    projects: () => `
<div class="space-y-2">
  <div class="border-l-2 border-emerald-500 pl-2">
    <div class="text-emerald-300 font-bold">1. Spice Garden — Kerala Restaurant Experience</div>
    <div class="text-slate-300 text-xs">Custom animated SVG spice wheel, accessible reservation modal, client validation, single-file performance.</div>
    <button onclick="SpiceGardenDemo.openModal()" class="text-cyan-400 underline text-xs cursor-pointer hover:text-cyan-300">[Launch Spice Wheel Demo]</button>
  </div>
  <div class="border-l-2 border-cyan-500 pl-2">
    <div class="text-cyan-300 font-bold">2. Track Titan — Fitness Telemetry & Analytics</div>
    <div class="text-slate-300 text-xs">Activity tracker, goal-setting telemetry, progress monitoring, and clean responsive dashboard.</div>
    <button onclick="FitnessDemo.openModal()" class="text-cyan-400 underline text-xs cursor-pointer hover:text-cyan-300">[Launch Fitness Telemetry Demo]</button>
  </div>
  <div class="border-l-2 border-purple-500 pl-2">
    <div class="text-purple-300 font-bold">3. Vogue Connect — Fashion Networking Platform</div>
    <div class="text-slate-300 text-xs">Social ecosystem for designers, models, and photographers to showcase portfolios and collaborate.</div>
  </div>
</div>
`,
    experience: () => `
<div class="space-y-1">
  <div class="text-amber-300 font-bold">IDCC — Data Entry & Research Intern</div>
  <div class="text-slate-400 text-xs">August 2026 • 3-Week Specialized Engagement</div>
  <div class="text-slate-300 text-xs">• Sourced, audited and verified data for Danish enterprise entities across official registries.</div>
  <div class="text-slate-300 text-xs">• Verified addresses, executive emails, contact phone lines, and LinkedIn profiles.</div>
  <div class="text-slate-300 text-xs">• Cross-referenced records between Indian and Danish business directories with 100% data integrity.</div>
</div>
`,
    education: () => `
<div class="space-y-2">
  <div><span class="text-indigo-300 font-semibold">REVA University</span> — BCA (2023 - 2026)</div>
  <div><span class="text-slate-300">Cathedral P.U. College & High School</span> — PCMC (2021 - 2023)</div>
  <div><span class="text-slate-400">Christ School ICSE, S.G. Palya</span> — 10th Standard</div>
</div>
`,
    certifications: () => `
<div class="grid grid-cols-2 gap-1 text-xs">
  <span class="text-emerald-300">✓ Gemini AI</span>
  <span class="text-emerald-300">✓ RPA for Developers</span>
  <span class="text-cyan-300">✓ Intro to Python</span>
  <span class="text-cyan-300">✓ Python Programming</span>
  <span class="text-indigo-300">✓ Java Programming</span>
  <span class="text-indigo-300">✓ Linux Fundamentals</span>
  <span class="text-purple-300">✓ RDBMS / MySQL</span>
  <span class="text-purple-300">✓ HTML & Web Dev</span>
  <span class="text-amber-300">✓ Digital Marketing</span>
</div>
`,
    contact: () => `
<div class="space-y-1 text-xs">
  <div>📧 Email: <a href="mailto:akashspvt2004@gmail.com" class="text-cyan-400 underline">akashspvt2004@gmail.com</a></div>
  <div>📱 Phone/WhatsApp: <a href="https://wa.me/919019998288" target="_blank" class="text-emerald-400 underline">+91 90199 98288</a></div>
  <div>📍 Location: Bangalore, Karnataka, India</div>
  <div>🟢 Status: Open to Full-time Opportunities (Immediate Joining)</div>
</div>
`,
    resume: () => {
      window.open('resume.html', '_blank');
      return `<span class="text-emerald-400">Opening print-optimized resume in a new tab...</span>`;
    },
    'sudo hire akash': () => {
      triggerConfetti();
      SoundFX.play('fanfare');
      openHireModal();
      return `
<div class="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-lg text-emerald-300">
  <div class="font-bold text-sm">🎉 PERMISSION GRANTED: ACCESS LEVEL = HIRED!</div>
  <div class="text-xs mt-1">Excellent choice! Akash S brings engineering discipline, creative energy, and multilingual collaborative capability to your team.</div>
  <div class="text-xs text-cyan-300 mt-2">→ Connecting to: akashspvt2004@gmail.com</div>
</div>
`;
    },
    clear: () => {
      const output = document.getElementById("terminalOutput");
      if (output) output.innerHTML = "";
      return "";
    },
    exit: () => {
      Terminal.toggle(false);
      return "";
    }
  },

  init() {
    const input = document.getElementById("terminalInput");
    if (!input) return;

    input.addEventListener("keydown", (e) => {
      SoundFX.play("key");
      if (e.key === "Enter") {
        const val = input.value.trim();
        if (val) {
          this.execute(val);
          this.history.push(val);
          this.historyIndex = this.history.length;
          input.value = "";
        }
      } else if (e.key === "ArrowUp") {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          input.value = this.history[this.historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          input.value = this.history[this.historyIndex] || "";
        } else {
          this.historyIndex = this.history.length;
          input.value = "";
        }
      }
    });

    // Global shortcut Ctrl+K or Cmd+K
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        Terminal.toggle();
      }
      if (e.key === "Escape" && this.isOpen) {
        Terminal.toggle(false);
      }
    });
  },

  execute(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    const output = document.getElementById("terminalOutput");
    if (!output) return;

    const line = document.createElement("div");
    line.className = "mb-2 font-mono text-xs";
    line.innerHTML = `<span class="text-emerald-400">akash@bangalore:~$</span> <span class="text-white">${rawCmd}</span>`;
    output.appendChild(line);

    let response = "";
    if (this.commands[cmd]) {
      response = typeof this.commands[cmd] === "function" ? this.commands[cmd]() : this.commands[cmd];
    } else {
      response = `<span class="text-rose-400">Command not found: "${cmd}". Type <span class="text-indigo-400 underline cursor-pointer" onclick="Terminal.execute('help')">help</span> for available commands.</span>`;
    }

    if (response) {
      const respDiv = document.createElement("div");
      respDiv.className = "mb-3 font-mono text-xs leading-relaxed";
      respDiv.innerHTML = response;
      output.appendChild(respDiv);
    }

    const container = document.getElementById("terminalScroll");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },

  toggle(forceState) {
    const modal = document.getElementById("terminalModal");
    if (!modal) return;
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;

    if (this.isOpen) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      SoundFX.play("pop");
      setTimeout(() => {
        const input = document.getElementById("terminalInput");
        if (input) input.focus();
      }, 100);
    } else {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      SoundFX.play("click");
    }
  }
};

// -------------------------------------------------------------
// 3. Interactive Spice Garden Kerala Spice Wheel Engine
// -------------------------------------------------------------
const SpiceGardenDemo = {
  currentDeg: 0,
  spices: [
    { name: "Black Pepper", title: "King of Spices", color: "#334155", desc: "Native to the Western Ghats of Kerala, offering bold, pungent heat and timeless culinary prestige." },
    { name: "Green Cardamom", title: "Queen of Spices", color: "#15803d", desc: "Aromatic pods harvested in Munnar hills, delivering sweet floral eucalyptus nuances." },
    { name: "Star Anise", title: "Malabar Star", color: "#b45309", desc: "Exquisite 8-pointed seed pod providing liquorice aromatics to Kerala Thalassery Biryani." },
    { name: "Ceylon Cinnamon", title: "True Sweet Bark", color: "#9a3412", desc: "Delicate layered sweet quills harvested from coastal spice plantations." },
    { name: "Cloves", title: "Fragrant Cloves", color: "#451a03", desc: "Intensely warm aromatic flower buds essential for Kerala garam masala." },
    { name: "Nutmeg & Mace", title: "Twin Treasures", color: "#ea580c", desc: "Exotic tropical fruit kernel wrapped in vibrant crimson aril." }
  ],

  spin() {
    SoundFX.play("click");
    const randSpins = 4 + Math.floor(Math.random() * 5);
    const randExtra = Math.floor(Math.random() * 360);
    this.currentDeg += randSpins * 360 + randExtra;

    const wheel = document.getElementById("spiceWheelSvg");
    if (wheel) {
      wheel.style.transform = `rotate(${this.currentDeg}deg)`;
    }

    // Determine selected spice
    const sliceDeg = 360 / this.spices.length;
    const normalizedDeg = (360 - (this.currentDeg % 360)) % 360;
    const selectedIdx = Math.floor(normalizedDeg / sliceDeg) % this.spices.length;

    setTimeout(() => {
      this.displaySpice(selectedIdx);
      SoundFX.play("success");
    }, 1500);
  },

  displaySpice(idx) {
    const s = this.spices[idx];
    const nameEl = document.getElementById("spiceName");
    const titleEl = document.getElementById("spiceTitle");
    const descEl = document.getElementById("spiceDesc");

    if (nameEl) nameEl.textContent = s.name;
    if (titleEl) titleEl.textContent = s.title;
    if (descEl) descEl.textContent = s.desc;
  },

  openModal() {
    const modal = document.getElementById("spiceGardenModal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      SoundFX.play("pop");
      this.displaySpice(0);
    }
  },

  closeModal() {
    const modal = document.getElementById("spiceGardenModal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      SoundFX.play("click");
    }
  }
};

// -------------------------------------------------------------
// 4. Interactive Fitness Telemetry Dashboard Simulator
// -------------------------------------------------------------
const FitnessDemo = {
  workouts: 14,
  calories: 2450,
  streak: 6,

  logWorkout() {
    this.workouts += 1;
    this.calories += 380;
    this.streak += 1;
    SoundFX.play("success");
    this.updateUI();
  },

  updateUI() {
    const wEl = document.getElementById("fitnessWorkouts");
    const cEl = document.getElementById("fitnessCalories");
    const sEl = document.getElementById("fitnessStreak");

    if (wEl) wEl.textContent = this.workouts;
    if (cEl) cEl.textContent = this.calories.toLocaleString() + " kcal";
    if (sEl) sEl.textContent = this.streak + " Days";
  },

  openModal() {
    const modal = document.getElementById("fitnessModal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      SoundFX.play("pop");
      this.updateUI();
    }
  },

  closeModal() {
    const modal = document.getElementById("fitnessModal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      SoundFX.play("click");
    }
  }
};

// -------------------------------------------------------------
// 5. Skills Matrix Filtering
// -------------------------------------------------------------
function filterSkills(category, btn) {
  SoundFX.play("click");
  // Update button active styling
  document.querySelectorAll(".skill-filter-btn").forEach((b) => {
    b.classList.remove("bg-indigo-600", "text-white");
    b.classList.add("bg-slate-800/80", "text-slate-400", "hover:text-white");
  });
  if (btn) {
    btn.classList.add("bg-indigo-600", "text-white");
    btn.classList.remove("bg-slate-800/80", "text-slate-400");
  }

  const cards = document.querySelectorAll(".skill-item-card");
  cards.forEach((card) => {
    const cat = card.getAttribute("data-category");
    if (category === "all" || cat === category) {
      card.style.display = "flex";
      card.style.opacity = "1";
    } else {
      card.style.display = "none";
      card.style.opacity = "0";
    }
  });
}

// -------------------------------------------------------------
// 6. 1-Click Clipboard Copying with Tactile Toast
// -------------------------------------------------------------
function copyToClipboard(text, label = "Email") {
  navigator.clipboard.writeText(text).then(() => {
    SoundFX.play("success");
    showToast(`✓ ${label} copied to clipboard!`);
  }).catch(() => {
    showToast(`Could not copy automatically. Value: ${text}`);
  });
}

function showToast(message) {
  let toast = document.getElementById("globalToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "globalToast";
    toast.className = "fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>${message}`;
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
    toast.classList.remove("translate-y-0", "opacity-100");
  }, 2800);
}

// -------------------------------------------------------------
// 7. Confetti Trigger Helper
// -------------------------------------------------------------
function triggerConfetti() {
  if (window.confetti) {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function openHireModal() {
  const modal = document.getElementById("hireModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeHireModal() {
  const modal = document.getElementById("hireModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// -------------------------------------------------------------
// 8. Ambient Interactive Canvas Starfield Mesh
// -------------------------------------------------------------
function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener("resize", () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const dots = [];
  const count = Math.min(45, Math.floor((width * height) / 18000));

  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8
    });
  }

  let mouse = { x: null, y: null, maxDist: 120 };

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx;
      d.y += d.vy;

      if (d.x < 0 || d.x > width) d.vx *= -1;
      if (d.y < 0 || d.y > height) d.vy *= -1;

      // Draw dot
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(129, 140, 248, 0.45)";
      ctx.fill();

      // Connect dots
      for (let j = i + 1; j < dots.length; j++) {
        const d2 = dots[j];
        const dist = Math.hypot(d.x - d2.x, d.y - d2.y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (mouse.x !== null) {
        const mDist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        if (mDist < mouse.maxDist) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.35 * (1 - mDist / mouse.maxDist)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }

  render();
}

// -------------------------------------------------------------
// 9. Document Ready Initialization
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  SoundFX.init();
  Terminal.init();
  initHeroCanvas();

  // Load sound preference
  const savedSound = localStorage.getItem("sound_fx_enabled");
  if (savedSound === "false") {
    SoundFX.enabled = false;
    const btn = document.getElementById("soundToggleBtn");
    if (btn) {
      btn.innerHTML = `<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i><span class="hidden sm:inline text-slate-500">Muted</span>`;
    }
  }

  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Contact form submission handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      SoundFX.play("fanfare");
      triggerConfetti();

      const name = document.getElementById("senderName").value;
      const email = document.getElementById("senderEmail").value;
      const message = document.getElementById("senderMessage").value;

      showToast(`Thank you ${name}! Opening mail client...`);
      setTimeout(() => {
        const mailtoUrl = `mailto:akashspvt2004@gmail.com?subject=Opportunity%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})`;
        window.location.href = mailtoUrl;
      }, 800);
    });
  }
});

