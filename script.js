/* ========================================================
   SIMPLE BANKING SYSTEM - JAVASCRIPT
   Beginner-friendly, clean logic directly matching the Python backend
   ======================================================== */

// Storage object for accounts (mirrors storage.py in Python)
// Pre-loaded with demo accounts for easy recording and testing
/*it is all ai generated to look interactive although i know little html css and js */
let accounts = {
    123456: {
        account_number: 123456,
        name: "Rahul Sharma",
        phone: "9876543210",
        pin: "1234",
        balance: 5000.0,
        transactions: [
            "24-09-2026 09:30 - Account created",
            "24-09-2026 10:15 - Deposited Rs. 5000"
        ]
    },
    654321: {
        account_number: 654321,
        name: "Priya Patel",
        phone: "9123456780",
        pin: "4321",
        balance: 2500.0,
        transactions: [
            "24-09-2026 11:00 - Account created",
            "24-09-2026 11:05 - Deposited Rs. 2500"
        ]
    }
};

// Variable to keep track of the currently logged-in account
let currentAccount = null;


// ========================================================
// UTILITY FUNCTIONS (matches utils.py)
// ========================================================

// Get formatted current date & time (DD-MM-YYYY HH:MM)
function getCurrentTimestamp() {
    let now = new Date();
    let day = String(now.getDate()).padStart(2, '0');
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let year = now.getFullYear();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

// Generate a random unique 6-digit account number (100000 - 999999)
function generateUniqueAccountNumber() {
    let accNum;
    do {
        accNum = Math.floor(100000 + Math.random() * 900000);
    } while (accounts[accNum]); // Make sure it does not already exist
    return accNum;
}

// Helper to display friendly alert/status messages
function showMessage(elementId, text, isSuccess) {
    let el = document.getElementById(elementId);
    if (!el) return;

    el.innerText = text;
    el.className = isSuccess ? "message success" : "message error";
    el.style.display = "block";

    // Auto-hide message after 4 seconds
    setTimeout(function() {
        el.style.display = "none";
    }, 4000);
}


// ========================================================
// NAVIGATION & TABS
// ========================================================

function switchAuthTab(tab) {
    let loginCard = document.getElementById("loginCard");
    let registerCard = document.getElementById("registerCard");
    let tabLoginBtn = document.getElementById("tabLoginBtn");
    let tabRegisterBtn = document.getElementById("tabRegisterBtn");

    if (tab === "login") {
        loginCard.style.display = "block";
        registerCard.style.display = "none";
        tabLoginBtn.classList.add("active");
        tabRegisterBtn.classList.remove("active");
    } else {
        loginCard.style.display = "none";
        registerCard.style.display = "block";
        tabLoginBtn.classList.remove("active");
        tabRegisterBtn.classList.add("active");
    }
}


// ========================================================
// 1. CREATE ACCOUNT (matches create_account.py)
// ========================================================

function createAccount() {
    let name = document.getElementById("regName").value.trim();
    let phone = document.getElementById("regPhone").value.trim();
    let pin = document.getElementById("regPin").value.trim();
    let confirmPin = document.getElementById("regConfirmPin").value.trim();

    // Validation 1: Name cannot be empty
    if (!name) {
        showMessage("registerMessage", "Error: Name cannot be empty.", false);
        return;
    }

    // Validation 2: Phone must be 10 digits
    if (!/^\d{10}$/.test(phone)) {
        showMessage("registerMessage", "Error: Enter a valid 10-digit phone number.", false);
        return;
    }

    // Validation 3: PIN must be 4 digits
    if (!/^\d{4}$/.test(pin)) {
        showMessage("registerMessage", "Error: PIN must have exactly 4 digits.", false);
        return;
    }

    // Validation 4: Confirm PIN match
    if (pin !== confirmPin) {
        showMessage("registerMessage", "Error: PINs do not match.", false);
        return;
    }

    // Create account
    let accountNumber = generateUniqueAccountNumber();
    let timestamp = getCurrentTimestamp();

    accounts[accountNumber] = {
        account_number: accountNumber,
        name: name,
        phone: phone,
        pin: pin,
        balance: 0.0,
        transactions: [`${timestamp} - Account created`]
    };

    // Clear input fields
    document.getElementById("regName").value = "";
    document.getElementById("regPhone").value = "";
    document.getElementById("regPin").value = "";
    document.getElementById("regConfirmPin").value = "";

    // Show success message with the new account number
    showMessage(
        "registerMessage", 
        `Success! Account created. Your Account Number is: ${accountNumber}`, 
        true
    );

    // Fill the login form with this new account number for convenience
    document.getElementById("loginAccNum").value = accountNumber;
}


// ========================================================
// 2. LOGIN & LOGOUT (matches auth.py & menus.py)
// ========================================================

function login() {
    let accInput = document.getElementById("loginAccNum").value.trim();
    let pinInput = document.getElementById("loginPin").value.trim();

    if (!accInput) {
        showMessage("loginMessage", "Error: Please enter an account number.", false);
        return;
    }

    let accNum = parseInt(accInput);

    if (!accounts[accNum]) {
        showMessage("loginMessage", "Error: Account not found.", false);
        return;
    }

    if (accounts[accNum].pin !== pinInput) {
        showMessage("loginMessage", "Error: Incorrect PIN.", false);
        return;
    }

    // Successful login
    currentAccount = accounts[accNum];

    // Clear login inputs
    document.getElementById("loginAccNum").value = "";
    document.getElementById("loginPin").value = "";

    // Show Dashboard view, hide Auth view
    document.getElementById("authSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "block";

    updateDashboardUI();
    renderHistory();
}

function logout() {
    currentAccount = null;

    // Show Auth view, hide Dashboard view
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("authSection").style.display = "block";

    // Switch to login tab
    switchAuthTab("login");
    showMessage("loginMessage", "Logged out successfully.", true);
}


// ========================================================
// DASHBOARD UI UPDATE
// ========================================================

function updateDashboardUI() {
    if (!currentAccount) return;

    document.getElementById("userName").innerText = currentAccount.name;
    document.getElementById("userAccNum").innerText = currentAccount.account_number;
    document.getElementById("userPhone").innerText = currentAccount.phone;
    document.getElementById("userBalance").innerText = currentAccount.balance.toFixed(2);
}


// ========================================================
// 3. CHECK BALANCE (matches balance.py)
// ========================================================

function checkBalanceAlert() {
    if (!currentAccount) return;
    alert(`Account Number: ${currentAccount.account_number}\nAccount Holder: ${currentAccount.name}\nCurrent Balance: Rs. ${currentAccount.balance.toFixed(2)}`);
}


// ========================================================
// 4. DEPOSIT (matches deposit.py)
// ========================================================

function depositMoney() {
    let amountInput = document.getElementById("depositAmount").value.trim();
    let amount = parseFloat(amountInput);

    if (isNaN(amount) || amount <= 0) {
        showMessage("dashboardMessage", "Error: Please enter a valid deposit amount greater than zero.", false);
        return;
    }

    currentAccount.balance += amount;
    let timestamp = getCurrentTimestamp();
    currentAccount.transactions.push(`${timestamp} - Deposited Rs. ${amount.toFixed(2)}`);

    // Reset input
    document.getElementById("depositAmount").value = "";

    updateDashboardUI();
    renderHistory();
    showMessage("dashboardMessage", `Deposit Successful! Added Rs. ${amount.toFixed(2)}`, true);
}


// ========================================================
// 5. WITHDRAW (matches withdraw.py)
// ========================================================

function withdrawMoney() {
    let amountInput = document.getElementById("withdrawAmount").value.trim();
    let amount = parseFloat(amountInput);

    if (isNaN(amount) || amount <= 0) {
        showMessage("dashboardMessage", "Error: Please enter a valid withdrawal amount greater than zero.", false);
        return;
    }

    if (amount > currentAccount.balance) {
        showMessage("dashboardMessage", `Error: Insufficient balance. Available: Rs. ${currentAccount.balance.toFixed(2)}`, false);
        return;
    }

    currentAccount.balance -= amount;
    let timestamp = getCurrentTimestamp();
    currentAccount.transactions.push(`${timestamp} - Withdrawn Rs. ${amount.toFixed(2)}`);

    // Reset input
    document.getElementById("withdrawAmount").value = "";

    updateDashboardUI();
    renderHistory();
    showMessage("dashboardMessage", `Withdrawal Successful! Withdrawn Rs. ${amount.toFixed(2)}`, true);
}


// ========================================================
// 6. TRANSFER (matches transfer.py)
// ========================================================

function transferMoney() {
    let receiverInput = document.getElementById("transferReceiver").value.trim();
    let amountInput = document.getElementById("transferAmount").value.trim();

    if (!receiverInput) {
        showMessage("dashboardMessage", "Error: Enter receiver account number.", false);
        return;
    }

    let receiverAccNum = parseInt(receiverInput);

    if (!accounts[receiverAccNum]) {
        showMessage("dashboardMessage", "Error: Receiver account not found.", false);
        return;
    }

    if (receiverAccNum === currentAccount.account_number) {
        showMessage("dashboardMessage", "Error: You cannot transfer money to your own account.", false);
        return;
    }

    let amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) {
        showMessage("dashboardMessage", "Error: Please enter a valid transfer amount greater than zero.", false);
        return;
    }

    if (amount > currentAccount.balance) {
        showMessage("dashboardMessage", `Error: Insufficient balance. Available: Rs. ${currentAccount.balance.toFixed(2)}`, false);
        return;
    }

    // Process transfer
    let receiverAccount = accounts[receiverAccNum];
    currentAccount.balance -= amount;
    receiverAccount.balance += amount;

    let timestamp = getCurrentTimestamp();
    currentAccount.transactions.push(`${timestamp} - Transferred Rs. ${amount.toFixed(2)} to Account ${receiverAccNum}`);
    receiverAccount.transactions.push(`${timestamp} - Received Rs. ${amount.toFixed(2)} from Account ${currentAccount.account_number}`);

    // Reset inputs
    document.getElementById("transferReceiver").value = "";
    document.getElementById("transferAmount").value = "";

    updateDashboardUI();
    renderHistory();
    showMessage("dashboardMessage", `Transfer Successful! Sent Rs. ${amount.toFixed(2)} to Account ${receiverAccNum}`, true);
}


// ========================================================
// 7. CHANGE PIN (matches pin_management.py)
// ========================================================

function changePin() {
    let oldPin = document.getElementById("oldPin").value.trim();
    let newPin = document.getElementById("newPin").value.trim();
    let confirmNewPin = document.getElementById("confirmNewPin").value.trim();

    if (oldPin !== currentAccount.pin) {
        showMessage("dashboardMessage", "Error: Old PIN does not match.", false);
        return;
    }

    if (!/^\d{4}$/.test(newPin)) {
        showMessage("dashboardMessage", "Error: New PIN must have exactly 4 digits.", false);
        return;
    }

    if (newPin === oldPin) {
        showMessage("dashboardMessage", "Error: New PIN cannot be the same as the old PIN.", false);
        return;
    }

    if (newPin !== confirmNewPin) {
        showMessage("dashboardMessage", "Error: New PINs do not match.", false);
        return;
    }

    // Update PIN
    currentAccount.pin = newPin;

    // Reset inputs
    document.getElementById("oldPin").value = "";
    document.getElementById("newPin").value = "";
    document.getElementById("confirmNewPin").value = "";

    showMessage("dashboardMessage", "PIN changed successfully.", true);
}


// ========================================================
// 8. TRANSACTION HISTORY (matches history.py)
// ========================================================

function renderHistory() {
    if (!currentAccount) return;

    let list = document.getElementById("historyList");
    list.innerHTML = "";

    if (!currentAccount.transactions || currentAccount.transactions.length === 0) {
        list.innerHTML = "<li class='history-empty'>No transactions recorded yet.</li>";
        return;
    }

    // Display in reverse order (newest on top)
    for (let i = currentAccount.transactions.length - 1; i >= 0; i--) {
        let item = document.createElement("li");
        item.innerText = currentAccount.transactions[i];
        list.appendChild(item);
    }
}
