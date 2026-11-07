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
const meterFill = document.getElementById("meter-fill");
const strengthLabel = document.getElementById("strength-label");
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

function buildTips(password, result) {
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
  meterFill.style.width = "0%";
  meterFill.className = "meter-fill";

  meter.setAttribute("aria-valuenow", 0);

  strengthLabel.textContent = "Start typing to check your password";
  strengthLabel.className = "strength-label";

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

  meterFill.style.width = Math.max(result.score, 5) + "%";
  meterFill.className = "meter-fill level-" + level;

  meter.setAttribute("aria-valuenow", result.score);

  strengthLabel.textContent =
    "Strength: " + levels[level] + " (" + result.score + "/100)";
  strengthLabel.className = "strength-label level-" + level;

  Object.keys(ruleItems).forEach(function (key) {
    ruleItems[key].classList.toggle("met", result.checks[key]);
  });

  showTips(buildTips(password, result));
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