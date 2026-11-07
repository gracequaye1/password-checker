# 🔐 Password Strength Checker

**A simple, interactive tool that helps you understand how strong your password is and what you can do to make it stronger.**

Built by **Grace Okailey Quaye (The Duchess of Hackers)** as part of the **Duchess Tech Space** cybersecurity awareness initiative.

🔗 **Live Demo:** [Password Strength Checker](https://gracequaye1.github.io/password-checker/)

---

## 📌 About the Project

Passwords are one of the first lines of defence when it comes to protecting our digital accounts. Yet, many people still use passwords that are easy to guess, predictable, or simply not strong enough.

I built this Password Strength Checker to make password security easier to understand, especially for beginners who are just starting their cybersecurity journey.

The idea is simple: as you type a password, the application evaluates it in real time, gives you a strength rating, identifies areas that need improvement, and provides practical suggestions to help you create a stronger password.

This isn't just about displaying a strength score. It's about helping people understand the habits that make passwords more secure.

---

## ✨ Features

The application includes several checks designed to evaluate different aspects of password strength.

### 1. Real-Time Password Strength Assessment
- Evaluates the password as the user types.
- Displays a visual strength meter.
- Categorises passwords into five levels:
  - Very Weak
  - Weak
  - Fair
  - Strong
  - Very Strong

### 2. Password Requirements Checklist

The checker evaluates whether a password meets important password-strength criteria:

- **Length:** Checks whether the password is sufficiently long.
- **Lowercase letters:** Checks for lowercase characters (a–z).
- **Uppercase letters:** Checks for uppercase characters (A–Z).
- **Numbers:** Checks whether the password contains numerical characters (0–9).
- **Special characters:** Looks for symbols such as `@`, `#`, `$`, and `!`.
- **Common password patterns:** Identifies common words and predictable password choices.

Each requirement is displayed in a checklist to help users understand what their passwords are missing.

### 3. Detection of Predictable Patterns

A password can contain different character types and still be predictable.

To account for this, the checker also looks for patterns such as:

- Keyboard sequences (e.g. `qwer`, `asdf`).
- Sequential numbers (e.g. `1234`, `5678`).
- Repeated characters (e.g. `aaaa`, `1111`).

These patterns can make passwords easier to guess, so the checker considers them when evaluating password strength.

### 4. Personalised Recommendations

Based on the password evaluation, users receive suggestions on how to improve their passwords.

Rather than simply displaying a score, the application highlights areas that need attention and provides practical tips.

### 5. Show/Hide Password Option

Users can toggle password visibility while typing, making it easier to review what they have entered.

### 6. Good Password Habits

The application also includes a section dedicated to good password practices, encouraging users to develop safer habits when creating and managing their passwords.

### 7. Accessibility and Responsive Design

The interface is designed to be:
- Mobile-friendly and responsive across different screen sizes.
- Keyboard accessible.
- Screen-reader friendly.
- Easy to navigate and understand.

---

## 🛠️ Technologies Used

This project was built using core web technologies without relying on external libraries or frameworks.

| Technology | Purpose |
|---|---|
| HTML5 | Provides the structure and content of the application. |
| CSS3 | Handles the visual design, layout, responsiveness, and styling. |
| JavaScript (Vanilla JS) | Powers the password evaluation, scoring logic, pattern detection, and real-time interactions. |
| Regular Expressions (RegEx) | Helps identify character types and detect specific password patterns. |

---

## ⚙️ How It Works

The Password Strength Checker evaluates the password using a set of predefined rules.

Whenever a user enters or modifies a password, JavaScript listens for the `input` event and triggers the evaluation process.

The application then:

1. Checks the password length.
2. Identifies lowercase and uppercase letters.
3. Checks for numbers and special characters.
4. Looks for common words and predictable patterns.
5. Detects repeated characters and keyboard sequences.
6. Calculates a strength score based on the evaluation.
7. Updates the strength meter and checklist.
8. Displays recommendations based on the results.

Everything happens dynamically in the browser, without requiring a page refresh.

---

## 🔒 Privacy and Security

Privacy was an important consideration when building this project.

**Your password stays in your browser.**

- Passwords are not sent to a server.
- No database is used to store passwords.
- Passwords are not saved or stored by the application.
- All password evaluation happens locally using JavaScript.

This means the application does not need access to an external service to perform its checks.

**A note on privacy:** Always use a trusted device when testing passwords, and avoid entering passwords you currently use for important personal or financial accounts into demonstration tools.

---

## 🚀 Getting Started

Want to explore the project or run it on your own computer?

You can get started in just a few steps.

### Prerequisites
You only need:
- A web browser.
- Git (optional, if you prefer cloning the repository).

### Installation

**Option 1: Clone the Repository**

Open your terminal and run:

```bash
git clone https://github.com/gracequaye1/password-checker.git
```

Navigate into the project folder:

```bash
cd password-checker
```

Open `index.html` in your preferred browser.

**Option 2: Download the Repository**

1. Open the GitHub repository.
2. Click the green **Code** button.
3. Select **Download ZIP**.
4. Extract the downloaded folder.
5. Open `index.html` in your browser.

No additional dependencies or installation processes are required.

---

## 🧠 What I Learned

Building this project gave me an opportunity to practise both frontend development and fundamental cybersecurity concepts.

Some of the things I explored and improved on include:

- **Regular Expressions:** Using patterns to identify different character types and recognise predictable password structures.
- **JavaScript Logic:** Building conditional checks and scoring mechanisms to evaluate password strength.
- **DOM Manipulation:** Updating the interface dynamically based on user input.
- **Event Handling:** Using JavaScript's `input` event to make the checker respond instantly as users type.
- **Password Security:** Understanding why password length, complexity, predictability, and common patterns matter.
- **Accessibility:** Considering keyboard navigation and screen-reader support when designing interactive elements.
- **Responsive Web Design:** Creating an interface that works across different screen sizes.

Beyond the technical aspects, this project reminded me that cybersecurity education doesn't always have to be complicated. Sometimes, building a small interactive tool can help someone understand an important security concept much better.

---

## ⚠️ Important Security Disclaimer

This application is an educational tool designed to demonstrate basic password-strength evaluation.

A high score does not automatically mean a password is secure.

Password security also depends on factors such as:
- Whether the password has appeared in a data breach.
- Whether it has been reused across multiple accounts.
- Whether it is based on personal information.
- Whether it can be guessed through other attack techniques.

For better account security, consider the following:

1. Use long, unique passwords for different accounts.
2. Avoid predictable words, personal information, and common patterns.
3. Use a reputable password manager to generate and store passwords.
4. Enable two-factor authentication (2FA) or multifactor authentication (MFA) wherever possible.
5. Never share your passwords with anyone.

Remember: A password strength checker is a helpful starting point, not a guarantee of security.

---

## 👑 About the Developer

**Grace Okailey Quaye — The Duchess of Hackers**

I'm a Full-Stack Developer with a growing interest in cybersecurity and a passion for making technology easier to understand.

I believe that learning cybersecurity should not be limited to professionals or people with advanced technical knowledge. Everyone deserves to understand how to protect themselves online.

Through **Duchess Tech Space**, I create learning opportunities, share practical cybersecurity knowledge, and build small projects that make digital safety more accessible.

This project is one of those efforts.

### Let's Connect

- 💼 [LinkedIn](https://www.linkedin.com/in/grace-okailey-quaye/)
- 💻 [GitHub](https://github.com/gracequaye1)
- ✍️ [Dev.to](https://dev.to/the_duchess_of_hackers)
- 🐦 [X (Twitter)](https://x.com/DuchessCodes)

**Built with 💜 by The Duchess of Hackers.**

*Learn. Build. Secure. Repeat.* 