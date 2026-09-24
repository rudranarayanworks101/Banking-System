from storage import accounts
from utils import generate_unique_account_number, get_current_timestamp


def create_account():
    """Create a new account."""
    print("\n========== CREATE ACCOUNT ==========")
    name = input("Enter your name: ").strip()
    if not name:
        print("\nName cannot be empty.")
        return

    phone = input("Enter phone number: ").strip()
    if not (phone.isdigit() and len(phone) == 10):
        print("\nEnter a valid 10-digit phone number.")
        return

    pin = input("Create 4-digit PIN: ").strip()
    if not (pin.isdigit() and len(pin) == 4):
        print("\nPIN must have exactly 4 digits.")
        return

    confirm_pin = input("Confirm PIN: ").strip()
    if pin != confirm_pin:
        print("\nPINs do not match.")
        return

    account_number = generate_unique_account_number()
    timestamp = get_current_timestamp()

    
    new_account = {
        "account_number": account_number,
        "name": name,
        "phone": phone,
        "pin": pin,
        "balance": 0.0,
        "transactions": [f"{timestamp} - Account created"]
    }

    accounts[account_number] = new_account

    print("\nAccount created successfully!")
    print(f"\nAccount Number: {account_number}")
    print("Please remember your Account Number and PIN.")
