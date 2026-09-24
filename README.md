🏦 Banking System

A simple banking application written in **Python** (command-line) with a companion **HTML / CSS / JavaScript** web interface. Create an account, log in with a PIN, and manage your money: deposit, withdraw, transfer funds, view your transaction history, and change your PIN.

> Built as a learning project to practice modular Python design, input validation, and basic banking workflows.

---

## ✨ Features

- **Create Account**: register with your name, a 10-digit phone number, and a 4-digit PIN (with PIN confirmation). A unique 6-digit account number is generated automatically.
- **Secure Login**: authenticate using your account number and PIN.
- **Check Balance**: view your current available funds.
- **Deposit**: add money to your account.
- **Withdraw**: take money out, with balance checks.
- **Transfer**: send money to another account, with validation (receiver must exist, no self-transfers, sufficient balance).
- **Transaction History**: every action is recorded with a timestamp (`DD-MM-YYYY HH:MM`).
- **Change PIN**: update your PIN after logging in.
- **Input Validation**: handles empty names, invalid phone numbers, non-numeric input, bad PINs, and negative or zero amounts.
- **Web Interface**: a browser-based UI with login/register tabs, a dashboard, and a transaction history panel.

---

## 🧰 Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| CLI / Logic | Python 3 (standard library only) |
| Frontend   | HTML5, CSS3, JavaScript    |

No external dependencies are required.

---

## 📁 Project Structure

```
Banking-System/
├── main.py             # Entry point: starts the program
├── menus.py            # Main menu and account menu loops
├── auth.py             # Login (account number + PIN)
├── create_account.py   # New account registration and validation
├── balance.py          # Check balance
├── deposit.py          # Deposit money
├── withdraw.py         # Withdraw money
├── transfer.py         # Transfer money between accounts
├── history.py          # Transaction history
├── pin_management.py   # Change PIN
├── storage.py          # In-memory account storage
├── utils.py            # Helpers: timestamps, account number generation
├── index.html          # Web interface
├── style.css           # Web interface styling
├── script.js           # Web interface logic
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Python 3.8+](https://www.python.org/downloads/)
- A modern web browser (for the web interface)

### Installation

```bash
# Clone the repository
git clone https://github.com/rudranarayanworks101/Banking-System.git

# Move into the project folder
cd Banking-System
```

### Run the Command-Line App

```bash
python main.py
```

### Run the Web Interface

Open `index.html` directly in your browser, or serve it locally:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

**Demo account (web interface):** Account No: `123456` | PIN: `1234`

---

## 🖥️ How It Works (CLI)

**Main Menu**

```
========================================
            BANKING SYSTEM
========================================
1. Create Account
2. Login
3. Exit
```

**Account Menu** (after login)

```
 ACCOUNT MENU
========================================
1. Check Balance
2. Deposit
3. Withdraw
4. Transfer
5. Transaction History
6. Change PIN
7. Logout
```

### Typical flow

1. Choose **Create Account** and enter your details. Note down the account number shown.
2. Choose **Login** and enter your account number and PIN.
3. Use the Account Menu to deposit, withdraw, transfer, or review your history.
4. **Logout** when you are done.

---

## 🧠 Design Overview

The project is split into small, single-purpose modules, one per feature, so each file is easy to read and extend. Accounts are held in a dictionary in `storage.py`, keyed by account number:

```python
{
    123456: {
        "account_number": 123456,
        "name": "Rahul",
        "phone": "9876543210",
        "pin": "1234",
        "balance": 0.0,
        "transactions": []
    }
}
```

This structure was chosen so it can be moved to a SQL database later with minimal changes.

---

## ⚠️ Limitations

This is an educational project and **not** intended for real-world financial use.

- **No persistence (CLI):** accounts live in memory, so all data is lost when the program exits.
- **PINs are stored in plain text:** they are not hashed.
- **No limit on failed login attempts.**
- **Single user session:** no concurrency or multi-user support.

---

## 🛣️ Roadmap

- [ ] Persistent storage (SQLite / MySQL)
- [ ] Hash PINs (e.g. with `bcrypt` or `hashlib`)
- [ ] Lock account after repeated failed logins
- [ ] Unit tests
- [ ] Connect the web frontend to a Python backend (Flask / FastAPI)
- [ ] Export transaction history to CSV / PDF

---

## 👤 Author

**Rudranarayan**: [@rudranarayanworks101](https://github.com/rudranarayanworks101)

---

## 🙏 Acknowledgements

The web interface (`index.html`, `style.css`, `script.js`) was created with AI assistance to improve the visual design.
