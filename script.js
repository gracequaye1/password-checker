// ============================================
// PASSWORD STRENGTH CHECKER
// DUCHESS TECH SPACE
// Everything runs in the browser. The password is never sent anywhere.
// ============================================

// 1. DATA

const commonWords = [
  "password", "passw0rd", "123456", "12345678", "123456789",
  "qwerty", "abc123", "iloveyou", "admin", "welcome",
  "letmein", "monkey", "dragon", "football", "login",
  "ghana", "accra", "111111", "000000", "123123"
];

const keyboardRows = [
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm"
];

const levels = [
  "Very weak",
  "Weak",
  "Okay",
  "Strong",
  "Very strong"
];

// 2. GET HTML ELEMENTS

const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggle-btn");
const meter = document.getElementById("meter");
const segments = document.querySelectorAll(".segment");
const strengthText = document.getElementById("strength-text");
const percentBadge = document.getElementById("percent-badge");
const gaugeNeedle = document.getElementById("gauge-needle");
const gaugeLabel = document.getElementById("gauge-label");
const tipsList = document.getElementById("tips-list");

const ruleItems = {
  length: document.getElementById("rule-length"),
  lower: document.getElementById("rule-lower"),
  upper: document.getElementById("rule-upper"),
  number: document.getElementById("rule-number"),
  symbol: document.getElementById("rule-symbol"),
  common: document.getElementById("rule-common")
};

// 3. HELPER CHECKS

function hasCommonWord(password) {
  const lower = password.toLowerCase();

  return commonWords.some(function (word) {
    return lower.includes(word);
  });
}

function hasSequence(password) {
  const lower = password.toLowerCase();

  for (const row of keyboardRows) {
    for (let i = 0; i <= row.length - 4; i++) {
      const piece = row.substring(i, i + 4);
      const reversed = piece.split("").reverse().join("");

      if (lower.includes(piece) || lower.includes(reversed)) {
        return true;
      }
    }
  }

  return false;
}

function hasRepeats(password) {
  return /(.)\1{2,}/.test(password);
}

// 4. WORK OUT THE SCORE

function analyse(password) {
  const checks = {
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
    common: !hasCommonWord(password)
  };

  const repeats = hasRepeats(password);
  const sequence = hasSequence(password);

  let score = 0;

  // Length is the most important part.
  score += Math.min(password.length, 16) * 4;

  // Variety of characters.
  const varietyCount = [
    checks.lower,
    checks.upper,
    checks.number,
    checks.symbol
  ].filter(Boolean).length;

  score += varietyCount * 6;

  // Bonus for a long password.
  if (checks.length) {
    score += 12;
  }

  // Penalties.
  if (!checks.common) {
    score -= 30;
  }

  if (repeats) {
    score -= 10;
  }

  if (sequence) {
    score -= 10;
  }

  // Very short passwords can never score high.
  if (password.length < 8) {
    score = Math.min(score, 30);
  }

  score = Math.max(0, Math.min(100, score));

  return {
    checks: checks,
    repeats: repeats,
    sequence: sequence,
    score: score
  };
}

function getLevel(score) {
  if (score < 20) return 0;
  if (score < 40) return 1;
  if (score < 60) return 2;
  if (score < 80) return 3;
  return 4;
}

// 5. BUILD THE TIPS

function buildTips(result) {
  const tips = [];
  const c = result.checks;

  if (!c.length) {
    tips.push("Make it longer. Aim for at least 12 characters. Length matters most.");
  }

  if (!c.upper || !c.lower) {
    tips.push("Mix uppercase and lowercase letters.");
  }

  if (!c.number) {
    tips.push("Add a number or two, somewhere in the middle, not only at the end.");
  }

  if (!c.symbol) {
    tips.push("Add a symbol such as ! @ # or $.");
  }

  if (!c.common) {
    tips.push("Avoid common words like \"password\", \"admin\" or \"qwerty\", and avoid place names.");
  }

  if (result.sequence) {
    tips.push("Avoid keyboard or number runs like \"1234\", \"abcd\" or \"qwer\".");
  }

  if (result.repeats) {
    tips.push("Avoid repeating the same character three or more times.");
  }

  if (tips.length === 0) {
    tips.push("Great work! Turn on 2-step login and never reuse this password anywhere else.");
  } else {
    tips.push("Try a passphrase: four or more random words are long and easier to remember.");
  }

  return tips;
}

// 6. UPDATE THE PAGE

function showTips(tips) {
  tipsList.innerHTML = "";

  tips.forEach(function (tip) {
    const item = document.createElement("li");
    item.textContent = tip;
    tipsList.appendChild(item);
  });
}

function resetPage() {
  segments.forEach(function (segment) {
    segment.classList.remove("on");
  });

  meter.setAttribute("aria-valuenow", 0);

  strengthText.textContent = "Start typing";
  strengthText.className = "strength-value";

  percentBadge.hidden = true;

  gaugeNeedle.style.transform = "rotate(-90deg)";

  gaugeLabel.textContent = "-";
  gaugeLabel.className = "gauge-label";

  Object.keys(ruleItems).forEach(function (key) {
    ruleItems[key].classList.remove("met");
  });

  showTips(["Your tips will appear here as you type."]);
}

function updatePage() {
  const password = passwordInput.value;

  if (password === "") {
    resetPage();
    return;
  }

  const result = analyse(password);
  const level = getLevel(result.score);

  segments.forEach(function (segment, index) {
    segment.classList.toggle("on", index <= level);
  });

  meter.setAttribute("aria-valuenow", result.score);

  strengthText.textContent = levels[level];
  strengthText.className = "strength-value level-" + level;

  percentBadge.hidden = false;
  percentBadge.textContent = result.score + "%";
  percentBadge.className = "percent-badge level-" + level;

  const angle = -90 + result.score * 1.8;
  gaugeNeedle.style.transform = "rotate(" + angle + "deg)";

  gaugeLabel.textContent = levels[level].toUpperCase();
  gaugeLabel.className = "gauge-label level-" + level;

  Object.keys(ruleItems).forEach(function (key) {
    ruleItems[key].classList.toggle("met", result.checks[key]);
  });

  showTips(buildTips(result));
}

// 7. EVENTS

passwordInput.addEventListener("input", updatePage);

toggleBtn.addEventListener("click", function () {
  const isHidden = passwordInput.type === "password";

  passwordInput.type = isHidden ? "text" : "password";

  toggleBtn.textContent = isHidden ? "HIDE" : "SHOW";

  toggleBtn.setAttribute("aria-pressed", String(isHidden));

  passwordInput.focus();
});

resetPage();

// ============================================
// WELCOME SCREEN AND GAME
// ============================================

// 1. GAME DATA (examples only, not real passwords)

const gameRounds = [
  {
    strong: "Mango-Drum-Lantern-42",
    weak: "ghana123",
    why: "Length wins! Four random words plus a number is long and hard to guess. \"ghana123\" uses a place name and an easy number."
  },
  {
    strong: "sunrise-coffee-river-moon",
    weak: "P@ssw0rd",
    why: "\"P@ssw0rd\" swaps letters for symbols, but attackers know that trick well. A long passphrase of random words is much stronger."
  },
  {
    strong: "7!kLm#9vQz2$",
    weak: "Qwerty2024!",
    why: "\"Qwerty\" is a keyboard pattern and the year is easy to guess. A random mix with no pattern is far harder to crack."
  }
];

const greetingMessage =
  "Hi! I'm the Duchess of Hackers 👑 Welcome to my Password Lab. Ready to test how strong your password really is?";

// 2. GET HTML ELEMENTS

const welcomeScreen = document.getElementById("welcome-screen");
const checkerScreen = document.getElementById("checker-screen");
const greeting = document.getElementById("greeting");

const typedText = document.getElementById("typed-text");
const nicknameInput = document.getElementById("nickname");

const introStep = document.getElementById("intro-step");
const gameStep = document.getElementById("game-step");
const doneStep = document.getElementById("done-step");

const playBtn = document.getElementById("play-btn");
const skipBtn = document.getElementById("skip-btn");

const roundLabel = document.getElementById("round-label");
const optionLeft = document.getElementById("option-left");
const optionRight = document.getElementById("option-right");
const gameFeedback = document.getElementById("game-feedback");
const gameNextBtn = document.getElementById("game-next");

const doneTitle = document.getElementById("done-title");
const doneText = document.getElementById("done-text");
const enterBtn = document.getElementById("enter-btn");

// 3. GAME VARIABLES

let playerName = "friend";
let currentRound = 0;
let gameScore = 0;
let correctSide = "left";
let typingTimer = null;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// 4. TYPING EFFECT

function typeText(element, text) {
  clearInterval(typingTimer);

  element.textContent = "";

  if (prefersReducedMotion) {
    element.textContent = text;
    return;
  }

  // Array.from keeps emoji whole instead of splitting them.
  const characters = Array.from(text);
  let index = 0;

  typingTimer = setInterval(function () {
    element.textContent += characters[index];
    index++;

    if (index >= characters.length) {
      clearInterval(typingTimer);
    }
  }, 35);
}

// 5. MOVING BETWEEN STEPS

function showStep(step) {
  introStep.hidden = true;
  gameStep.hidden = true;
  doneStep.hidden = true;

  step.hidden = false;
}

function readName() {
  const name = nicknameInput.value.trim();

  playerName = name === "" ? "friend" : name;
}

function enterChecker() {
  welcomeScreen.hidden = true;
  checkerScreen.hidden = false;

  // textContent is safe: it shows the name as plain text only.
  greeting.textContent =
    "Welcome, " + playerName + "! 👑 Type a made-up password below and watch it get scored.";

  greeting.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth"
  });

  passwordInput.focus();
}

// 6. THE GAME

function startGame() {
  readName();

  currentRound = 0;
  gameScore = 0;

  showStep(gameStep);
  showRound();

  typeText(typedText, "Let's play, " + playerName + "! Pick the stronger password each time. 🎮");
}

function showRound() {
  const round = gameRounds[currentRound];

  // Randomly decide which side holds the strong password.
  correctSide = Math.random() < 0.5 ? "left" : "right";

  optionLeft.textContent = correctSide === "left" ? round.strong : round.weak;
  optionRight.textContent = correctSide === "right" ? round.strong : round.weak;

  optionLeft.className = "game-option";
  optionRight.className = "game-option";

  optionLeft.disabled = false;
  optionRight.disabled = false;

  roundLabel.textContent =
    "ROUND " + (currentRound + 1) + " OF " + gameRounds.length;

  gameFeedback.hidden = true;
  gameNextBtn.hidden = true;

  gameNextBtn.textContent =
    currentRound === gameRounds.length - 1 ? "FINISH 🏁" : "NEXT ROUND →";
}

function chooseOption(side) {
  optionLeft.disabled = true;
  optionRight.disabled = true;

  const isCorrect = side === correctSide;

  if (isCorrect) {
    gameScore++;
  }

  const correctButton = correctSide === "left" ? optionLeft : optionRight;
  const chosenButton = side === "left" ? optionLeft : optionRight;

  correctButton.classList.add("correct");

  if (!isCorrect) {
    chosenButton.classList.add("wrong");
  }

  gameFeedback.textContent =
    (isCorrect ? "🎉 Nice one! " : "💡 Not quite. ") + gameRounds[currentRound].why;

  gameFeedback.hidden = false;
  gameNextBtn.hidden = false;
}

function finishGame() {
  showStep(doneStep);

  if (gameScore === gameRounds.length) {
    doneTitle.textContent = "🏆 Perfect score, " + playerName + "!";
    doneText.textContent = "You already think like a defender. Let's see how your own password does.";
  } else if (gameScore >= 2) {
    doneTitle.textContent = "🔥 Great job, " + playerName + "!";
    doneText.textContent = "You spotted most of the tricks. Time to test a password.";
  } else {
    doneTitle.textContent = "💜 Good start, " + playerName + "!";
    doneText.textContent = "Now you know the tricks. Let's put them to work in the checker.";
  }

  typeText(typedText, "You scored " + gameScore + "/" + gameRounds.length + "! Ready for the Password Lab? 🔓");
}

// 7. EVENTS

playBtn.addEventListener("click", startGame);

skipBtn.addEventListener("click", function () {
  readName();
  enterChecker();
});

nicknameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    startGame();
  }
});

optionLeft.addEventListener("click", function () {
  chooseOption("left");
});

optionRight.addEventListener("click", function () {
  chooseOption("right");
});

gameNextBtn.addEventListener("click", function () {
  currentRound++;

  if (currentRound < gameRounds.length) {
    showRound();
  } else {
    finishGame();
  }
});

enterBtn.addEventListener("click", enterChecker);

// 8. START: THE DUCHESS SAYS HELLO

typeText(typedText, greetingMessage);